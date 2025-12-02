export interface IUserRepository {
  /**
   * アカウント削除 (DELETE /api/account)
   */
  deleteAccount(): Promise<void>;
}