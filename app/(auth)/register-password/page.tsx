"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMainStore } from "@/lib/stores/mainStore";
import { Header } from "@/components/layout/Header";
import ActionLargeButton from "@/components/features/ActionLargeButton";
import { Input } from "@/components/ui/Input";
import Heading from "@/components/ui/Heading";
import { X } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordSetupSchema, PasswordSetupInput } from "@/lib/validation/auth.schema";
import { toast } from "sonner";

function RegisterPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") as "signup" | "reset" | null;

  const setTempPassword = useMainStore((state) => state.setTempPassword);
  const resetPassword = useMainStore((state) => state.resetPassword);
  const isLoading = useMainStore((state) => state.isLoading);
  const tempEmail = useMainStore((state) => state.tempEmail);

  useEffect(() => {
    if (!tempEmail) {
      router.replace(mode === "reset" ? "/forgot-password" : "/signup");
    }
  }, [tempEmail, mode, router]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PasswordSetupInput>({
    resolver: zodResolver(passwordSetupSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const passwordValue = watch("password");
  const confirmPasswordValue = watch("confirmPassword");

  const onSubmit: SubmitHandler<PasswordSetupInput> = async (data) => {
    try {
      if (mode === "reset") {
        await resetPassword(data.password);
        toast.success("パスワードを再設定しました");
        router.push("/login");
      } else {
        // signup
        setTempPassword(data.password);
        router.push("/register-id");
      }
    } catch (error: any) {
      toast.error(error.message || "エラーが発生しました");
    }
  };

  return (
    <div className="min-h-screen w-full bg-background sm:bg-gray-background flex flex-col">
      <Header
        title="Mimo"
        showBackButton={true}
        className="bg-background border-b shadow-sm"
      />

      <div className="flex-1 flex justify-center w-full">
        <div className="w-full sm:max-w-sm bg-background sm:border-border sm:shadow-sm flex flex-col">
          <main className="flex-1 flex flex-col justify-center px-6 pb-20">
            <div className="w-full max-w-[402px] mx-auto">
              <Heading level="h2" className="mb-10">
                {mode === "reset" ? "新しいパスワードを設定" : "パスワードを設定"}
              </Heading>

              <form onSubmit={handleSubmit(onSubmit)}>
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
                      autoFocus
                      {...register("password")}
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
                  {errors.password && (
                    <p className="text-error text-xs mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="grid w-full items-center gap-1.5 mt-5">
                  <label
                    htmlFor="confirm-password"
                    className="text-sm font-medium text-secondary-text"
                  >
                    パスワードをもう一度入力
                  </label>
                  <div className="relative">
                    <Input
                      type="password"
                      id="confirm-password"
                      className="pr-10"
                      {...register("confirmPassword")}
                    />
                    {confirmPasswordValue && confirmPasswordValue.length > 0 && (
                      <button
                        type="button"
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 inline-flex items-center justify-center rounded-md text-muted-text hover:text-secondary-text"
                        onClick={() => setValue("confirmPassword", "")}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-error text-xs mt-1">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <div className="mt-24">
                  <ActionLargeButton
                    label={isLoading ? "処理中..." : (mode === "reset" ? "再設定する" : "次へ")}
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

export default function RegisterPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterPasswordContent />
    </Suspense>
  );
}
