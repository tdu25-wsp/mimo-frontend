interface BaseEntry {
  id: string;
  userId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface MemoEntry extends BaseEntry {
  type: "memo";
  shareUrlToken: string | null;
  autoTagIds: string[];
  manualTagIds: string[];
}

export interface SummaryEntry extends BaseEntry {
  type: "journaling" | "summary";
  title: string;
  memoIds: string[];
  tagsIds: string[];
}

export type Entry = MemoEntry | SummaryEntry;
