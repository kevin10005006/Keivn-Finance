"use client";

import {
 createContext,
 useContext,
 useMemo,
 useState,
 ReactNode,
} from "react";

import { Dividend } from "@/types/Dividend";
import { getAllDividends } from "@/lib/dividends/services/dividendService";

interface DividendContextType {
    dividends: Dividend[];
    setDividends: React.Dispatch<React.SetStateAction<Dividend[]>>;
}

const DividendContext = createContext<DividendContextType | undefined>(
 undefined
);

export function DividendProvider({
 children,
}: {
 children: ReactNode;
}) {
 const [dividends, setDividends] = useState<Dividend[]>(getAllDividends());

 const value = useMemo(
   () => ({
     dividends,
     setDividends,
   }),
   [dividends]
 );

 return (
   <DividendContext.Provider value={value}>
     {children}
   </DividendContext.Provider>
 );
}

export function useDividends() {
 const context = useContext(DividendContext);

 if (!context) {
   throw new Error(
     "useDividends 必須在 DividendProvider 內使用"
   );
 }

 return context;
}