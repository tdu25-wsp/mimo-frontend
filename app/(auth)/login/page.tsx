"use client";
import * as React from "react";
import { Header } from "@/components/layout/Header";
import ActionLargeButton from "@/components/features/ActionLargeButton";
import { Input } from "@/components/ui/Input";
import { X } from "lucide-react";
import LinkButton from "@/components/features/LinkButton";

export default function LoginPage() {
  const [password, setPassword] = React.useState("");
  return (
    <div className="min-h-screen w-full bg-background sm:bg-gray-background flex flex-col">

      {/* コンテンツエリアのラッパー */}
      <div className="flex-1 flex justify-center w-full">

        <div className="w-full sm:max-w-sm bg-background sm:border-border sm:shadow-sm flex flex-col">

          <main className="flex-1 flex flex-col justify-center pb-20">

            {/* 中身の幅固定 */}
            <div className="w-full max-w-[402px] mx-auto px-6">
              
              {/* ▼▼▼ ロゴ・タイトルエリア ▼▼▼ */}
              <div className="flex justify-center mb-8 mt-10">
                {/* パターンA: 画像ロゴを使いたい場合 */}

                {/* パターンB: 文字ロゴを使いたい場合 */}
                <h1 className="text-3xl font-extrabold text-primary-text tracking-tight">
                  Mimo
                </h1>
              </div>


              <h2 className="text-2xl font-bold text-primary-text mb-10">
                ログイン
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

              {/* ログインボタン*/}
              <div className="mt-24">
                <ActionLargeButton
                  label="ログイン"
                />
              </div>
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
