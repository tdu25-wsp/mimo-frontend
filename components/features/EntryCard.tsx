import { Entry } from "@/types/entry";
import { twMerge } from "tailwind-merge";
import { CheckCircle2, Circle } from "lucide-react";
import Text from "@/components/ui/Text";
import Heading from "@/components/ui/Heading";
import { EntryCardDropdownMenu } from "@/components/features/EntryCardDropdownMenu";

interface EntryCardProps {
    entry: Entry;
    isSelectionMode?: boolean;
    isSelected?: boolean;
    onToggleSelection?: (id: string) => void;
}

export const EntryCard = (
    {
        entry,
        isSelectionMode = false,
        isSelected = false,
        onToggleSelection
    }: EntryCardProps
) => {

    const handleClick = () => {
        if (isSelectionMode && onToggleSelection) {
            // 選択モード中なら、選択状態をトグルするだけ
            onToggleSelection(entry.id);
        } else {
            // 通常時は詳細画面へ遷移 (router.pushなど)
            console.log("詳細画面へ遷移:", entry.id);
        }
    };

    return (
        <>
            <li
                onClick={handleClick}
                className={twMerge(
                    "px-6 py-4 rounded-3xl transition-all cursor-pointer relative flex items-center gap-3 shadow-lg",
                    // 選択されている時は背景色を変えるなどの視覚効果
                    isSelected ? "bg-blue-50 border-blue-300" : "bg-white hover:bg-gray-50"
                )}
            >
                {/* 選択モード時のみ表示するチェックボックスエリア */}
                {isSelectionMode && (
                    <div className="flex-shrink-0 text-primary mr-2">
                        {isSelected ? (
                            <CheckCircle2 className="w-6 h-6 text-blue-500 fill-blue-100" />
                        ) : (
                            <Circle className="w-6 h-6 text-gray-300" />
                        )}
                    </div>
                )}

                {/* コンテンツ本体 */}
                <div className="flex-1">
                    {
                        entry.type !== 'memo' && (
                            <Heading level="h4" className="mb-1 font-bold">{entry.title}</Heading>
                        )
                    }
                    <Text style="body" className="mb-1 font-medium">{entry.content}</Text>
                    <div className="flex items-center justify-between">
                        <Text style="small" className="font-mono">{entry.createdAt}</Text>
                        <EntryCardDropdownMenu />
                    </div>
                </div>
            </li>
        </>
    );
}