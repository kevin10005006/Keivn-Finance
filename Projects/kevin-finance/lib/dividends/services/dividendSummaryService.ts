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