"use client";

import { useMemo, useState } from "react";

import Panel from "@/components/ui/Panel";
import FormField from "@/components/ui/form/FormField";
import { useAssets } from "@/hooks/useAssets";
import { useTransactions } from "@/hooks/useTransactions";
import { calculatePosition } from "@/lib/transactions/services/positionService";

export default function DividendForm() {
 const { assets } = useAssets();
 const { transactions } = useTransactions();

 const [assetId, setAssetId] = useState("");
 const [exDividendDate, setExDividendDate] = useState("");
 const [paymentDate, setPaymentDate] = useState("");
 const [dividendPerShare, setDividendPerShare] =
   useState("");
 const [shares, setShares] = useState("");
 const [note, setNote] = useState("");

 const activeAssets = useMemo(() => {
   return assets
     .filter((asset) => asset.isActive)
     .sort((a, b) => a.code.localeCompare(b.code));
 }, [assets]);

 const totalDividend = useMemo(() => {
   const dividendValue = Number(dividendPerShare);
   const sharesValue = Number(shares);

   if (
     !Number.isFinite(dividendValue) ||
     !Number.isFinite(sharesValue) ||
     dividendValue <= 0 ||
     sharesValue <= 0
   ) {
     return 0;
   }

   return dividendValue * sharesValue;
 }, [dividendPerShare, shares]);

 function handleAssetChange(selectedAssetId: string) {
   setAssetId(selectedAssetId);

   if (!selectedAssetId) {
     setShares("");
     return;
   }

   const position = calculatePosition(
     transactions,
     selectedAssetId
   );

   setShares(
     position.shares > 0
       ? position.shares.toString()
       : ""
   );
 }

 return (
   <Panel className="mt-6">
     <h2 className="text-2xl font-bold">
       新增配息紀錄
     </h2>

     <div className="mt-6 space-y-6">
       <FormField label="商品" required>
         <select
           className="w-full rounded-md border px-3 py-2"
           value={assetId}
           onChange={(e) =>
             handleAssetChange(e.target.value)
           }
         >
           <option value="">
             請選擇商品
           </option>

           {activeAssets.map((asset) => (
             <option
               key={asset.id}
               value={asset.id}
             >
               {asset.code}－{asset.name}
             </option>
           ))}
         </select>
       </FormField>

       <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
         <FormField label="除息日" required>
           <input
             type="date"
             className="w-full rounded-md border px-3 py-2"
             value={exDividendDate}
             onChange={(e) =>
               setExDividendDate(e.target.value)
             }
           />
         </FormField>

         <FormField label="發放日" required>
           <input
             type="date"
             className="w-full rounded-md border px-3 py-2"
             value={paymentDate}
             onChange={(e) =>
               setPaymentDate(e.target.value)
             }
           />
         </FormField>
       </div>

       <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
         <FormField label="每股配息" required>
           <input
             type="number"
             min="0"
             step="0.0001"
             className="w-full rounded-md border px-3 py-2"
             value={dividendPerShare}
             onChange={(e) =>
               setDividendPerShare(e.target.value)
             }
             placeholder="例如：0.85"
           />
         </FormField>

         <FormField label="配息股數" required>
           <input
             type="number"
             min="1"
             step="1"
             className="w-full rounded-md border px-3 py-2"
             value={shares}
             onChange={(e) =>
               setShares(e.target.value)
             }
             placeholder="選擇商品後自動帶入"
           />
         </FormField>
       </div>

       <FormField label="總配息">
         <div className="rounded-md border bg-gray-50 px-3 py-2 font-semibold">
           NT${" "}
           {totalDividend.toLocaleString(
             undefined,
             {
               maximumFractionDigits: 2,
             }
           )}
         </div>
       </FormField>

       <FormField label="備註">
         <textarea
           rows={3}
           className="w-full rounded-md border px-3 py-2"
           value={note}
           onChange={(e) => setNote(e.target.value)}
         />
       </FormField>

       <div className="flex justify-end">
         <button
           type="button"
           className="rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
         >
           新增配息
         </button>
       </div>
     </div>
   </Panel>
 );
}