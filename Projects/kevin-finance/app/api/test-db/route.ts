import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const assetCount = await prisma.asset.count();

        return NextResponse.json({
            success: true,
            assetCount,
        });
    } catch (error) {
        console.error("Database test failed:", error);

        return NextResponse.json(
            {
            success: false,
            error: String(error),
            },
            { status: 500 }
        );
    }
}