"use client";
import { useAssets } from "@/hooks/useAssets";

export default function AssetTable() {
  const { assets } = useAssets();

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
                    </tr>
                </thead>

                <tbody>
                    {assets.map((asset) => (
                        <tr key={asset.id}>
                            <td className="border p-2">{asset.code}</td>
                            <td className="border p-2">{asset.name}</td>
                            <td className="border p-2">{asset.type}</td>
                            <td className="border p-2">{asset.market}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}