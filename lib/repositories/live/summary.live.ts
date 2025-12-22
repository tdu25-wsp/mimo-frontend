import { SummaryEntry } from "@/types/entry";
import {
  ISummaryRepository,
  SummarizeRequestDTO,
} from "../interfaces/summary.interface";
import { JournalingSettings } from "@/types/journaling-setting";
import { PROXY_API_BASE_URL } from "@/lib/constants";
import { convertSummaryFromDTO, convertSummariesFromDTO } from "@/lib/converters/summary.converter";
import { SummaryDTO } from "@/types/server/summary-dto";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const summaryLiveRepository: ISummaryRepository = {
  generate: async (data: SummarizeRequestDTO): Promise<SummaryEntry> => {
    const res = await fetch(`${PROXY_API_BASE_URL}/sum/summarize`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(
        errorData.message || `要約の生成に失敗しました (${res.status})`
      );
    }

    const dto = await res.json();
    return convertSummaryFromDTO(dto) as SummaryEntry;
  },

  getSummaries: async (userId: string): Promise<SummaryEntry[]> => {
    // GET /api/sum/list/:userId へのリクエスト
    const res = await fetch(`${PROXY_API_BASE_URL}/sum/list/${userId}`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(
        errorData.message || `要約の取得に失敗しました (${res.status})`
      );
    }

    const dto = await res.json();
    const dtos: SummaryDTO[] = dto.summaries || dto;
    return convertSummariesFromDTO(dtos) as SummaryEntry[];
  },

  getById: async (id: string): Promise<SummaryEntry | undefined> => {
    const res = await fetch(`${PROXY_API_BASE_URL}/sum/${id}`, {
      credentials: "include",
    });
    if (!res.ok) {
      if (res.status === 404) return undefined;
      const errorData = await res.json().catch(() => ({}));
      throw new Error(
        errorData.message || `要約の取得に失敗しました (${res.status})`
      );
    }
    const dto = await res.json();
    const summaryDto: SummaryDTO = dto.summary || dto;
    return convertSummaryFromDTO(summaryDto) as SummaryEntry;
  },

  getJournalingSummarySetting: async (): Promise<JournalingSettings> => {
    const res = await fetch(`${PROXY_API_BASE_URL}/sum/journaling/settings`, {
      credentials: "include",
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(
        errorData.message ||
          `ジャーナリング設定の取得に失敗しました (${res.status})`
      );
    }
    const dto = await res.json();
    return dto.settings || dto;
  },

  updateJournalingSummarySetting: async (
    data: JournalingSettings
  ): Promise<JournalingSettings> => {
    const res = await fetch(`${PROXY_API_BASE_URL}/sum/journaling/settings`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(
        errorData.message ||
          `ジャーナリング設定の更新に失敗しました (${res.status})`
      );
    }

    const dto = await res.json();
    return dto.settings || dto;
  },

  updateJournalingSettings: async (
    settings: Partial<JournalingSettings>
  ): Promise<void> => {
    const res = await fetch(`${PROXY_API_BASE_URL}/sum/journaling/settings`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
      credentials: "include",
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(
        errorData.message ||
          `ジャーナリング設定の更新に失敗しました (${res.status})`
      );
    }
  },
};
