export interface MemoDTO {
  MemoID: string;
  "UserID(FK)": string;
  "TagID(FK)": string;
  content: string;
  autoTagID: string | null;
  manualTagID: string | null;
  shareUrlToken: string | null;
  createdDate: string;
  updatedDate: string;
}