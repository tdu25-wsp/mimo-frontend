import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { EntrySlice, createEntrySlice } from "./slices/entry.slice";
import { TagSlice, createTagSlice } from "./slices/tag.slice";
import { UISlice, createUISlice } from "./slices/ui.slice";

type MainStore = EntrySlice & TagSlice & UISlice;

export const useMainStore = create<MainStore>()(
  devtools(
    persist(
      (set, get) => ({
        ...createEntrySlice(set, get),
        ...createTagSlice(set),
        ...createUISlice(set),
      }),
      {
        name: "mimo-storage",
        partialize: (state: any) => ({
          entries: state.entries,
          tags: state.tags,
        }),
      }
    )
  )
);
