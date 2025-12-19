export interface MemoDTO {
  memo_id: string;
  user_id: string;
  content: string;
  auto_tag_id: string[];
  manual_tag_id: string[];
  share_url_token: string | null;
  created_at: string;
  updated_at: string;
}
