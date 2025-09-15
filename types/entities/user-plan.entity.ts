import { Plan } from "./plan.entity";
import { User } from "./user.entity";
export interface UserPlan {
  id: string;
  userId: string;
  user: User;
  planId: string;
  plan: Plan;
  isActive: boolean;
  startDate: Date;
  endDate: Date;
  deletedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
