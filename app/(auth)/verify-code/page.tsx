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
import { verifyCodeSchema, VerifyCodeInput } from "@/lib/validation/auth.schema";
import { toast } from "sonner";

function VerifyCodeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") as "signup" | "reset" | null;
  
  const registerVerify = useMainStore((state) => state.registerVerify);
  const verifyResetCode = useMainStore((state) => state.verifyResetCode);
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
  } = useForm<VerifyCodeInput>({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues: {
      code: "",
    },
  });

  const codeValue = watch("code");

  const onSubmit: SubmitHandler<VerifyCodeInput> = async (data) => {
    try {
      if (mode === "reset") {
        await verifyResetCode(data.code);
        toast.success("認証に成功しました");
        router.push("/register-password?mode=reset");
      } else {
        await registerVerify(data.code);
        toast.success("認証に成功しました");
        router.push("/register-password?mode=signup");
      }
    } catch (error: any) {
      toast.error(error.message || "認証コードが正しくありません");
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
              <Heading level="h2" className="mb-2">
                確認コードを入力
              </Heading>
              <p className="text-sm text-muted-text mb-10">
                {tempEmail} 宛に送信された6桁のコードを入力してください
              </p>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid w-full items-center gap-1.5 mt-5">
                  <div className="relative">
                    <Input
                      id="code"
                      type="text"
                      placeholder="コードを入力"
                      className="pr-10"
                      autoFocus
                      {...register("code")}
                    />
                    {codeValue && codeValue.length > 0 && (
                      <button
                        type="button"
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 inline-flex items-center justify-center rounded-md text-muted-text hover:text-secondary-text"
                        onClick={() => setValue("code", "")}
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">コードをクリア</span>
                      </button>
                    )}
                  </div>
                  {errors.code && (
                    <p className="text-error text-xs">
                      {errors.code.message}
                    </p>
                  )}
                </div>

                <div className="mt-24">
                  <ActionLargeButton
                    label={isLoading ? "確認中..." : "次へ"}
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

export default function VerifyCodePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyCodeContent />
    </Suspense>
  );
}