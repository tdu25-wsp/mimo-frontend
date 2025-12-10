import { ReactNode } from "react";
import { Plus } from "lucide-react";
import Text from "@/components/ui/Text";

interface TagSelectorProps {
    label?: string;
    children?: ReactNode;
    onAddClick?: () => void;
    className?: string;
};

export const TagSelector = ({ label, children, onAddClick, className = "" }: TagSelectorProps) => {
    return (
        <div className={`flex flex-col gap-2 ${className}`}>

            {/* ラベルが指定されている時だけ表示 */}
            {label && (
                <Text style="label">{label}</Text>
            )}

            <div className="flex flex-wrap items-center gap-2">

                {children}

                {/* 追加ボタン */}
                <button
                    type="button"
                    onClick={onAddClick}
                    className="
                    group inline-flex items-center justify-center gap-1 px-3 py-1
                    rounded-full border border-dashed border-muted-text
                    text-primary-text text-sm font-medium
                    transition-all hover:bg-gray-200 
                    ">
                    <Plus size={14} />
                    <span className="text-xs">追加</span>
                </button>
            </div>
        </div>
    );
};
