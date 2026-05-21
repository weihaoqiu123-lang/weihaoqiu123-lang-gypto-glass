import { NextResponse } from "next/server";
import { getProductBySlug } from "@/data/products";
import { createOrder, listOrders } from "@/lib/orders";
import { getBinanceSpotPriceUsdt } from "@/lib/binance-market";
import { getDepositForTier, getFixedPrice } from "@/lib/order-pricing";
import { getCurrentWeeklySettlementCycle } from "@/lib/settlement-cycle";

export async function GET() {
  return NextResponse.json({ orders: await listOrders() });
}

export async function POST(request: Request) {
  const body = (await request.json()) as {
    slug?: string;
    walletAddress?: string;
    purchaseMode?: "fixed" | "dynamic";
    leverageTier?: "1x" | "2x" | "3x";
    receiverName?: string;
    phone?: string;
    address?: string;
  };

  if (!body.slug) {
    return NextResponse.json({ error: "Missing product slug." }, { status: 400 });
  }

  const product = getProductBySlug(body.slug);

  if (!product) {
    return NextResponse.json({ error: "Product not found." }, { status: 404 });
  }

  if (!body.walletAddress?.trim()) {
    return NextResponse.json({ error: "Wallet connection is required." }, { status: 400 });
  }

  if (!body.receiverName?.trim() || !body.phone?.trim() || !body.address?.trim()) {
    return NextResponse.json(
      { error: "Receiver name, phone, and address are required." },
      { status: 400 },
    );
  }

  if (body.purchaseMode !== "fixed" && body.purchaseMode !== "dynamic") {
    return NextResponse.json({ error: "Invalid purchase mode." }, { status: 400 });
  }

  const amountUsdc =
    body.purchaseMode === "fixed"
      ? getFixedPrice(product)
      : getDepositForTier(product, body.leverageTier ?? "1x");

  if (!amountUsdc) {
    return NextResponse.json({ error: "Invalid leverage tier." }, { status: 400 });
  }

  let referenceSymbol: string | undefined;
  let entryPriceUsd: number | undefined;
  let cycleStartAt: string | undefined;
  let settlementAt: string | undefined;
  let finalPaymentDeadline: string | undefined;

  if (body.purchaseMode === "dynamic") {
    referenceSymbol = product.symbol;

    try {
      const market = await getBinanceSpotPriceUsdt(referenceSymbol);
      const cycle = getCurrentWeeklySettlementCycle();

      entryPriceUsd = market.price;
      cycleStartAt = cycle.cycleStartAt;
      settlementAt = cycle.settlementAt;
      finalPaymentDeadline = cycle.finalPaymentDeadline;
    } catch (error) {
      return NextResponse.json(
        {
          error:
            error instanceof Error
              ? error.message
              : "Unable to create a dynamic order right now.",
        },
        { status: 502 },
      );
    }
  }

  const order = await createOrder({
    productId: product.id,
    productName: product.name,
    walletAddress: body.walletAddress.trim(),
    purchaseMode: body.purchaseMode,
    referenceSymbol,
    entryPriceUsd,
    leverageTier: body.purchaseMode === "dynamic" ? body.leverageTier ?? "1x" : undefined,
    depositUsdc: body.purchaseMode === "dynamic" ? amountUsdc : undefined,
    amountUsdc,
    receiverName: body.receiverName.trim(),
    phone: body.phone.trim(),
    address: body.address.trim(),
    cycleStartAt,
    settlementAt,
    finalPaymentDeadline,
  });

  return NextResponse.json({ order });
}
