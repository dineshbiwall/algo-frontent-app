import { User } from "./user.entity";
export interface Telegram {
  id: string;
  userId: string;
  telegramId: string;
  user: User;
  firstName: string;
  lastName: string;
  username: string;
  photoUrl: string;
  createdAt: Date;
  updatedAt: Date;
}
