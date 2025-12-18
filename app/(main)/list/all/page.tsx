'use client';

import { EntryListPage } from "@/components/features/EntryListPage";
import { useMainStore } from "@/lib/stores/mainStore";

export default function AllMemosPage() {
  const entries = useMainStore((state) => state.entries);

  return (
    <EntryListPage
      entries={entries}
      title="すべて"
      showBackButton={true}
    />
  );
}
