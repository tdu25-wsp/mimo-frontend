export interface User {
  id: string;
  email: string;
  passwordHash: string;
  passwordSalt: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}