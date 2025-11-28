'use client';

import { EntryListPage } from "@/components/features/EntryListPage";
import { Search } from "lucide-react";
import { getMockMemos, getMockSummaries } from "@/lib/converters";
import { useState } from "react";
import { Input } from "@/components/ui/Input";

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const allEntries = [...getMockMemos(), ...getMockSummaries()];

  // 検索フィルタリング（仮）
  const filteredEntries = searchQuery
    ? allEntries.filter((entry) =>
      entry.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : allEntries;

  return (
    <EntryListPage
      entries={filteredEntries}
      title="検索"
      showBackButton={true}
      headerBelow={
        <div className="p-4">
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-text">
              <Search className="h-full w-full" />
            </div>
            <Input
              type="search"
              id="search"
              placeholder="検索..."
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      }
    />
  );
}
