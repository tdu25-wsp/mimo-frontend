import { Header } from "@/components/layout/Header";
import ActionLargeButton from "@/components/features/ActionLargeButton";
import { Input } from "@/components/ui/Input";

export default function ForgotPasswordPage() {

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