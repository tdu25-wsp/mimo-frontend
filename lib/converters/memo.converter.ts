import { Entry } from "@/types/entry";
import { MemoDTO } from "@/types/server/memo-dto";

export const convertMemoFromDTO = (dto: MemoDTO): Entry => {
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
};

export const convertMemosFromDTO = (dtos: MemoDTO[]): Entry[] => {
  return dtos.map(convertMemoFromDTO);
};
