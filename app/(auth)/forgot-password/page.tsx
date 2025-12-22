"use client";

import { useRouter } from "next/navigation";
import { useMainStore } from "@/lib/stores/mainStore";
import { Header } from "@/components/layout/Header";
import ActionLargeButton from "@/components/features/ActionLargeButton";
import { Input } from "@/components/ui/Input";
import Heading from "@/components/ui/Heading";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema, ForgotPasswordInput } from "@/lib/validation/auth.schema";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const sendVerificationCode = useMainStore((state) => state.sendVerificationCode);
  const isLoading = useMainStore((state) => state.isLoading);

  // useFormのセットアップ
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  // 送信時の処理
  const onSubmit: SubmitHandler<ForgotPasswordInput> = async (data) => {
    try {
      await sendVerificationCode(data.email, "reset");
      toast.success("確認コードを送信しました");
      router.push("/verify-code?mode=reset");
    } catch (error: any) {
      toast.error(error.message || "エラーが発生しました");
    }
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
                    {...register("email")}
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
                    label={isLoading ? "送信中..." : "送信"}
                    type="submit"
                    disabled={isLoading}
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