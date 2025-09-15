import { User } from "./user.entity";
export interface PaymentReceipt {
  id: string;
  userId: string;
  user: User;
  key: string;
  amount: number;
  readAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
