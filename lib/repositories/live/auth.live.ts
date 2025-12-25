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
  console.log(`[Auth API] Response status: ${res.status}, ok: ${res.ok}`);
  console.log(`[Auth API] Response headers:`, Object.fromEntries(res.headers.entries()));
  
  if (!res.ok) {
    let errorData: any = {};
    try {
      const text = await res.text();
      console.error(`[Auth API Error] Status: ${res.status}, Body: ${text}`);
      if (text) {
        try {
          errorData = JSON.parse(text);
        } catch (parseError) {
          console.error(`[Auth API Error] Failed to parse error JSON:`, parseError);
          errorData = { message: text };
        }
      }
    } catch (e) {
      console.error("[Auth API Error] Failed to read error response:", e);
    }
    throw new Error(errorData.error || errorData.message || `Request failed: ${res.status}`);
  }
  
  // 204 No Content の場合は null を返す
  if (res.status === 204) {
    console.log(`[Auth API Success] 204 No Content`);
    return null;
  }
  
  try {
    const text = await res.text();
    console.log(`[Auth API Success] Status: ${res.status}, Body length: ${text.length}`);
    console.log(`[Auth API Success] Body content:`, text);
    
    if (!text) {
      console.log(`[Auth API Success] Empty body, returning {}`);
      return {};
    }
    
    const parsed = JSON.parse(text);
    console.log(`[Auth API Success] Parsed JSON:`, parsed);
    return parsed;
  } catch (error) {
    console.error("[Auth API] Failed to parse response:", error);
    console.error("[Auth API] Error type:", error instanceof Error ? error.constructor.name : typeof error);
    if (error instanceof Error) {
      console.error("[Auth API] Error message:", error.message);
      console.error("[Auth API] Error stack:", error.stack);
    }
    throw new Error("Decoding failed: Invalid JSON response from server");
  }
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
    const res = await fetch(`${PROXY_API_BASE_URL}auth/register/start`, {
      ...fetchConfig,
      method: "POST",
      body: JSON.stringify(data),
    });
    await handleResponse(res);
  },

  registerVerify: async (data: RegisterVerifyDTO) => {
    const res = await fetch(`${PROXY_API_BASE_URL}auth/register/verify`, {
      ...fetchConfig,
      method: "POST",
      body: JSON.stringify(data),
    });
    await handleResponse(res);
  },

  registerComplete: async (data: RegisterCompleteDTO): Promise<User> => {
    const res = await fetch(`${PROXY_API_BASE_URL}auth/register/complete`, {
      ...fetchConfig,
      method: "POST",
      body: JSON.stringify(data),
    });
    const json = await handleResponse(res);
    return mapToUser(json.user);
  },

  // --- ログイン・ログアウト ---
  login: async (data: LoginDTO): Promise<User> => {
    const res = await fetch(`${PROXY_API_BASE_URL}auth/login`, {
      ...fetchConfig,
      method: "POST",
      body: JSON.stringify(data),
    });
    const json = await handleResponse(res);
    return mapToUser(json.user);
  },

  logout: async () => {
    const res = await fetch(`${PROXY_API_BASE_URL}auth/logout`, {
      ...fetchConfig,
      method: "POST",
    });
    await handleResponse(res);
  },

  // --- ユーザー情報 ---
  getCurrentUser: async (): Promise<User> => {
    const res = await fetch(`${PROXY_API_BASE_URL}auth/me`, {
      ...fetchConfig,
      method: "GET",
    });
    const json = await handleResponse(res);
    return mapToUser(json.user);
  },

  refreshToken: async () => {
    const res = await fetch(`${PROXY_API_BASE_URL}auth/refresh`, {
      ...fetchConfig,
      method: "POST",
    });
    await handleResponse(res);
  },

  // --- パスワードリセット ---
  forgotPassword: async (data: ForgotPasswordDTO) => {
    const res = await fetch(`${PROXY_API_BASE_URL}auth/password/forgot`, {
      ...fetchConfig,
      method: "POST",
      body: JSON.stringify(data),
    });
    await handleResponse(res);
  },

  verifyResetCode: async (data: VerifyResetCodeDTO) => {
    const res = await fetch(`${PROXY_API_BASE_URL}auth/password/verify`, {
      ...fetchConfig,
      method: "POST",
      body: JSON.stringify(data),
    });
    await handleResponse(res);
  },

  resetPassword: async (data: ResetPasswordDTO) => {
    const res = await fetch(`${PROXY_API_BASE_URL}auth/password/reset`, {
      ...fetchConfig,
      method: "POST",
      body: JSON.stringify(data),
    });
    await handleResponse(res);
  },

  changePassword: async (data: ChangePasswordDTO) => {
    const res = await fetch(`${PROXY_API_BASE_URL}auth/reset-password`, {
      ...fetchConfig,
      method: "POST",
      body: JSON.stringify(data),
    });
    await handleResponse(res);
  },
};
