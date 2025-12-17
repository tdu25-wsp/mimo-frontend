import { convertMemoFromDTO, convertMemosFromDTO } from "@/lib/converters";
import {
  IMemoRepository,
} from "../interfaces/memo.interface";
import { CreateMemoDTO } from "@/types/server/create-memo-dto";
import { UpdateMemoDTO } from "@/types/server/update-memo-dto";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const memoLiveRepository: IMemoRepository = {
  getAll: async () => {
    // API_BASE_URL を使って fetch する
    const res = await fetch(`${API_BASE_URL}/memos`);
    if (!res.ok) throw new Error("Fetch failed");
    const dtos = await res.json();
    return convertMemosFromDTO(dtos);
  },

  getById: async (id: string) => {
    const res = await fetch(`${API_BASE_URL}/memos/${id}`);
    if (!res.ok) throw new Error("Fetch failed");
    const dto = await res.json();
    return convertMemoFromDTO(dto);
  },

  getByIds: async (ids: string[]) => {
    if (ids.length === 0) return [];

    const queryParams = ids.map((id) => `ids=${id}`).join("&");
    const res = await fetch(`${API_BASE_URL}/memos?${queryParams}`);

    if (!res.ok) {
      if (res.status === 404) return undefined;
      throw new Error("Fetch failed");
    }

    const dtos = await res.json();
    return convertMemosFromDTO(dtos);
  },

  create: async (data: CreateMemoDTO) => {
    const res = await fetch(`${API_BASE_URL}/memos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await res.json();
  },

  update: async (data: UpdateMemoDTO) => {
    const res = await fetch(`${API_BASE_URL}/memos/${data.memoId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await res.json();
  },

  deleteMany: async (ids: string[]) => {
    await fetch(`${API_BASE_URL}/memos/${ids}`, {
      method: "DELETE",
    });
  },

  exportData: async (format: "txt") => {
    const res = await fetch(`${API_BASE_URL}/memos/export?format=${format}`);
    if (!res.ok) throw new Error("Fetch failed");
    return await res.text();
  },

  share: async (id: string) => {
    const res = await fetch(`${API_BASE_URL}/memos/${id}/share`, {
      method: "POST",
    });
    if (!res.ok) throw new Error("Fetch failed");
    return await res.json();
  },

  unshare: async (id: string) => {
    await fetch(`${API_BASE_URL}/memos/${id}/share`, {
      method: "DELETE",
    });
  },
};
