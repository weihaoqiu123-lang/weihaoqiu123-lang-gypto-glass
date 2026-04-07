import Link from "next/link";
import { CopyButton } from "@/components/copy-button";
import { products } from "@/data/products";
import { paymentConfig } from "@/lib/payment-config";

export default function AdminProductsPage() {
  const basePrices = products.map((product) => product.basePriceUsdc);
  const minBasePrice = Math.min(...basePrices);
  const maxBasePrice = Math.max(...basePrices);

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 pb-16 pt-6 sm:px-8 lg:px-10">
      <section className="glass-panel rounded-[2rem] px-6 py-7 sm:px-8 sm:py-9">
        <p className="text-xs uppercase tracking-[0.28em] text-[#97f6e1]">
          Admin / Products
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
          Product control surface
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[#b7d4ce]">
          This is the first lightweight product admin view. It helps you review
          pricing, positioning, and release status before we add deeper product
          editing workflows.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <div className="glass-panel rounded-[1.8rem] px-5 py-5">
          <p className="text-xs uppercase tracking-[0.22em] text-[#8ea8a1]">Products</p>
          <p className="mt-2 text-4xl font-semibold text-white">{products.length}</p>
        </div>
        <div className="glass-panel rounded-[1.8rem] px-5 py-5">
          <p className="text-xs uppercase tracking-[0.22em] text-[#8ea8a1]">Base pricing</p>
          <p className="mt-2 text-2xl font-semibold text-white">
            {minBasePrice} - {maxBasePrice} USDC
          </p>
        </div>
        <div className="glass-panel rounded-[1.8rem] px-5 py-5">
          <p className="text-xs uppercase tracking-[0.22em] text-[#8ea8a1]">Checkout rail</p>
          <p className="mt-2 text-2xl font-semibold text-white">Solana / USDC</p>
        </div>
      </section>

      <section className="glass-panel rounded-[2rem] px-6 py-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-[#d7ff79]">
              Product inventory
            </p>
            <p className="mt-2 text-sm text-[#a9c6bf]">
              Review live product definitions and jump into the storefront view.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/admin/orders"
              className="rounded-full border border-[rgba(255,177,139,0.22)] px-4 py-2 text-sm font-semibold text-[#ffd7c4]"
            >
              Orders admin
            </Link>
            <Link
              href="/admin/orders"
              className="rounded-full border border-[rgba(255,255,255,0.08)] px-4 py-2 text-sm font-semibold text-[#dffdf4]"
            >
              View orders
            </Link>
            <Link
              href="/products"
              className="rounded-full border border-[rgba(115,245,215,0.22)] px-4 py-2 text-sm font-semibold text-[#ddfff4]"
            >
              View storefront
            </Link>
          </div>
        </div>
      </section>

      <section className="glass-panel rounded-[1.8rem] px-5 py-5">
        <p className="text-xs uppercase tracking-[0.22em] text-[#d7ff79]">
          Deposit tier overview
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {products[0]?.leverageTiers.map((tier) => (
            <div
              key={tier.tier}
              className="rounded-[1.4rem] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] px-4 py-4"
            >
              <p className="text-xs uppercase tracking-[0.18em] text-[#8ea8a1]">{tier.tier}</p>
              <p className="mt-2 text-2xl font-semibold text-white">{tier.depositUsdc} USDC</p>
              <p className="mt-2 text-sm leading-6 text-[#c8e3dc]">{tier.summary}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="glass-panel rounded-[1.8rem] px-5 py-5">
        <p className="text-xs uppercase tracking-[0.22em] text-[#97f6e1]">
          Payment configuration
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <div className="rounded-[1.4rem] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] px-4 py-4">
            <p className="text-xs uppercase tracking-[0.18em] text-[#8ea8a1]">Rail</p>
            <p className="mt-2 text-lg font-semibold text-white">
              {paymentConfig.chain} / {paymentConfig.token}
            </p>
          </div>
          <div className="rounded-[1.4rem] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] px-4 py-4">
            <p className="text-xs uppercase tracking-[0.18em] text-[#8ea8a1]">Merchant wallet</p>
            <p className="mt-2 break-all text-sm text-[#dffdf4]">
              {paymentConfig.merchantWallet}
            </p>
            <div className="mt-3">
              <CopyButton value={paymentConfig.merchantWallet} label="wallet" />
            </div>
          </div>
          <div className="rounded-[1.4rem] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] px-4 py-4">
            <p className="text-xs uppercase tracking-[0.18em] text-[#8ea8a1]">USDC mint</p>
            <p className="mt-2 break-all text-sm text-[#dffdf4]">{paymentConfig.tokenMint}</p>
            <div className="mt-3">
              <CopyButton value={paymentConfig.tokenMint} label="mint" />
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <article key={product.id} className="glass-panel rounded-[2rem] p-5">
            <div className="rounded-[1.6rem] border border-[rgba(255,255,255,0.06)] bg-[radial-gradient(circle_at_top,rgba(115,245,215,0.16),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] px-5 py-5">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.22em] text-[#d7ff79]">
                <span>{product.symbol}</span>
                <span className="inline-flex rounded-full border border-[rgba(115,245,215,0.24)] bg-[rgba(115,245,215,0.08)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#dffff7]">
                  {product.status}
                </span>
              </div>

              <div className="mt-5 flex items-center justify-between gap-3">
                <h2 className="text-2xl font-semibold text-white">{product.name}</h2>
                <CopyButton value={product.name} label="name" />
              </div>
              <div className="mt-3 flex items-start justify-between gap-3">
                <p className="text-sm leading-6 text-[#bad7d0]">{product.headline}</p>
                <CopyButton value={product.headline} label="headline" />
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-[1.3rem] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] px-4 py-3">
                <p className="text-xs uppercase tracking-[0.2em] text-[#90a9a2]">Base</p>
                <p className="mt-2 text-lg font-semibold text-white">
                  {product.basePriceUsdc} USDC
                </p>
              </div>
              <div className="rounded-[1.3rem] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] px-4 py-3">
                <p className="text-xs uppercase tracking-[0.2em] text-[#90a9a2]">Range</p>
                <p className="mt-2 text-lg font-semibold text-white">{product.priceRangeUsdc}</p>
              </div>
            </div>

            <div className="mt-5 space-y-3 text-sm text-[#b7d4ce]">
              <div className="flex items-center justify-between gap-3">
                <p>
                  Slug: <span className="font-semibold text-white">{product.slug}</span>
                </p>
                <CopyButton value={product.slug} label="slug" />
              </div>
              <p>
                Dynamic pricing:{" "}
                <span className="inline-flex rounded-full border border-[rgba(115,245,215,0.24)] bg-[rgba(115,245,215,0.08)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#dffff7]">
                  Enabled
                </span>
              </p>
              <div className="flex items-center justify-between gap-3">
                <p>
                  Symbols:{" "}
                  <span className="font-semibold text-[#d8ff81]">
                    {product.supportedSymbols.join(" / ")}
                  </span>
                </p>
                <CopyButton value={product.supportedSymbols.join(", ")} label="symbols" />
              </div>
              <p>
                Style code:{" "}
                <span className="font-semibold text-white">{product.symbol} / Genesis</span>
              </p>
              <div className="flex items-center justify-between gap-3">
                <p>
                  Colors:{" "}
                  <span className="font-semibold text-[#dffdf4]">{product.colors.join(" / ")}</span>
                </p>
                <CopyButton value={product.colors.join(", ")} label="colors" />
              </div>
              <p>
                Deposits:{" "}
                <span className="font-semibold text-[#d8ff81]">
                  {product.leverageTiers.map((item) => item.depositUsdc).join(" / ")} USDC
                </span>
              </p>
              <p>Shipping: {product.shippingWindow}</p>
              <p>Settlement: {product.depositWindow}</p>
            </div>

            <div className="mt-5 rounded-[1.4rem] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] px-4 py-4">
              <p className="text-xs uppercase tracking-[0.18em] text-[#8ea8a1]">Highlights</p>
              <div className="mt-3 space-y-2">
                {product.highlights.map((highlight) => (
                  <p key={highlight} className="text-sm leading-6 text-[#c8e3dc]">
                    {highlight}
                  </p>
                ))}
              </div>
            </div>

            <div className="mt-5 rounded-[1.4rem] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] px-4 py-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs uppercase tracking-[0.18em] text-[#8ea8a1]">Description</p>
                <CopyButton value={product.description} label="description" />
              </div>
              <p className="mt-3 text-sm leading-6 text-[#c8e3dc]">{product.description}</p>
            </div>

            <div className="mt-5 rounded-[1.4rem] border border-[rgba(115,245,215,0.18)] bg-[rgba(115,245,215,0.06)] px-4 py-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs uppercase tracking-[0.18em] text-[#9ff6e5]">
                  Core info bundle
                </p>
                <CopyButton
                  value={[
                    `name: ${product.name}`,
                    `slug: ${product.slug}`,
                    `headline: ${product.headline}`,
                    `symbols: ${product.supportedSymbols.join(", ")}`,
                    `colors: ${product.colors.join(", ")}`,
                    `deposits: ${product.leverageTiers.map((item) => `${item.tier}=${item.depositUsdc}`).join(", ")}`,
                    `basePriceUsdc: ${product.basePriceUsdc}`,
                    `status: ${product.status}`,
                    `shippingWindow: ${product.shippingWindow}`,
                    `depositWindow: ${product.depositWindow}`,
                    `descriptionSummary: ${product.description.slice(0, 140)}`,
                    `paymentRail: ${paymentConfig.chain}/${paymentConfig.token}`,
                    `productLink: /products/${product.slug}`,
                  ].join("\n")}
                  label="bundle"
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-[#dffff7]">
                Quick copy block for ops, docs, and launch coordination.
              </p>
            </div>

            <div className="mt-5 flex gap-3">
              <Link
                href={`/products/${product.slug}`}
                className="rounded-full bg-[linear-gradient(135deg,#c2ff63,#73f5d7)] px-4 py-2 text-sm font-bold text-[#051217]"
              >
                Open product
              </Link>
              <Link
                href={`/products/${product.slug}`}
                className="rounded-full border border-[rgba(115,245,215,0.22)] px-4 py-2 text-sm font-semibold text-[#ddfff4]"
              >
                View live storefront
              </Link>
              <span className="rounded-full border border-[rgba(255,255,255,0.08)] px-4 py-2 text-sm font-semibold text-[#dffdf4]">
                Admin view
              </span>
            </div>

            <div className="mt-4">
              <CopyButton value={`/products/${product.slug}`} label="product link" />
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
