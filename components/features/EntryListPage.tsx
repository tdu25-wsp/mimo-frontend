'use client';

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { EntryList } from "@/components/features/EntryList";
import { Entry } from "@/types/entry";
import { Download, Trash2, Wand } from "lucide-react";
import { useMainStore } from "@/lib/stores/mainStore";

interface EntryListPageProps {
  // データ
  entries: Entry[];

  // ページ固有の設定
  title: string;
  showBackButton?: boolean;
  showTrailingContent?: boolean;

  // ヘッダーとリストの間に挿入するコンテンツ（タグ名、検索バーなど）
  headerBelow?: React.ReactNode;

  // カスタマイズ可能なアクション
  onShare?: (ids: string[]) => void;

  // 追加の右側アクション（共有や選択以外のボタン）
  additionalActions?: React.ReactNode;

  // 空状態のメッセージ
  emptyMessage?: string;
}

type EntryListPageMode = "normal" | "selection" | "summarize";

export const EntryListPage = ({
  entries,
  title,
  showBackButton = true,
  showTrailingContent = true,
  headerBelow,
  onShare,
  additionalActions,
  emptyMessage = "エントリーがありません",
}: EntryListPageProps) => {
  const openDeleteDialog = useMainStore((state) => state.openDeleteDialog);
  const generateSummary = useMainStore((state) => state.generateSummary);
  const exportEntries = useMainStore((state) => state.exportEntries);

  const [isMode, setIsMode] = useState<EntryListPageMode>("normal");

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const isSelectionMode = isMode !== "normal";

  const toggleMode = () => {
    if (isMode !== "normal") {
      setSelectedIds([]);
      setIsMode("normal");
    } else {
      setIsMode("selection");
    }
  };

  const handleSummarizeAction = async () => {
    if (isMode === "summarize") {
      if (selectedIds.length > 0) {
        await generateSummary(selectedIds);
      } else {
        // 選択されていない場合は表示されているすべてのメモを対象にする
        const allMemoIds = entries
          .filter((entry) => entry.type === "memo")
          .map((entry) => entry.id);

        if (allMemoIds.length > 0) {
          await generateSummary(allMemoIds);
        }
      }
      setIsMode("normal");
      setSelectedIds([]);
    } else {
      setIsMode("summarize");
      setSelectedIds([]);
    }
  }

  const handleToggleSelection = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id]
    );
  };

  const handleDeleteSelected = () => {
    openDeleteDialog({
        type: 'entries',
        ids: selectedIds,
        onSuccess: () => {
            // 削除が成功したら選択モードを終了する
            toggleMode();
        }
    });
  };

  const handleExportSelected = async () => {
    if (selectedIds.length === 0) return;

    try {
      await exportEntries(selectedIds);
      toggleMode();
    } catch (error) {
      console.error("Export failed:", error);
    }
  };

  const SummarizeButton = () => {
    return (
      <button
        onClick={handleSummarizeAction}
        className="
        flex items-center gap-1
        bg-transparent
        border-2 border-primary
        text-primary font-bold text-lg
        px-2 py-2
        rounded-full
        hover:bg-gray-100 hover:text-primary transition-colors duration-300
      "
      >
        <Wand size={18} strokeWidth={3} />
        {isMode === "summarize" ? (
          <span className="text-xs text-primary-text">{selectedIds.length === 0 ? "すべて要約" : "要約"}</span>
        ) : (<span className="text-xs text-primary-text">要約</span>
        )}
      </button>
    );
  }

  const NormalModeHeader = () => {
    return (<>
      {additionalActions}
      <SummarizeButton />
      <button
        onClick={toggleMode}
        className="p-2 hover:bg-gray-100 rounded-full text-xs font-bold"
      >
        選択
      </button>
    </>);
  }

  const SelectionModeHeader = () => {
    return (
      <>
        <button
          onClick={handleExportSelected}
          disabled={selectedIds.length === 0}
          className="p-2 hover:bg-gray-100 rounded-full disabled:opacity-30"
        >
          <Download size={18} />
        </button>
        <button
          onClick={handleDeleteSelected}
          disabled={selectedIds.length === 0}
          className="p-2 hover:bg-red-100 rounded-full text-red-500 disabled:opacity-30"
        >
          <Trash2 size={18} />
        </button>
      </>
    );
  }

  const SummaryModeHeader = () => {
    return (
      <>
        <SummarizeButton />
      </>
    );
  }

  return (
    <>
      <Header
        title={isSelectionMode ? `${selectedIds.length}件選択中` : title}
        showBackButton={!isSelectionMode && showBackButton}
        leftContent={
          isSelectionMode ? (
            <button onClick={toggleMode} className="text-sm font-bold">
              キャンセル
            </button>
          ) : null
        }
        rightContent={showTrailingContent &&
          <>
            {isMode === "normal" && <NormalModeHeader />}
            {isMode === "selection" && <SelectionModeHeader />}
            {isMode === "summarize" && <SummaryModeHeader />}
          </>
        }
      />

      {/* コンテンツラッパー */}
      <div className="max-w-xl mx-auto">

        {/* ヘッダー直下のコンテンツ（タグ名、検索バーなど） */}
        {headerBelow && (
          <>
            {headerBelow}
          </>
        )}

        {/* エントリーリスト */}
        <div className="p-4 pb-24">
          <EntryList
            entries={entries}
            isSelectionMode={isSelectionMode}
            selectedIds={selectedIds}
            onToggleSelection={handleToggleSelection}
            emptyMessage={emptyMessage}
          />
        </div>

      </div>
    </>
  );
}