export type AssetType = "ETF" | "STOCK";

export interface Asset {
  id: string;
  code: string;
  name: string;
  type: AssetType;
  market: string;
  isActive: boolean;
  createdAt: string;
}