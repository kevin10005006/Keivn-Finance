"use client";

import { useMemo, useState } from "react";

import Panel from "@/components/ui/Panel";
import { useDividends } from "@/hooks/useDividends";
import {
 getMonthDividend,
 getTotalDividend,
 getYearDividend,
 getAverageMonthlyDividend,
} from "@/lib/dividends/services/dividendSummaryService";

export default function DividendSummaryCards() {
 const { dividends } = useDividends();

 const now = new Date();
 const currentYear = now.getFullYear();
 const currentMonth = now.getMonth() + 1;

 const [selectedYear, setSelectedYear] =
    useState(currentYear);

 const [selectedMonth, setSelectedMonth] =
    useState(currentMonth);   

 const summary = useMemo(() => {
   return {
     total: getTotalDividend(dividends),
     year: getYearDividend(
       dividends,
       selectedYear
     ),
     month: getMonthDividend(
       dividends,
       selectedYear,
       selectedMonth
     ),
     averageMobthly: getAverageMonthlyDividend(
        dividends,
        selectedYear,
        selectedMonth
     ),
   };
 }, [dividends, selectedYear, selectedMonth]);

 const cards = [
   {
     title: "今年配息",
     value: `NT$ ${summary.year.toLocaleString()}`,
   },
   {
     title: "本月配息",
     value: `NT$ ${summary.month.toLocaleString()}`,
   },
   {
     title: "今年月平均",
     value: `NT$ ${Math.round(
        summary.averageMobthly
     ).toLocaleString()}`
   },   
   {
     title: "累計配息",
     value: `NT$ ${summary.total.toLocaleString()}`,
   },
   {
     title: "配息筆數",
     value: `${dividends.length} 筆`,
   },
 ];  

 return (
   <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
     <div className="mt-6 flex flex-wrap gap-4">
        <select
            value={selectedYear}
            onChange={(e) =>
                setSelectedYear(Number(e.target.value))
            }
            className="rounded-md border px-3 py-2"
        >
            <option value={2024}>2024</option>
            <option value={2025}>2025</option>
            <option value={2026}>2026</option>
            <option value={2027}>2027</option>
        </select>

        <select
            value={selectedMonth}
            onChange={(e) =>
                setSelectedMonth(Number(e.target.value))
            }
            className="rounded-md border px-3 py-2"
        >
            {Array.from({ length: 12}, (_, index) => {
                const month = index + 1;

                return (
                    <option
                        key={month}
                        value={month}
                    >
                        {month} 月
                    </option>
                );
            })}
        </select>
     </div>

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