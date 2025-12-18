'use client';
import { EntryListPage } from "@/components/features/EntryListPage";
import { useMainStore } from "@/lib/stores/mainStore";

export default function JournalingSummaryPage() {
  const summaries = useMainStore((state) => state.entries).filter(
    (entry) => entry.type === "journaling"
  );

  return (
    <EntryListPage
      entries={summaries}
      title="ジャーナリング要約"
      showBackButton={true}
      showTrailingContent={false}
    />
  );
}
