"use client";

import { useMemo } from "react";

import Panel from "@/components/ui/Panel";
import { useDividends } from "@/hooks/useDividends";
import {
 getAverageMonthlyDividend,
 getMonthDividend,
 getYearDividend,
} from "@/lib/dividends/services/dividendSummaryService";

export default function DashboardDividendSummary() {
 const { dividends } = useDividends();

 const now = new Date();
 const currentYear = now.getFullYear();
 const currentMonth = now.getMonth() + 1;

 const summary = useMemo(() => {
   return {
     year: getYearDividend(
       dividends,
       currentYear
     ),

     month: getMonthDividend(
       dividends,
       currentYear,
       currentMonth
     ),

     averageMonthly: getAverageMonthlyDividend(
       dividends,
       currentYear,
       currentMonth
     ),
   };
 }, [dividends, currentYear, currentMonth]);

 return (
   <Panel className="mt-6">
     <h2 className="text-2xl font-bold">
       配息摘要
     </h2>

     <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
       <div>
         <p className="text-sm text-gray-500">
           今年配息
         </p>

         <p className="mt-1 text-xl font-bold">
           NT$ {summary.year.toLocaleString()}
         </p>
       </div>

       <div>
         <p className="text-sm text-gray-500">
           本月配息
         </p>

         <p className="mt-1 text-xl font-bold">
           NT$ {summary.month.toLocaleString()}
         </p>
       </div>

       <div>
         <p className="text-sm text-gray-500">
           今年月平均
         </p>

         <p className="mt-1 text-xl font-bold">
           NT${" "}
           {Math.round(
             summary.averageMonthly
           ).toLocaleString()}
         </p>
       </div>
     </div>
   </Panel>
 );
}