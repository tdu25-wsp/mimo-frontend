export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-background">
      <div className="text-center space-y-6">
        {/* ロゴエリア */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary-text mb-2">
            Mimo
          </h1>
          <p className="text-sm text-muted-text">マイクロメモ</p>
        </div>

        {/* スピナー */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-gray-200 rounded-full mx-auto"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>

        {/* メッセージ */}
        <div className="space-y-2">
          <p className="text-base font-medium text-primary-text">
            読み込み中
          </p>
        </div>
      </div>
    </div>
  );
}