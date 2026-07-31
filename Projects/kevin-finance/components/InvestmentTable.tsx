import { Investment } from "@/types/investment";
import Link from "next/link";

interface Props {
  data: Investment[];
}

export default function InvestmentTable({ data }: Props) {
  return (
    <table className="w-full border-gray-300 bg-white">     
     <thead className="bg-blue-100">
        <tr>
            <th className="border p-2">代號</th>
            <th className="border p-2">名稱</th>
            <th className="border p-2">持有張數</th>
            <th className="border p-2">平均成本</th>
            <th className="border p-2">投入成本</th>
        </tr>
     </thead>
     <tbody>
        {data.map((item) => (
            <tr key={item.code}>
                <td className="border p-2">
                    <Link href={`/investment/${item.code}`} 
                    className="text-blue-600 hover:underline">
                        {item.code}
                    </Link>
                </td>
                <td className="border p-2">{item.name}</td>
                <td className="border p-2 text-right">{item.shares}</td>
                <td className="border p-2 text-right">{item.avgCost}</td>
                <td className="border p-2 text-right">{item.totalCost.toLocaleString()}</td>
            </tr>
        ))}
     </tbody>
  </table>
 );
}