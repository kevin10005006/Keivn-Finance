import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createAssetInDb, getAllAssetsFromDb } from "@/lib/assets/prismaRepository";
import { Asset } from "@/types/Asset";

export async function GET() {
    try {
        const assets = await getAllAssetsFromDb();

        return NextResponse.json({
            success: true,
            assets,
        });
    } catch (error) {
        console.error("Get assets failed:", error);

        return NextResponse.json(
            {
            success: false,
            error: String(error),
            },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
 try {
   const body = await request.json();

   const asset: Asset = {
     id: crypto.randomUUID(),
     code: String(body.code ?? "").trim(),
     name: String(body.name ?? "").trim(),
     type: body.type,
     market: String(body.market ?? "").trim(),
     isActive: true,
     createdAt: new Date().toISOString(),
   };

   if (!asset.code) {
     return NextResponse.json(
       {
         success: false,
         error: "商品代號不得為空",
       },
       { status: 400 }
     );
   }

   if (!asset.name) {
     return NextResponse.json(
       {
         success: false,
         error: "商品名稱不得為空",
       },
       { status: 400 }
     );
   }
   
   const existingAsset = await prisma.asset.findFirst({
    where: {
        code: asset.code,
    }
   });

   if (existingAsset) {
    return NextResponse.json(
        {
            success: false,
            error: `商品代號 ${asset.code} 已經存在`,
        },
        { status: 409}
    );
   }

   if (
     asset.type !== "ETF" &&
     asset.type !== "STOCK"
   ) {
     return NextResponse.json(
       {
         success: false,
         error: "商品類型不正確",
       },
       { status: 400 }
     );
   }

   const createdAsset =
     await createAssetInDb(asset);

   return NextResponse.json({
     success: true,
     asset: createdAsset,
   });
 } catch (error) {
   console.error("Create asset failed:", error);

   return NextResponse.json(
     {
       success: false,
       error: String(error),
     },
     { status: 500 }
   );
 }
}