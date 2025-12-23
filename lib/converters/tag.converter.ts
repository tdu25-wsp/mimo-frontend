import { Tag } from "@/types/tag";
import { TagDTO } from "@/types/server/tag-dto";

export const convertTagFromDTO = (dto: TagDTO): Tag => {
  return {
    id: dto.tag_id,
    userId: dto.user_id,
    name: dto.name,
    color: dto.color_code,
    createdAt: dto.created_at,
    updatedAt: dto.updated_at,
  };
}

export const convertTagsFromDTO = (dtos: TagDTO[]): Tag[] => {
  return dtos.map(convertTagFromDTO);
}