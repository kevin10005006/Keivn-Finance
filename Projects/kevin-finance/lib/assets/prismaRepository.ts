import { prisma } from "@/lib/prisma";
import type { Asset } from "@/types/Asset";

export async function getAllAssetsFromDb(): Promise<Asset[]> {
    const assets = await prisma.asset.findMany({
        orderBy: {
            createdAt: "asc",
        }
    });

    return assets.map((asset) => ({
        id: asset.id,
        code: asset.code,
        name: asset.name,
        type: asset.type as Asset["type"],
        market: asset.market,
        isActive: asset.isActive,
        createdAt: asset.createdAt,
    }));
}

export async function createAssetInDb(
    asset: Asset
): Promise<Asset> {
    const createdAsset = await prisma.asset.create({
        data: {
            id: asset.id,
            code: asset.code,
            name: asset.name,
            type: asset.type,
            market: asset.market,
            isActive: asset.isActive,
            createdAt: asset.createdAt,
        },
    });

    return {
        id: createdAsset.id,
        code: createdAsset.code,
        name: createdAsset.name,
        type: createdAsset.type as Asset["type"],
        market: createdAsset.market,
        isActive: createdAsset.isActive,
        createdAt: createdAsset.createdAt,
    };
}