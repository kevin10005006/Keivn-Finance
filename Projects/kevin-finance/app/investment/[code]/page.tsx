import { notFound } from "next/navigation";

import { etfs } from "@/lib/mock/etfs";
import { transactions } from "@/lib/mock/transactions";
import { dividends } from "@/lib/mock/dividends";
import SummaryCards from "@/components/investment/SummaryCards";
import TransactionTable from "@/components/investment/TransactionTable";
import DividendTable from "@/components/investment/DividendTable";
import TransactionForm from "@/components/investment/TransactionForm";
import Card from "@/components/ui/Card"; 
import { Button } from "@/components/ui";
import InvestmentDetail from "@/components/investment/InvestmentDetail";

export default async function InvestmentPage({
 params,
}: {
 params: Promise<{ code: string }>;
}) {
 const { code } = await params;

 const etf = etfs.find((e) => e.code === code);

 if (!etf) {
   notFound();
 }

 const list = transactions.filter(
   (t) => t.assetCode === code
 );

 const dividendList = dividends.filter(
   (d) => d.assetCode === code
 );

 const totalDividend = dividendList.reduce(
   (sum, item) => sum + item.amount,
   0
 );

 const dividendYield = etf && etf.totalCost > 0
  ? (totalDividend / etf.totalCost) * 100 : 0;     

 return (
    <InvestmentDetail
        etf={etf}
        list={list}
        dividendList={dividendList}
        totalDividend={totalDividend}
        dividendYield={dividendYield} 
        />
 );
}