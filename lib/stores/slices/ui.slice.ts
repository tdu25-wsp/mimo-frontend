import { MemoEntry } from "@/types/entry";
import { Tag } from "@/types/tag";

export interface UISlice {
    isEntrySelectionMode: boolean;
    isEntrySheetOpen: boolean;
    editingEntry: MemoEntry | null;
    
    isTagSheetOpen: boolean;
    editingTag: Tag | null;

    setEntrySelectionMode: (isSelectionMode: boolean) => void;
    openCreateSheet: () => void;
    openEditSheet: (entry: MemoEntry) => void;
    closeEntrySheet: () => void;

    openTagAddSheet: () => void;
    openTagEditSheet: (tag: Tag) => void;
    closeTagAddSheet: () => void;
}

export const createUISlice = (set: any): UISlice => ({
    isEntrySelectionMode: false,
    isEntrySheetOpen: false,
    editingEntry: null,
    
    isTagSheetOpen: false,
    editingTag: null,

    setEntrySelectionMode: (isEntrySelectionMode: boolean) => set({ isEntrySelectionMode }),
    openCreateSheet: () => set({ isEntrySheetOpen: true, editingEntry: null }),
    openEditSheet: (entry: MemoEntry) => set({ isEntrySheetOpen: true, editingEntry: entry }),
    closeEntrySheet: () => set({ isEntrySheetOpen: false, editingEntry: null }),
    
    openTagAddSheet: () => set({ isTagSheetOpen: true, editingTag: null }),
    openTagEditSheet: (tag: Tag) => set({ isTagSheetOpen: true, editingTag: tag }),
    closeTagAddSheet: () => set({ isTagSheetOpen: false, editingTag: null }),
});