import { Transaction, TransactionAction } from "@/types/Transaction";
import { getTransactions, getTransactionById } from "../repository";

export interface CreateTransactionResult {
    transaction?: Transaction;
    error?: string;
}

export function getAllTransactions(): Transaction[] {
    return getTransactions();
}

export function findTransactionById(id: string): Transaction | undefined {
    return getTransactionById(id);
}

export function transactionExists(id: string): boolean {
    return getTransactionById(id) !== undefined;
}   

export function createTransaction(
    assetId: string,
    date: string,
    action: TransactionAction,
    shares: number,
    price: number,
    fee: number,
    tax: number,
    note: string
): CreateTransactionResult {
    if (!assetId) {
        return {
            error: "請輸入有效的商品代號",
        };
    }

    if (!date) {
        return {
            error: "請選擇交易日期",
        };
    }

    if (!Number.isInteger(shares) || shares <= 0) {
        return {
            error: "股數必須是大於 0 的整數",
        };
    }

    if (!Number.isFinite(price) || price <= 0) {
        return {
            error: "成交價必須大於 0",
        };
    }

    if (!Number.isFinite(fee) || fee < 0) {
        return {
            error: "手續費不可小於 0",
        };
    }

    if (!Number.isFinite(tax) || tax < 0) {
        return {
            error: "證交稅不可小於 0",
        };
    }

    const transaction: Transaction = {
        id: crypto.randomUUID(),
        assetId,
        date,
        action,
        shares,
        price,
        fee,
        tax: action === "BUY" ? 0 : tax,
        note: note.trim(),
        createdAt: new Date().toISOString(),
    };

    return {
        transaction,
    };
}