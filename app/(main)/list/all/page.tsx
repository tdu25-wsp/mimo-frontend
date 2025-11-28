import { EntryListPage } from "@/components/features/EntryListPage";
import { getMockMemos, getMockSummaries } from "@/lib/converters";

export default function AllMemosPage() {
  const entries = [...getMockMemos(), ...getMockSummaries()];

  return (
    <EntryListPage
      entries={entries}
      title="すべて"
      showBackButton={true}
    />
  );
}
