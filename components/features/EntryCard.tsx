import { Entry, MemoEntry } from "@/types/entry";
import { twMerge } from "tailwind-merge";
import { CheckCircle2, Circle, Menu } from "lucide-react";
import Text from "@/components/ui/Text";
import Heading from "@/components/ui/Heading";
import { EntryCardDropdownMenu } from "@/components/features/EntryCardDropdownMenu";
import { useMainStore } from "@/lib/stores/mainStore";
import Link from "next/link";

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
    const openEditSheet = useMainStore((state) => state.openEditSheet);

    let href: string | undefined = undefined;
    if (entry.type === "summary") {
        href = `/list/summary/${entry.id}`;
    } else if (entry.type === "journaling") {
        href = `/list/journaling-summary/${entry.id}`;
    }

    const handleClick = () => {
        if (entry.type !== "memo") {
            return;
        }

        if (isSelectionMode && onToggleSelection) {
            onToggleSelection(entry.id);
        } else {
            openEditSheet(entry as MemoEntry);
        }
    };

    const CardContent = (
        <>
            <li
                onClick={handleClick}
                className={twMerge(
                    "px-6 py-4 rounded-3xl transition-all relative flex items-center gap-3 shadow-lg",
                    entry.type === "memo" ? "cursor-pointer" : "cursor-default",
                    // 選択されている時は背景色を変えるなどの視覚効果
                    isSelected ? "bg-blue-50 border-blue-300" : "bg-white hover:bg-gray-50"
                )}
            >
                {/* 選択モード時のみ表示するチェックボックスエリア */}
                {isSelectionMode && entry.type === "memo" && (
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
                        <div onClick={(e) => e.stopPropagation()}>
                            <EntryCardDropdownMenu {...entry} />
                        </div>
                    </div>
                </div>
            </li>
        </>
    );

    if (href) {
        return (
            <Link href={href} className="block">
                {CardContent}
            </Link>
        )
    }

    return (
        <>
            {CardContent}
        </>
    );
}