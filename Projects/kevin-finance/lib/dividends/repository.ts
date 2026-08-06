import { dividends } from "@/lib/mock/dividends";
import { Dividend } from "@/types/Dividend";

export function getDividends(): Dividend[] {
    return dividends;
}

export function getDividendById(
    id: string
): Dividend | undefined {
    return dividends.find(
        (dividend) => dividend.id == id
    );
}