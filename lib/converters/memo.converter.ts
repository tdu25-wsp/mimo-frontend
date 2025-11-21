import { Entry } from "@/types/entry";
import { MemoDTO } from "@/types/server/memo-dto";

/**
 * MemoDTO（JSON形式）をMemo（クライアント形式）に変換
 */
export function convertMemoFromDTO(dto: MemoDTO): Entry {
  return {
    id: dto.MemoID,
    userId: dto["UserID(FK)"],
    content: dto.content,
    autoTagIds: dto.autoTagID,
    manualTagIds: dto.manualTagID,
    type: "memo",
    shareUrlToken: dto.shareUrlToken,
    createdAt: dto.createdDate,
    updatedAt: dto.updatedDate,
  };
}

/**
 * MemoDTO配列をMemo配列に変換
 */
export function convertMemosFromDTO(dtos: MemoDTO[]): Entry[] {
  return dtos.map(convertMemoFromDTO);
}
