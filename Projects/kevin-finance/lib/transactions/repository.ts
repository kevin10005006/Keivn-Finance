import { transactions } from "../mock/transactions";
import { Transaction } from "@/types/transaction";

export function getTransactions(): Transaction[] {
  return transactions;
}

export function getTransactionById(id: string): Transaction | undefined {
  return transactions.find((transaction) => transaction.id === id);
}