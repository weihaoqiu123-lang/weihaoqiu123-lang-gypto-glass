import { NextRequest, NextResponse } from "next/server";

type BinanceKline = [
  number,
  string,
  string,
  string,
  string,
  string,
  number,
  string,
  number,
  string,
  string,
  string,
];

export async function GET(request: NextRequest) {
  const symbol = request.nextUrl.searchParams.get("symbol")?.trim().toUpperCase();
  const interval = request.nextUrl.searchParams.get("interval")?.trim() || "4h";
  const limit = request.nextUrl.searchParams.get("limit")?.trim() || "42";

  if (!symbol) {
    return NextResponse.json({ error: "Missing symbol." }, { status: 400 });
  }

  const response = await fetch(
    `https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=${interval}&limit=${limit}`,
    { cache: "no-store" },
  );

  if (!response.ok) {
    return NextResponse.json({ error: "Unable to load market data." }, { status: 502 });
  }

  const data = (await response.json()) as BinanceKline[];

  const points = data.map((item) => ({
    openTime: item[0],
    open: Number(item[1]),
    high: Number(item[2]),
    low: Number(item[3]),
    close: Number(item[4]),
    volume: Number(item[5]),
    closeTime: item[6],
  }));

  return NextResponse.json({
    symbol,
    interval,
    points,
  });
}
