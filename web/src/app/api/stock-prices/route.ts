import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get("search");
  const source = searchParams.get("source");

  try {
    const prices = await prisma.dailyStockPrice.findMany({
      where: {
        ...(search
          ? {
              OR: [
                { symbol_code: { contains: search } },
                { symbol_name: { contains: search } },
                { exchange: { contains: search } },
              ],
            }
          : {}),
        ...(source ? { source } : {}),
      },
      orderBy: { date: "desc" },
    });

    return NextResponse.json(prices);
  } catch (error) {
    console.error("Failed to fetch stock prices:", error);
    return NextResponse.json(
      { error: "Failed to fetch stock prices" },
      { status: 500 },
    );
  }
}
