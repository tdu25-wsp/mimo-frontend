import { 
  IAuthRepository, 
  RegisterStartDTO, 
  RegisterVerifyDTO, 
  RegisterCompleteDTO, 
  LoginDTO, 
  ForgotPasswordDTO, 
  VerifyResetCodeDTO, 
  ResetPasswordDTO, 
  ChangePasswordDTO 
} from "../interfaces/auth.interface";
import { User } from "@/types/user";

const mockUser: User = {
  id: "user-1",
  email: "test@example.com",
  display_name: "Test User",
  passwordHash: "hashedpassword",
  passwordSalt: "salt",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

export const authMockRepository: IAuthRepository = {
  // --- 登録フロー ---
  registerStart: async (data: RegisterStartDTO) => {
    console.log("Mock registerStart:", data);
    await new Promise((resolve) => setTimeout(resolve, 500));
  },

  registerVerify: async (data: RegisterVerifyDTO) => {
    console.log("Mock registerVerify:", data);
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (data.code !== "123456") {
      throw new Error("Invalid verification code");
    }
  },

  registerComplete: async (data: RegisterCompleteDTO): Promise<User> => {
    console.log("Mock registerComplete:", data);
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      ...mockUser,
      email: data.email,
    };
  },

  // --- ログイン・ログアウト ---
  login: async (data: LoginDTO): Promise<User> => {
    console.log("Mock login:", data);
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (data.email === "error@example.com") {
      throw new Error("Invalid credentials");
    }
    return mockUser;
  },

  logout: async () => {
    console.log("Mock logout");
    await new Promise((resolve) => setTimeout(resolve, 500));
  },

  // --- ユーザー情報 ---
  getCurrentUser: async (): Promise<User> => {
    console.log("Mock getCurrentUser");
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockUser;
  },

  refreshToken: async () => {
    console.log("Mock refreshToken");
    await new Promise((resolve) => setTimeout(resolve, 500));
  },

  // --- パスワードリセット ---
  forgotPassword: async (data: ForgotPasswordDTO) => {
    console.log("Mock forgotPassword:", data);
    await new Promise((resolve) => setTimeout(resolve, 500));
  },

  verifyResetCode: async (data: VerifyResetCodeDTO) => {
    console.log("Mock verifyResetCode:", data);
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (data.code !== "123456") {
      throw new Error("Invalid reset code");
    }
  },

  resetPassword: async (data: ResetPasswordDTO) => {
    console.log("Mock resetPassword:", data);
    await new Promise((resolve) => setTimeout(resolve, 500));
  },

  changePassword: async (data: ChangePasswordDTO) => {
    console.log("Mock changePassword:", data);
    await new Promise((resolve) => setTimeout(resolve, 500));
  },
};
