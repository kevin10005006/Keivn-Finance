"use client";
import { useState } from "react";
import SummaryCards from "./SummaryCards";
import TransactionTable from "./TransactionTable";
import DividendTable from "./DividendTable";
import TransactionForm from "./TransactionForm";
import { Button } from "../ui";
import Modal from "../ui/Modal";

interface InvestmentDetailProps {
    etf: any;
    list: any[];
    dividendList: any[];
    totalDividend: number;
    dividendYield: number;  
}

export default function InvestmentDetail({
    etf,
    list,
    dividendList,
    totalDividend,
    dividendYield,
}: InvestmentDetailProps) {
  const [open, setOpen] = useState(false);
  console.log(open);
  return (
    <main>
      <h1 className="text-3xl font-bold">
        {etf.code} {etf.name}
      </h1>

      <SummaryCards
        shares={etf.shares}
        avgCost={etf.avgCost}
        totalCost={etf.totalCost}
        totalDividend={totalDividend}
        dividendYield={dividendYield}
      /> 

      {/* 交易紀錄 */}
      <div className="flex justify-between items-center mt-10">
        <h2 className="text-2xl font-bold">
         交易紀錄
        </h2>

        <Button onClick={() => setOpen(true)}>
            + 新增交易
        </Button>   
      </div>
      <TransactionTable data={list} />

      <Modal open={open} onClose={() => setOpen(false)} title="新增交易">
        <TransactionForm />
      </Modal>
    </main>
  );
}   