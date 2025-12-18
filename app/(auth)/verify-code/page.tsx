"use client";

import { Header } from "@/components/layout/Header";
import ActionLargeButton from "@/components/features/ActionLargeButton";
import { Input } from "@/components/ui/Input";
import Heading from "@/components/ui/Heading";
import { X } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { verifyCodeSchema, VerifyCodeInput } from "@/lib/validation/auth.schema";

export default function VerifyCodePage() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<VerifyCodeInput>({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues: {
      code: "",
    },
  });

  const codeValue = watch("code");

  // 送信時の処理
  const onSubmit: SubmitHandler<VerifyCodeInput> = (data) => {
    //console.log("登録データ:", data);
    // ここにAPIを叩く処理
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
                コードを入力
              </Heading>

              <form onSubmit={handleSubmit(onSubmit)}>
                {/* コード入力エリア */}
                <div className="grid w-full items-center gap-1.5 mt-5">
                  <label
                    htmlFor="code"
                    className="text-sm font-medium text-secondary-text"
                  >
                    コード
                  </label>
                  <div className="relative">
                    <Input
                      id="code"
                      type="text"
                      placeholder="コードを入力"
                      className="pr-10"
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

                {/* 送信ボタン */}
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