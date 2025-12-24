import { IUserRepository } from "../interfaces/user.interface";
import { PROXY_API_BASE_URL } from "@/lib/constants";

export const userLiveRepository: IUserRepository = {
  deleteAccount: async (): Promise<void> => {
    const res = await fetch(`${PROXY_API_BASE_URL}/account`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(
        errorData.message || `アカウントの削除に失敗しました (${res.status})`
      );
    }
  },
};
