import { User } from "@/types/user";

// 認証系のレスポンス型（JWTを含む場合など）
export interface AuthResponse {
  accessToken: string;
  refreshToken?: string;
  user?: User;
}

export interface IAuthRepository {
  /**
   * ユーザー新規登録 (POST /api/auth/register)
   * 確認コードの送信をトリガーします
   */
  register(email: string, password: string): Promise<void>;

  /**
   * メールアドレス確認 (POST /api/auth/verify-email)
   * 登録時に送信された確認コードを検証します
   */
  verifyEmail(code: string): Promise<AuthResponse>;

  /**
   * ログイン (POST /api/auth/login)
   */
  login(email: string, password: string): Promise<AuthResponse>;

  /**
   * ログアウト (POST /api/auth/logout)
   */
  logout(): Promise<void>;

  /**
   * 確認コードの検証 (POST /api/auth/verify)
   * クエリパラメータでフローを指定 (register | forgot-password)
   * レスポンスとして一時的なJWTなどが返る想定
   */
  verifyCode(code: string, flow: 'register' | 'forgot-password'): Promise<AuthResponse>;

  /**
   * パスワードリセット申請 (POST /api/auth/forgot-password)
   * ResetPassword ロールを持ったアクセストークンを取得
   */
  forgotPassword(): Promise<void>;
  
  /**
   * パスワード変更 (POST /api/auth/change-password)
   * forgot-passwordで取得したアクセストークンを用いて新しいパスワードを設定
   */
  changePassword(newPassword: string, resetToken: string): Promise<void>;

  /**
   * 認証状態の確認 (GET /api/auth/me)
   */
  getCurrentUser(): Promise<User>;

  /**
   * アクセストークンの更新 (POST /api/auth/refresh)
   */
  refreshAccessToken(refreshToken: string): Promise<AuthResponse>;
}