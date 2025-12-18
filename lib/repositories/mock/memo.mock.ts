import { getMockMemos } from "@/lib/converters";
import {
  IMemoRepository,
  MemoSearchParams,
} from "../interfaces/memo.interface";
import { Entry, MemoEntry } from "@/types/entry";
import { CreateMemoDTO } from "@/types/server/create-memo-dto";
import { UpdateMemoDTO } from "@/types/server/update-memo-dto";
import tagsData from "../../../public/data/tags.json";

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
  create: async (data: CreateMemoDTO): Promise<Entry> => {
    initializeMockData();

    const newMemo: MemoEntry = {
      id: Date.now().toString(),
      content: data.content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      type: "memo",
      shareUrlToken: null,
      autoTagIds: [],
      manualTagIds: data.manualTagID,
      userId: data.userId,
    }

    return newMemo;
  },

  /**
   * メモ更新
   */
  update: async (data: UpdateMemoDTO): Promise<Entry> => {
    initializeMockData();
    
    const index = mockMemos.findIndex((m) => m.id === data.memoId);
    if (index === -1) {
      throw new Error(`Memo with id ${data.memoId} not found`);
    }

    const updatedMemo: MemoEntry = {
      ...mockMemos[index],
      content: data.content ?? mockMemos[index].content,
      manualTagIds: data.manualTagID ?? mockMemos[index].manualTagIds,
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

    // tags.json のデータを使用
    // tags.json が { "tags": [...] } という構造なので tagsData.tags で配列にアクセス
    const tags = tagsData.tags;

    const formattedMemos = targetMemos.map(m => ({
      MemoID: m.id,
      "UserID(FK)": m.userId,
      "TagID(FK)": m.manualTagIds[0] || null, // 簡易的に最初のタグIDを使用
      content: m.content,
      autoTagID: m.autoTagIds,
      manualTagID: m.manualTagIds,
      shareUrlToken: m.shareUrlToken,
      createdDate: m.createdAt,
      updatedDate: m.updatedAt
    }));

    return {
      tags: tags,
      memos: formattedMemos
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