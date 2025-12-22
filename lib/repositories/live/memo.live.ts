import { convertMemoFromDTO, convertMemosFromDTO } from "@/lib/converters";
import { IMemoRepository } from "../interfaces/memo.interface";
import { CreateMemoDTO } from "@/types/server/create-memo-dto";
import { UpdateMemoDTO } from "@/types/server/update-memo-dto";
import { PROXY_API_BASE_URL } from "@/lib/constants";
import { MemoDTO } from "@/types/server/memo-dto";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const memoLiveRepository: IMemoRepository = {
  getAll: async (userId: string) => {
    const res = await fetch(`${PROXY_API_BASE_URL}/memos/list/${userId}`, {
      credentials: "include",
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(
        errorData.message || `メモの取得に失敗しました (${res.status})`
      );
    }
    const dto = await res.json();
    const dtos: MemoDTO[] = dto.memos;
    return convertMemosFromDTO(dtos);
  },

  getById: async (id: string) => {
    const res = await fetch(`${PROXY_API_BASE_URL}/memos/${id}`);

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(
        errorData.message || `メモの取得に失敗しました (${res.status})`
      );
    }

    const dtos = await res.json();
    return convertMemoFromDTO(dtos);
  },

  getByIds: async (ids: string[]) => {
    if (ids.length === 0) return [];

    try {
      const memoPromises = ids.map(async (id) => {
        const res = await fetch(`${API_BASE_URL}/memos/${id}`);

        if (!res.ok) {
          if (res.status === 404) {
            return undefined;
          }
          throw new Error(`メモ ${id} の取得に失敗しました (${res.status})`);
        }

        const dto = await res.json();
        return convertMemoFromDTO(dto);
      });

      const results = await Promise.all(memoPromises);

      return results.filter((memo) => memo !== undefined);
    } catch (error) {
      console.error("getByIds error:", error);
      throw error;
    }
  },

  create: async (data: CreateMemoDTO) => {
    const res = await fetch(`${PROXY_API_BASE_URL}/memos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(
        errorData.message || `メモの作成に失敗しました (${res.status})`
      );
    }

    const dto = await res.json();
    return convertMemoFromDTO(dto);
  },

  update: async (data: UpdateMemoDTO) => {
    const res = await fetch(`${PROXY_API_BASE_URL}/memos/${data.memo_id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(
        errorData.message || `メモの更新に失敗しました (${res.status})`
      );
    }

    const dto = await res.json();
    return convertMemoFromDTO(dto);
  },

  deleteMany: async (ids: string[]) => {
    ids.forEach(async (id) => {
      const res = await fetch(`${PROXY_API_BASE_URL}/memos/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          errorData.message || `メモの削除に失敗しました (${res.status})`
        );
      }
    });
  },

  exportData: async (ids: string[]) => {
    // 1. タグ一覧の取得
    const tagsPromise = fetch(`${API_BASE_URL}/tags`).then(async (res) => {
      if (!res.ok) throw new Error("Failed to fetch tags");
      return await res.json();
    });

    // 2. 選択されたメモ詳細の取得 (並列実行)
    const memosPromise = Promise.all(
      ids.map(async (id) => {
        const res = await fetch(`${API_BASE_URL}/memos/${id}`);
        if (!res.ok) throw new Error(`Failed to fetch memo ${id}`);
        return await res.json();
      })
    );

    // 3. 両方の完了を待つ
    const [tags, memos] = await Promise.all([tagsPromise, memosPromise]);

    // 4. マッピングせずにそのまま返す
    return {
      tags,
      memos,
    };
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
