"use client";

import { useEffect, useMemo, useState } from "react";
import type { Product } from "@/data/products";

type ProductVisualStageProps = {
  product: Product;
};

type ChartPoint = {
  openTime: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  closeTime: number;
};

type VisualMode = "product" | "chart" | "split";

function getSymbolLogo(symbol: string) {
  switch (symbol) {
    case "BTC":
      return "https://cdn.simpleicons.org/bitcoin/F7931A";
    case "ETH":
      return "https://cdn.simpleicons.org/ethereum/7C6CFF";
    case "SOL":
      return "https://cdn.simpleicons.org/solana/14F195";
    default:
      return "";
  }
}

function getProductPhoto(symbol: string) {
  switch (symbol) {
    case "BTC":
      return "https://images.unsplash.com/photo-1665407153425-46fdc25cd4f9?auto=format&fit=crop&fm=jpg&q=80&w=1600";
    case "ETH":
      return "https://images.unsplash.com/photo-1611923134239-b9be5816b4b9?auto=format&fit=crop&fm=jpg&q=80&w=1600";
    case "SOL":
      return "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&fm=jpg&q=80&w=1600";
    default:
      return "";
  }
}

function buildPath(points: ChartPoint[], width: number, height: number) {
  if (points.length === 0) {
    return "";
  }

  const closes = points.map((point) => point.close);
  const min = Math.min(...closes);
  const max = Math.max(...closes);
  const range = max - min || 1;

  return points
    .map((point, index) => {
      const x = (index / Math.max(points.length - 1, 1)) * width;
      const y = height - ((point.close - min) / range) * height;
      return `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");
}

function ProductArt({ product }: { product: Product }) {
  const logo = getSymbolLogo(product.symbol);
  const photo = getProductPhoto(product.symbol);

  return (
    <div className="relative h-full min-h-[38rem] overflow-hidden rounded-[2.6rem] border border-[rgba(24,20,17,0.07)] bg-[linear-gradient(180deg,#faf7f1,#f2ecdf)] px-10 py-10 shadow-[0_30px_90px_rgba(0,0,0,0.1)]">
      <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-[#776d61]">
        <span>{product.symbol} edition</span>
        <span>Collector drop</span>
      </div>

      <div className="mt-10 flex items-start justify-between gap-5">
        <div>
          <p className="max-w-xs text-2xl font-semibold tracking-[-0.03em] text-[#181411] sm:text-3xl">
            Collector eyewear shaped around {product.symbol}.
          </p>
        </div>
        {logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={logo} alt={`${product.symbol} logo`} className="h-9 w-9 opacity-85" />
        ) : null}
      </div>

      <div className="relative mx-auto mt-16 h-[26rem] w-full max-w-[34rem] overflow-hidden rounded-[2.2rem] border border-[rgba(24,20,17,0.06)] bg-white shadow-[0_24px_60px_rgba(0,0,0,0.08)]">
        {photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photo}
            alt={`${product.name} placeholder visual`}
            className="h-full w-full object-cover"
          />
        ) : null}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(to_top,rgba(245,241,233,0.92),transparent)]" />
        <div className="absolute bottom-4 left-4 flex items-center gap-3 rounded-full bg-white/88 px-4 py-2 shadow-[0_10px_20px_rgba(0,0,0,0.06)]">
          {logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logo} alt={`${product.symbol} logo`} className="h-5 w-5" />
          ) : null}
          <span className="text-[11px] uppercase tracking-[0.18em] text-[#5d554b]">
            {product.colors[0]}
          </span>
        </div>
      </div>

      <div className="mt-12 grid gap-3 sm:grid-cols-3">
        {product.colors.slice(0, 3).map((color) => (
          <div
            key={color}
            className="rounded-2xl border border-[rgba(24,20,17,0.07)] bg-white/65 px-4 py-3"
          >
            <p className="text-[11px] uppercase tracking-[0.18em] text-[#958a7d]">Color</p>
            <p className="mt-2 text-sm font-medium text-[#181411]">{color}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChartCard({
  product,
  points,
  loading,
}: {
  product: Product;
  points: ChartPoint[];
  loading: boolean;
}) {
  const latest = points.at(-1)?.close ?? 0;
  const previous = points.at(-2)?.close ?? latest;
  const delta = latest - previous;
  const deltaPct = previous ? (delta / previous) * 100 : 0;
  const path = useMemo(() => buildPath(points, 560, 220), [points]);

  return (
    <div className="h-full rounded-[2rem] border border-[rgba(24,20,17,0.08)] bg-[#fbfaf7] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.08)]">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#958a7d]">
            Live market
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-[#181411]">
            {product.symbol}/USDT
          </h3>
        </div>
        <div className="text-right">
          <p className="text-[11px] uppercase tracking-[0.18em] text-[#958a7d]">Last price</p>
          <p className="mt-2 text-2xl font-semibold text-[#181411]">
            {loading ? "--" : `$${latest.toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
          </p>
          <p className={`mt-2 text-sm font-medium ${delta >= 0 ? "text-[#0f8b6d]" : "text-[#c06c4b]"}`}>
            {loading ? "Loading..." : `${delta >= 0 ? "+" : ""}${delta.toFixed(2)} (${deltaPct.toFixed(2)}%)`}
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-[1.6rem] border border-[rgba(24,20,17,0.08)] bg-white p-4">
        <svg viewBox="0 0 560 220" className="h-56 w-full">
          <defs>
            <linearGradient id={`chart-line-${product.symbol}`} x1="0%" x2="100%" y1="0%" y2="0%">
              <stop offset="0%" stopColor="#c58b2a" />
              <stop offset="100%" stopColor="#151311" />
            </linearGradient>
          </defs>
          <path
            d={path}
            fill="none"
            stroke={`url(#chart-line-${product.symbol})`}
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-[rgba(24,20,17,0.08)] bg-white px-4 py-3">
          <p className="text-[11px] uppercase tracking-[0.18em] text-[#958a7d]">View</p>
          <p className="mt-2 text-sm font-medium text-[#181411]">Recent 4h candles</p>
        </div>
        <div className="rounded-2xl border border-[rgba(24,20,17,0.08)] bg-white px-4 py-3">
          <p className="text-[11px] uppercase tracking-[0.18em] text-[#958a7d]">Settle</p>
          <p className="mt-2 text-sm font-medium text-[#181411]">Weekly UTC close</p>
        </div>
        <div className="rounded-2xl border border-[rgba(24,20,17,0.08)] bg-white px-4 py-3">
          <p className="text-[11px] uppercase tracking-[0.18em] text-[#958a7d]">Role</p>
          <p className="mt-2 text-sm font-medium text-[#181411]">Supportive market layer</p>
        </div>
      </div>
    </div>
  );
}

function CompactMarketPanel({
  product,
  points,
  loading,
}: {
  product: Product;
  points: ChartPoint[];
  loading: boolean;
}) {
  const latest = points.at(-1)?.close ?? 0;
  const previous = points.at(-2)?.close ?? latest;
  const delta = latest - previous;
  const deltaPct = previous ? (delta / previous) * 100 : 0;
  const path = useMemo(() => buildPath(points, 320, 120), [points]);

  return (
    <div className="rounded-[2rem] border border-[rgba(24,20,17,0.08)] bg-[#fbfaf7] p-5 shadow-[0_16px_40px_rgba(0,0,0,0.08)]">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#958a7d]">Market panel</p>
          <h3 className="mt-2 text-xl font-semibold text-[#181411]">{product.symbol}/USDT</h3>
        </div>
        <div className="rounded-full bg-[rgba(24,20,17,0.06)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5c5348]">
          Weekly UTC
        </div>
      </div>

      <div className="mt-5">
        <p className="text-sm text-[#958a7d]">Last price</p>
        <div className="mt-2 flex items-end justify-between gap-4">
          <p className="text-3xl font-semibold text-[#181411]">
            {loading ? "--" : `$${latest.toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
          </p>
          <p className={`text-sm font-medium ${delta >= 0 ? "text-[#0f8b6d]" : "text-[#c06c4b]"}`}>
            {loading ? "Loading..." : `${delta >= 0 ? "+" : ""}${delta.toFixed(2)} (${deltaPct.toFixed(2)}%)`}
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-[1.5rem] border border-[rgba(24,20,17,0.08)] bg-white p-3">
        <svg viewBox="0 0 320 120" className="h-28 w-full">
          <defs>
            <linearGradient id={`compact-line-${product.symbol}`} x1="0%" x2="100%" y1="0%" y2="0%">
              <stop offset="0%" stopColor="#c58b2a" />
              <stop offset="100%" stopColor="#151311" />
            </linearGradient>
          </defs>
          <path
            d={path}
            fill="none"
            stroke={`url(#compact-line-${product.symbol})`}
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-[rgba(24,20,17,0.08)] bg-white px-4 py-3">
          <p className="text-[11px] uppercase tracking-[0.18em] text-[#958a7d]">Cycle</p>
          <p className="mt-2 text-sm font-medium text-[#181411]">7D settlement</p>
        </div>
        <div className="rounded-2xl border border-[rgba(24,20,17,0.08)] bg-white px-4 py-3">
          <p className="text-[11px] uppercase tracking-[0.18em] text-[#958a7d]">Final pay</p>
          <p className="mt-2 text-sm font-medium text-[#181411]">24h window</p>
        </div>
      </div>
    </div>
  );
}

export function ProductVisualStage({ product }: ProductVisualStageProps) {
  const [mode, setMode] = useState<VisualMode>("product");
  const [points, setPoints] = useState<ChartPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      try {
        const response = await fetch(`/api/market/klines?symbol=${product.symbol}&interval=4h&limit=42`);
        const data = (await response.json()) as { points?: ChartPoint[] };
        if (!cancelled) {
          setPoints(data.points ?? []);
        }
      } catch {
        if (!cancelled) {
          setPoints([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [product.symbol]);

  return (
    <div className="rounded-[2rem] bg-transparent">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <p className="text-[11px] uppercase tracking-[0.28em] text-[#958a7d]">{product.status}</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-[#181411] sm:text-5xl lg:text-6xl">
            {product.name}
          </h1>
          <p className="mt-4 max-w-lg text-base leading-7 text-[#5d564d]">{product.headline}</p>
        </div>
        <div className="flex gap-1 rounded-full border border-[rgba(24,20,17,0.08)] bg-white/90 p-1 shadow-[0_8px_18px_rgba(0,0,0,0.04)]">
          {(["product", "chart", "split"] as VisualMode[]).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setMode(option)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] transition-colors ${
                mode === option ? "bg-[#181411] text-[#f7f3ec]" : "text-[#7a7166]"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8">
        {mode === "product" ? (
          <div className="grid gap-5 xl:grid-cols-[1.45fr_0.8fr]">
            <ProductArt product={product} />
            <CompactMarketPanel product={product} points={points} loading={loading} />
          </div>
        ) : null}
        {mode === "chart" ? <ChartCard product={product} points={points} loading={loading} /> : null}
        {mode === "split" ? (
          <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
            <ProductArt product={product} />
            <ChartCard product={product} points={points} loading={loading} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
