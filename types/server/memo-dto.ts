export interface MemoDTO {
  MemoID: string;
  "UserID(FK)": string;
  content: string;
  autoTagID: string[];
  manualTagID: string[];
  shareUrlToken: string | null;
  createdDate: string;
  updatedDate: string;
}
