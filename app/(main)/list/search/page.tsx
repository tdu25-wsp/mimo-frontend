'use client';
import { EntryListPage } from "@/components/features/EntryListPage";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/Input";
import { useMainStore } from "@/lib/stores/mainStore";
import { useDebounce } from "@/lib/hooks/useDebounce";

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const entries = useMainStore((state) => state.entries);
  const tags = useMainStore((state) => state.tags);

  const debouncedQuery = useDebounce(searchQuery, 500);

  const filteredEntries = useMemo(() => {
    if (!debouncedQuery.trim()) return [];

    const lowerQuery = debouncedQuery.toLowerCase();

    return entries.filter((entry) => {
      let textToSearch = "";
      if (entry.type === 'memo') {
        textToSearch = entry.content;
      } else {
        textToSearch = `${entry.title} ${entry.content}`;
      }

      const matchContent = textToSearch.toLowerCase().includes(lowerQuery);
      if (matchContent) return true;

      let tagIds: string[] = [];
      if (entry.type === 'memo') {
        tagIds = [...entry.autoTagIds, ...entry.manualTagIds];
      } else {
        tagIds = entry.tagsIds;
      }

      const matchTag = tagIds.some(tagId => {
        const tag = tags.find(t => t.id === tagId);
        return tag && tag.name.toLowerCase().includes(lowerQuery);
      });

      return matchTag;
    });
  }, [debouncedQuery, entries]);

  const emptyMessage = useMemo(() => {
    if (!debouncedQuery.trim()) {
      return "キーワードまたはタグ名で検索してください";
    }
    return `「${debouncedQuery}」の検索結果はありませんでした`;
  }, [debouncedQuery]);

  return (
    <EntryListPage
      entries={filteredEntries}
      title="検索"
      showBackButton={true}
      emptyMessage={emptyMessage}
      headerBelow={
        <div className="p-4">
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-text">
              <Search className="h-full w-full" />
            </div>
            <Input
              type="search"
              id="search"
              placeholder="キーワード、タグで検索..."
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      }
    />
  );
}
