export { convertMemoFromDTO, convertMemosFromDTO } from "./memo.converter";

import memosData from "@/public/data/memos.json";
import aiSummaryData from "@/public/data/ai-summaries.json";
import { SummaryDTO } from "@/types/server/summary-dto";
import { Entry } from "@/types/entry";
import { convertSummariesFromDTO } from "./summary.converter";
import { convertMemosFromDTO } from "./memo.converter";

/**
 * モックデータからクライアントデータモデルに変換して返す
 */

export function getMockMemos(): Entry[] {
  const dtos = memosData.memos;
  return convertMemosFromDTO(dtos);
}

export function getMockSummaries(): Entry[] {
  const dtos: SummaryDTO[] = aiSummaryData.aiSummaries;
  return convertSummariesFromDTO(dtos);
}
