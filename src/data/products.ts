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
  sizes: {
    value: string;
    fit: string;
  }[];
  highlights: string[];
  leverageTiers: LeverageTier[];
  heroImage: string;
  galleryImages: string[];
  lifestyleImage: string;
  frameCode: string;
};

const baseLeverageTiers: LeverageTier[] = [
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
];

function buildProductAssets(slug: string) {
  return {
    heroImage: `/products/${slug}/front.jpg`,
    galleryImages: [
      `/products/${slug}/front.jpg`,
      `/products/${slug}/angle.jpg`,
      `/products/${slug}/side.jpg`,
      `/products/reference/elder-style-reference.png`,
    ],
    lifestyleImage: `/products/reference/elder-style-reference.png`,
  };
}

export const products: Product[] = [
  {
    id: "pr7789-c4",
    slug: "pr7789-c4",
    name: "PR7789 C4",
    frameCode: "PR7789 C4",
    symbol: "FRAME",
    supportedSymbols: ["FRAME"],
    basePriceUsdc: 16,
    priceRangeUsdc: "10 - 20 USDC",
    depositWindow: "Weekly UTC settlement + 24h final payment",
    shippingWindow: "Ships within 30 days after production",
    status: "Reading frame / First batch",
    headline: "Angular tortoise reading frame with a stronger geometric front.",
    description:
      "PR7789 C4 brings a sharper hexagonal reading silhouette into the first batch. The tortoise shell pattern is warmer and more expressive, while the front view stays broad enough for an easy everyday fit.",
    colors: ["C4"],
    sizes: [
      { value: "44", fit: "Narrow" },
      { value: "47", fit: "Average" },
    ],
    highlights: [],
    leverageTiers: baseLeverageTiers,
    ...buildProductAssets("pr7789-c4"),
  },
  {
    id: "pr7795-c8",
    slug: "pr7795-c8",
    name: "PR7795 C8",
    frameCode: "PR7795 C8",
    symbol: "FRAME",
    supportedSymbols: ["FRAME"],
    basePriceUsdc: 16,
    priceRangeUsdc: "10 - 20 USDC",
    depositWindow: "Weekly UTC settlement + 24h final payment",
    shippingWindow: "Ships within 30 days after production",
    status: "Reading frame / First batch",
    headline: "Soft rectangular navy reading frame with contrast tortoise temples.",
    description:
      "PR7795 C8 balances a clean navy front with warmer temple detail. It reads more minimal from the front and more expressive from the side, which makes it a versatile option for daily indoor use.",
    colors: ["C8"],
    sizes: [
      { value: "44", fit: "Narrow" },
      { value: "47", fit: "Average" },
    ],
    highlights: [],
    leverageTiers: baseLeverageTiers,
    ...buildProductAssets("pr7795-c8"),
  },
  {
    id: "pr7796-c4",
    slug: "pr7796-c4",
    name: "PR7796 C4",
    frameCode: "PR7796 C4",
    symbol: "FRAME",
    supportedSymbols: ["FRAME"],
    basePriceUsdc: 17,
    priceRangeUsdc: "10 - 20 USDC",
    depositWindow: "Weekly UTC settlement + 24h final payment",
    shippingWindow: "Ships within 30 days after production",
    status: "Reading frame / First batch",
    headline: "Grey tortoise cat-eye frame with a calmer, softer visual profile.",
    description:
      "PR7796 C4 softens the outer corners without losing presence. The mixed cool tortoise finish gives it a more refined tone for buyers who want a lighter cat-eye statement.",
    colors: ["C4"],
    sizes: [
      { value: "44", fit: "Narrow" },
      { value: "47", fit: "Average" },
    ],
    highlights: [],
    leverageTiers: baseLeverageTiers,
    ...buildProductAssets("pr7796-c4"),
  },
  {
    id: "pr7797-c4",
    slug: "pr7797-c4",
    name: "PR7797 C4",
    frameCode: "PR7797 C4",
    symbol: "FRAME",
    supportedSymbols: ["FRAME"],
    basePriceUsdc: 17,
    priceRangeUsdc: "10 - 20 USDC",
    depositWindow: "Weekly UTC settlement + 24h final payment",
    shippingWindow: "Ships within 30 days after production",
    status: "Reading frame / First batch",
    headline: "Purple floral cat-eye frame built for a brighter statement look.",
    description:
      "PR7797 C4 carries the most playful surface in the current batch. The purple body and printed outer rim make it the most expressive option for a sharper feminine shape.",
    colors: ["C4"],
    sizes: [
      { value: "44", fit: "Narrow" },
      { value: "47", fit: "Average" },
    ],
    highlights: [],
    leverageTiers: baseLeverageTiers,
    ...buildProductAssets("pr7797-c4"),
  },
  {
    id: "pr7798-c1",
    slug: "pr7798-c1",
    name: "PR7798 C1",
    frameCode: "PR7798 C1",
    symbol: "FRAME",
    supportedSymbols: ["FRAME"],
    basePriceUsdc: 17,
    priceRangeUsdc: "10 - 20 USDC",
    depositWindow: "Weekly UTC settlement + 24h final payment",
    shippingWindow: "Ships within 30 days after production",
    status: "Reading frame / First batch",
    headline: "Printed blush cat-eye frame with a darker temple contrast.",
    description:
      "PR7798 C1 mixes a pale printed front with darker temples for a cleaner side profile. It keeps the cat-eye direction but reads more balanced and wearable from distance.",
    colors: ["C1"],
    sizes: [
      { value: "44", fit: "Narrow" },
      { value: "47", fit: "Average" },
    ],
    highlights: [],
    leverageTiers: baseLeverageTiers,
    ...buildProductAssets("pr7798-c1"),
  },
  {
    id: "pr7802-c1",
    slug: "pr7802-c1",
    name: "PR7802 C1",
    frameCode: "PR7802 C1",
    symbol: "FRAME",
    supportedSymbols: ["FRAME"],
    basePriceUsdc: 18,
    priceRangeUsdc: "10 - 20 USDC",
    depositWindow: "Weekly UTC settlement + 24h final payment",
    shippingWindow: "Ships within 30 days after production",
    status: "Reading frame / First batch",
    headline: "Rounded blush frame with a mottled upper rim and softer lower lens line.",
    description:
      "PR7802 C1 is lighter and friendlier in tone, with a semi-rounded lens shape that feels especially easy for reading and close work. The soft blush base keeps the look gentle.",
    colors: ["C1"],
    sizes: [
      { value: "44", fit: "Narrow" },
      { value: "47", fit: "Average" },
    ],
    highlights: [],
    leverageTiers: baseLeverageTiers,
    ...buildProductAssets("pr7802-c1"),
  },
  {
    id: "pr7802-c2",
    slug: "pr7802-c2",
    name: "PR7802 C2",
    frameCode: "PR7802 C2",
    symbol: "FRAME",
    supportedSymbols: ["FRAME"],
    basePriceUsdc: 18,
    priceRangeUsdc: "10 - 20 USDC",
    depositWindow: "Weekly UTC settlement + 24h final payment",
    shippingWindow: "Ships within 30 days after production",
    status: "Reading frame / First batch",
    headline: "Rounded translucent green frame with a softer everyday reading profile.",
    description:
      "PR7802 C2 keeps the same easy rounded shape as C1, but shifts into a cooler mint and moss palette. The result feels fresher, lighter, and a little more contemporary on face.",
    colors: ["C2"],
    sizes: [
      { value: "44", fit: "Narrow" },
      { value: "47", fit: "Average" },
    ],
    highlights: [],
    leverageTiers: baseLeverageTiers,
    ...buildProductAssets("pr7802-c2"),
  },
  {
    id: "pr7782-c3",
    slug: "pr7782-c3",
    name: "PR7782 C3",
    frameCode: "PR7782 C3",
    symbol: "FRAME",
    supportedSymbols: ["FRAME"],
    basePriceUsdc: 18,
    priceRangeUsdc: "10 - 20 USDC",
    depositWindow: "Weekly UTC settlement + 24h final payment",
    shippingWindow: "Ships within 30 days after production",
    status: "Reading frame / First batch",
    headline: "Clear mixed-tone round frame with a polished lighter acetate finish.",
    description:
      "PR7782 C3 uses a transparent mixed acetate finish that feels cleaner and brighter than the darker tortoise styles. It is the lightest visual option in the current ten-frame set.",
    colors: ["C3"],
    sizes: [
      { value: "44", fit: "Narrow" },
      { value: "47", fit: "Average" },
    ],
    highlights: [],
    leverageTiers: baseLeverageTiers,
    ...buildProductAssets("pr7782-c3"),
  },
  {
    id: "pr7809-c1",
    slug: "pr7809-c1",
    name: "PR7809 C1",
    frameCode: "PR7809 C1",
    symbol: "FRAME",
    supportedSymbols: ["FRAME"],
    basePriceUsdc: 19,
    priceRangeUsdc: "10 - 20 USDC",
    depositWindow: "Weekly UTC settlement + 24h final payment",
    shippingWindow: "Ships within 30 days after production",
    status: "Reading frame / First batch",
    headline: "Bold black navigator-inspired frame with a stronger bridge detail.",
    description:
      "PR7809 C1 is the most assertive profile in the current batch. The broad bridge opening and flatter top line give it a more structured feel while still working as a reading frame.",
    colors: ["C1"],
    sizes: [
      { value: "44", fit: "Narrow" },
      { value: "47", fit: "Average" },
    ],
    highlights: [],
    leverageTiers: baseLeverageTiers,
    ...buildProductAssets("pr7809-c1"),
  },
  {
    id: "pr7809-c2",
    slug: "pr7809-c2",
    name: "PR7809 C2",
    frameCode: "PR7809 C2",
    symbol: "FRAME",
    supportedSymbols: ["FRAME"],
    basePriceUsdc: 19,
    priceRangeUsdc: "10 - 20 USDC",
    depositWindow: "Weekly UTC settlement + 24h final payment",
    shippingWindow: "Ships within 30 days after production",
    status: "Reading frame / First batch",
    headline: "Warm tortoise navigator frame with a stronger vintage reading shape.",
    description:
      "PR7809 C2 carries the same assertive navigator construction as C1 but softens it through a warm tortoise shell finish. It feels more heritage-led while keeping the oversized top bar profile.",
    colors: ["C2"],
    sizes: [
      { value: "44", fit: "Narrow" },
      { value: "47", fit: "Average" },
    ],
    highlights: [],
    leverageTiers: baseLeverageTiers,
    ...buildProductAssets("pr7809-c2"),
  },
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}
