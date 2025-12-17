import { getMockMemos } from "@/lib/converters";
import {
  IMemoRepository,
  CreateMemoDto,
  UpdateMemoDto,
  MemoSearchParams,
} from "../interfaces/memo.interface";
import { Entry, MemoEntry } from "@/types/entry";

// モックデータをメモリに保持
let mockMemos: MemoEntry[] = [];

// 初期化フラグ
let isInitialized = false;

// モックデータを初期化
const initializeMockData = () => {
  if (!isInitialized) {
    mockMemos = getMockMemos() as MemoEntry[];
    isInitialized = true;
  }
};

// モック用のタグデータ定義（簡易版）
const mockTags = [
  { id: "tag-1", name: "生活", colorCode: "#4A90E2", userId: "user-1", createdAt: new Date().toISOString() },
  { id: "tag-2", name: "仕事", colorCode: "#F5A623", userId: "user-1", createdAt: new Date().toISOString() },
];

export const memoMockRepository: IMemoRepository = {
  /**
   * メモ一覧取得
   */
  getAll: async (params?: MemoSearchParams): Promise<Entry[]> => {
    initializeMockData();

    let filteredMemos = [...mockMemos];

    // キーワード検索
    if (params?.q) {
      const query = params.q.toLowerCase();
      filteredMemos = filteredMemos.filter((memo) =>
        memo.content.toLowerCase().includes(query)
      );
    }

    // タグ絞り込み
    if (params?.tagId) {
      filteredMemos = filteredMemos.filter((memo) =>
        memo.autoTagIds.includes(params.tagId!) ||
        memo.manualTagIds.includes(params.tagId!)
      );
    }

    // 作成日時の降順でソート
    return filteredMemos.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },

  /**
   * メモ詳細閲覧
   */
  getById: async (id: string): Promise<Entry | undefined> => {
    initializeMockData();

    // find は見つからない場合に undefined を返すため、そのまま返却します
    const memo = mockMemos.find((m) => m.id === id);
    return memo;
  },

  /**
   * 複数idを指定してメモ取得
   */
  getByIds: async (ids: string[]): Promise<Entry[] | undefined> => {
    initializeMockData();

    const memos = mockMemos.filter((m) => ids.includes(m.id));
    return memos;
  },

  /**
   * メモ記録
   */
  create: async (data: CreateMemoDto): Promise<Entry> => {
    initializeMockData();

    const newMemo: MemoEntry = {
      id: 'memo-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9),
      userId: 'mock-user-id',
      type: 'memo',
      content: data.content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      shareUrlToken: null,
      autoTagIds: [], // 実際はバックエンドで自動分類
      manualTagIds: data.tagIds || [],
    };

    mockMemos.push(newMemo);
    return newMemo;
  },

  /**
   * メモ更新
   */
  update: async (id: string, data: UpdateMemoDto): Promise<Entry> => {
    initializeMockData();

    const index = mockMemos.findIndex((m) => m.id === id);
    if (index === -1) {
      throw new Error(`Memo with id ${id} not found`);
    }

    const updatedMemo: MemoEntry = {
      ...mockMemos[index],
      content: data.content ?? mockMemos[index].content,
      manualTagIds: data.tagIds ?? mockMemos[index].manualTagIds,
      updatedAt: new Date().toISOString(),
    };

    mockMemos[index] = updatedMemo;
    return updatedMemo;
  },

  /**
   * メモ削除（複数）
   */
  deleteMany: async (ids: string[]): Promise<void> => {
    initializeMockData();

    mockMemos = mockMemos.filter((memo) => !ids.includes(memo.id));
  },

  /**
   * エクスポート
   */
  exportData: async (ids: string[]) => {
    initializeMockData();

    // IDでフィルタリング
    const targetMemos = mockMemos.filter((memo) => ids.includes(memo.id));

    if (targetMemos.length === 0) {
      throw new Error('No memos selected');
    }

    // export.json 形式への変換
    return {
      tags: mockTags.map(t => ({
        TagID: t.id,
        "UserID(FK)": t.userId,
        Name: t.name,
        colorCode: t.colorCode,
        createdDate: t.createdAt,
        updatedDate: t.createdAt // mockなので同値
      })),
      memos: targetMemos.map(m => ({
        MemoID: m.id,
        "UserID(FK)": m.userId,
        // TagID(FK) は Entry型に含まれていない場合nullなどにするか、manualTagIds[0]等を充てる
        "TagID(FK)": m.manualTagIds[0] || null,
        content: m.content,
        autoTagID: m.autoTagIds,
        manualTagID: m.manualTagIds,
        shareUrlToken: m.shareUrlToken,
        createdDate: m.createdAt,
        updatedDate: m.updatedAt
      }))
    };
  },

  /**
   * メモ共有URL生成
   */
  share: async (id: string): Promise<{ shareUrl: string }> => {
    initializeMockData();

    const index = mockMemos.findIndex((m) => m.id === id);
    if (index === -1) {
      throw new Error(`Memo with id ${id} not found`);
    }

    // 共有トークンを生成
    const token = 'share-' + Math.random().toString(36).substr(2, 16);
    mockMemos[index] = {
      ...mockMemos[index],
      shareUrlToken: token,
    };

    return {
      shareUrl: `${window.location.origin}/shared/${token}`,
    };
  },

  /**
   * メモ共有停止
   */
  unshare: async (id: string): Promise<void> => {
    initializeMockData();

    const index = mockMemos.findIndex((m) => m.id === id);
    if (index === -1) {
      throw new Error(`Memo with id ${id} not found`);
    }

    mockMemos[index] = {
      ...mockMemos[index],
      shareUrlToken: null,
    };
  },
};