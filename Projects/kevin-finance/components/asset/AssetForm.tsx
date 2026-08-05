"use client";
import { useState } from "react";
import { AssetType } from "@/types/Asset";
import { useAssets } from "@/hooks/useAssets";
import { createAsset } from "@/lib/assets/services/assetService";

export default function AssetForm() {
 const [code, setCode] = useState("");
 const [name, setName] = useState("");
 const [type, setType] = useState("ETF");
 const [market, setMarket] = useState("TWSE");
 const [ error, setError] = useState("");

 const { assets, setAssets } = useAssets(); 

 function handleSubmit() {
   setError("");

   const result = createAsset(
    assets,
    code, 
    name, 
    type as AssetType, 
    market
  );

   if (result.error) {
     setError(result.error);
     return;
   }

   if (!result.asset) {
     setError("建立商品時發生未知錯誤");
     return;
   }

    setAssets([...assets, result.asset]);

    setCode("");
    setName("");
    setType("ETF");
    setMarket("TWSE");
 }

 return (
   <div className="border rounded-lg p-6 mt-6 bg-white">
      {error && (
        <div className="mb-4 rounded bg-red-100 border border-red-400 text-red-700 px-4 py-3">
          {error}
        </div>
      )}
     <div className="mb-4">
       <label className="block font-semibold mb-2">
         商品代號
       </label>

       <input
         className="border rounded w-full p-2"
         value={code}
         onChange={(e) => setCode(e.target.value)}
       />
     </div>

     <div className="mb-4">
       <label className="block font-semibold mb-2">
         商品名稱
       </label>

       <input
         className="border rounded w-full p-2"
         value={name}
         onChange={(e) => setName(e.target.value)}
       />
     </div>

     <div className="mb-4">

       <label className="block font-semibold mb-2">
         商品種類
       </label>

       <select
         className="border rounded w-full p-2"
         value={type}
         onChange={(e) => setType(e.target.value)}
       >
         <option value="ETF">ETF</option>
         <option value="STOCK">股票</option>
       </select>

     </div>

     <div className="mb-6">

       <label className="block font-semibold mb-2">
         市場
       </label>

       <select
         className="border rounded w-full p-2"
         value={market}
         onChange={(e) => setMarket(e.target.value)}
       >
         <option value="TWSE">TWSE</option>
         <option value="TPEx">TPEx</option>
       </select>

     </div>

     <button
       onClick={handleSubmit}
       className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
     >
       建立商品
     </button>

   </div>
 );
}
