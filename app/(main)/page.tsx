"use client"

import { GroupedEntryList } from "@/components/features/GroupedEntryList";
import { useMainStore } from "@/lib/stores/mainStore";
import { Plus } from "lucide-react";

export default function MainPage() {
  const entries = useMainStore((state) => state.entries);
  const openCreateSheet = useMainStore((state) => state.openCreateSheet);

  return (
    <>
      <div className="flex flex-col h-full">
        {/* Header */}
        <header className="flex-shrink-0 sticky top-0 z-50 bg-background border-b border-border h-14 md:hidden">
          <div className="flex items-center justify-between h-full px-4">
            <h1 className="text-xl font-bold text-primary-text">Mimo</h1>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto bg-gray-background">
          <div className="max-w-xl mx-auto p-4 pb-24 md:pb-4">
            <GroupedEntryList
              entries={entries}
              emptyMessage="まだメモがありません"
            />
          </div>
        </div>
      </div>

      {/* FABボタン */}
      <button
        onClick={openCreateSheet}
        className="fixed bottom-6 right-6 md:bottom-6 md:right-6 bottom-24 bg-primary text-white p-4 rounded-full shadow-lg z-40 hover:bg-primary-hover transition-colors"
      >
        <Plus size={24} />
      </button>
    </>
  );
}
