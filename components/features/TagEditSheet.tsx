"use client";

import { useState, useEffect } from "react";
import { useMainStore } from "@/lib/stores/mainStore";
import { Input } from "@/components/ui/Input";
import ActionLargeButton from "./ActionLargeButton";

const COLOR_PRESETS = [
    '#EF4444', '#F97316', '#EAB308', '#22C55E', '#06B6D4',
    '#3B82F6', '#A855F7', '#EC4899', '#64748B',
];

export const TagEditSheet = () => {
    const isOpen = useMainStore((state) => state.isTagSheetOpen);
    const closeSheet = useMainStore((state) => state.closeTagAddSheet);

    // 編集対象のタグを取得
    const editingTag = useMainStore((state) => state.editingTag);

    const createTag = useMainStore((state) => state.createTag);
    const updateTag = useMainStore((state) => state.updateTag);

    const [tagName, setTagName] = useState("");
    const [tagColor, setTagColor] = useState(COLOR_PRESETS[0]);

    // シートが開いた時の初期化処理
    useEffect(() => {
        if (isOpen) {
            if (editingTag) {
                // 編集モード: 既存のデータをセット
                setTagName(editingTag.name);
                setTagColor(editingTag.color || COLOR_PRESETS[0]);
            } else {
                // 新規モード: リセット
                setTagName("");
                setTagColor(COLOR_PRESETS[0]);
            }
        }
    }, [isOpen, editingTag]);

    const handleSubmit = async () => {
        if (!tagName.trim()) return;

        if (editingTag) {
            updateTag(editingTag.id, tagName, tagColor);
        } else {
            createTag(tagName, tagColor);
        }

        closeSheet();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center md:items-center bg-black/20 backdrop-blur-xs">
            <div className="relative w-full md:w-[600px] bg-background rounded-t-2xl md:rounded-2xl p-6 flex flex-col shadow-2xl animate-in slide-in-from-bottom-10 fade-in duration-200 md:max-h-[90vh] overflow-y-auto">

                <div className="flex justify-between items-center mb-6">
                    {/* タイトルをモードによって切り替え */}
                    <h2 className="text-xl font-bold text-primary-text">
                        {editingTag ? "タグを編集" : "新しいタグを追加"}
                    </h2>
                    <button
                        onClick={closeSheet}
                        className="text-sm font-bold text-muted-text hover:text-primary-text transition-colors"
                    >
                        キャンセル
                    </button>
                </div>

                <div className="grid gap-6 mb-8">
                    <div className="grid gap-2">
                        <label htmlFor="tag-name" className="text-sm font-bold text-primary-text">
                            名前
                        </label>
                        <Input
                            id="tag-name"
                            value={tagName}
                            onChange={(e) => setTagName(e.target.value)}
                            placeholder="タグ名を入力..."
                            className="text-primary-text bg-secondary-background border-border focus:border-primary focus:ring-primary"
                            autoFocus
                        />
                    </div>

                    <div className="grid gap-2">
                        <span className="text-sm font-bold text-primary-text">
                            カラー
                        </span>
                        <div className="flex flex-wrap gap-3">
                            {COLOR_PRESETS.map((color) => (
                                <button
                                    key={color}
                                    type="button"
                                    onClick={() => setTagColor(color)}
                                    className={`w-10 h-10 rounded-full border-2 transition-all ${tagColor === color
                                        ? 'border-primary scale-110 ring-2 ring-offset-2 ring-primary/30'
                                        : 'border-transparent hover:scale-105'
                                        }`}
                                    style={{ backgroundColor: color }}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <ActionLargeButton
                    label={editingTag ? "更新" : "作成"}
                    onClick={handleSubmit}
                    disabled={!tagName.trim()}
                />
                <div className="h-4 md:hidden" />
            </div>
        </div>
    );
};