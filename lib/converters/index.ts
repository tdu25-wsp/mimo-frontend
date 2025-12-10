export { convertMemoFromDTO, convertMemosFromDTO } from "./memo.converter";

import memosData from "@/public/data/memos.json";
import aiSummaryData from "@/public/data/ai-summaries.json";
import tagsData from "@/public/data/tags.json";
import { MemoDTO } from "@/types/server/memo-dto";
import { SummaryDTO } from "@/types/server/summary-dto";
import { TagDTO } from "@/types/server/tag-dto";
import { Entry } from "@/types/entry";
import { Tag } from "@/types/tag";
import { convertMemosFromDTO } from "./memo.converter";
import { convertSummariesFromDTO } from "./summary.converter";
import { convertTagsFromDTO } from "./tag.converter";

/**
 * モックデータからクライアントデータモデルに変換して返す
 */

export const getMockMemos = (): Entry[] => {
  const dtos: MemoDTO[] = memosData.memos;
  return convertMemosFromDTO(dtos);
}

export const getMockSummaries = (): Entry[] => {
  const dtos: SummaryDTO[] = aiSummaryData.aiSummaries;
  return convertSummariesFromDTO(dtos);
}

export const getMockTags = (): Tag[] => {
  const dtos: TagDTO[] = tagsData.tags;
  return convertTagsFromDTO(dtos);
}