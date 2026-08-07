import { Dividend } from "@/types/Dividend";

export interface DividendSummary {
    totalDividend: number;
    totalWithholdingTax: number;
    totalHandlingFee: number;
    netDividend: number;
}

export function calculateDividendSummary(
    dividends: Dividend[]
): DividendSummary {
    const totalDividend = dividends.reduce(
        (sum, dividend) => sum + dividend.totalDividend, 0
    );

    const totalWithholdingTax = dividends.reduce(
        (sum, dividend) => sum + dividend.withholdingTax, 0
    );

    const totalHandlingFee = dividends.reduce(
        (sum, dividend) => sum + dividend.handlingFee, 0
    );

    return {
        totalDividend,
        totalWithholdingTax,
        totalHandlingFee,
        netDividend:
          totalDividend - 
          totalWithholdingTax -
          totalHandlingFee, 
    };
}

export function getTotalDividend(
 dividends: Dividend[]
): number {
 return dividends.reduce(
   (sum, dividend) => sum + (dividend.totalDividend ?? 0),
   0
 );
}

export function getYearDividend(
 dividends: Dividend[],
 year: number
): number {
 return dividends
   .filter((dividend) => {
     if (!dividend.paymentDate) {
       return false;
     }

     return dividend.paymentDate.startsWith(
       `${year}-`
     );
   })
   .reduce(
     (sum, dividend) =>
       sum + (dividend.totalDividend ?? 0),
     0
   );
}

export function getMonthDividend(
 dividends: Dividend[],
 year: number,
 month: number
): number {
 const yearMonth =
   `${year}-${String(month).padStart(2, "0")}`;

 return dividends
   .filter((dividend) => {
     if (!dividend.paymentDate) {
       return false;
     }

     return dividend.paymentDate.startsWith(
       `${yearMonth}-`
     );
   })
   .reduce(
     (sum, dividend) =>
       sum + (dividend.totalDividend ?? 0),
     0
   );
}

export function getAverageMonthlyDividend(
    dividends: Dividend[],
    year: number,
    throughMonth: number
): number {
    if (throughMonth <= 0) {
        return 0;
    }

    const yearDividend = getYearDividend(
        dividends,
        year
    );

    return yearDividend / throughMonth;
}