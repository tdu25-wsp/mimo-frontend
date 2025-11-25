"use client";
import * as React from "react";
import { Header } from "@/components/layout/Header";
import ActionLargeButton from "@/components/features/ActionLargeButton";

export default function VerifyCodePage() {
  // 4桁のコードを管理するState
  const [code, setCode] = React.useState(["", "", "", ""]);

  // 各input要素への参照を管理（フォーカス移動用）
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  // 入力時の処理
  const handleChange = (index: number, value: string) => {
    // 数字以外は無視（必要に応じて変更可）
    if (value.length > 1) {
      // コピペなどで複数文字が入った場合の簡易処理（最後の1文字を取る）
      value = value.slice(-1);
    }
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // 文字が入力され、かつ最後のボックスでなければ、次のボックスへフォーカス
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // キーダウン時の処理（Backspace対応）
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      // 現在のボックスが空で、かつ最初のボックスでなければ、前のボックスへ戻る
      if (!code[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  // ペースト時の処理（"1234"などを一気に入れる）
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 4); // 最大4文字
    if (!/^\d+$/.test(pastedData)) return; // 数字のみ許可

    const digits = pastedData.split("");
    const newCode = [...code];

    digits.forEach((digit, i) => {
      newCode[i] = digit;
    });
    setCode(newCode);

    // 入力された最後の位置、または最後のボックスにフォーカス
    const nextFocusIndex = Math.min(digits.length, 3);
    inputRefs.current[nextFocusIndex]?.focus();
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

              <h2 className="text-base font-bold text-primary-text mb-10">
                確認コードを入力
              </h2>

              <div className="flex justify-between gap-2 mb-10">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => { inputRefs.current[index] = el; }}
                    type="text"
                    inputMode="numeric" // スマホで数字キーパッドを表示
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className="
                      w-14 h-14 sm:w-16 sm:h-16 
                      text-center text-2xl font-bold 
                      border-2 border-border rounded-xl 
                      focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary
                      bg-background text-primary-text
                      transition-all
                    "
                  />
                ))}
              </div>

              {/* 送信ボタン*/}
              <div className="mt-10">
                <ActionLargeButton
                  label="送信"
                />
              </div>

            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
