export default function DevLayout({ children }: { children: React.ReactNode }) {
  // 本番環境では非表示
  if (process.env.NODE_ENV === 'production') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-error">このページは開発環境でのみ利用可能です</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-background">
      <div className="bg-warning text-white px-4 py-2 text-center font-bold">
        ⚠️ 開発専用ページ - 本番環境では表示されません
      </div>
      {children}
    </div>
  );
}