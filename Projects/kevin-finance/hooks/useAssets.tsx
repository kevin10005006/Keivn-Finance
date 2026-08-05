"use client";

import {
 createContext,
 useContext,
 useMemo,
 useState,
 ReactNode,
} from "react";

import { Asset } from "@/types/Asset";
import { getAllAssets } from "@/lib/assets/services/assetService";

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
 const [assets, setAssets] = useState<Asset[]>(getAllAssets());

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