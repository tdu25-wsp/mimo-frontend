'use client';

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { EntryList } from "@/components/features/EntryList";
import { Entry } from "@/types/entry";
import { Share, Trash2, Wand } from "lucide-react";

interface EntryListPageProps {
  // データ
  entries: Entry[];

  // ページ固有の設定
  title: string;
  showBackButton?: boolean;

  // ヘッダーとリストの間に挿入するコンテンツ（タグ名、検索バーなど）
  headerBelow?: React.ReactNode;

  // カスタマイズ可能なアクション
  onDelete?: (ids: string[]) => void;
  onShare?: (ids: string[]) => void;

  // 追加の右側アクション（共有や選択以外のボタン）
  additionalActions?: React.ReactNode;

  // 空状態のメッセージ
  emptyMessage?: string;
}

export const EntryListPage = ({
  entries,
  title,
  showBackButton = true,
  headerBelow,
  onDelete,
  onShare,
  additionalActions,
  emptyMessage = "エントリーがありません",
}: EntryListPageProps) => {
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleMode = () => {
    if (isSelectionMode) {
      setSelectedIds([]);
    }
    setIsSelectionMode(!isSelectionMode);
  };

  const handleToggleSelection = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id]
    );
  };

  const handleDeleteSelected = () => {
    if (onDelete) {
      onDelete(selectedIds);
    } else {
      console.log("削除対象ID:", selectedIds);
    }
    toggleMode();
  };

  const handleShareSelected = () => {
    if (onShare) {
      onShare(selectedIds);
    } else {
      console.log("共有対象ID:", selectedIds);
    }
  };

  return (
    <>
      <Header
        title={isSelectionMode ? `${selectedIds.length}件を選択` : title}
        showBackButton={!isSelectionMode && showBackButton}
        leftContent={
          isSelectionMode ? (
            <button onClick={toggleMode} className="text-sm font-bold">
              キャンセル
            </button>
          ) : null
        }
        rightContent={
          <>
            {isSelectionMode ? (
              // 選択モード中のアクション
              <>
                <button
                  onClick={handleShareSelected}
                  disabled={selectedIds.length === 0}
                  className="p-2 hover:bg-gray-100 rounded-full disabled:opacity-30"
                >
                  <Wand size={20} />
                </button>
                <button
                  onClick={handleShareSelected}
                  disabled={selectedIds.length === 0}
                  className="p-2 hover:bg-gray-100 rounded-full disabled:opacity-30"
                >
                  <Share size={20} />
                </button>
                <button
                  onClick={handleDeleteSelected}
                  disabled={selectedIds.length === 0}
                  className="p-2 hover:bg-red-100 rounded-full text-red-500 disabled:opacity-30"
                >
                  <Trash2 size={20} />
                </button>
              </>
            ) : (
              // 通常時のアクション
              <>
                {additionalActions}
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <Share size={20} />
                </button>
                <button
                  onClick={toggleMode}
                  className="p-2 hover:bg-gray-100 rounded-full text-sm font-bold"
                >
                  選択
                </button>
              </>
            )}
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