import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get("search");

  try {
    const symbols = await prisma.stockSymbol.findMany({
      where: search
        ? {
            OR: [
              { symbol_code: { contains: search } },
              { symbol_name: { contains: search } },
              { exchange: { contains: search } },
              { country_name: { contains: search } },
            ],
          }
        : undefined,
      orderBy: { symbol_code: "asc" },
    });

    return NextResponse.json(symbols);
  } catch (error) {
    console.error("Failed to fetch stock symbols:", error);
    return NextResponse.json(
      { error: "Failed to fetch stock symbols" },
      { status: 500 },
    );
  }
}
