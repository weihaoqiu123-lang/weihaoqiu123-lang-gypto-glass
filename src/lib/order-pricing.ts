import type { Product } from "@/data/products";

export type PurchaseMode = "fixed" | "dynamic";

export function getDepositForTier(product: Product, tier: "1x" | "2x" | "3x") {
  return product.leverageTiers.find((item) => item.tier === tier)?.depositUsdc ?? 0;
}

export function getFixedPrice(product: Product) {
  return product.basePriceUsdc;
}
