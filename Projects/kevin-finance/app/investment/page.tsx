//import Header from '@/components/Header';
//import Sildebar from '@/components/Sidebar';
import InvestmentTable from '@/components/InvestmentTable';
import { etfs } from '@/lib/mock/etfs';

export default function InvestmentPage() {
 return (
       <main className="p-8">
         <h1 className="text-3xl font-bold mb-6">
           ETF 投資管理
         </h1>

          <InvestmentTable data={etfs} />
        </main>
  );
}