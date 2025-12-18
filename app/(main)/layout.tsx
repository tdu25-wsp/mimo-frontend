import { EntryEditSheet } from "@/components/features/EntryEditSheet";
import { TagEditSheet } from "@/components/features/TagEditSheet";
import { DeleteDialog } from "@/components/features/DeleteDialog";
import TabBar from "@/components/layout/TabBar";
import { StoreInitializer } from "../StoreInitializer";
import { memoRepository, summaryRepository, tagRepository } from "@/lib/repositories";
import { Entry } from "@/types/entry";
import { Tag } from "@/types/tag";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let initialEntries: Entry[] = [];
  let initialTags: Tag[] = [];
  let hasError = false;

  try {
    const initialMemos = await memoRepository.getAll();
    const initialSummaries = await summaryRepository.getSummaries();
    initialEntries = [...initialMemos, ...initialSummaries];
    initialTags = await tagRepository.getAll();
  } catch (error) {
    console.error("Failed to load initial data:", error);
    hasError = true;
  }

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
