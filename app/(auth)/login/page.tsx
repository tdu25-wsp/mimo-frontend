"use client";

import { useRouter } from "next/navigation";
import { useMainStore } from "@/lib/stores/mainStore";
import ActionLargeButton from "@/components/features/ActionLargeButton";
import { Input } from "@/components/ui/Input";
import { X } from "lucide-react";
import LinkButton from "@/components/features/LinkButton";
import Heading from "@/components/ui/Heading";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginInput } from "@/lib/validation/auth.schema";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const login = useMainStore((state) => state.login);
  const isLoading = useMainStore((state) => state.isLoading);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // パスワードの入力有無を監視（クリアボタン表示用）
  const passwordValue = watch("password");

  // 送信時の処理
  const onSubmit: SubmitHandler<LoginInput> = async (data) => {
    try {
      await login(data);
      toast.success("ログインしました");
      router.push("/list/all");
    } catch (error: any) {
      toast.error(error.message || "ログインに失敗しました");
    }
  };

  return (
    <div className="min-h-screen w-full bg-background sm:bg-gray-background flex flex-col">

      {/* コンテンツエリアのラッパー */}
      <div className="flex-1 flex justify-center w-full">

        <div className="w-full sm:max-w-sm bg-background sm:border-border sm:shadow-sm flex flex-col">

          <main className="flex-1 flex flex-col justify-center pb-20">

            {/* 中身の幅固定 */}
            <div className="w-full max-w-[402px] mx-auto px-6">

              {/* ロゴ・タイトルエリア */}
              <div className="flex justify-center mb-8 mt-10">
                {/* パターンA: 画像ロゴを使いたい場合 */}

                {/* パターンB: 文字ロゴを使いたい場合 */}
                <Heading
                  level="h1"
                  className="text-3xl font-extrabold tracking-tight"
                >
                  Mimo
                </Heading>
              </div>


              <Heading level="h2" className="mb-10">
                ログイン
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
                    <p className="text-error text-xs">{errors.email.message}</p>
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
                      {...register("password")}
                    />

                    {/* パスワードクリアボタンのロジック */}
                    {passwordValue && passwordValue.length > 0 && (
                      <button
                        type="button"
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 inline-flex items-center justify-center rounded-md text-muted-text hover:text-secondary-text"
                        // setValueを使って値をクリア
                        onClick={() => setValue("password", "")}
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">パスワードをクリア</span>
                      </button>
                    )}
                  </div>
                  {errors.password && (
                    <p className="text-error text-xs">{errors.password.message}</p>
                  )}
                </div>

                {/* ログインボタン*/}
                <div className="mt-24">
                  <ActionLargeButton
                    label={isLoading ? "ログイン中..." : "ログイン"}
                    type="submit"
                    disabled={isLoading}
                  />
                </div>
              </form>
            </div>


            <div className="w-full border-t border-border my-8 " />
            <div className="w-full max-w-[402px] mx-auto px-6 flex flex-col items-start gap-4">
              <LinkButton href="/signup">
                新規登録はこちら
              </LinkButton>

              <LinkButton href="/forgot-password">
                パスワードを忘れた
              </LinkButton>
            </div>

          </main>

        </div>
      </div>
    </div>
  );
}
