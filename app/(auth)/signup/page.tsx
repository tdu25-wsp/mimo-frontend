"use client";

import { Header } from "@/components/layout/Header";
import ActionLargeButton from "@/components/features/ActionLargeButton";
import { Input } from "@/components/ui/Input";
import Heading from "@/components/ui/Heading";
import { X } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";

interface SignupFormInputs {
  email: string;
  password: string;
}

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormInputs>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // パスワードの入力監視（クリアボタン用）
  const passwordValue = watch("password");

  // 送信時の処理
  const onSubmit: SubmitHandler<SignupFormInputs> = (data) => {
    //console.log("登録データ:", data);
    // ここに新規登録APIを叩く処理
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

        <div className="w-full sm:max-w-sm bg-background sm:border-border sm:shadow-sm flex flex-col">

          <main className="flex-1 flex flex-col justify-center px-6 pb-20">

            {/* 中身の幅固定 */}
            <div className="w-full max-w-[402px] mx-auto">

              <Heading level="h2" className="mb-10">
                新規登録
              </Heading>
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* メールアドレス入力欄 */}
                <div className="grid w-full items-center gap-1.5">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-secondary-text"
                  >
                    メールアドレス
                  </label>
                  <Input
                    type="email"
                    id="email"
                    placeholder="user@example.com"
                    {...register("email", {
                      required: "メールアドレスは必須です",
                      minLength: {
                        value: 2,
                        message: "メールアドレスは2文字以上で入力してください",
                      },
                      maxLength: {
                        value: 254,
                        message: "メールアドレスは254文字以内で入力してください",
                      },
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "正しいメールアドレス形式で入力してください",
                      },
                    })}
                  />
                  {/* エラーメッセージ */}
                  {errors.email && (
                    <p className="text-error text-xs">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* 1つ目のパスワード入力 */}
                <div className="grid w-full items-center gap-1.5 mt-5">
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
                      placeholder="••••••••"
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
                  {/* エラーメッセージ */}
                  {errors.password && (
                    <p className="text-error text-xs">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* 登録ボタン*/}
                <div className="mt-24">
                  <ActionLargeButton
                    label={isSubmitting ? "登録中..." : "登録"}
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
