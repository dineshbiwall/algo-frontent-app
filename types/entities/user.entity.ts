import { UserRole } from "../../enums/user.enum";
import { Balance } from "./balance.entity";
import { KiteConfig } from "./kite-config.entity";
import { Session } from "./session.entity";
import { Telegram } from "./telegram.entity";
import { UserToken } from "./user-token.entity";
export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  kiteId: string;
  role: UserRole;
  telegramId: string;
  isMain: boolean;
  deletedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  sessions: Session[];
  tokens: UserToken[];
  balances: Balance[];
  kiteConfig: KiteConfig;
  telegram: Telegram;
}
