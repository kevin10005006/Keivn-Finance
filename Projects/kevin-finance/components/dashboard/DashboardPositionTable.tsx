"use client";

import { useMemo } from "react";

import Panel from "@/components/ui/Panel";
import { useAssets } from "@/hooks/useAssets";
import { useTransactions } from "@/hooks/useTransactions";
import { calculatePosition } from "@/lib/transactions/services/positionService";

export default function DashboardPositionTable() {
 const { assets } = useAssets();
 const { transactions } = useTransactions();

 const positions = useMemo(() => {
   return assets
     .filter((asset) => asset.isActive)
     .map((asset) => {
       const position = calculatePosition(
         transactions,
         asset.id
       );

       return {
         asset,
         position,
       };
     })
     .filter(({ position }) => position.shares > 0)
     .sort((a, b) =>
       a.asset.code.localeCompare(b.asset.code)
     );
 }, [assets, transactions]);

 return (
   <Panel className="mt-6">
     <h2 className="text-2xl font-bold">
       持股摘要
     </h2>

     {positions.length === 0 ? (
       <p className="mt-4 text-gray-500">
         目前沒有持股資料
       </p>
     ) : (
       <div className="mt-4 overflow-x-auto">
         <table className="w-full border-collapse">
           <thead>
             <tr className="bg-gray-100">
               <th className="border p-2 text-left">
                 商品
               </th>

               <th className="border p-2 text-left">
                 類型
               </th>

               <th className="border p-2 text-right">
                 持有股數
               </th>

               <th className="border p-2 text-right">
                 平均成本
               </th>

               <th className="border p-2 text-right">
                 持有成本
               </th>

               <th className="border p-2 text-right">
                 已實現損益
               </th>
             </tr>
           </thead>

           <tbody>
             {positions.map(({ asset, position }) => (
               <tr key={asset.id}>
                 <td className="border p-2">
                   <div className="font-semibold">
                     {asset.code}
                   </div>

                   <div className="text-sm text-gray-500">
                     {asset.name}
                   </div>
                 </td>

                 <td className="border p-2">
                   {asset.type === "ETF"
                     ? "ETF"
                     : "股票"}
                 </td>

                 <td className="border p-2 text-right">
                   {position.shares.toLocaleString()}
                 </td>

                 <td className="border p-2 text-right">
                   {position.averageCost.toFixed(2)}
                 </td>

                 <td className="border p-2 text-right">
                   NT${" "}
                   {position.totalCost.toLocaleString(
                     undefined,
                     {
                       maximumFractionDigits: 0,
                     }
                   )}
                 </td>

                 <td className="border p-2 text-right">
                   NT${" "}
                   {position.realizedProfit.toLocaleString(
                     undefined,
                     {
                       maximumFractionDigits: 0,
                     }
                   )}
                 </td>
               </tr>
             ))}
           </tbody>
         </table>
       </div>
     )}
   </Panel>
 );
}