import { NextResponse } from "next/server";
import { listOrders } from "@/lib/orders";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const mode = searchParams.get("mode");
  const q = searchParams.get("q")?.trim().toLowerCase() ?? "";

  const allOrders = await listOrders();
  const orders = allOrders.filter((order) => {
    const statusMatch =
      status === "paid" || status === "pending_payment" ? order.status === status : true;
    const modeMatch = mode === "fixed" || mode === "dynamic" ? order.purchaseMode === mode : true;
    const queryMatch =
      q.length === 0
        ? true
        : order.orderNo.toLowerCase().includes(q) ||
          order.walletAddress.toLowerCase().includes(q) ||
          order.receiverName.toLowerCase().includes(q) ||
          order.phone.toLowerCase().includes(q) ||
          order.address.toLowerCase().includes(q) ||
          order.paymentReference.toLowerCase().includes(q) ||
          order.txSignature?.toLowerCase().includes(q) === true;
    return statusMatch && modeMatch && queryMatch;
  });

  return new NextResponse(JSON.stringify(orders, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Disposition": 'attachment; filename="gypto-glass-orders.json"',
    },
  });
}
