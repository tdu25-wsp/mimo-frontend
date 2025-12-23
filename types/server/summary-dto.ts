export interface SummaryDTO {
  summary_id: string;
  user_id: string;
  memo_ids: string[];
  content: string;
  created_at: string;
  updated_at: string;
  is_auto_generated: boolean;
}
