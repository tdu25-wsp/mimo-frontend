import { IAuthRepository, RegisterStartDTO, RegisterVerifyDTO, RegisterCompleteDTO, LoginDTO, ForgotPasswordDTO, VerifyResetCodeDTO, ResetPasswordDTO, ChangePasswordDTO } from "../interfaces/auth.interface";
import { User } from "@/types/user";
import { PROXY_API_BASE_URL } from "@/lib/constants";

// 共通のヘッダーとCookie設定
const fetchConfig = {
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include" as RequestCredentials,
};

// エラーハンドリング用ヘルパー
const handleResponse = async (res: Response) => {
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || errorData.message || `Request failed: ${res.status}`);
  }
  // 204 No Content の場合は null を返す
  if (res.status === 204) {
    return null;
  }
  const text = await res.text();
  return text ? JSON.parse(text) : {};
};

const mapToUser = (data: any): User => ({
  id: data.user_id || data.id,
  email: data.email,
  display_name: data.display_name,
  created_at: data.created_at,
  updated_at: data.updated_at,
  journalingSetting: data.journalingSetting
});

export const authLiveRepository: IAuthRepository = {
  // --- 登録フロー ---
  registerStart: async (data: RegisterStartDTO) => {
    const res = await fetch(`${PROXY_API_BASE_URL}/auth/register/start`, {
      ...fetchConfig,
      method: "POST",
      body: JSON.stringify(data),
    });
    await handleResponse(res);
  },

  registerVerify: async (data: RegisterVerifyDTO) => {
    const res = await fetch(`${PROXY_API_BASE_URL}/auth/register/verify`, {
      ...fetchConfig,
      method: "POST",
      body: JSON.stringify(data),
    });
    await handleResponse(res);
  },

  registerComplete: async (data: RegisterCompleteDTO): Promise<User> => {
    const res = await fetch(`${PROXY_API_BASE_URL}/auth/register/complete`, {
      ...fetchConfig,
      method: "POST",
      body: JSON.stringify(data),
    });
    const json = await handleResponse(res);
    return mapToUser(json.user);
  },

  // --- ログイン・ログアウト ---
  login: async (data: LoginDTO): Promise<User> => {
    const res = await fetch(`${PROXY_API_BASE_URL}/auth/login`, {
      ...fetchConfig,
      method: "POST",
      body: JSON.stringify(data),
    });
    const json = await handleResponse(res);
    return mapToUser(json.user);
  },

  logout: async () => {
    const res = await fetch(`${PROXY_API_BASE_URL}/auth/logout`, {
      ...fetchConfig,
      method: "POST",
    });
    await handleResponse(res);
  },

  // --- ユーザー情報 ---
  getCurrentUser: async (): Promise<User> => {
    const res = await fetch(`${PROXY_API_BASE_URL}/auth/me`, {
      ...fetchConfig,
      method: "GET",
    });
    const json = await handleResponse(res);
    return mapToUser(json.user);
  },

  refreshToken: async () => {
    const res = await fetch(`${PROXY_API_BASE_URL}/auth/refresh`, {
      ...fetchConfig,
      method: "POST",
    });
    await handleResponse(res);
  },

  // --- パスワードリセット ---
  forgotPassword: async (data: ForgotPasswordDTO) => {
    const res = await fetch(`${PROXY_API_BASE_URL}/auth/password/forgot`, {
      ...fetchConfig,
      method: "POST",
      body: JSON.stringify(data),
    });
    await handleResponse(res);
  },

  verifyResetCode: async (data: VerifyResetCodeDTO) => {
    const res = await fetch(`${PROXY_API_BASE_URL}/auth/password/verify`, {
      ...fetchConfig,
      method: "POST",
      body: JSON.stringify(data),
    });
    await handleResponse(res);
  },

  resetPassword: async (data: ResetPasswordDTO) => {
    const res = await fetch(`${PROXY_API_BASE_URL}/auth/password/reset`, {
      ...fetchConfig,
      method: "POST",
      body: JSON.stringify(data),
    });
    await handleResponse(res);
  },

  changePassword: async (data: ChangePasswordDTO) => {
    const res = await fetch(`${PROXY_API_BASE_URL}/auth/reset-password`, {
      ...fetchConfig,
      method: "POST",
      body: JSON.stringify(data),
    });
    await handleResponse(res);
  },
};
