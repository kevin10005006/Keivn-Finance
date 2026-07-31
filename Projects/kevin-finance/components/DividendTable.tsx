import { Dividend } from "@/types/dividend";

interface Props {
  data: Dividend[];
}

export default function DividendTable({ data }: Props) {
  return (
    <table className="w-full border bg-white mt-6"> 
     <thead className="bg-green-100">
        <tr>
            <th className="border p-2">配息日期</th>
            <th className="border p-2">金額</th>    
        </tr>
     </thead>
     <tbody>
        {data.map((item) => (
            <tr key={item.id}>
                <td className="border p-2">{item.date}</td>
                <td className="border p-2 text-right">{item.amount.toLocaleString()}</td>
            </tr>
        ))} 
     </tbody>
    </table>
  );
}