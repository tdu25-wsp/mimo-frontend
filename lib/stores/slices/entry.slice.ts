import { authRepository } from "@/lib/repositories";
import { memoRepository } from "@/lib/repositories";
import { Entry } from "@/types/entry";
import { CreateMemoDTO } from "@/types/server/create-memo-dto";
import { UpdateMemoDTO } from "@/types/server/update-memo-dto";
import { toast } from "sonner";

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
  createMemo: (content: string, manualTagIds: string[]) => Promise<void>;
  updateMemo: (memoId: string, content: string, manualTagIds: string[]) => Promise<void>;
  deleteEntries: (ids: string[]) => Promise<void>;
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

  createMemo: async (content: string, manualTagIds: string[]) => {
    try {
      set({ isLoading: true, error: null });

      const userId = await authRepository.getCurrentUser();

      const createMemoDTO: CreateMemoDTO = {
        user_id: userId,
        content: content,
        tag_id: manualTagIds,
      };

      const created = await memoRepository.create(createMemoDTO);

      set((state: any) => ({
        entries: [...state.entries, created],
        isLoading: false,
      }));
    } catch (error) {
      toast.error("保存に失敗しました。もう一度お試しください。");
      set({
        error: error instanceof Error ? error.message : "作成に失敗しました",
        isLoading: false,
      });
      throw error;
    }
  },

  updateMemo: async (memoId: string, content: string, manualTagIds: string[]) => {
    try {
      set({ isLoading: true, error: null });

      // const userId = await authRepository.getCurrentUser();

      const updateMemoDTO: UpdateMemoDTO = {
        memo_id: memoId,
        content: content,
        tag_id: manualTagIds,
      };

      const updated = await memoRepository.update(updateMemoDTO);

      set((state: any) => ({
        entries: state.entries.map((e: Entry) =>
          e.id === updated.id ? { ...e, ...updated } : e
        ),
        isLoading: false,
      }));
    } catch (error) {
      toast.error("更新に失敗しました。もう一度お試しください。");
      set({
        error: error instanceof Error ? error.message : "更新に失敗しました",
        isLoading: false,
      });
      throw error;
    }
  },

  deleteEntries: async (ids: string[]) => {
    try {
      set({ isLoading: true, error: null });

      await memoRepository.deleteMany(ids);

      set((state: any) => ({
        entries: state.entries.filter((e: Entry) => !ids.includes(e.id)),
        selectedEntryIds: state.selectedEntryIds.filter(
          (eid: string) => !ids.includes(eid)
        ),
        isLoading: false,
      }));
    } catch (error) {
      toast.error("削除に失敗しました。もう一度お試しください。");
      set({
        error: error instanceof Error ? error.message : "削除に失敗しました",
        isLoading: false,
      });
      throw error;
    }
  },

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
  getMemos: () => get().entries.filter((e: Entry) => e.type === "memo"),

  getSummaries: () => get().entries.filter((e: Entry) => e.type === "summary"),

  getJournalings: () =>
    get().entries.filter((e: Entry) => e.type === "journaling"),

  getEntriesByTag: (tagId: string) =>
    get().entries.filter((e: Entry) => {
      if (e.type === "memo") {
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
