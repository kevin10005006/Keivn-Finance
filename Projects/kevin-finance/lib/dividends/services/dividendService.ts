import { Dividend } from "@/types/Dividend";
import { getDividends } from "../repository";

export function getAllDividends(): Dividend[] {
    return getDividends();
}

export interface CreateDividendInput {
 assetId: string;
 exDividendDate: string;
 paymentDate: string;
 dividendPerShare: number;
 shares: number;
 withholdingTax: number;
 handlingFee: number;
 note: string;
}

export interface CreateDividendResult {
 success: boolean;
 dividend?: Dividend;
 error?: string;
}

export function createDividend(
 input: CreateDividendInput
): CreateDividendResult {
 const {
   assetId,
   exDividendDate,
   paymentDate,
   dividendPerShare,
   shares,
   withholdingTax,
   handlingFee,
   note,
 } = input;

 if (!assetId) {
   return {
     success: false,
     error: "請選擇商品",
   };
 }

 if (!exDividendDate) {
   return {
     success: false,
     error: "請輸入除息日",
   };
 }

 if (!paymentDate) {
   return {
     success: false,
     error: "請輸入發放日",
   };
 }

 if (shares <= 0) {
   return {
     success: false,
     error: "股數必須大於 0",
   };
 }

 if (dividendPerShare <= 0) {
   return {
     success: false,
     error: "每股配息必須大於 0",
   };
 }

 const totalDividend =
   dividendPerShare * shares;

 return {
   success: true,

   dividend: {
     id: crypto.randomUUID(),
     assetId,
     exDividendDate,
     paymentDate,
     dividendPerShare,
     shares,
     totalDividend,
     withholdingTax,
     handlingFee,
     status: "ANNOUNCED",
     source: "MANUAL",
     note,
     createdAt: new Date().toISOString(),
   },
 };
}