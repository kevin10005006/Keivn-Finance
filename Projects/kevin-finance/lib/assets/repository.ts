import { Asset } from "@/types/Asset";

const assets: Asset[] = [
  {
    id: "1",
    code: "00712",
    name: "中信台灣高股息",
    type: "ETF",
    market: "TWSE",
    isActive: true,
    createdAt: "2023-01-01"
  },
  {
    id: "2",
    code: "2330",
    name: "台積電",
    type: "STOCK",
    market: "TWSE",
    isActive: true,
    createdAt: "2023-02-01"
  }
];

export function getAssets(): Asset[] {
  return assets;
}

export function getAssetByCode(code: string) {
  return assets.find((asset) => asset.code === code);
}