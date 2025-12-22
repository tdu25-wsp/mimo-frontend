import { authRepository } from "@/lib/repositories";
import { tagRepository } from "@/lib/repositories";
import { CreateTagDTO } from "@/types/server/create-tag-dto";
import { UpdateTagDTO } from "@/types/server/update-tag-dto";
import { Tag } from "@/types/tag";
import { toast } from "sonner";

export interface TagSlice {
  tags: Tag[];

  setTags: (tags: Tag[]) => void;
  fetchTags: () => Promise<void>;
  createTag: (name: string, colorCode: string) => Promise<void>;
  updateTag: (tagId: string, name: string, colorCode: string) => Promise<void>;
  deleteTag: (id: string) => void;
}

export const createTagSlice = (set: any, get: any): TagSlice => ({
  tags: [],

  setTags: (tags) => set({ tags }),

  fetchTags: async () => {
    try {
      // set({ isLoading: true, error: null });
      const user = get().user;
      
      if (!user) {
        set({ tags: [] });
        return;
      }

      const tags = await tagRepository.getAll(user.id);
      set({ tags });
    } catch (error) {
      toast.error("タグの取得に失敗しました。もう一度お試しください。");
      console.error("Failed to fetch tags", error);
    }
  },

  createTag: async (name: string, colorCode: string) => {
    try {
      set({ isLoading: true, error: null });

      const user = get().user;

      const createTagDTO: CreateTagDTO = {
        name: name,
        color_code: colorCode,
      };

      const created = await tagRepository.create(user.id, createTagDTO);

      set((state: any) => ({
        tags: [...state.tags, created],
        isLoading: false,
      }));
    } catch (error) {
      toast.error("作成に失敗しました。もう一度お試しください。");
      set({
        error: error instanceof Error ? error.message : "作成に失敗しました",
        isLoading: false,
      });
      throw error;
    }
  },

  updateTag: async (tagId: string, name: string, colorCode) => {
    try {
      set({ isLoading: true, error: null });

      const user = await authRepository.getCurrentUser();

      const updateTagDTO: UpdateTagDTO = {
        userId: user.id,
        tagId: tagId,
        name: name,
        colorCode: colorCode,
      };

      const updated = await tagRepository.update(updateTagDTO);

      set((state: any) => ({
        tags: state.tags.map((e: Tag) =>
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

  deleteTag: (id) =>
    set((state: any) => ({
      tags: state.tags.filter((t: Tag) => t.id !== id),
    })),
});
