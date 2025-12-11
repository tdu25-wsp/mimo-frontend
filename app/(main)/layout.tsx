import { EntryEditSheet } from "@/components/features/EntryEditSheet";
import TabBar from "@/components/layout/TabBar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-background">
      {/* タブバー */}
      <TabBar />

      {/* メインコンテンツ */}
      <main className="md:ml-48 pb-16 md:pb-0 flex-1">
        {children}
        <EntryEditSheet />
      </main>
    </div>
  );
}
