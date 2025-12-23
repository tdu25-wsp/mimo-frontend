import { JournalingSettings } from "./journaling-setting";

export interface User {
  id: string;
  email: string;
  display_name: string;
  passwordHash?: string;
  passwordSalt?: string;
  created_at?: string;
  updated_at?: string;
  journalingSetting?: JournalingSettings
}