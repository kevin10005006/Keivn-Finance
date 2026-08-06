import { AssetProvider } from "@/hooks/useAssets";
import { TransactionProvider } from "@/hooks/useTransactions";
import TransactionForm from "@/components/transaction/TransactionForm";
import TransactionTable from "@/components/transaction/TransactionTable";

export default function TransactionsPage() {
  return (
    <AssetProvider>
        <TransactionProvider>
            <div className="p-8">
                <h1 className="text-3xl font-bold">交易管理</h1>
                
                <p className="mt-2 text-gray-600">
                管理 ETF 與股票的買進/賣出紀錄
                </p>

                <TransactionForm />

                <TransactionTable />
            </div>
        </TransactionProvider>
    </AssetProvider>
  );
}