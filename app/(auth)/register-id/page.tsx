"use client";

import { Header } from "@/components/layout/Header";
import ActionLargeButton from "@/components/features/ActionLargeButton";
import { Input } from "@/components/ui/Input";
import Heading from "@/components/ui/Heading";
import { X } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userIdSchema, UserIdInput } from "@/lib/validation/auth.schema";

export default function UserIdPage() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<UserIdInput>({
    resolver: zodResolver(userIdSchema),
    defaultValues: {
      userId: "",
    },
  });

  // クリアボタン表示制御用
  const userIdValue = watch("userId");

  const onSubmit: SubmitHandler<UserIdInput> = (data) => {
    console.log("ユーザーID:", data.userId);
    // ここでIDの重複チェックAPIなどを叩くことが多いです
  };

  return (
    <div className="min-h-screen w-full bg-background sm:bg-gray-background flex flex-col">
      {/* ヘッダー */}
      <Header
        title="Mimo"
        showBackButton={true}
        className="bg-background border-b shadow-sm"
      />

      {/* コンテンツエリア */}
      <div className="flex-1 flex justify-center w-full">
        <div className="w-full sm:max-w-sm bg-background sm:border-border sm:shadow-sm flex flex-col">
          <main className="flex-1 flex flex-col justify-center px-6 pb-20">
            <div className="w-full max-w-[402px] mx-auto">
              
              <Heading level="h2" className="mb-10">
                ユーザーIDを設定
              </Heading>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid w-full items-center gap-1.5">
                  <label
                    htmlFor="userId"
                    className="text-sm font-medium text-secondary-text"
                  >
                    ユーザーID
                  </label>
                  
                  <div className="relative">
                    <Input
                      type="text"
                      id="userId"
                      placeholder="user1234"
                      className="pr-10"
                      autoFocus
                      {...register("userId")}
                    />

                    {/* クリアボタン */}
                    {userIdValue && userIdValue.length > 0 && (
                      <button
                        type="button"
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 inline-flex items-center justify-center rounded-md text-muted-text hover:text-secondary-text"
                        onClick={() => setValue("userId", "")}
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">クリア</span>
                      </button>
                    )}
                  </div>
                  
                  {/* エラーメッセージ */}
                  {errors.userId && (
                    <p className="text-error text-xs mt-1">
                      {errors.userId.message}
                    </p>
                  )}
                  
                  {/* 補足説明 */}
                  <p className="text-xs text-muted-text mt-1">
                    ※半角英数字のみ使用できます
                  </p>
                </div>

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