"use client";

import { useMemo } from "react";

import Panel from "@/components/ui/Panel";
import { useAssets } from "@/hooks/useAssets";
import { useTransactions } from "@/hooks/useTransactions";

export default function DashboardRecentTransactions() {
 const { assets } = useAssets();
 const { transactions } = useTransactions();

 const recentTransactions = useMemo(() => {
   return [...transactions]
     .sort((a, b) => {
       const dateCompare = b.date.localeCompare(a.date);

       if (dateCompare !== 0) {
         return dateCompare;
       }

       return b.createdAt.localeCompare(a.createdAt);
     })
     .slice(0, 5);
 }, [transactions]);

 function getAsset(assetId: string) {
   return assets.find((asset) => asset.id === assetId);
 }

 return (
   <Panel className="mt-6">
     <h2 className="text-2xl font-bold">
       最近交易
     </h2>

     {recentTransactions.length === 0 ? (
       <p className="mt-4 text-gray-500">
         目前沒有交易紀錄
       </p>
     ) : (
       <div className="mt-4 overflow-x-auto">
         <table className="w-full border-collapse">
           <thead>
             <tr className="bg-gray-100">
               <th className="border p-2 text-left">
                 日期
               </th>

               <th className="border p-2 text-left">
                 商品
               </th>

               <th className="border p-2 text-center">
                 類型
               </th>

               <th className="border p-2 text-right">
                 股數
               </th>

               <th className="border p-2 text-right">
                 成交價
               </th>

               <th className="border p-2 text-right">
                 成交金額
               </th>
             </tr>
           </thead>

           <tbody>
             {recentTransactions.map((transaction) => {
               const asset = getAsset(transaction.assetId);
               const tradeAmount =
                 transaction.shares * transaction.price;

               return (
                 <tr key={transaction.id}>
                   <td className="border p-2">
                     {transaction.date}
                   </td>

                   <td className="border p-2">
                     <div className="font-semibold">
                       {asset?.code ?? "未知商品"}
                     </div>

                     <div className="text-sm text-gray-500">
                       {asset?.name ?? ""}
                     </div>
                   </td>

                   <td className="border p-2 text-center">
                     {transaction.action === "BUY"
                       ? "買進"
                       : "賣出"}
                   </td>

                   <td className="border p-2 text-right">
                     {transaction.shares.toLocaleString()}
                   </td>

                   <td className="border p-2 text-right">
                     {transaction.price.toLocaleString()}
                   </td>

                   <td className="border p-2 text-right">
                     NT${" "}
                     {tradeAmount.toLocaleString()}
                   </td>
                 </tr>
               );
             })}
           </tbody>
         </table>
       </div>
     )}
   </Panel>
 );
}