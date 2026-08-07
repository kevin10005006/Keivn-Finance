import { Asset, AssetType } from '@/types/Asset';
import { getAssets, getAssetByCode } from '../repository';

export interface CreateAssetResult {
    asset?: Asset;
    error?: string;
}

export function getAllAssets(): Asset[] {
    return getAssets(); 
}

export function findAssetByCode(code: string): Asset | undefined {
    return getAssetByCode(code);
}

export function assetExists(code: string): boolean {
    return getAssetByCode(code) !== undefined;
}

export function createAsset(
    assets: Asset[],
    code: string,
    name: string,
    type: AssetType,
    market: string
): CreateAssetResult {
    const normalizedCode = code.trim().toUpperCase();
    const normalizedName = name.trim();

    if (!normalizedCode) {
        return {
            error: "請輸入商品代號",
        };
    }

    if (!normalizedName) {
        return {
            error: "請輸入商品名稱",
        };
    }

    const duplicated = assets.some(
        (asset) =>
            asset.code.trim().toUpperCase() === normalizedCode
    );

    if (duplicated) {
        return {
            error: `商品代號 ${normalizedCode} 已存在`,
        };
    }

    const asset: Asset = {
        id: crypto.randomUUID(),
        code: normalizedCode,
        name: normalizedName,
        type,
        market,
        isActive: false,
        createdAt: new Date().toISOString(),
    };

    return {
        asset,
    };
}

export interface UpdateAssetInput {
 name?: string;
 type?: AssetType;
 market?: string;
 isActive?: boolean;
}

export interface UpdateAssetResult {
 asset?: Asset;
 error?: string;
}

export async function updateAsset(
 id: string,
 data: UpdateAssetInput
): Promise<UpdateAssetResult> {
 try {
   const response = await fetch(`/api/assets/${id}`, {
     method: "PATCH",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(data),
   });

   const result = await response.json();

   if (!response.ok || !result.success) {
     return {
       error: result.error ?? "修改商品失敗",
     };
   }

   return {
     asset: result.asset,
   };
 } catch (error) {
   console.error("updateAsset failed:", error);

   return {
     error: "無法連線至伺服器",
   };
 }
}