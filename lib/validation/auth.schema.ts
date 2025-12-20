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

//  ユーザーID (英数字のみ, 記号禁止)
const userIdRule = z
  .string()
  .min(1, "ユーザーIDは必須です")
  .min(4, "ユーザーIDは4文字以上で入力してください") // 一般的な長さ制限（適宜変更可）
  .max(20, "ユーザーIDは20文字以内で入力してください") // 一般的な長さ制限（適宜変更可）
  .regex(/^[a-zA-Z0-9]+$/, "ユーザーIDは半角英数字のみで入力してください");

// --- 各フォーム用のスキーマ ---

// フォーム用スキーマ
export const userIdSchema = z.object({
  userId: userIdRule,
});

// ログイン用
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

// 新規登録 (メールアドレス入力画面用)
export const signupEmailSchema = z.object({
  email: emailSchema,
});

// パスワードリセットメール送信
export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

// パスワード登録・変更 (確認用パスワードの一致チェックを含む)
export const passwordSetupSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string().min(1, "確認用パスワードは必須です"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "パスワードが一致しません",
    path: ["confirmPassword"], // エラーを出すフィールドを指定
  });

// 確認コード入力 (4桁の数字)
export const verifyCodeSchema = z.object({
  code: z
    .string()
    .min(1, "確認コードを入力してください")
});

// --- 型のエクスポート (コンポーネントで使う用) ---
export type UserIdInput = z.infer<typeof userIdSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type SignupEmailInput = z.infer<typeof signupEmailSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type PasswordSetupInput = z.infer<typeof passwordSetupSchema>;
export type VerifyCodeInput = z.infer<typeof verifyCodeSchema>;