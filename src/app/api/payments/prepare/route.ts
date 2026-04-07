import { NextResponse } from "next/server";
import { getOrderByOrderNo } from "@/lib/orders";
import { paymentConfig, paymentReadiness } from "@/lib/payment-config";
import { buildSolanaPayUrl } from "@/lib/solana-pay";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    orderNo?: string;
  };

  if (!body.orderNo?.trim()) {
    return NextResponse.json({ error: "Missing order number." }, { status: 400 });
  }

  const order = await getOrderByOrderNo(body.orderNo.trim());

  if (!order) {
    return NextResponse.json({ error: "Order not found." }, { status: 404 });
  }

  return NextResponse.json({
    orderNo: order.orderNo,
    amountUsdc: order.amountUsdc,
    walletAddress: order.walletAddress,
    paymentReference: order.paymentReference,
    paymentUrl: buildSolanaPayUrl(order),
    payment: {
      chain: paymentConfig.chain,
      token: paymentConfig.token,
      tokenMint: paymentConfig.tokenMint,
      merchantWallet: paymentConfig.merchantWallet,
      rpcUrl: paymentConfig.rpcUrl,
      readiness: paymentReadiness(),
    },
  });
}
