"use client";

import { ReactNode } from "react";
import { AssetProvider } from "@/hooks/useAssets";
import { TransactionProvider } from "@/hooks/useTransactions";
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
        <InvestmentNav />
        
       {children}
     </TransactionProvider>
   </AssetProvider>
 );
}