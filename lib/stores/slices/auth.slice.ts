import { User } from "@/types/user";
import { authRepository } from "@/lib/repositories";
import { LoginDTO, RegisterCompleteDTO } from "@/lib/repositories/interfaces/auth.interface";

export interface AuthSlice {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // 登録フロー用の一時データ
  tempEmail: string | null;
  tempPassword: string | null;

  // Actions
  login: (data: LoginDTO) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>; // 初回ロード時に実行
  
  // 登録フロー
  registerStart: (email: string) => Promise<void>;
  registerVerify: (code: string) => Promise<void>;
  registerComplete: (data: Omit<RegisterCompleteDTO, "email" | "password">) => Promise<void>;
  
  // パスワードリセットフロー
  forgotPassword: (email: string) => Promise<void>;
  verifyResetCode: (code: string) => Promise<void>;
  resetPassword: (password: string) => Promise<void>;

  sendVerificationCode: (email: string, type: "signup" | "reset") => Promise<void>;

  setTempEmail: (email: string) => void;
  setTempPassword: (password: string) => void;
}

export const createAuthSlice = (set: any, get: any): AuthSlice => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  tempEmail: null,
  tempPassword: null,

  login: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const user = await authRepository.login(data);
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await authRepository.logout();
      set({ user: null, isAuthenticated: false, isLoading: false });
    } catch (error: any) {
      console.error("Logout failed", error);
      // ログアウト失敗でもクライアント側はログアウト状態にする
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },

  checkAuth: async () => {
    set({ isLoading: true });
    try {
      const user = await authRepository.getCurrentUser();
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      // 認証切れなどはエラーではなく未ログイン状態として扱う
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },

  registerStart: async (email) => {
    set({ isLoading: true, error: null });
    try {
      await authRepository.registerStart({ email });
      set({ tempEmail: email, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  registerVerify: async (code) => {
    set({ isLoading: true, error: null });
    const email = get().tempEmail;
    if (!email) throw new Error("Email not found");

    try {
      await authRepository.registerVerify({ email, code });
      set({ isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  registerComplete: async (data) => {
    set({ isLoading: true, error: null });
    const email = get().tempEmail;
    const password = get().tempPassword;
    if (!email) throw new Error("Email not found");
    if (!password) throw new Error("Password not found");

    try {
      const user = await authRepository.registerComplete({ ...data, email, password });
      set({ user, isAuthenticated: true, isLoading: false, tempEmail: null, tempPassword: null });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  forgotPassword: async (email) => {
    set({ isLoading: true, error: null });
    try {
      await authRepository.forgotPassword({ email });
      set({ tempEmail: email, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  verifyResetCode: async (code) => {
    set({ isLoading: true, error: null });
    const email = get().tempEmail;
    if (!email) throw new Error("Email not found");

    try {
      await authRepository.verifyResetCode({ email, code });
      set({ isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  resetPassword: async (password) => {
    set({ isLoading: true, error: null });
    const email = get().tempEmail;
    if (!email) throw new Error("Email not found");

    try {
      await authRepository.resetPassword({ email, new_password: password });
      set({ isLoading: false, tempEmail: null });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },
  
  sendVerificationCode: async (email, type) => {
    if (type === "signup") {
      await get().registerStart(email);
    } else {
      await get().forgotPassword(email);
    }
  },
  
  setTempEmail: (email) => set({ tempEmail: email }),
  setTempPassword: (password) => set({ tempPassword: password }),
});
