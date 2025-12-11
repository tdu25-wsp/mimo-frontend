"use client";

import { useState, useEffect, useRef } from "react";
import { useMainStore } from "@/lib/stores/mainStore";
import { MemoEntry } from "@/types/entry";
import ActionLargeButton from "./ActionLargeButton";
import { TagSelector } from "./TagSelector";
import { Tag } from "../ui/Tag";
import { TagSelectorMenu } from "./TagSelectorMenu";

export const EntryEditSheet = () => {
  const isEntrySheetOpen = useMainStore((state) => state.isEntrySheetOpen);
  const editingEntry = useMainStore((state) => state.editingEntry);
  const closeEntrySheet = useMainStore((state) => state.closeEntrySheet);

  const addEntry = useMainStore((state) => state.addEntry);
  const updateEntry = useMainStore((state) => state.updateEntry);

  const tags = useMainStore((state) => state.tags);

  const [content, setContent] = useState("");
  const [manualTagIds, setManualTagIds] = useState<string[]>([]);
  const [isTagMenuOpen, setIsTagMenuOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEntrySheetOpen) {
      if (editingEntry) {
        setContent(editingEntry.content);
        setManualTagIds(editingEntry.manualTagIds || []);

        setTimeout(() => {
          if (textareaRef.current) {
            const length = editingEntry.content.length;
            textareaRef.current.focus();
            textareaRef.current.setSelectionRange(length, length);
          }
        }, 0);
      } else {
        setContent("");
        setManualTagIds([]);
      }
      setIsTagMenuOpen(false);
    }
  }, [isEntrySheetOpen, editingEntry]);

  const handleSubmit = async () => {
    if (!content.trim()) return;

    if (editingEntry) {
      const updatedEntry: MemoEntry = {
        ...editingEntry,
        content,
        manualTagIds,
        updatedAt: new Date().toISOString(),
      };
      updateEntry(editingEntry.id, updatedEntry);
      console.log("更新:", updatedEntry);
    } else {
      const newEntry: MemoEntry = {
        id: Date.now().toString(),
        content: content,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        type: "memo",
        shareUrlToken: null,
        autoTagIds: [],
        manualTagIds: manualTagIds,
        userId: "current-user",
      }
      await addEntry(newEntry);
    }
    closeEntrySheet();
  };

  const handleRemoveTag = (tagId: string) => {
    setManualTagIds((prev) => prev.filter((id) => id !== tagId));
  };

  const toggleTag = (tagId: string) => {
    setManualTagIds(prev =>
      prev.includes(tagId)
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };

  if (!isEntrySheetOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center md:items-center bg-black/20 backdrop-blur-xs">

      <div className="relative w-full md:w-[600px] h-[95vh] md:h-auto md:min-h-[500px] bg-background rounded-t-2xl md:rounded-2xl p-4 flex flex-col shadow-2xl animate-in slide-in-from-bottom-10 fade-in duration-200">

        <div className="flex justify-between items-center mb-4">
          <button
            onClick={closeEntrySheet}
            className="text-sm font-bold text-gray-500 hover:text-gray-900"
          >
            キャンセル
          </button>
        </div>

        <textarea
          ref={textareaRef}
          className="flex-1 w-full resize-none outline-none text-base p-2 bg-transparent placeholder:text-gray-300"
          placeholder="メモを入力..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          autoFocus
        />

        <div className="flex gap-2 py-4 overflow-x-auto">
          <TagSelector label="タグ" onAddClick={() => setIsTagMenuOpen(true)}>
            {manualTagIds.map((tagId) => {
              const tag = tags.find((t) => t.id === tagId);
              if (!tag) return null;
              return (
                <Tag
                  key={tag.id}
                  label={tag.name}
                  onRemove={() => handleRemoveTag(tag.id)}
                  style={{ color: tag.color }}
                />
              );
            })}
          </TagSelector>
        </div>

        <ActionLargeButton className="mb-80 md:mb-0" label={editingEntry ? "更新" : "投稿"} onClick={handleSubmit} disabled={!content.trim()} />

        <div className="h-4" />

        <TagSelectorMenu
          isOpen={isTagMenuOpen}
          onClose={() => setIsTagMenuOpen(false)}
          availableTags={tags}
          selectedTagIds={manualTagIds}
          onToggleTag={toggleTag}
        />

      </div>
    </div>
  );
}