import { Entry } from "@/types/entry";
import { CreateMemoDTO } from "@/types/server/create-memo-dto";
import { UpdateMemoDTO } from "@/types/server/update-memo-dto";

export interface MemoSearchParams {
  q?: string;      // キーワード検索
  tagId?: string;  // タグ絞り込み
}

// エクスポートするデータの型定義
export interface ExportData {
  tags: any[];  
  memos: any[];
}

export interface IMemoRepository {
  /**
   * メモ一覧取得 (GET /api/memos)
   */
  getAll(params?: MemoSearchParams): Promise<Entry[]>;

  /**
   * メモ詳細閲覧 (GET /api/memos/:id)
   */
  getById(id: string): Promise<Entry | undefined>;

  /**
   * 複数メモ詳細閲覧
   * getByIdを複数回呼ぶ代わりに一括で取得するためのメソッド
   * getByIdでundefinedが返る場合はundefinedを返す
   * 見つからない場合は空配列を返す
   */
  getByIds(ids: string[]): Promise<Entry[] | undefined>;

  /**
   * メモ記録 (POST /api/memos)
   */
  create(data: CreateMemoDTO): Promise<Entry>;

  /**
   * メモ更新 (PATCH /api/memos/:id)
   */
  update(date: UpdateMemoDTO): Promise<Entry>;

  /**
   * メモ削除（複数） (DELETE /api/memos)
   * Body: { ids: string[] }
   */
  deleteMany(ids: string[]): Promise<void>;

  /**
   * 選択したメモと全タグをエクスポート用に取得 (APIレスポンスそのまま)
   */
  exportData(ids: string[]): Promise<ExportData>;

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
