import { MemoEntry } from "@/types/entry";
import { Tag } from "@/types/tag";

export type DeleteTarget = 
  | { type: 'entry'; id: string; onSuccess?: () => void} 
  | { type: 'entries'; ids: string[]; onSuccess?: () => void }
  | { type: 'tag'; id: string; name: string; onSuccess?: () => void }
  | null;

export interface UISlice {
    isEntrySelectionMode: boolean;
    isEntrySheetOpen: boolean;
    editingEntry: MemoEntry | null;
    
    isTagSheetOpen: boolean;
    editingTag: Tag | null;

    deleteTarget: DeleteTarget;

    setEntrySelectionMode: (isSelectionMode: boolean) => void;
    openCreateSheet: () => void;
    openEditSheet: (entry: MemoEntry) => void;
    closeEntrySheet: () => void;

    openTagAddSheet: () => void;
    openTagEditSheet: (tag: Tag) => void;
    closeTagAddSheet: () => void;

    openDeleteDialog: (target: DeleteTarget) => void;
    closeDeleteDialog: () => void;
}

export const createUISlice = (set: any): UISlice => ({
    isEntrySelectionMode: false,
    isEntrySheetOpen: false,
    editingEntry: null,
    
    isTagSheetOpen: false,
    editingTag: null,

    deleteTarget: null,

    setEntrySelectionMode: (isEntrySelectionMode: boolean) => set({ isEntrySelectionMode }),
    openCreateSheet: () => set({ isEntrySheetOpen: true, editingEntry: null }),
    openEditSheet: (entry: MemoEntry) => set({ isEntrySheetOpen: true, editingEntry: entry }),
    closeEntrySheet: () => set({ isEntrySheetOpen: false, editingEntry: null }),
    
    openTagAddSheet: () => set({ isTagSheetOpen: true, editingTag: null }),
    openTagEditSheet: (tag: Tag) => set({ isTagSheetOpen: true, editingTag: tag }),
    closeTagAddSheet: () => set({ isTagSheetOpen: false, editingTag: null }),

    openDeleteDialog: (target: DeleteTarget) => set({ deleteTarget: target }),
    closeDeleteDialog: () => set({ deleteTarget: null }),
    
});