"use client";

import DashboardRecentTransactions from "@/components/dashboard/DashboardRecentTransactions";
import DashboardPositionTable from "@/components/dashboard/DashboardPositionTable";
import DashboardSummaryCards from "@/components/dashboard/DashboardSummaryCards";
import DashboardDividendSummary from "@/components/dividend/DashboardDividendSummary";

export default function dashboardPage() {
    return (
        <main className="p-8">
            <h1 className="text-3x1 font-bold">
                Dashboard
            </h1>

            <p className="mt-2 text-gray-600">
                投資總攬
            </p>

            <DashboardSummaryCards />

            <DashboardDividendSummary />

            <DashboardPositionTable />

            <DashboardRecentTransactions />
        </main>
    )
}