import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductPurchasePanel } from "@/components/product-purchase-panel";
import { getProductBySlug } from "@/data/products";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 pb-16 pt-6 sm:px-8 lg:px-10">
      <div className="glass-panel rounded-full px-5 py-3 text-sm text-[#b9d6cf]">
        <Link href="/" className="text-white">
          Gypto-Glass
        </Link>{" "}
        / Products / {product.name}
      </div>

      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="glass-panel rounded-[2rem] p-6 sm:p-8">
          <p className="text-xs uppercase tracking-[0.28em] text-[#98f6e1]">
            {product.status}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
            {product.name}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-[#bad7d0]">
            {product.headline}
          </p>

          <div className="mt-8 rounded-[1.8rem] border border-[rgba(255,255,255,0.06)] bg-[radial-gradient(circle_at_top,rgba(115,245,215,0.14),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] px-6 py-8">
            <div className="mx-auto aspect-[1.45/1] max-w-xl rounded-[1.8rem] border border-[rgba(194,255,99,0.12)] bg-[linear-gradient(135deg,rgba(5,16,22,0.6),rgba(15,52,60,0.62))] px-8 py-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
              <div className="flex h-full flex-col justify-between">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.24em] text-[#d7ff7b]">
                  <span>{product.symbol} bound release</span>
                  <span>Drop 01</span>
                </div>

                <div className="relative mx-auto h-40 w-full max-w-[22rem]">
                  <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-[118%] -translate-y-1/2 rounded-full border-[6px] border-[#e5fff7] shadow-[0_0_30px_rgba(115,245,215,0.12)]" />
                  <div className="absolute left-1/2 top-1/2 h-24 w-24 translate-x-[18%] -translate-y-1/2 rounded-full border-[6px] border-[#e5fff7] shadow-[0_0_30px_rgba(115,245,215,0.12)]" />
                  <div className="absolute left-1/2 top-1/2 h-2.5 w-22 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e5fff7]" />
                  <div className="absolute left-[3%] top-[47%] h-2 w-24 rounded-full bg-[linear-gradient(90deg,#e5fff7,transparent)]" />
                  <div className="absolute right-[3%] top-[47%] h-2 w-24 rounded-full bg-[linear-gradient(90deg,transparent,#e5fff7)]" />
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  {product.colors.map((color) => (
                    <div
                      key={color}
                      className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.04)] px-4 py-3"
                    >
                      <p className="text-xs uppercase tracking-[0.2em] text-[#8fa8a1]">
                        Color
                      </p>
                      <p className="mt-2 text-sm font-medium text-white">{color}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <aside className="flex flex-col gap-6">
          <ProductPurchasePanel product={product} />

          <div className="glass-panel rounded-[2rem] p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-[#97f6e1]">
              Deposit tiers
            </p>
            <div className="mt-4 grid gap-3">
              {product.leverageTiers.map((item) => (
                <div
                  key={item.tier}
                  className="rounded-[1.4rem] border border-[rgba(255,255,255,0.06)] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] px-4 py-4"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold text-white">{item.tier}</p>
                    <p className="text-sm font-semibold text-[#d9ff81]">
                      {item.depositUsdc} USDC
                    </p>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-[#b8d4ce]">
                    {item.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="glass-panel rounded-[2rem] p-6 sm:p-8">
          <p className="text-xs uppercase tracking-[0.24em] text-[#97f6e1]">
            Description
          </p>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#b8d3cd]">
            {product.description}
          </p>
        </div>

        <div className="glass-panel rounded-[2rem] p-6 sm:p-8">
          <p className="text-xs uppercase tracking-[0.24em] text-[#d7ff79]">
            Why this works
          </p>
          <div className="mt-4 grid gap-3">
            {product.highlights.map((highlight) => (
              <div
                key={highlight}
                className="rounded-[1.3rem] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] px-4 py-3 text-sm leading-6 text-[#c0ddd7]"
              >
                {highlight}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-[rgba(194,255,99,0.14)] bg-[linear-gradient(135deg,rgba(194,255,99,0.1),rgba(115,245,215,0.06),rgba(114,182,255,0.08))] px-6 py-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[#163238]">
              Fulfillment note
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#041013]">
              {product.shippingWindow}
            </h2>
          </div>
          <Link
            href="/"
            className="rounded-full bg-[#041013] px-5 py-3 text-sm font-semibold text-[#eafff8]"
          >
            Back to home
          </Link>
        </div>
      </section>
    </main>
  );
}
