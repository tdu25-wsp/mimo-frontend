import { Memo } from "@/types/memo";
import { MemoDTO } from "@/types/server/memo-dto";

/**
 * MemoDTO（JSON形式）をMemo（クライアント形式）に変換
 */
export function convertMemoFromDTO(dto: MemoDTO): Memo {
  return {
    id: dto.MemoID,
    userId: dto["UserID(FK)"],
    tagId: dto["TagID(FK)"],
    content: dto.content,
    autoTagId: dto.autoTagID,
    manualTagId: dto.manualTagID,
    shareUrlToken: dto.shareUrlToken,
    createdAt: dto.createdDate,
    updatedAt: dto.updatedDate,
  };
}

/**
 * MemoDTO配列をMemo配列に変換
 */
export function convertMemosFromDTO(dtos: MemoDTO[]): Memo[] {
  return dtos.map(convertMemoFromDTO);
}