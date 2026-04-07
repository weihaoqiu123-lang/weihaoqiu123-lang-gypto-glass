import { NextResponse } from "next/server";
import { getOrderByOrderNo } from "@/lib/orders";

type RouteContext = {
  params: Promise<{ orderNo: string }>;
};

export async function GET(_: Request, context: RouteContext) {
  const { orderNo } = await context.params;
  const order = await getOrderByOrderNo(orderNo);

  if (!order) {
    return NextResponse.json({ error: "Order not found." }, { status: 404 });
  }

  return NextResponse.json({ order });
}
