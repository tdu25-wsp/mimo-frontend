"use client";
import * as React from "react";
import { Header } from "@/components/layout/Header";
import ActionLargeButton from "@/components/features/ActionLargeButton";
import { Input } from "@/components/ui/Input";
import { X } from "lucide-react";

export default function ResetPasswordPage() {
  // ⚠️注意: パスワード確認用と入力用でStateを分ける必要があります（後述）
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

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

        {/* カード部分のレスポンシブ対応 */}
        <div className="w-full sm:max-w-sm bg-background sm:border-border sm:shadow-sm flex flex-col">

          <main className="flex-1 flex flex-col justify-center px-6 pb-20">
            <div className="w-full max-w-[402px] mx-auto">
              <h2 className="text-2xl font-bold text-primary-text mb-10">
                パスワードを変更
              </h2>

              {/* 1つ目のパスワード入力 */}
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
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-10"
                  />
                  {password.length > 0 && (
                    <button
                      type="button"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 inline-flex items-center justify-center rounded-md text-muted-text hover:text-secondary-text"
                      onClick={() => setPassword("")}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">パスワードをクリア</span>
                    </button>
                  )}
                </div>
              </div>

              {/* 2つ目のパスワード入力（確認用） */}
              <div className="grid w-full items-center gap-1.5 mt-5">
                <label
                  htmlFor="confirm-password"
                  className="text-sm font-medium text-secondary-text"
                >
                  パスワードをもう一度入力
                </label>
                <div className="relative">
                  {/* StateとIDを確認用に変更 */}
                  <Input
                    type="password"
                    id="confirm-password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pr-10"
                  />
                  {confirmPassword.length > 0 && (
                    <button
                      type="button"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 inline-flex items-center justify-center rounded-md text-muted-text hover:text-secondary-text"
                      onClick={() => setConfirmPassword("")}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">パスワードをクリア</span>
                    </button>
                  )}
                </div>
              </div>

              {/* 変更ボタン */}
              <div className="mt-24">
                <ActionLargeButton
                  label="変更"
                />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}