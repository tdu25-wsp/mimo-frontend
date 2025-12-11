import { MemoEntry } from "@/types/entry";

export interface UISlice {
    isEntrySelectionMode: boolean;
    isEntrySheetOpen: boolean;
    editingEntry: MemoEntry | null;

    setEntrySelectionMode: (isSelectionMode: boolean) => void;
    openCreateSheet: () => void;
    openEditSheet: (entry: MemoEntry) => void;
    closeEntrySheet: () => void;
}

export const createUISlice = (set: any): UISlice => ({
    isEntrySelectionMode: false,
    isEntrySheetOpen: false,
    editingEntry: null,

    setEntrySelectionMode: (isEntrySelectionMode: boolean) => set({ isEntrySelectionMode }),
    openCreateSheet: () => set({ isEntrySheetOpen: true, editingEntry: null }),
    openEditSheet: (entry: MemoEntry) => set({ isEntrySheetOpen: true, editingEntry: entry }),
    closeEntrySheet: () => set({ isEntrySheetOpen: false, editingEntry: null }),
});