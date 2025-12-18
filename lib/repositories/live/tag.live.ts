import { Tag } from "@/types/tag";
import { ITagRepository } from "../interfaces/tag.interface";
import { CreateTagDTO } from "@/types/server/create-tag-dto";
import { UpdateTagDTO } from "@/types/server/update-tag-dto";
import { convertTagsFromDTO } from "@/lib/converters/tag.converter";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const tagLiveRepository: ITagRepository = {
  getAll: async (): Promise<Tag[]> => {
    const res = await fetch(`${API_BASE_URL}/api/tags`);
    if (!res.ok) throw new Error("Fetch failed");
    const dtos = await res.json();
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
