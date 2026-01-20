import { userRepository } from "@/lib/repositories";
import { toast } from "sonner";

export interface UserSlice {
  deleteAccount: () => Promise<void>;
}

export const createUserSlice = (set: any, get: any): UserSlice => ({
  deleteAccount: async () => {
    try {
      await userRepository.deleteAccount();
      await get().logout();
    } catch (error) {
      toast.error("アカウントの削除に失敗しました。もう一度お試しください。");
      console.error("Account deletion failed", error);
      throw error;
    }
  },
});
