import { SummaryEntry } from "@/types/entry";
import { JournalingSettings } from "@/types/journaling-setting";

export interface SummarizeRequestDTO {
  memoIds?: string[]; // 選択したメモから生成
  tagId?: string; // タグに関連するメモから生成
}

export interface ISummaryRepository {
  /**
   * メモ要約 (POST /api/sum/summarize)
   * 即時生成して結果を返す
   */
  generate(data: SummarizeRequestDTO): Promise<SummaryEntry>;

  /**
   * 要約・ジャーナリング要約取得 (GET /api/sum)
   */
  getSummaries(): Promise<SummaryEntry[]>;

  /**
   * 要約・ジャーナリング要約取得 (GET /api/sum)
   */
  getById(id: string): Promise<SummaryEntry | undefined>;

  /**
   * ジャーナリング設定取得 (GET /api/sum/journaling-freq)
   */
  getJournalingSummarySetting(): Promise<JournalingSettings>;

  /**
   * ジャーナリング設定更新 (PATCH /api/sum/settings/journaling)
   */
  updateJournalingSettings(
    settings: Partial<JournalingSettings>
  ): Promise<void>;

  /**
   * ジャーナリング設定更新 (PATCH /api/sum/journaling/settings)
   */
  updateJournalingSummarySetting(
    data: JournalingSettings
  ): Promise<JournalingSettings>;
}
