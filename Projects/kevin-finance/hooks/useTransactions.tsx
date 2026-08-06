"use client";

import {
 createContext,
 useContext,
 useMemo,
 useState,
 ReactNode,
} from "react";

import { Transaction } from "@/types/Transaction";
import { getAllTransactions } from "@/lib/transactions/services/transactionService";

interface TransactionContextType {
 transactions: Transaction[];
 setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
}

const TransactionContext = createContext<TransactionContextType | undefined>(
 undefined
);

export function TransactionProvider({
 children,
}: {
 children: ReactNode;
}) {
 const [transactions, setTransactions] = useState(getAllTransactions());

 const value = useMemo(
   () => ({
     transactions,
     setTransactions,
   }),
   [transactions]
 );

 return (
   <TransactionContext.Provider value={value}>
     {children}
   </TransactionContext.Provider>
 );
}

export function useTransactions() {
 const context = useContext(TransactionContext);

 if (!context) {
   throw new Error(
     "useTransactions 必須在 TransactionProvider 內使用"
   );
 }

 return context;
}