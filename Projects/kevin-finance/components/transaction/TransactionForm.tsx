"use client";
import { useMemo, useState } from "react";
import { useAssets } from "@/hooks/useAssets";
import { TransactionAction } from "@/types/Transaction";
import { useTransactions } from "@/hooks/useTransactions";
import { createTransaction } from "@/lib/transactions/services/transactionService";
import { calculatePosition, validateSellShares } from "@/lib/transactions/services/positionService";

export default function TransactionForm() {
    const { assets } = useAssets();
    const { transactions, setTransactions } = useTransactions();
    const [tradeDate, setTradeDate] = useState(
        new Date().toISOString().split("T")[0]
    );
    const [assetCode, setAssetCode] = useState("");
    const [action, setAction] = useState<TransactionAction>("BUY");
    const [shares, setShares] = useState("");
    const [price, setPrice] = useState("");
    const [fee, setFee] = useState("");
    const [tax, setTax] = useState("");
    const [note, setNote] = useState("");
    const [error, setError] = useState("");

    const selectedAsset = useMemo(() => {
        const normalizedCode = assetCode.trim().toUpperCase();

        if (!normalizedCode) {
            return undefined;
        }

        return assets.find(
            (asset) => 
                asset.code.toUpperCase() === assetCode.trim().toUpperCase(),
        );
    }, [assetCode, assets]);

    const positionSummary = useMemo(() => {
        if (!selectedAsset) {
            return null;
        }

        return calculatePosition(
            transactions,
            selectedAsset.id
        );
    }, [transactions, selectedAsset]);

    function handleSubmit() {
        setError("");
        
        if (action == "SELL") {
            if (!selectedAsset || !positionSummary) {
                setError("請輸入有效的商品代號");
                return;
            }

            const sellShares = Number(shares);
            const sellError = validateSellShares(
                positionSummary.shares,
                sellShares
            );

            if (sellError) {
                setError(sellError);
                return;
            }
        }

        const result = createTransaction(
            selectedAsset?.id ?? "",
            tradeDate,
            action,
            Number(shares),
            Number(price),
            fee.trim() === "" ? 0 : Number(fee),
            tax.trim() === "" ? 0 : Number(tax),
            note
        );

        if (result.error) {
            setError(result.error);
            return;
        }

        if (!result.transaction) {
            setError("建立交易時發生未知錯誤");
            return;
        }

        const newTransaction = result.transaction;

        setTransactions([
            ...transactions,
            newTransaction,
        ]);

        setAssetCode("");
        setAction("BUY");
        setShares("");
        setPrice("");
        setFee("");
        setTax("");
        setNote("");
    }    

  return (
    <div className="border rounded-lg p-6 mt-6 bg-white">
        <h2 className="text-2x1 font-bold mb-6">
            新增交易
        </h2>
        
        {error && (
            <div className="mb-6 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
                {error}
            </div>
        )}

        <div className="space-y-6">
            <div>
                <label className="block font-semibold mb-2">
                    交易日期
                </label>
                <input
                    type="date"
                    className="border rounded w-full p-2"
                    value={tradeDate}
                    onChange={(e) => setTradeDate(e.target.value)}
                />
            </div>

            <div>
                <label className="block font-semibold mb-2">
                    商品代號
                </label>
                <input
                    className="border rounded w-full p-2"
                    value={assetCode}
                    onChange={(e) => setAssetCode(e.target.value)}
                    placeholder="例如: 00712"
                />
            </div>

            <div>
                <label className="block font-semibold mb-2">
                    商品名稱
                </label>
                <input
                    className="border rounded w-full p-2 bg-gray-100"
                    value={selectedAsset?.name ?? ""}
                    placeholder="輸入有效商品代號後自動顯示"
                    readOnly
                />
            </div>

            {selectedAsset && positionSummary && (
                <div className="grid grid-cols-2 gap-4 rounded-lg bg-gray-50 p-4 lg:grid-cols-4">
                    <div>
                        <p className="text-sm text-gray-500">
                        目前持有股數
                        </p>

                        <p className="text-lg font-bold">
                        {positionSummary.shares.toLocaleString()} 股
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">
                        持有成本
                        </p>

                        <p className="text-lg font-bold">
                        {positionSummary.totalCost.toLocaleString()}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">
                        平均成本
                        </p>

                        <p className="text-lg font-bold">
                        {positionSummary.averageCost.toFixed(2)}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">
                        已實現損益
                        </p>

                        <p className="text-lg font-bold">
                        {positionSummary.realizedProfit.toLocaleString()}
                        </p>
                    </div>
                </div>
            )}

            <div>
                <p className="block font-semibold mb-2">
                    交易類型
                </p>    

                <div className="flex gap-6">
                    <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            name="transactionAction"
                            value="BUY"
                            checked={action === "BUY"}
                            onChange={() => setAction("BUY")}
                        />

                        買進
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            name="transactionAction"
                            value="SELL"
                            checked={action === "SELL"}
                            onChange={() => setAction("SELL")}
                        />

                        賣出
                    </label>
                </div>
            </div>

            <div>
                <label className="block font-semibold mb-2">
                    股數
                </label>

                <input
                    type="number"
                    min="1"
                    step="1"
                    className="border rounded w-full p-2"
                    value={shares}
                    onChange={(e) => setShares(e.target.value)}
                    placeholder="例如: 1000"
                />
            </div>

            <div>
                <label className="block font-semibold mb-2">
                    成交價 (每股)
                </label>

                <input
                    type="number"
                    min="0"
                    step="0.01"
                    className="border rounded w-full p-2"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="例如: 10.58"
                />
            </div>        

            <div>
                <label className="block font-semibold mb-2">
                    手續費
                </label>

                <input
                    type="number"
                    min="0"
                    step="1"
                    className="border rounded w-full p-2"
                    value={fee}
                    onChange={(e) => setFee(e.target.value)}
                    placeholder="例如: 20"
                />
            </div>  

            {action === "SELL" && (
                <div>
                    <label className="block font-semibold mb-2">
                        證交稅
                    </label>

                    <input
                        type="number"
                        min="0"
                        step="1"
                        className="border rounded w-full p-2"
                        value={tax}
                        onChange={(e) => setTax(e.target.value)}
                        placeholder="例如: 35"
                    />
                </div>              
            )}

            <div>
                <label className="block font-semibold mb-2">
                    備註
                </label>

                <input
                    className="border rounded w-full p-2"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="例如: 定期投入、停利賣出"
                />
            </div>    

            <div className="flex justify-end"  >
                <button
                    type="button"
                    onClick={handleSubmit}
                    className="rounded bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
                >
                    新增交易
                </button>
            </div>    
        </div>
    </div>
  );
}
