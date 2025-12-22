import { Entry } from "@/types/entry";
import { SummaryDTO } from "@/types/server/summary-dto";

// contentからtitleを生成するヘルパー関数
const extractTitleFromContent = (content: string): string => {
  const lines = content.split("\n");

  // # で始まる行を探す
  for (const line of lines) {
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith("#")) {
      return trimmedLine.replace(/^#+\s*/, "").trim();
    }
  }

  // タイトルが見つからない場合、最初のemptyTitleLength文字を返す
  const firstLine = content.trim().split("\n")[0];
  const emptyTitleLength = 20;
  return firstLine.length > emptyTitleLength
    ? firstLine.substring(0, emptyTitleLength) + "..."
    : firstLine || "無題";
}

// contentからtitleを抜いたテキストを生成するヘルパー関数
const extractContentWithoutTitle = (content: string): string => {
  const lines = content.split("\n");

  // # で始まる行を探す
  for (let i = 0; i < lines.length; i++) {
    const trimmedLine = lines[i].trim();
    if (trimmedLine.startsWith("#")) {
      // タイトル行以降のコンテンツを結合
      return lines
        .slice(i + 1)
        .join("\n")
        .trim();
    }
  }

  // タイトルが見つからない場合は、元のコンテンツをそのまま返す
  return content;
}

export const convertSummaryFromDTO = (dto: SummaryDTO): Entry => {
  const title = extractTitleFromContent(dto.content);
  const body = extractContentWithoutTitle(dto.content);
  const entryType = dto.is_auto_generated ? "journaling" : "summary";

  return {
    id: dto.summary_id,
    userId: dto.user_id,
    type: entryType,
    content: body,
    createdAt: dto.created_at,
    updatedAt: dto.updated_at,
    memoIds: dto.memo_ids,
    tagsIds: [],
    title: title,
  };
}

export const convertSummariesFromDTO = (dtos: SummaryDTO[]): Entry[] => {
  return dtos.map(convertSummaryFromDTO);
}
