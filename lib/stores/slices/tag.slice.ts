import { Tag } from "@/types/tag";

export interface TagSlice {
  tags: Tag[];

  setTags: (tags: Tag[]) => void;
  addTag: (tag: Tag) => void;
  updateTag: (id: string, tag: Partial<Tag>) => void;
  deleteTag: (id: string) => void;
}

export const createTagSlice = (set: any): TagSlice => ({
  tags: [],

  setTags: (tags) => set({ tags }),

  addTag: (tag) =>
    set((state: any) => ({
      tags: [...state.tags, tag],
    })),

  updateTag: (id, updates) =>
    set((state: any) => ({
      tags: state.tags.map((t: Tag) => (t.id === id ? { ...t, ...updates } : t)),
    })),

  deleteTag: (id) =>
    set((state: any) => ({
      tags: state.tags.filter((t: Tag) => t.id !== id),
    })),
});