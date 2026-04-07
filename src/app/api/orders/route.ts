import { NextResponse } from "next/server";
import { getProductBySlug } from "@/data/products";
import { createOrder, listOrders } from "@/lib/orders";
import { getDepositForTier, getFixedPrice } from "@/lib/order-pricing";

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

  const order = await createOrder({
    productId: product.id,
    productName: product.name,
    walletAddress: body.walletAddress.trim(),
    purchaseMode: body.purchaseMode,
    leverageTier: body.purchaseMode === "dynamic" ? body.leverageTier ?? "1x" : undefined,
    depositUsdc: body.purchaseMode === "dynamic" ? amountUsdc : undefined,
    amountUsdc,
    receiverName: body.receiverName.trim(),
    phone: body.phone.trim(),
    address: body.address.trim(),
  });

  return NextResponse.json({ order });
}
