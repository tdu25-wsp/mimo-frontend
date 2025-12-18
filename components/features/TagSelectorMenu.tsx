"use client";

import { Tag } from "@/types/tag";
import { Check, Tag as TagIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface TagSelectorMenuProps {
    isOpen: boolean;
    onClose: () => void;
    availableTags: Tag[];
    selectedTagIds: string[];
    onToggleTag: (tagId: string) => void;
}

export const TagSelectorMenu = ({
    isOpen,
    onClose,
    availableTags,
    selectedTagIds,
    onToggleTag,
}: TagSelectorMenuProps) => {
    if (!isOpen) return null;

    return (
        <>
            <div
                className="fixed inset-0 z-[60]"
                onClick={onClose}
            />

            <div className="absolute bottom-20 left-4 right-4 sm:top-1/2 sm:left-1/2 sm:bottom-auto sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-80 bg-white rounded-2xl shadow-xl/20 p-4 z-[70] animate-in fade-in zoom-in-95 duration-200">

                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-primary-text">タグ</h3>

                    <button
                        onClick={onClose}
                        className="bg-primary hover:bg-primary/70 text-white rounded-full p-2 transition-colors"
                    >
                        <Check size={20} strokeWidth={3} />
                    </button>
                </div>

                <div className="flex flex-col space-y-2 max-h-60 overflow-y-auto">
                    {availableTags.map((tag) => {
                        const isSelected = selectedTagIds.includes(tag.id);

                        return (
                            <button
                                key={tag.id}
                                onClick={() => onToggleTag(tag.id)}
                                className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors text-left"
                            >
                                <div className="flex items-center gap-3">
                                    <TagIcon
                                        className={twMerge("w-5 h-5", "text-gray-400")}
                                        style={{ color: tag.color }}
                                        strokeWidth={2}
                                    />
                                    <span className="font-medium text-on-primary-text">{tag.name}</span>
                                </div>

                                {isSelected && (
                                    <Check className="text-gray-800" size={20} strokeWidth={2} />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>
        </>
    );
}