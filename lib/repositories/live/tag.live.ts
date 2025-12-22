import { Tag } from "@/types/tag";
import { ITagRepository } from "../interfaces/tag.interface";
import { CreateTagDTO } from "@/types/server/create-tag-dto";
import { UpdateTagDTO } from "@/types/server/update-tag-dto";
import { convertTagsFromDTO } from "@/lib/converters/tag.converter";
import { TagDTO } from "@/types/server/tag-dto";
import { PROXY_API_BASE_URL } from "@/lib/constants";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const tagLiveRepository: ITagRepository = {
  getAll: async (userId: string): Promise<Tag[]> => {
    const res = await fetch(`${PROXY_API_BASE_URL}/tags/${userId}`, {
      credentials: "include",
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(
        errorData.message || `タグの取得に失敗しました (${res.status})`
      );
    }
    const dto = await res.json();
    const dtos: TagDTO[] = dto.tags;
    return convertTagsFromDTO(dtos);
  },

  create: async (data: CreateTagDTO): Promise<Tag> => {
    const res = await fetch(`${API_BASE_URL}/api/tags`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await res.json();
  },

  update: async (data: UpdateTagDTO): Promise<Tag> => {
    const res = await fetch(`${API_BASE_URL}/api/tags/${data.tagId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await res.json();
  },

  delete: async (id: string): Promise<void> => {
    // Implement the logic to delete a tag from the live data source
    throw new Error("Not implemented");
  },
};
