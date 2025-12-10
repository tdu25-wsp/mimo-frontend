export interface UISlice {
    isEntrySelectionMode: boolean;

    setEntrySelectionMode: (isSelectionMode: boolean) => void;
}

export const createUISlice = (set: any): UISlice => ({
    isEntrySelectionMode: false,

    setEntrySelectionMode: (isEntrySelectionMode: boolean) => set({ isEntrySelectionMode }),
});