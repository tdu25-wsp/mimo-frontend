import { Tag } from "@/types/tag";
import { TagDTO } from "@/types/server/tag-dto";

export const convertTagFromDTO = (dto: TagDTO): Tag => {
  return {
    id: dto.TagID,
    userId: dto["UserID(FK)"],
    name: dto.Name,
    color: dto.colorCode,
    createdAt: dto.createdDate,
    updatedAt: dto.updatedDate,
  };
}

export const convertTagsFromDTO = (dtos: TagDTO[]): Tag[] => {
  return dtos.map(convertTagFromDTO);
}