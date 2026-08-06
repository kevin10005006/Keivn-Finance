"use client";

import { ReactNode } from "react";
import { AssetProvider } from "@/hooks/useAssets";
import { TransactionProvider } from "@/hooks/useTransactions";
import { DividendProvider } from "@/hooks/useDividends";
import InvestmentNav from "@/components/investment/InvestmentNav";

interface InvestmentLayoutProps {
 children: ReactNode;
}

export default function InvestmentLayout({
 children,
}: InvestmentLayoutProps) {
 return (
   <AssetProvider>
     <TransactionProvider>
        <DividendProvider>
            <InvestmentNav />

             {children}
        </DividendProvider>
     </TransactionProvider>
   </AssetProvider>
 );
}