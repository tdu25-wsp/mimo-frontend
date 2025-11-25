"use client";
import * as React from "react";
import { Header } from "@/components/layout/Header";
import ActionLargeButton from "@/components/features/ActionLargeButton";
import { Input } from "@/components/ui/Input";
import { X } from "lucide-react";

export default function SignupPage() {
  const [password, setPassword] = React.useState("");
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

              <h2 className="text-base font-bold text-primary-text mb-10">
                新規登録
              </h2>

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
                />
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

              {/* 登録ボタン*/}
              <div className="mt-10">
                <ActionLargeButton
                  label="登録"
                />
              </div>

            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
