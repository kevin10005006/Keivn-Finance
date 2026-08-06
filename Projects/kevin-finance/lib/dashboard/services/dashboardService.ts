import { Asset } from "@/types/Asset";
import { Transaction } from "@/types/Transaction";
import { calculatePosition } from "@/lib/transactions/services/positionService";

export interface DashboardSummary {
 totalAssets: number;
 etfCount: number;
 stockCount: number;
 totalCost: number;
 totalRealizedProfit: number;
}

export function calculateDashboardSummary(
 assets: Asset[],
 transactions: Transaction[]
): DashboardSummary {
 const activeAssets = assets.filter(
   (asset) => asset.isActive
 );

 let totalCost = 0;
 let totalRealizedProfit = 0;

 for (const asset of activeAssets) {
   const position = calculatePosition(
     transactions,
     asset.id
   );

   totalCost += position.totalCost;
   totalRealizedProfit += position.realizedProfit;
 }

 return {
   totalAssets: activeAssets.length,

   etfCount: activeAssets.filter(
     (asset) => asset.type === "ETF"
   ).length,

   stockCount: activeAssets.filter(
     (asset) => asset.type === "STOCK"
   ).length,

   totalCost,
   totalRealizedProfit,
 };
}