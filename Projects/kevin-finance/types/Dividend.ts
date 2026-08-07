export type DividendStatus =
  | "ANNOUNCED"
  | "EX_DIVIDEND"
  | "PAID"
  | "RECEIVED";

export type DividendSource =
  | "MANUAL"
  | "CSV"
  | "BROKER"
  | "API"
  
export interface Dividend {
    id: string;
    assetId: string;
    exDividendDate: string;
    paymentDate: string;
    dividendPerShare: number;
    shares: number;
    totalDividend: number;
    withholdingTax: number;
    handlingFee: number;
    status: DividendStatus;
    source: DividendSource;
    note: string;
    createdAt: string;
}