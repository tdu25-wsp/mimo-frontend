import { Tag } from "@/types/tag";
import { ITagRepository } from "../interfaces/tag.interface";
import { CreateTagDTO } from "@/types/server/create-tag-dto";
import { UpdateTagDTO } from "@/types/server/update-tag-dto";
import { convertTagsFromDTO, convertTagFromDTO } from "@/lib/converters/tag.converter";
import { TagDTO } from "@/types/server/tag-dto";
import { PROXY_API_BASE_URL } from "@/lib/constants";
import { toast } from "sonner";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const tagLiveRepository: ITagRepository = {
  getAll: async (userId: string): Promise<Tag[]> => {
    const res = await fetch(`${PROXY_API_BASE_URL}tags/${userId}`, {
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

  create: async (userId: string, data: CreateTagDTO): Promise<Tag> => {
    const res = await fetch(`${PROXY_API_BASE_URL}tags/${userId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });
    if (!res.ok) {
      toast.error("タグの作成に失敗しました");
      const errorData = await res.json().catch(() => ({}));
      throw new Error(
        errorData.message || `タグの作成に失敗しました (${res.status})`
      );
    }
    const dto = await res.json();
    return convertTagFromDTO(dto);
  },

  update: async (tagId: string, data: UpdateTagDTO): Promise<Tag> => {
    const res = await fetch(`${PROXY_API_BASE_URL}tags/${tagId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });
    if (!res.ok) {
      toast.error("タグの更新に失敗しました");
      const errorData = await res.json().catch(() => ({}));
      throw new Error(
        errorData.message || `タグの更新に失敗しました (${res.status})`
      );
    }
    const dto = await res.json();
    return convertTagFromDTO(dto);
  },

  delete: async (tagId: string): Promise<void> => {
    const res = await fetch(`${PROXY_API_BASE_URL}tags/${tagId}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!res.ok) {
      toast.error("タグの削除に失敗しました");
      const errorData = await res.json().catch(() => ({}));
      throw new Error(
        errorData.message || `タグの削除に失敗しました (${res.status})`
      );
    }
  },
};
