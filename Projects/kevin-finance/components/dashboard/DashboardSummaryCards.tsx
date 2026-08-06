"use client";

import { useMemo } from "react";

import Panel from "@/components/ui/Panel";
import { useAssets } from "@/hooks/useAssets";
import { useTransactions } from "@/hooks/useTransactions";
import { calculateDashboardSummary } from "@/lib/dashboard/services/dashboardService";

export default function DashboardSummaryCards() {
 const { assets } = useAssets();
 const { transactions } = useTransactions();

 const summary = useMemo(() => {
   return calculateDashboardSummary(
     assets,
     transactions
   );
 }, [assets, transactions]);

 const cards = [
   {
     title: "商品總數",
     value: `${summary.totalAssets} 檔`,
   },
   {
     title: "ETF 數量",
     value: `${summary.etfCount} 檔`,
   },
   {
     title: "股票數量",
     value: `${summary.stockCount} 檔`,
   },
   {
     title: "總持有成本",
     value: `NT$ ${summary.totalCost.toLocaleString()}`,
   },
   {
     title: "總已實現損益",
     value: `NT$ ${summary.totalRealizedProfit.toLocaleString()}`,
   },
 ];

 return (
   <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
     {cards.map((card) => (
       <Panel key={card.title}>
         <p className="text-sm text-gray-500">
           {card.title}
         </p>

         <p className="mt-2 text-2xl font-bold">
           {card.value}
         </p>
       </Panel>
     ))}
   </div>
 );
}