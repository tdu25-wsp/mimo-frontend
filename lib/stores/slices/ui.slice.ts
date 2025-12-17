import { MemoEntry } from "@/types/entry";
import { Tag } from "@/types/tag";

export interface UISlice {
    isEntrySelectionMode: boolean;
    isEntrySheetOpen: boolean;
    editingEntry: MemoEntry | null;
    
    isTagAddModalOpen: boolean;
    editingTag: Tag | null;

    setEntrySelectionMode: (isSelectionMode: boolean) => void;
    openCreateSheet: () => void;
    openEditSheet: (entry: MemoEntry) => void;
    closeEntrySheet: () => void;

    openTagAddModal: () => void;
    openTagEditModal: (tag: Tag) => void;
    closeTagAddModal: () => void;
}

export const createUISlice = (set: any): UISlice => ({
    isEntrySelectionMode: false,
    isEntrySheetOpen: false,
    editingEntry: null,
    
    isTagAddModalOpen: false,
    editingTag: null,

    setEntrySelectionMode: (isEntrySelectionMode: boolean) => set({ isEntrySelectionMode }),
    openCreateSheet: () => set({ isEntrySheetOpen: true, editingEntry: null }),
    openEditSheet: (entry: MemoEntry) => set({ isEntrySheetOpen: true, editingEntry: entry }),
    closeEntrySheet: () => set({ isEntrySheetOpen: false, editingEntry: null }),
    
    openTagAddModal: () => set({ isTagAddModalOpen: true, editingTag: null }),
    openTagEditModal: (tag: Tag) => set({ isTagAddModalOpen: true, editingTag: tag }),
    closeTagAddModal: () => set({ isTagAddModalOpen: false, editingTag: null }),
});