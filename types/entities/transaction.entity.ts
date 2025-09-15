import { TransactionType } from "../../enums/transaction.enum";
import { User } from "./user.entity";
export interface Transaction {
  id: string;
  userId: string;
  user: User;
  symbol: string;
  orderId: string;
  quantity: number;
  price: number;
  type: TransactionType;
  sellAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
