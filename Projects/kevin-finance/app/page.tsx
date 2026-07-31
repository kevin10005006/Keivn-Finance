import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";

export default function Home() {
 return (
   <div className="h-screen flex flex-col">
     <Header />

     <div className="flex flex-1">
       <Sidebar />

       <main className="flex-1 bg-gray-100 p-8">
         <h2 className="text-3xl font-bold mb-6">
           Kevin Finance
         </h2>

         <p className="text-gray-600 mb-8">
           歡迎使用個人資產管理系統
         </p>

         <div className="grid grid-cols-2 gap-6">
           <Link
             href="/investment"
             className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition"
           >
             <h3 className="text-xl font-semibold mb-2">
               📈 投資管理
             </h3>

             <p className="text-gray-500">
               ETF、股票、配息管理
             </p>
           </Link>

           <div className="bg-white rounded-xl shadow p-6">
             <h3 className="text-xl font-semibold mb-2">
               💰 記帳
             </h3>

             <p className="text-gray-500">
               （下一個 Sprint 開發）
             </p>
           </div>
         </div>
       </main>
     </div>
   </div>
 );
}