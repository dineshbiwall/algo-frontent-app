import { User } from "./user.entity";
export interface Session {
  id: string;
  userId: string;
  user: User;
  createdAt: Date;
  updatedAt: Date;
}
