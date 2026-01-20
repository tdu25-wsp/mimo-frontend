import { PROXY_API_BASE_URL } from "@/lib/constants";
import { IUserRepository } from "../interfaces/user.interface";

export const userLiveRepository: IUserRepository = {
  /**
   * アカウント削除
   */
  deleteAccount: async (): Promise<void> => {
    const res = await fetch(`${PROXY_API_BASE_URL}auth/user`, {
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
