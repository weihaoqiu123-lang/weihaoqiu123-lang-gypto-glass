import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { Keypair } from "@solana/web3.js";

export type CreateOrderInput = {
  productId: string;
  productName: string;
  walletAddress: string;
  purchaseMode: "fixed" | "dynamic";
  referenceSymbol?: string;
  entryPriceUsd?: number;
  leverageTier?: "1x" | "2x" | "3x";
  depositUsdc?: number;
  amountUsdc: number;
  receiverName: string;
  phone: string;
  address: string;
  cycleStartAt?: string;
  settlementAt?: string;
  finalPaymentDeadline?: string;
};

export type OrderRecord = CreateOrderInput & {
  id: string;
  orderNo: string;
  paymentReference: string;
  paymentToken: "USDC";
  chain: "Solana";
  status: "pending_payment" | "paid";
  paidAt?: string;
  txSignature?: string;
  createdAt: string;
};

const DATA_DIR = path.join(process.cwd(), "data");
const ORDERS_FILE = path.join(DATA_DIR, "orders.json");

async function ensureOrdersFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });

  try {
    await fs.access(ORDERS_FILE);
  } catch {
    await fs.writeFile(ORDERS_FILE, "[]", "utf8");
  }
}

async function readOrders() {
  await ensureOrdersFile();
  const raw = await fs.readFile(ORDERS_FILE, "utf8");
  return JSON.parse(raw) as OrderRecord[];
}

async function writeOrders(orders: OrderRecord[]) {
  await ensureOrdersFile();
  await fs.writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2), "utf8");
}

export async function createOrder(input: CreateOrderInput) {
  const now = new Date();
  const order: OrderRecord = {
    ...input,
    id: randomUUID(),
    orderNo: `GG-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(
      now.getDate(),
    ).padStart(2, "0")}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
    paymentReference: Keypair.generate().publicKey.toBase58(),
    paymentToken: "USDC",
    chain: "Solana",
    status: "pending_payment",
    createdAt: now.toISOString(),
  };

  const orders = await readOrders();
  orders.unshift(order);
  await writeOrders(orders);

  return order;
}

export async function listOrders() {
  return readOrders();
}

export async function getOrderByOrderNo(orderNo: string) {
  const orders = await readOrders();
  return orders.find((order) => order.orderNo === orderNo);
}

export async function markOrderPaid(orderNo: string, txSignature: string) {
  const orders = await readOrders();
  const index = orders.findIndex((order) => order.orderNo === orderNo);

  if (index === -1) {
    return null;
  }

  const nextOrder: OrderRecord = {
    ...orders[index],
    status: "paid",
    paidAt: new Date().toISOString(),
    txSignature,
  };

  orders[index] = nextOrder;
  await writeOrders(orders);

  return nextOrder;
}
