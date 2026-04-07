export type LeverageTier = {
  tier: "1x" | "2x" | "3x";
  depositUsdc: number;
  summary: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  symbol: string;
  supportedSymbols: string[];
  basePriceUsdc: number;
  priceRangeUsdc: string;
  depositWindow: string;
  shippingWindow: string;
  status: string;
  description: string;
  headline: string;
  colors: string[];
  highlights: string[];
  leverageTiers: LeverageTier[];
};

export const products: Product[] = [
  {
    id: "genesis-sol-signal",
    slug: "sol-signal-genesis-frame",
    name: "SOL SIGNAL // Genesis Frame",
    symbol: "SOL",
    supportedSymbols: ["BTC", "ETH", "SOL", "BNB"],
    basePriceUsdc: 14,
    priceRangeUsdc: "7 - 18.2 USDC",
    depositWindow: "7 days settlement + 24h final payment",
    shippingWindow: "Ships within 30 days after production",
    status: "Collector drop / V1",
    headline:
      "A sharp, low-profile sunglass silhouette designed for onchain identity and daily wear.",
    description:
      "This launch frame translates Solana-like speed and liquidity into a wearable object. The profile stays clean and premium while the buying flow introduces dynamic pricing and leverage-style deposits for crypto-native buyers.",
    colors: ["Vacuum Black", "Signal Mint", "Voltage Ice"],
    highlights: [
      "Solana USDC checkout only in V1",
      "Fixed buy and dynamic buy supported",
      "1x / 2x / 3x deposit tiers with capped final pricing",
      "No loans, no liquidations, no leverage trading backend",
    ],
    leverageTiers: [
      {
        tier: "1x",
        depositUsdc: 2,
        summary: "Lowest commitment, lowest movement amplification",
      },
      {
        tier: "2x",
        depositUsdc: 3,
        summary: "Balanced commitment and stronger dynamic pricing effect",
      },
      {
        tier: "3x",
        depositUsdc: 5,
        summary: "Highest commitment and strongest final price swing",
      },
    ],
  },
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}
