export type TransactionAction = "BUY" | "SELL";

export interface Transaction {
  id: string;
  assetId: string;
  date: string;
  action: TransactionAction;
  shares: number;
  price: number;
  fee: number;
  tax: number;
  note: string;
  createdAt: string;
}