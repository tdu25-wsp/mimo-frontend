import { Tag } from "@/types/tag";

export interface ITagRepository {
  /**
   * タグ一覧取得 (GET /api/tags)
   */
  getAll(): Promise<Tag[]>;

  /**
   * タグ新規作成 (POST /api/tags)
   */
  create(name: string, color?: string): Promise<Tag>;

  /**
   * タグ編集 (PATCH /api/tags/:id)
   */
  update(id: string, name: string, color?: string): Promise<Tag>;

  /**
   * タグ削除 (DELETE /api/tags/:id)
   */
  delete(id: string): Promise<void>;
}