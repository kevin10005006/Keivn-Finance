"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
 {
   href: "/investment/dashboard",
   label: "Dashboard",
 },
 {
   href: "/investment/assets",
   label: "商品管理",
 },
 {
   href: "/investment/transactions",
   label: "交易管理",
 },
  {
   href: "/investment/dividends",
   label: "配息管理",
 },
];

export default function InvestmentNav() {
 const pathname = usePathname();

 return (
   <nav className="border-b bg-white px-8 py-4">
     <div className="flex gap-6">
       {navItems.map((item) => {
         const isActive = pathname === item.href;

         return (
           <Link
             key={item.href}
             href={item.href}
             className={
               isActive
                 ? "font-semibold text-blue-600"
                 : "text-gray-600 hover:text-blue-600"
             }
           >
             {item.label}
           </Link>
         );
       })}
     </div>
   </nav>
 );
}