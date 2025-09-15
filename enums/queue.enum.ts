export enum QueueType {
  Buy = "Buy",
  BuyLog = "BuyLog",
  Sell = "Sell",
  SellLog = "SellLog",
}

export type BuyLogJobPayload = {
  userId: string;
  orderId: string;
  tradingsymbol: string;
};

export type SellLogJobPayload = {
  userId: string;
  orderId: string;
  tradingsymbol: string;
};

export type BuyJobPayload = {
  userId: string;

  // For Zerodha
  tradingsymbol: string;
  quantity: number;
};

export type SellJobPayload = {
  userId: string;

  // For Zerodha
  tradingsymbol: string;
  quantity: number;
};

export type JobPayload = {
  userId: string;
  scriptPath: string;
  args: string[];
};
