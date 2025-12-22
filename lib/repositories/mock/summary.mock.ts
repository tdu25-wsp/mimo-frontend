import {
  ISummaryRepository,
  SummarizeRequestDTO,
} from "../interfaces/summary.interface";
import { memoMockRepository } from "./memo.mock";
import { SummaryEntry } from "@/types/entry";
import { getMockSummaries } from "@/lib/converters";
import { JournalingSettings } from "@/types/journaling-setting";

// モックデータをメモリに保持
let mockSummaries: SummaryEntry[] = [];
let mockJournalingSettings: JournalingSettings = {
    daily: true,
    weekly: false,
    monthly: false,
};

// 初期化フラグ
let isInitialized = false;

// モックデータを初期化
const initializeMockData = () => {
  if (!isInitialized) {
    mockSummaries = getMockSummaries() as SummaryEntry[];
    isInitialized = true;
  }
};

export const summaryMockRepository: ISummaryRepository = {
  /**
   * メモ要約生成
   * 選択したメモまたはタグから即時要約を生成
   */
  generate: async (data: SummarizeRequestDTO): Promise<SummaryEntry> => {
    initializeMockData();

    // メモIDsを取得
    let memoIds: string[] = [];
    let tagIds: string[] = [];

    if (data.memo_ids && data.memo_ids.length > 0) {
      memoIds = data.memo_ids;
    }

    if (memoIds.length === 0) {
      throw new Error("No memos found to summarize");
    }

    // 簡易的なAI要約を生成（実際はAI APIを呼ぶ）
    const now = new Date().toISOString();
    const newSummary: SummaryEntry = {
        id: `summary-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        userId: "mock-user-id",
        type: "summary",
        content: `# 生成された要約\n\nこれは${memoIds.length}件のメモから生成された要約です。\n\n実際のAI要約がここに表示されます。`,
        createdAt: now,
        updatedAt: now,
        memoIds: memoIds,
        tagsIds: tagIds,
        title: "生成された要約",
    }

    mockSummaries.push(newSummary);
    return newSummary;
  },

  /**
   * ジャーナリング要約一覧取得
   * 自動生成された要約のみを取得
   */
  getSummaries: async (userId: string): Promise<SummaryEntry[]> => {
    initializeMockData();
    return mockSummaries.filter((s) => s.userId === userId);
  },

  /**
   * idから要約・ジャーナリング要約取得
   */
  getById: async (id: string): Promise<SummaryEntry> => {
    initializeMockData();
    const summary = mockSummaries.find((s) => s.id === id);
    if (!summary) {
      throw new Error(`Summary with id ${id} not found`);
    }
    return summary;
  },

  delete: async (id: string): Promise<void> => {
    initializeMockData();
    const index = mockSummaries.findIndex((s) => s.id === id);
    if (index === -1) {
      throw new Error(`Summary with id ${id} not found`);
    }
    mockSummaries.splice(index, 1);
  },

  /**
   * ジャーナリング設定取得
   */
  getJournalingSummarySetting: async (): Promise<JournalingSettings> => {
    initializeMockData();
    return { ...mockJournalingSettings };
  },

  /**
   * ジャーナリング設定更新
   */
  updateJournalingSettings: async (
    settings: Partial<JournalingSettings>
  ): Promise<void> => {
    initializeMockData();
    mockJournalingSettings = {
      ...mockJournalingSettings,
    };
  },

  /**
   * ジャーナリング設定更新（新API）
   */
  updateJournalingSummarySetting: async (
    data: JournalingSettings
  ): Promise<JournalingSettings> => {
    initializeMockData();
    mockJournalingSettings = { ...data };
    return { ...mockJournalingSettings };
  },
};
