export default function SettingPage() {
  return (
    <>
      {/* PC: 中央にメッセージを表示 */}
      <div className="hidden md:flex items-center justify-center h-full p-4">
        <p className="text-muted-text text-lg">
          左側のナビゲーションからカテゴリを選択してください
        </p>
      </div>

      {/* モバイル: 何も表示しない */}
    </>
  );
}
