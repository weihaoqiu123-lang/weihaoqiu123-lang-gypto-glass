import type { OrderRecord } from "@/lib/orders";
import { paymentConfig } from "@/lib/payment-config";

export function buildSolanaPayUrl(order: OrderRecord) {
  if (!paymentConfig.merchantWallet) {
    return "";
  }

  const params = new URLSearchParams({
    amount: String(order.amountUsdc),
    "spl-token": paymentConfig.tokenMint,
    reference: order.paymentReference,
    label: "Gypto-Glass",
    message: `${order.productName} / ${order.orderNo}`,
    memo: order.orderNo,
  });

  return `solana:${paymentConfig.merchantWallet}?${params.toString()}`;
}
