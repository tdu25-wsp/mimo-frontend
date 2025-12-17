import { AuthResponse, IAuthRepository } from "../interfaces/auth.interface";

export const authRepository: IAuthRepository = {
  /**
   * ユーザー新規登録 (POST /api/auth/register)
   */
  register: async (email: string, password: string): Promise<void> => {
    console.log(`Mock register: ${email}`);
    // モック実装：実際には何もしない
    return;
  },

  /**
   * メールアドレス確認 (POST /api/auth/verify-email)
   * 登録時に送信された確認コードを検証します
   */
  verifyEmail: async (code: string): Promise<AuthResponse> => {
    console.log(`Mock verifyEmail: ${code}`);
    return {
      accessToken: "mock-access-token",
      refreshToken: "mock-refresh-token",
    };
  },

  /**
   * ログイン (POST /api/auth/login)
   */
  login: async (email: string, password: string): Promise<AuthResponse> => {
    console.log(`Mock login: ${email}`);
    return {
      accessToken: "mock-access-token",
      refreshToken: "mock-refresh-token",
    };
  },

  /**
   * ログアウト (POST /api/auth/logout)
   */
  logout: async (): Promise<void> => {
    console.log("Mock logout");
    return;
  },

  /**
   * 確認コードの検証 (POST /api/auth/verify)
   * クエリパラメータでフローを指定 (register | forgot-password)
   * レスポンスとして一時的なJWTなどが返る想定
   */
  verifyCode: async (
    code: string,
    flow: "register" | "forgot-password"
  ): Promise<AuthResponse> => {
    console.log(`Mock verifyCode: ${code} (flow: ${flow})`);
    return {
      accessToken: "mock-temp-access-token",
      refreshToken: "mock-temp-refresh-token",
    };
  },

  /**
   * パスワードリセット申請 (POST /api/auth/forgot-password)
   * ResetPassword ロールを持ったアクセストークンを取得
   */
  forgotPassword: async (): Promise<void> => {
    console.log("Mock forgotPassword");
    return;
  },

  /**
   * パスワード変更 (POST /api/auth/change-password)
   * forgot-passwordで取得したアクセストークンを用いて新しいパスワードを設定
   */
  changePassword: async (
    newPassword: string,
    resetToken: string
  ): Promise<void> => {
    console.log(`Mock changePassword with token: ${resetToken}`);
    return;
  },

  /**
   * 現在のユーザーを取得（モックでは固定値を返す）
   */
  getCurrentUser: async (): Promise<string> => {
    return "mock-user-id";
  },

  /**
   * アクセストークンの更新 (POST /api/auth/refresh)
   */
  refreshAccessToken: async (refreshToken: string): Promise<AuthResponse> => {
    console.log(`Mock refreshAccessToken: ${refreshToken}`);
    return {
      accessToken: "mock-new-access-token",
      refreshToken: "mock-new-refresh-token",
    };
  },
};