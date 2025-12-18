'use client';
import { EntryListPage } from "@/components/features/EntryListPage";
import { useMainStore } from "@/lib/stores/mainStore";

export default function SummaryPage() {
  const summaries = useMainStore((state) => state.entries).filter(
    (entry) => entry.type === "summary"
  );

  return (
    <EntryListPage
      entries={summaries}
      title="要約"
      showBackButton={true}
      showTrailingContent={false}
    />
  );
}
