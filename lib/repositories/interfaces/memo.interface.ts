import { Entry } from "@/types/entry";

export interface CreateMemoDto {
  content: string;
  tagIds?: string[]; // 空の場合はバックエンドで自動分類
}

export interface UpdateMemoDto {
  content?: string;
  tagIds?: string[]; // 手動分類更新用
}

export interface MemoSearchParams {
  q?: string;      // キーワード検索
  tagId?: string;  // タグ絞り込み
}

export interface IMemoRepository {
  /**
   * メモ一覧取得 (GET /api/memos)
   */
  getAll(params?: MemoSearchParams): Promise<Entry[]>;

  /**
   * メモ詳細閲覧 (GET /api/memos/:id)
   */
  getById(id: string): Promise<Entry>;

  /**
   * メモ記録 (POST /api/memos)
   */
  create(data: CreateMemoDto): Promise<Entry>;

  /**
   * メモ更新 (PATCH /api/memos/:id)
   */
  update(id: string, data: UpdateMemoDto): Promise<Entry>;

  /**
   * メモ削除（複数） (DELETE /api/memos)
   * Body: { ids: string[] }
   */
  deleteMany(ids: string[]): Promise<void>;

  /**
   * エクスポート (GET /api/memos/export)
   * テキストデータを返す想定
   */
  exportData(format: 'txt'): Promise<string>;

  // --- シェア機能 (UC-10) ---

  /**
   * メモ共有URL生成 (POST /api/memos/:id/share)
   * 共有URL文字列を返す想定
   */
  share(id: string): Promise<{ shareUrl: string }>;

  /**
   * メモ共有停止 (DELETE /api/memos/:id/share)
   */
  unshare(id: string): Promise<void>;
}