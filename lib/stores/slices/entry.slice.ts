import { Entry } from "@/types/entry";

export interface EntrySlice {
  // State
  entries: Entry[];
  selectedEntryIds: string[];
  isLoading: boolean;
  error: string | null;

  // Actions
  setEntries: (entries: Entry[]) => void;
  addEntry: (entry: Entry) => void;
  updateEntry: (id: string, entry: Partial<Entry>) => void;
  deleteEntries: (ids: string[]) => void;
  toggleEntrySelection: (id: string) => void;
  clearEntrySelection: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // Selectors (派生状態)
  getMemos: () => Entry[];
  getSummaries: () => Entry[];
  getJournalings: () => Entry[];
  getEntriesByTag: (tagId: string) => Entry[];
  getSelectedEntries: () => Entry[];
}

export const createEntrySlice = (set: any, get: any): EntrySlice => ({
  // State
  entries: [],
  selectedEntryIds: [],
  isLoading: false,
  error: null,

  // Actions
  setEntries: (entries) => set({ entries }),

  addEntry: (entry) =>
    set((state: any) => ({
      entries: [...state.entries, entry],
    })),

  updateEntry: (id, updates) =>
    set((state: any) => ({
      entries: state.entries.map((e: Entry) =>
        e.id === id ? { ...e, ...updates } : e
      ),
    })),

  deleteEntries: (ids) =>
    set((state: any) => ({
      entries: state.entries.filter((e: Entry) => !ids.includes(e.id)),
      selectedEntryIds: state.selectedEntryIds.filter((eid: string) => !ids.includes(eid)),
    })),

  toggleEntrySelection: (id) =>
    set((state: any) => ({
      selectedEntryIds: state.selectedEntryIds.includes(id)
        ? state.selectedEntryIds.filter((eid: string) => eid !== id)
        : [...state.selectedEntryIds, id],
    })),

  clearEntrySelection: () => set({ selectedEntryIds: [] }),

  setLoading: (loading) => set({ isLoading: loading }),

  setError: (error) => set({ error }),

  // Selectors (派生状態)
  getMemos: () => get().entries.filter((e: Entry) => e.type === 'memo'),

  getSummaries: () => get().entries.filter((e: Entry) => e.type === 'summary'),

  getJournalings: () => get().entries.filter((e: Entry) => e.type === 'journaling'),

  getEntriesByTag: (tagId: string) =>
    get().entries.filter((e: Entry) => {
      if (e.type === 'memo') {
        return e.autoTagIds.includes(tagId) || e.manualTagIds.includes(tagId);
      } else {
        return e.tagsIds?.includes(tagId);
      }
    }),

  getSelectedEntries: () => {
    const state = get();
    return state.entries.filter((e: Entry) =>
      state.selectedEntryIds.includes(e.id)
    );
  },
});