import AssetForm from "@/components/asset/AssetForm";
import AssetTable from "@/components/asset/AssetTable";
import { AssetProvider } from "@/hooks/useAssets";

export default function AssetsPage() {
  return (
    <AssetProvider>
        <main className="p-8">
    
            <h1 className="text-3xl font-bold">商品管理</h1>
            <p className="mt-2 text-gray-600">
                建立 ETF 或股票商品資料。
            </p>
            <AssetForm />

            <AssetTable />
    
        </main>
    </AssetProvider>
  );
}