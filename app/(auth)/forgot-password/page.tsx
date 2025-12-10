"use client";

import { Header } from "@/components/layout/Header";
import ActionLargeButton from "@/components/features/ActionLargeButton";
import { Input } from "@/components/ui/Input";
import Heading from "@/components/ui/Heading";
import { useForm, SubmitHandler } from "react-hook-form";

interface ForgotPasswordInputs {
  email: string;
}

export default function ForgotPasswordPage() {
  // useFormのセットアップ
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordInputs>({
    defaultValues: {
      email: "",
    },
  });

  // 送信時の処理
  const onSubmit: SubmitHandler<ForgotPasswordInputs> = async (data) => {
    //console.log("送信データ:", data);
    // ここにパスワードリセットメール送信APIの呼び出しなどを記述
    // await resetPassword(data.email);
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
                確認コードを送信
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
                  {/* エラーメッセージ表示 */}
                  {errors.email && (
                    <p className="text-error text-xs">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* 送信ボタン*/}
                <div className="mt-24">
                  <ActionLargeButton
                    label={isSubmitting ? "送信中..." : "送信"}
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