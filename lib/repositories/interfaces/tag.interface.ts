import { CreateTagDTO } from "@/types/server/create-tag-dto";
import { UpdateTagDTO } from "@/types/server/update-tag-dto";
import { Tag } from "@/types/tag";

export interface ITagRepository {
  /**
   * タグ一覧取得 (GET /api/tags)
   */
  getAll(): Promise<Tag[]>;

  /**
   * タグ新規作成 (POST /api/tags)
   */
  create(data: CreateTagDTO): Promise<Tag>;

  /**
   * タグ編集 (PATCH /api/tags/:id)
   */
  update(data: UpdateTagDTO): Promise<Tag>;

  /**
   * タグ削除 (DELETE /api/tags/:id)
   */
  delete(id: string): Promise<void>;
}
