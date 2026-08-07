"use client";

import {
 createContext,
 useContext,
 useEffect,
 useMemo,
 useState,
 ReactNode,
} from "react";

import { Asset } from "@/types/Asset";

interface AssetContextType {
 assets: Asset[];
 setAssets: React.Dispatch<React.SetStateAction<Asset[]>>;
}

const AssetContext = createContext<AssetContextType | undefined>(
 undefined
);

export function AssetProvider({
 children,
}: {
 children: ReactNode;
}) {
 const [assets, setAssets] = useState<Asset[]>([]);

 useEffect(() => {
  async function loadAssets() {
    try {
      const response = await fetch("/api/assets");

      if (!response.ok) {
        throw new Error("讀取商品資料失敗");
      }

      const result = await response.json();

      setAssets(result.assets ?? []);
    } catch (error) {
      console.error("Load assets failed:", error);
    }
  }

  loadAssets();
 }, []);

 const value = useMemo(
   () => ({
     assets,
     setAssets,
   }),
   [assets]
 );

 return (
   <AssetContext.Provider value={value}>
     {children}
   </AssetContext.Provider>
 );
}

export function useAssets() {
 const context = useContext(AssetContext);

 if (!context) {
   throw new Error(
     "useAssets 必須在 AssetProvider 內使用"
   );
 }

 return context;
}