import { SummaryEntry } from "@/types/entry";
import {
  ISummaryRepository,
  SummarizeRequestDTO,
} from "../interfaces/summary.interface";
import { JournalingSettings } from "@/types/journaling-setting";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const summaryLiveRepository: ISummaryRepository = {
  generate: async (data: SummarizeRequestDTO): Promise<SummaryEntry> => {
    const res = await fetch(`${API_BASE_URL}/summarize`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(
        errorData.message || `要約の生成に失敗しました (${res.status})`
      );
    }

    const dto = await res.json();
    return dto.summary;
  },

  getSummaries: async (): Promise<SummaryEntry[]> => {
    const res = await fetch(`${API_BASE_URL}/summarize`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(
        errorData.message || `要約の取得に失敗しました (${res.status})`
      );
    }

    const dto = await res.json();
    return dto.summary;
  },

  getById: async (id: string): Promise<SummaryEntry | undefined> => {
    const res = await fetch(`${API_BASE_URL}/sum/${id}`);
    if (!res.ok) {
      if (res.status === 404) return undefined;
      const errorData = await res.json().catch(() => ({}));
      throw new Error(
        errorData.message || `要約の取得に失敗しました (${res.status})`
      );
    }
    const dto = await res.json();
    return dto.summary;
  },

  getJournalingSummarySetting: async (): Promise<JournalingSettings> => {
    const res = await fetch(`${API_BASE_URL}/sum/journaling/settings`);
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(
        errorData.message ||
          `ジャーナリング設定の取得に失敗しました (${res.status})`
      );
    }
    const dto = await res.json();
    return dto.settings;
  },

  updateJournalingSummarySetting: async (
    data: JournalingSettings
  ): Promise<JournalingSettings> => {
    const res = await fetch(`${API_BASE_URL}/sum/journaling/settings`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(
        errorData.message ||
          `ジャーナリング設定の更新に失敗しました (${res.status})`
      );
    }

    const dto = await res.json();
    return dto.settings;
  },

  updateJournalingSettings: async (
    settings: Partial<JournalingSettings>
  ): Promise<void> => {
    const res = await fetch(`${API_BASE_URL}/sum/journaling/settings`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
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
