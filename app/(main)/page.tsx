"use client"

import { EntryList } from "@/components/features/EntryList";
import { useMainStore } from "@/lib/stores/mainStore";

export default function MainPage() {

  const entries = useMainStore((state) => state.entries);
  const isSelectionMode = useMainStore((state) => state.isEntrySelectionMode);
  const setSelectionMode = useMainStore((state) => state.setEntrySelectionMode);
  const selectedIds = useMainStore((state) => state.selectedEntryIds);
  const toggleEntrySelection = useMainStore((state) => state.toggleEntrySelection);
  const emptyMessage = "エントリーがありません";

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
      </div>
    </div>
  );
}
