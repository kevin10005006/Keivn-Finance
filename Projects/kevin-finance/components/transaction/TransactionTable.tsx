"use client";

import { useAssets } from "@/hooks/useAssets";
import { useTransactions } from "@/hooks/useTransactions";

export default function TransactionTable() {
 const { assets } = useAssets();
 const { transactions } = useTransactions();

 function getAssetCode(assetId: string): string {
   return (
     assets.find((asset) => asset.id === assetId)?.code ??
     "未知商品"
   );
 }

 return (
   <div className="mt-10">
     <h2 className="mb-4 text-2xl font-bold">
       交易紀錄
     </h2>

     {transactions.length === 0 ? (
       <div className="rounded border bg-white p-6 text-gray-500">
         目前沒有交易紀錄
       </div>
     ) : (
       <div className="overflow-x-auto">
         <table className="w-full border bg-white">
           <thead>
             <tr className="bg-gray-100">
               <th className="border p-2">日期</th>
               <th className="border p-2">商品代號</th>
               <th className="border p-2">類型</th>
               <th className="border p-2">股數</th>
               <th className="border p-2">成交價</th>
               <th className="border p-2">手續費</th>
               <th className="border p-2">證交稅</th>
               <th className="border p-2">成交金額</th>
               <th className="border p-2">備註</th>
             </tr>
           </thead>

           <tbody>
             {transactions.map((transaction) => {
               const tradeAmount =
                 transaction.shares * transaction.price;

               return (
                 <tr key={transaction.id}>
                   <td className="border p-2">
                     {transaction.date}
                   </td>

                   <td className="border p-2">
                     {getAssetCode(transaction.assetId)}
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
                     {transaction.fee.toLocaleString()}
                   </td>

                   <td className="border p-2 text-right">
                     {transaction.tax.toLocaleString()}
                   </td>

                   <td className="border p-2 text-right">
                     {tradeAmount.toLocaleString()}
                   </td>

                   <td className="border p-2">
                     {transaction.note || "—"}
                   </td>
                 </tr>
               );
             })}
           </tbody>
         </table>
       </div>
     )}
   </div>
 );
}