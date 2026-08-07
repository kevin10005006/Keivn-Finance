"use client";

import { useState } from "react";
import { useAssets } from "@/hooks/useAssets";

export default function AssetTable() {
  const { assets } = useAssets();

  const [editingAssetId, setEditingAssetId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editType, setEditType] = useState<"ETF" | "STOCK">("ETF");
  const [editMarket, setEditMarket] = useState("");

    return (
        <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">目前商品</h2>
        
            <table className="w-full border mt-6">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2">代號</th>
                        <th className="border p-2">名稱</th>
                        <th className="border p-2">類型</th>
                        <th className="border p-2">市場</th>
                        <th className="border p-2">操作</th>
                    </tr>
                </thead>

                <tbody>
                    {assets.map((asset) => (
                        <tr key={asset.id}>
                            <td className="border p-2">{asset.code}</td>
                            
                            <td className="border p-2">
                                {editingAssetId === asset.id ? (
                                    <input
                                        type="text"
                                        value={editName}
                                        onChange={(e) => setEditName(e.target.value)}
                                        className="w-full border rounded px-2 py-1"
                                    />    
                                ) : (
                                    asset.name
                                )}
                            </td>

                            <td className="border p-2">
                                {editingAssetId === asset.id ? (
                                    <select
                                        value={editType}
                                        onChange={(e) =>
                                            setEditType(e.target.value as "ETF" | "STOCK")
                                        }
                                        className="w-full border rounded px-2 py-1"
                                    >
                                        <option value="ETF">ETF</option>
                                        <option value="STOCK">STOCK</option>
                                    </select>
                                ) : (
                                    asset.type    
                                )}
                            </td>

                            <td className="border p-2">
                                {editingAssetId === asset.id ? (
                                    <input
                                        type="text"
                                        value={editMarket}
                                        onChange={(e) => setEditMarket(e.target.value)}
                                        className="w-full border rounded px-2 py-1"
                                    />    
                                ) : (
                                    asset.market
                                )}                                
                            </td>

                            <td className="border p-2">
                                {editingAssetId === asset.id ? (
                                    <button
                                        type="button"
                                        onClick={() => setEditingAssetId(null)}
                                        className="px-3 py-1 border rounded"
                                    >
                                        取消
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setEditingAssetId(asset.id);
                                            setEditName(asset.name);
                                            setEditType(asset.type);
                                            setEditMarket(asset.market);
                                        }}
                                        className="px-3 py-1 border rounded"                                        
                                    >
                                        編輯
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}