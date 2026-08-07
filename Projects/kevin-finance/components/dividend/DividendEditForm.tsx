"use client";

import { useState } from "react";

import FormField from "@/components/ui/form/FormField";
import { Dividend } from "@/types/Dividend";
import { noDeprecation } from "process";

interface DividendEditFormProps {
 dividend: Dividend;
 onCancel: () => void;
 onSave: (updateDividend: Dividend) => void;
}

export default function DividendEditForm({
 dividend,
 onCancel,
 onSave,
}: DividendEditFormProps) {
 const [exDividendDate, setExDividendDate] = useState(
   dividend.exDividendDate
 );

 const [paymentDate, setPaymentDate] = useState(
   dividend.paymentDate
 );

 const [dividendPerShare, setDividendPerShare] = useState(
   dividend.dividendPerShare.toString()
 );

 const [shares, setShares] = useState(
   dividend.shares.toString()
 );

 const [note, setNote] = useState(
   dividend.note
 );

 function handleSave() {
    const dividendValue = Number(dividendPerShare);
    const sharesValue = Number(shares);

    if (
        !exDividendDate ||
        !paymentDate ||
        !Number.isFinite(dividendValue) ||
        dividendValue <= 0 ||
        !Number.isInteger(sharesValue) ||
        sharesValue <= 0
    ) {
        return;
    }

    const updatedDividend: Dividend = {
        ...dividend,
        exDividendDate,
        paymentDate,
        dividendPerShare: dividendValue,
        shares: sharesValue,
        totalDividend: dividendValue * sharesValue,
        note: note.trim(),
    };
    onSave(updatedDividend);
 }

 return (
   <div className="mt-4 rounded-md border bg-gray-50 p-4">
     <div className="flex items-center justify-between">
       <h3 className="font-semibold">
         編輯配息紀錄
       </h3>

       <button
         type="button"
         onClick={onCancel}
         className="rounded-md border px-3 py-1 text-sm hover:bg-white"
       >
         取消
       </button>
     </div>

     <div className="mt-6 space-y-6">
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
           />
         </FormField>
       </div>

       <FormField label="備註">
         <textarea
           rows={3}
           className="w-full rounded-md border px-3 py-2"
           value={note}
           onChange={(e) =>
             setNote(e.target.value)
           }
         />
       </FormField>

       <div className="flex justify-end gap-3">
         <button
           type="button"
           onClick={onCancel}
           className="rounded-md border px-4 py-2 hover:bg-white"
         >
           取消
         </button>

         <button
           type="button"
           onClick={handleSave}
           className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
         >
           儲存修改
         </button>
       </div>
     </div>
   </div>
 );
}