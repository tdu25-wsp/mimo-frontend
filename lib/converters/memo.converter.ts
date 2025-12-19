import { Entry } from "@/types/entry";
import { MemoDTO } from "@/types/server/memo-dto";

export const convertMemoFromDTO = (dto: MemoDTO): Entry => {
  return {
    id: dto.memo_id,
    userId: dto.user_id,
    content: dto.content,
    autoTagIds: dto.auto_tag_id || [],
    manualTagIds: dto.manual_tag_id || [],
    type: "memo",
    shareUrlToken: dto.share_url_token,
    createdAt: dto.created_at,
    updatedAt: dto.updated_at,
  };
};

export const convertMemosFromDTO = (dtos: MemoDTO[]): Entry[] => {
  return dtos.map(convertMemoFromDTO);
};
