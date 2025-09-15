import { User } from "./user.entity";
export interface Balance {
  id: string;
  userId: string;
  user: User;
  availableAdhocMargin: number;
  availableCash: number;
  availableOpeningBalance: number;
  availableLiveBalance: number;
  availableCollateral: number;
  availableIntradayPayin: number;
  utilisedDebits: number;
  utilisedExposure: number;
  utilisedM2mRealised: number;
  utilisedM2mUnrealised: number;
  utilisedOptionPremium: number;
  utilisedPayout: number;
  utilisedSpan: number;
  utilisedHoldingSales: number;
  utilisedTurnover: number;
  utilisedLiquidCollateral: number;
  utilisedStockCollateral: number;
  utilisedDelivery: number;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}
