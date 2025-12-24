import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { EntrySlice, createEntrySlice } from "./slices/entry.slice";
import { TagSlice, createTagSlice } from "./slices/tag.slice";
import { UISlice, createUISlice } from "./slices/ui.slice";
import { AuthSlice, createAuthSlice } from "./slices/auth.slice";
import { UserSlice, createUserSlice } from "./slices/user.slice";

type MainStore = EntrySlice & TagSlice & UISlice & AuthSlice & UserSlice;

export const useMainStore = create<MainStore>()(
  devtools(
    persist(
      (set, get) => ({
        ...createEntrySlice(set, get),
        ...createTagSlice(set, get),
        ...createUISlice(set),
        ...createAuthSlice(set, get),
        ...createUserSlice(set, get),
      }),
      {
        name: "mimo-storage",
        partialize: (state: any) => ({
          entries: state.entries,
          tags: state.tags,
          user: state.user,
        }),
      }
    )
  )
);
