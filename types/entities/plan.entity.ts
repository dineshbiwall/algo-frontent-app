import { PlanDuration } from "../../enums/plan.enum";
export interface Plan {
  id: string;
  name: string;
  price: number;
  duration: PlanDuration;
  counts: number;
  deletedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
