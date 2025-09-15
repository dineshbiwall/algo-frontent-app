export interface TradeResult {
  id: string;
  userId: string;
  transactionId?: string;
  symbol?: string;
  quantity?: number;
  entryPrice?: number;
  exitPrice?: number;
  pnl: number;
  createdAt: Date;
  updatedAt: Date;
}
