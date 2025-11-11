import TabBar from "@/components/layout/TabBar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-background">
      {/* タブバー */}
      <TabBar />

      {/* メインコンテンツ */}
      <main className="md:ml-60 pb-16 md:pb-0">
        {children}
      </main>
    </div>
  );
}
