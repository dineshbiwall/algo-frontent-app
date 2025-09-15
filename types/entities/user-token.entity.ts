import { SessionData } from "kiteconnect";
import { UserTokenType } from "../../enums/user-token.enum";
import { User } from "./user.entity";
export interface UserToken {
  id: string;
  userId: string;
  user: User;
  requestToken: string;
  accessToken: string;
  refreshToken: string;
  date: Date;
  jobId: string;
  session: SessionData;
  type: UserTokenType;
  deletedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
