import { Transaction } from "@/types/transaction";

interface Props {
  data: Transaction[];
}

export default function TransactionTable({ data }: Props) {
  return (
    <table className="w-full border bg-white mt-6"> 
     <thead className="bg-gray-100">
        <tr>
            <th className="border p-2">日期</th>
            <th className="border p-2">價格</th>
            <th className="border p-2">張數</th>
            <th className="border p-2">金額</th>    
        </tr>
     </thead>

     <tbody>     
        {data.map((item) => (
            <tr key={item.id}>
                <td className="border p-2">{item.date}</td>   
                <td className="border p-2 text-right">{item.price}</td>
                <td className="border p-2 text-right">{item.shares}</td>
                <td className="border p-2 text-right">{item.amount.toLocaleString()}</td>
            </tr>
        ))}
     </tbody>
    </table>    
);
}