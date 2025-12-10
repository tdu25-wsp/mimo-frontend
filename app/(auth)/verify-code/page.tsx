"use client";
import * as React from "react";
import { Header } from "@/components/layout/Header";
import ActionLargeButton from "@/components/features/ActionLargeButton";
import Heading from "@/components/ui/Heading";
import { useForm, SubmitHandler } from "react-hook-form";

interface VerifyCodeInputs {
  code: string;
}

export default function VerifyCodePage() {
  // 4桁のコードを管理するState（見た目制御用）
  const [digits, setDigits] = React.useState(["", "", "", ""]);

  // Hook Formの設定
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<VerifyCodeInputs>({
    defaultValues: {
      code: "",
    },
  });

  // 各input要素への参照を管理（フォーカス移動用）
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  // Digitsが変更されたら、Hook Formの値を更新する
  React.useEffect(() => {
    const codeString = digits.join("");
    setValue("code", codeString, { shouldValidate: true });
  }, [digits, setValue]);

  // 入力時の処理
  const handleChange = (index: number, value: string) => {
    // 数字以外は無視（必要に応じて変更可）
    if (value.length > 1) {
      // コピペなどで複数文字が入った場合の簡易処理（最後の1文字を取る）
      value = value.slice(-1);
    }
    if (!/^\d*$/.test(value)) return;

    const newDigits = [...digits];
    newDigits[index] = value;
    setDigits(newDigits);

    // 文字が入力され、かつ最後のボックスでなければ、次のボックスへフォーカス
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // キーダウン時の処理（Backspace対応）
  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace") {
      // 現在のボックスが空で、かつ最初のボックスでなければ、前のボックスへ戻る
      if (!digits[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  // ペースト時の処理（"1234"などを一気に入れる）
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 4); // 最大4文字
    if (!/^\d+$/.test(pastedData)) return; // 数字のみ許可

    const pastedDigits = pastedData.split("");
    const newDigits = [...digits];

    pastedDigits.forEach((digit, i) => {
      newDigits[i] = digit;
    });
    setDigits(newDigits);

    // 入力された最後の位置、または最後のボックスにフォーカス
    const nextFocusIndex = Math.min(digits.length, 3);
    inputRefs.current[nextFocusIndex]?.focus();
  };

  // 送信処理
  const onSubmit: SubmitHandler<VerifyCodeInputs> = (data) => {
    //console.log("確認コード送信:", data);
    // API呼び出し...
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
                確認コードを入力
              </Heading>

              <form onSubmit={handleSubmit(onSubmit)}>
                {/* ★ Hook Form用の隠しフィールド（ここでバリデーションを行う） */}
                <input
                  type="hidden"
                  {...register("code", {
                    required: "確認コードを入力してください",
                    minLength: {
                      value: 4,
                      message: "4桁のコードを入力してください",
                    },
                  })}
                />

                <div className="flex justify-between gap-2 mb-10">
                  {digits.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => {
                        inputRefs.current[index] = el;
                      }}
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

                {/* エラーメッセージ表示エリア */}
                <div className="min-h-[20px] mb-10">
                  {errors.code && (
                    <p className="text-error text-xs text-center">
                      {errors.code.message}
                    </p>
                  )}
                </div>

                {/* 送信ボタン*/}
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
