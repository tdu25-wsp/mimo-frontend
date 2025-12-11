"use client"

import { EntryList } from "@/components/features/EntryList";
import { useMainStore } from "@/lib/stores/mainStore";
import { Plus } from "lucide-react";

export default function MainPage() {

  const entries = useMainStore((state) => state.entries);
  const isSelectionMode = useMainStore((state) => state.isEntrySelectionMode);
  const setSelectionMode = useMainStore((state) => state.setEntrySelectionMode);
  const selectedIds = useMainStore((state) => state.selectedEntryIds);
  const toggleEntrySelection = useMainStore((state) => state.toggleEntrySelection);
  const emptyMessage = "エントリーがありません";

  const openCreateSheet = useMainStore((state) => state.openCreateSheet);

  const tags = useMainStore((state) => state.tags);

  return (
    <div>
      <h1>HomeView</h1>
      <div className="max-w-xl mx-auto">

        {/* タグ一覧の表示（動作確認用） */}
        <h2>タグ一覧</h2>
        <ul>
          {tags.map((tag) => (
            <li key={tag.id}>
              <span>{tag.name}</span> - <span>{tag.color}</span>
            </li>
          ))}
        </ul>

        {/* 選択モード切り替えボタン（仮で配置） */}
        <button
          onClick={
            () => setSelectionMode(!isSelectionMode)
          }
        >編集</button>

        <EntryList
          entries={entries}
          isSelectionMode={isSelectionMode}
          selectedIds={selectedIds}
          onToggleSelection={toggleEntrySelection}
          emptyMessage={emptyMessage}
        />

        <button
          onClick={openCreateSheet}
          className="fixed bottom-6 right-6 md:bottom-6 md:right-6 bottom-24 bg-primary text-white p-4 rounded-full shadow-lg z-40 hover:bg-primary-hover transition-colors"
        >
          <Plus size={24} />
        </button>
      </div>
    </div>
  );
}
