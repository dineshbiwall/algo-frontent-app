import { User } from "./user.entity";
export interface KiteConfig {
  id: string;
  userId: string;
  user: User;
  apiKey: string;
  apiSecret: string;
  createdAt: Date;
  updatedAt: Date;
}
