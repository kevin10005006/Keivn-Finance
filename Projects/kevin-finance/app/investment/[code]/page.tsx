import { etfs } from "@/lib/mock/etfs";
import { transactions } from "@/lib/mock/transactions";
import TransactionTable from "@/components/TransactionTable";

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

 if (!etf) {
   return <div className="p-8">找不到資料</div>;
 }

 return (
   <main className="p-8">
     <h1 className="text-3xl font-bold">
       {etf.code} {etf.name}
     </h1>

     <div className="mt-6 bg-white rounded shadow p-6">
       <p>持有張數：{etf.shares}</p>
       <p>平均成本：{etf.avgCost}</p>
       <p>
         投入成本：
         {etf.totalCost.toLocaleString()}
       </p>
     </div>

     <h2 className="text-2xl font-bold mt-8">
       交易紀錄
     </h2>

     <TransactionTable data={list} />
   </main>
 );
}