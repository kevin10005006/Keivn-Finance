"use client";

import DividendForm from "@/components/dividend/DividendForm";
import DividendTable from "@/components/dividend/DividendTable";
import DividendSummaryCards from "@/components/dividend/DividendSummaryCards";

export default function DividendsPage() {
    return (
        <main className="p-8">
            <h1 className="text-3x1 font-bold">
                配息管理
            </h1>

            <p className="mt-2 text-gray-600">
                管理 ETF 與股票的配息紀錄
            </p>

            <DividendSummaryCards />
            <DividendForm />
            <DividendTable />
        </main>
    );
}