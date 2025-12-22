"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMainStore } from "@/lib/stores/mainStore";
import { Header } from "@/components/layout/Header";
import ActionLargeButton from "@/components/features/ActionLargeButton";
import { Input } from "@/components/ui/Input";
import Heading from "@/components/ui/Heading";
import { X } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userIdSchema, UserIdInput } from "@/lib/validation/auth.schema";
import { toast } from "sonner";

export default function UserIdPage() {
  const router = useRouter();
  const registerComplete = useMainStore((state) => state.registerComplete);
  const isLoading = useMainStore((state) => state.isLoading);
  const tempEmail = useMainStore((state) => state.tempEmail);
  const tempPassword = useMainStore((state) => state.tempPassword);

  useEffect(() => {
    if (!tempEmail || !tempPassword) {
      router.replace("/signup");
    }
  }, [tempEmail, tempPassword, router]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<UserIdInput>({
    resolver: zodResolver(userIdSchema),
    defaultValues: {
      userId: "",
    },
  });

  const userIdValue = watch("userId");

  const onSubmit: SubmitHandler<UserIdInput> = async (data) => {
    try {
      await registerComplete({
        user_id: data.userId,
        display_name: data.userId, // 初期値としてIDを使用
      });
      toast.success("登録が完了しました");
      router.push("/list/all");
    } catch (error: any) {
      toast.error(error.message || "登録に失敗しました");
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
                  
                  {errors.userId && (
                    <p className="text-error text-xs mt-1">
                      {errors.userId.message}
                    </p>
                  )}
                  
                  <p className="text-xs text-muted-text mt-1">
                    ※半角英数字のみ使用できます
                  </p>
                </div>

                <div className="mt-24">
                  <ActionLargeButton
                    label={isLoading ? "登録中..." : "登録"}
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