"use client";

import Panel from "@/components/ui/Panel";
import DividendEditForm from "@/components/dividend/DividendEditForm";
import { useAssets } from "@/hooks/useAssets";
import { useDividends } from "@/hooks/useDividends";
import { useState } from "react";

export default function DividendTable() {
 const { assets } = useAssets();
 const { dividends, setDividends } = useDividends();
 const [editingDividendId, setEditingDividendId] =
    useState<string | null>(null);

 function getAsset(assetId: string) {
   return assets.find((asset) => asset.id === assetId);
 }

const sortedDividends = dividends
 .filter(
   (dividend): dividend is NonNullable<typeof dividend> =>
     dividend != null
 )
 .slice()
 .sort((a, b) => {
   const paymentDateA = a.paymentDate ?? "";
   const paymentDateB = b.paymentDate ?? "";

   const dateCompare =
     paymentDateB.localeCompare(paymentDateA);

   if (dateCompare !== 0) {
     return dateCompare;
   }

   const createdAtA = a.createdAt ?? "";
   const createdAtB = b.createdAt ?? "";

   return createdAtB.localeCompare(createdAtA);
 });

 return (
   <Panel className="mt-6">
     <h2 className="text-2xl font-bold">
       配息紀錄
     </h2>

      {editingDividendId && (() => {
        const editingDividend = dividends.find(
          (dividend) => dividend.id === editingDividendId
        );
        
        if (!editingDividend) {
          return null;
        }

        return (
          <DividendEditForm
            dividend={editingDividend}
            onCancel={() => setEditingDividendId(null)}
            onSave={(updateDividend) => {
              setDividends((currentDividends) => 
                currentDividends.map((item) =>
                  item.id === updateDividend.id
                    ? updateDividend
                    : item
                )
              );

              setEditingDividendId(null);
            }}
          />
        );
      })()}

     {sortedDividends.length === 0 ? (
       <p className="mt-6 text-center text-gray-500">
         尚無配息資料
       </p>
     ) : (
       <div className="mt-6 overflow-x-auto">
         <table className="min-w-full border-collapse">
           <thead>
             <tr className="border-b bg-gray-50">
               <th className="px-4 py-3 text-left">
                 商品
               </th>

               <th className="px-4 py-3 text-left">
                 除息日
               </th>

               <th className="px-4 py-3 text-left">
                 發放日
               </th>

               <th className="px-4 py-3 text-right">
                 每股配息
               </th>

               <th className="px-4 py-3 text-right">
                 股數
               </th>

               <th className="px-4 py-3 text-right">
                 總配息
               </th>

               <th className="px-4 py-3 text-center">
                 狀態
               </th>

               <th className="px-4 py-3 text-center">
                 操作
               </th>
             </tr>
           </thead>

           <tbody>
             {sortedDividends.map((dividend) => {
               const asset = getAsset(dividend.assetId);

               return (
                 <tr
                   key={dividend.id}
                   className="border-b"
                 >
                   <td className="px-4 py-3">
                     <div className="font-semibold">
                       {asset?.code ?? "未知商品"}
                     </div>

                     <div className="text-sm text-gray-500">
                       {asset?.name ?? ""}
                     </div>
                   </td>

                   <td className="px-4 py-3">
                     {dividend.exDividendDate}
                   </td>

                   <td className="px-4 py-3">
                     {dividend.paymentDate}
                   </td>

                   <td className="px-4 py-3 text-right">
                     {Number(dividend.dividendPerShare ?? 0).toLocaleString(
                       undefined,
                       {
                         maximumFractionDigits: 4,
                       }
                     )}
                   </td>

                   <td className="px-4 py-3 text-right">
                     {Number(dividend.shares ?? 0).toLocaleString()}
                   </td>

                   <td className="px-4 py-3 text-right font-semibold">
                     NT${" "}
                     {Number(dividend.totalDividend ?? 0).toLocaleString(
                       undefined,
                       {
                         maximumFractionDigits: 2,
                       }
                     )}
                   </td>

                   <td className="px-4 py-3 text-center">
                     {dividend.status}
                   </td>

                   <td className="px-4 py-3 text-center">
                      <button
                        type="button"
                        onClick={() =>
                          setEditingDividendId(dividend.id)
                        }
                        className="rounded-md border px-3 py-1 text-sm hover:bg-gray-50"
                      >
                        編輯
                      </button>
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