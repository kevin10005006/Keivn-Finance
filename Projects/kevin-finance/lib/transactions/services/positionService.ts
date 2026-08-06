import { Transaction } from "@/types/Transaction";

export interface PositionSummary {
 shares: number;
 totalCost: number;
 averageCost: number;
 realizedProfit: number;
}

export function calculatePosition(
 transactions: Transaction[],
 assetId: string
): PositionSummary {
 const assetTransactions = transactions
   .filter((transaction) => transaction.assetId === assetId)
   .sort((a, b) => {
     const dateCompare = a.date.localeCompare(b.date);

     if (dateCompare !== 0) {
       return dateCompare;
     }

     return a.createdAt.localeCompare(b.createdAt);
   });

 let shares = 0;
 let totalCost = 0;
 let realizedProfit = 0;

 for (const transaction of assetTransactions) {
   const tradeAmount =
     transaction.shares * transaction.price;

   if (transaction.action === "BUY") {
     shares += transaction.shares;
     totalCost += tradeAmount + transaction.fee;

     continue;
   }

   if (transaction.shares > shares) {
     throw new Error(
       `賣出股數不可超過目前持有股數：目前持有 ${shares} 股`
     );
   }

   const averageCost =
     shares > 0 ? totalCost / shares : 0;

   const soldCost =
     averageCost * transaction.shares;

   const netSellAmount =
     tradeAmount - transaction.fee - transaction.tax;

   realizedProfit += netSellAmount - soldCost;

   shares -= transaction.shares;
   totalCost -= soldCost;

   if (shares === 0) {
     totalCost = 0;
   }
 }

 return {
   shares,
   totalCost,
   averageCost:
     shares > 0 ? totalCost / shares : 0,
   realizedProfit,
 };
}

export function validateSellShares(
    availableShares: number,
    sellShares: number
): string | null {
    if (sellShares > availableShares) {
        return `賣出股數不可超過目持有股數,目前持有 ${availableShares.toLocaleString()} 股`;
    }

    return null;
}