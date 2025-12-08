"use client";

import { Header } from "@/components/layout/Header";
import ActionLargeButton from "@/components/features/ActionLargeButton";
import { Input } from "@/components/ui/Input";
import Heading from "@/components/ui/Heading";
import { X } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";

interface ResetPasswordInputs {
  password: string;
  confirmPassword: string;
}

export default function ResetPasswordPage() {
  // 1. useFormのセットアップ
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordInputs>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  // クリアボタンの表示制御とバリデーション用に値を監視
  const passwordValue = watch("password");
  const confirmPasswordValue = watch("confirmPassword");

  // 2. 送信時の処理
  const onSubmit: SubmitHandler<ResetPasswordInputs> = (data) => {
    console.log("変更データ:", data);
    // ここでパスワード変更APIを叩く
  };

  return (
    <div className="min-h-screen w-full bg-background sm:bg-gray-background flex flex-col">

      {/* ヘッダー */}
      <Header
        title="Mimo"
        showBackButton={true}
        className="bg-background border-b shadow-sm"
      />

      {/* コンテンツエリアのラッパー */}
      <div className="flex-1 flex justify-center w-full">

        {/* カード部分のレスポンシブ対応 */}
        <div className="w-full sm:max-w-sm bg-background sm:border-border sm:shadow-sm flex flex-col">

          <main className="flex-1 flex flex-col justify-center px-6 pb-20">
            <div className="w-full max-w-[402px] mx-auto">
              <Heading level="h2" className="mb-10">
                パスワードを変更
              </Heading>

              <form onSubmit={handleSubmit(onSubmit)}>
                {/* 1つ目のパスワード入力 */}
                <div className="grid w-full items-center gap-1.5">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-secondary-text"
                  >
                    パスワード
                  </label>
                  <div className="relative">
                    <Input
                      type="password"
                      id="password"
                      placeholder="8〜16文字のパスワード"
                      className="pr-10"
                      {...register("password", {
                        required: "パスワードは必須です",
                        minLength: {
                          value: 8,
                          message: "パスワードは8文字以上で入力してください",
                        },
                        maxLength: {
                          value: 16,
                          message: "パスワードは16文字以内で入力してください",
                        },
                      })}
                    />

                    {/* クリアボタン */}
                    {passwordValue && passwordValue.length > 0 && (
                      <button
                        type="button"
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 inline-flex items-center justify-center rounded-md text-muted-text hover:text-secondary-text"
                        onClick={() => setValue("password", "")}
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">パスワードをクリア</span>
                      </button>
                    )}
                  </div>
                  {/* エラー表示 */}
                  {errors.password && (
                    <p className="text-error text-xs mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* 2つ目のパスワード入力（確認用） */}
                <div className="grid w-full items-center gap-1.5 mt-5">
                  <label
                    htmlFor="confirm-password"
                    className="text-sm font-medium text-secondary-text"
                  >
                    パスワードをもう一度入力
                  </label>
                  <div className="relative">
                    {/* StateとIDを確認用に変更 */}
                    <Input
                      type="password"
                      id="confirm-password"
                      className="pr-10"
                      {...register("confirmPassword", {
                        required: "確認用パスワードは必須です",
                        validate: (value) =>
                          value === passwordValue ||
                          "パスワードが一致しません",
                      })}
                    />
                    {confirmPasswordValue && confirmPasswordValue.length > 0 && (
                      <button
                        type="button"
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 inline-flex items-center justify-center rounded-md text-muted-text hover:text-secondary-text"
                        onClick={() => setValue("confirmPassword", "")}
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">パスワードをクリア</span>
                      </button>
                    )}
                  </div>
                  {/* エラー表示 */}
                  {errors.confirmPassword && (
                    <p className="text-error text-xs mt-1">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                {/* 変更ボタン */}
                <div className="mt-24">
                  <ActionLargeButton
                    label={isSubmitting ? "変更中..." : "変更"}
                    type="submit"
                    disabled={isSubmitting}
                  />
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}