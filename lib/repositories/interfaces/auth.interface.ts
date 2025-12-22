import { User } from "@/types/user";

// --- DTOs (Data Transfer Objects) ---

// 1. 登録フロー用
export interface RegisterStartDTO {
  email: string;
}

export interface RegisterVerifyDTO {
  email: string;
  code: string;
}

export interface RegisterCompleteDTO {
  user_id: string;
  email: string;
  display_name: string;
  password: string;
}

// 2. ログイン用
export interface LoginDTO {
  email: string;
  password: string;
}

// 3. パスワードリセット用
export interface ForgotPasswordDTO {
  email: string;
}

export interface VerifyResetCodeDTO {
  email: string;
  code: string;
}

export interface ResetPasswordDTO {
  email: string;
  new_password: string;
}

// 4. パスワード変更（認証済み）
export interface ChangePasswordDTO {
  old_password: string;
  new_password: string;
}

// --- Repository Interface ---

export interface IAuthRepository {
  // 登録フロー
  registerStart(data: RegisterStartDTO): Promise<void>;
  registerVerify(data: RegisterVerifyDTO): Promise<void>;
  registerComplete(data: RegisterCompleteDTO): Promise<User>;

  // ログイン・ログアウト
  login(data: LoginDTO): Promise<User>;
  logout(): Promise<void>;
  
  // ユーザー情報取得 (Me)
  getCurrentUser(): Promise<User>;
  
  // トークンリフレッシュ
  refreshToken(): Promise<void>;

  // パスワードリセットフロー
  forgotPassword(data: ForgotPasswordDTO): Promise<void>;
  verifyResetCode(data: VerifyResetCodeDTO): Promise<void>;
  resetPassword(data: ResetPasswordDTO): Promise<void>;

  // パスワード変更
  changePassword(data: ChangePasswordDTO): Promise<void>;
}