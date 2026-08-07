import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

interface RouteContext {
 params: Promise<{
   id: string;
 }>;
}

export async function PATCH(
 request: Request,
 context: RouteContext
) {
 try {
   const { id } = await context.params;
   const body = await request.json();

   const name = String(body.name ?? "").trim();
   const type = body.type;
   const market = String(body.market ?? "").trim();

   if (!name) {
     return NextResponse.json(
       {
         success: false,
         error: "商品名稱不得為空",
       },
       { status: 400 }
     );
   }

   if (
     type !== "ETF" &&
     type !== "STOCK"
   ) {
     return NextResponse.json(
       {
         success: false,
         error: "商品類型不正確",
       },
       { status: 400 }
     );
   }

   const existingAsset =
     await prisma.asset.findUnique({
       where: {
         id,
       },
     });

   if (!existingAsset) {
     return NextResponse.json(
       {
         success: false,
         error: "找不到商品",
       },
       { status: 404 }
     );
   }

   const updatedAsset =
     await prisma.asset.update({
       where: {
         id,
       },
       data: {
         name,
         type,
         market,
       },
     });

   return NextResponse.json({
     success: true,
     asset: updatedAsset,
   });
 } catch (error) {
   console.error("Update asset failed:", error);

   return NextResponse.json(
     {
       success: false,
       error: String(error),
     },
     { status: 500 }
   );
 }
}