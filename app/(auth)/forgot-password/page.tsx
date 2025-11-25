"use client";
import * as React from "react";
import { Header } from "@/components/layout/Header";
import ActionLargeButton from "@/components/features/ActionLargeButton";
import { Input } from "@/components/ui/Input";
import { X } from "lucide-react";

export default function ForgotPasswordPage() {

  return (
    // 1. 全体ラッパー: 画面全体の背景色はグレー
    <div className="min-h-screen w-full bg-gray-background flex flex-col">

      {/* ヘッダー */}
      <Header
        title="Mimo"
        showBackButton={true}
        className="bg-background border-b shadow-sm"
      />

      {/* 3. コンテンツエリアのラッパー*/}
      <div className="flex-1 flex justify-center w-full">

        {/* 4. スマホ枠（カラム）*/}
        <div className="w-full max-w-sm bg-background border-border shadow-sm flex flex-col">

          <main className="flex-1 flex flex-col justify-center px-6 pb-20">

            <h2 className="text-base font-bold text-primary-text mb-10">
              確認コードを送信
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

            {/* 送信ボタン */}
            <div className="mt-30">
              <ActionLargeButton
                label="送信"
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}