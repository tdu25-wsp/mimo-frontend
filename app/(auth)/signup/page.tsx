"use client";

import { useRouter } from "next/navigation";
import { useMainStore } from "@/lib/stores/mainStore";
import { Header } from "@/components/layout/Header";
import ActionLargeButton from "@/components/features/ActionLargeButton";
import { Input } from "@/components/ui/Input";
import Heading from "@/components/ui/Heading";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupEmailSchema, SignupEmailInput } from "@/lib/validation/auth.schema";
import { toast } from "sonner";

export default function SignupPage() {
  const router = useRouter();
  const sendVerificationCode = useMainStore((state) => state.sendVerificationCode);
  const isLoading = useMainStore((state) => state.isLoading);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupEmailInput>({
    resolver: zodResolver(signupEmailSchema),
    defaultValues: {
      email: "",
    },
  });

  // 送信時の処理
  const onSubmit: SubmitHandler<SignupEmailInput> = async (data) => {
    try {
      await sendVerificationCode(data.email, "signup");
      toast.success("確認コードを送信しました");
      router.push("/verify-code?mode=signup");
    } catch (error: any) {
      console.error("Signup error:", error);
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
                    autoFocus
                    {...register("email")}
                  />
                  {/* エラーメッセージ */}
                  {errors.email && (
                    <p className="text-error text-xs">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* 登録ボタン*/}
                <div className="mt-24">
                  <ActionLargeButton
                    label={isLoading ? "送信中..." : "登録"}
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
