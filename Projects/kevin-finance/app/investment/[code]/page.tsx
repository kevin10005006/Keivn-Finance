import { etfs } from "@/lib/mock/etfs";
import { transactions } from "@/lib/mock/transactions";
import TransactionTable from "@/components/TransactionTable";
import { dividends } from "@/lib/mock/dividends";
import DividendTable from "@/components/DividendTable";

export default async function InvestmentDetail({
 params,
}: {
 params: Promise<{ code: string }>;
}) {
 const { code } = await params;

 const etf = etfs.find((e) => e.code === code);

 const list = transactions.filter(
   (t) => t.assetCode === code
 );

 const dividendList = dividends.filter(
   (d) => d.assetCode === code
 );

 const totalDividend = dividendList.reduce(
   (sum, item) => sum + item.amount,
   0
 );

 const dividendYield = etf && etf.totalCost > 0
  ? (totalDividend / etf.totalCost) * 100 : 0;     

 if (!etf) {
   return <div className="p-8">找不到資料</div>;
 }

 return (
   <main className="p-8">
     <h1 className="text-3xl font-bold">
       {etf.code} {etf.name}
     </h1>

     <div className="mt-6 bg-white rounded shadow p-6">
         <div className="bg-white rounded shadow p-4">
            <p className="text-gray-500">持有張數</p>
            <p className="text-2x1 font-bold">{etf.shares} 張</p>
         </div>

         <div className="bg-white rounded shadow p-4">
            <p className="text-gray-500">平均成本</p>
            <p className="text-2x1 font-bold">{etf.avgCost.toFixed(2)}</p>
         </div>

         <div className="bg-white rounded shadow p-4">
            <p className="text-gray-500">投入成本</p>
            <p className="text-2x1 font-bold">{etf.totalCost.toLocaleString()}</p>
         </div>

         <div className="bg-white rounded shadow p-4">
            <p className="text-gray-500">累積配息</p>
            <p className="text-2x1 font-bold text-green-600">
                {totalDividend.toLocaleString()}</p>
         </div>

         <div className="bg-white rounded shadow p-4">
            <p className="text-gray-500">成本殖利率</p>
            <p className="text-2x1 font-bold text-green-600">
                {dividendYield.toFixed(2)}%
            </p>
         </div>                  
     </div>

     <h2 className="text-2xl font-bold mt-8">
       交易紀錄
     </h2>
     
     <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        + 新增交易
     </button>

     <TransactionTable data={list} />

     <h2 className="text-2xl font-bold mt-10">
       配息紀錄
     </h2>

     <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-green-700">
        + 新增配息
     </button>

     <DividendTable data={dividendList} />   
   </main>
 );
}