import { NextResponse } from "next/server";
import { getOrderByOrderNo, markOrderPaid } from "@/lib/orders";
import { verifySolanaUsdcPayment } from "@/lib/solana-verify";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    orderNo?: string;
    txSignature?: string;
  };

  if (!body.orderNo?.trim()) {
    return NextResponse.json({ error: "Missing order number." }, { status: 400 });
  }

  if (!body.txSignature?.trim()) {
    return NextResponse.json({ error: "Missing transaction signature." }, { status: 400 });
  }

  const order = await getOrderByOrderNo(body.orderNo.trim());

  if (!order) {
    return NextResponse.json({ error: "Order not found." }, { status: 404 });
  }

  if (order.status === "paid") {
    return NextResponse.json({ order, alreadyPaid: true });
  }

  const verification = await verifySolanaUsdcPayment(order, body.txSignature.trim());

  if (!verification.ok) {
    return NextResponse.json({ error: verification.reason }, { status: 400 });
  }

  const updatedOrder = await markOrderPaid(body.orderNo.trim(), body.txSignature.trim());

  if (!updatedOrder) {
    return NextResponse.json({ error: "Unable to update order." }, { status: 500 });
  }

  return NextResponse.json({ order: updatedOrder });
}
