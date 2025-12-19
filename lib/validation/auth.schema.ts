import { z } from "zod";

// --- 共通のバリデーションルール ---

// メールアドレス: 必須, 2文字以上, 254文字以内, 形式チェック
const emailSchema = z
  .string()
  .min(1, "メールアドレスは必須です")
  .min(2, "メールアドレスは2文字以上で入力してください")
  .max(254, "メールアドレスは254文字以内で入力してください")
  .email("正しいメールアドレス形式で入力してください");

// パスワード: 必須, 8文字以上, 16文字以内
const passwordSchema = z
  .string()
  .min(1, "パスワードは必須です")
  .min(8, "パスワードは8文字以上で入力してください")
  .max(16, "パスワードは16文字以内で入力してください");

// --- 各フォーム用のスキーマ ---

// 1. ログイン用
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

// 2. 新規登録用
export const signupSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

// 3. パスワードリセットメール送信
export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

// 4. パスワード変更 (確認用パスワードの一致チェックを含む)
export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string().min(1, "確認用パスワードは必須です"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "パスワードが一致しません",
    path: ["confirmPassword"], // エラーを出すフィールドを指定
  });

// 5. 確認コード入力 (4桁の数字)
export const verifyCodeSchema = z.object({
  code: z
    .string()
    .min(1, "確認コードを入力してください")
});

// --- 型のエクスポート (コンポーネントで使う用) ---
export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type VerifyCodeInput = z.infer<typeof verifyCodeSchema>;