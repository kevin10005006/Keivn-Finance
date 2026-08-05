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