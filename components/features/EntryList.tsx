import { Entry } from "@/types/entry";
import { EntryCard } from "@/components/features/EntryCard";

interface EntryListProps {
  // 表示するエントリー配列
  entries: Entry[];

  // 選択モード関連
  isSelectionMode?: boolean;
  selectedIds?: string[];
  onToggleSelection?: (id: string) => void;

  // 空状態のメッセージ
  emptyMessage?: string;

  // カスタムスタイル
  className?: string;

  // エントリーカードのカスタムレンダリング（オプション）
  renderEntry?: (entry: Entry, index: number) => React.ReactNode;
}

export const EntryList = ({
  entries,
  isSelectionMode = false,
  selectedIds = [],
  onToggleSelection,
  emptyMessage = "エントリーがありません",
  className = "",
  renderEntry,
}: EntryListProps) => {
  // 空状態の表示
  if (entries.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted-text text-center">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <ul className={`space-y-8 ${className}`}>
      {entries.map((entry) => (
        <EntryCard
          key={entry.id}
          entry={entry}
          isSelectionMode={isSelectionMode}
          isSelected={selectedIds.includes(entry.id)}
          onToggleSelection={onToggleSelection}
        />
      ))}
    </ul>
  );
}