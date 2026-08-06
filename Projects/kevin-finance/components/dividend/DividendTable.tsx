"use client";

import Panel from "@/components/ui/Panel";

export default function DividendTable() {
 return (
   <Panel className="mt-6">
     <h2 className="text-2xl font-bold">
       配息紀錄
     </h2>

     <div className="mt-6 overflow-x-auto">
       <table className="min-w-full border-collapse">
         <thead>
           <tr className="border-b bg-gray-50">
             <th className="px-4 py-3 text-left">商品</th>
             <th className="px-4 py-3 text-left">除息日</th>
             <th className="px-4 py-3 text-left">發放日</th>
             <th className="px-4 py-3 text-right">每股配息</th>
             <th className="px-4 py-3 text-right">股數</th>
             <th className="px-4 py-3 text-right">總配息</th>
             <th className="px-4 py-3 text-center">操作</th>
           </tr>
         </thead>

         <tbody>
           <tr>
             <td
               colSpan={7}
               className="py-10 text-center text-gray-500"
             >
               尚無配息資料
             </td>
           </tr>
         </tbody>
       </table>
     </div>
   </Panel>
 );
}