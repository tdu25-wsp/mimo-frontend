import { EntryEditSheet } from "@/components/features/EntryEditSheet";
import { TagEditSheet } from "@/components/features/TagEditSheet";
import { DeleteDialog } from "@/components/features/DeleteDialog";
import TabBar from "@/components/layout/TabBar";
import { StoreInitializer } from "../StoreInitializer";
import { memoRepository, summaryRepository, tagRepository } from "@/lib/repositories";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialMemos = await memoRepository.getAll();
  const initialSummaries = await summaryRepository.getSummaries();
  const initialEntries = [...initialMemos, ...initialSummaries];
  const initialTags = await tagRepository.getAll();

  return (
    <>
      <StoreInitializer entries={initialEntries} tags={initialTags} />
      <div className="flex flex-col md:flex-row h-screen bg-gray-background">
        {/* タブバー */}
        <TabBar />

        {/* メインコンテンツ */}
        <main className="md:ml-48 pb-16 md:pb-0 flex-1">
          {children}
          <EntryEditSheet />
          <TagEditSheet />
          <DeleteDialog />
        </main>
      </div>
    </>
  );
}
