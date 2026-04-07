import Link from "next/link";
import { products } from "@/data/products";

export default function ProductsPage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 pb-16 pt-6 sm:px-8 lg:px-10">
      <section className="glass-panel rounded-[2rem] px-6 py-7 sm:px-8 sm:py-9">
        <p className="text-xs uppercase tracking-[0.28em] text-[#97f6e1]">
          V1 catalog
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
          Crypto-native frames built for fixed buy and dynamic buy flows.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-[#b7d3cd]">
          This first release keeps the catalog intentionally tight. We are
          validating design pull, dynamic-price comprehension, and order
          commitment before expanding the collection.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <article
            key={product.id}
            className="glass-panel rounded-[2rem] p-5 transition-transform hover:-translate-y-1"
          >
            <div className="rounded-[1.6rem] border border-[rgba(255,255,255,0.06)] bg-[radial-gradient(circle_at_top,rgba(115,245,215,0.16),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] px-5 py-6">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.22em] text-[#d7ff79]">
                <span>{product.symbol}</span>
                <span>{product.status}</span>
              </div>

              <div className="relative mx-auto mt-8 h-28 w-full max-w-[16rem]">
                <div className="absolute left-1/2 top-1/2 h-18 w-18 -translate-x-[118%] -translate-y-1/2 rounded-full border-[5px] border-[#e5fff7]" />
                <div className="absolute left-1/2 top-1/2 h-18 w-18 translate-x-[18%] -translate-y-1/2 rounded-full border-[5px] border-[#e5fff7]" />
                <div className="absolute left-1/2 top-1/2 h-2 w-18 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e5fff7]" />
                <div className="absolute left-[2%] top-[46%] h-1.5 w-18 rounded-full bg-[linear-gradient(90deg,#e5fff7,transparent)]" />
                <div className="absolute right-[2%] top-[46%] h-1.5 w-18 rounded-full bg-[linear-gradient(90deg,transparent,#e5fff7)]" />
              </div>
            </div>

            <div className="mt-5">
              <h2 className="text-2xl font-semibold text-white">{product.name}</h2>
              <p className="mt-3 text-sm leading-6 text-[#bad7d0]">
                {product.headline}
              </p>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-[1.3rem] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] px-4 py-3">
                <p className="text-xs uppercase tracking-[0.2em] text-[#90a9a2]">
                  Base
                </p>
                <p className="mt-2 text-lg font-semibold text-white">
                  {product.basePriceUsdc} USDC
                </p>
              </div>
              <div className="rounded-[1.3rem] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] px-4 py-3">
                <p className="text-xs uppercase tracking-[0.2em] text-[#90a9a2]">
                  Dynamic
                </p>
                <p className="mt-2 text-lg font-semibold text-white">
                  {product.priceRangeUsdc}
                </p>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between">
              <div className="text-sm text-[#b7d4ce]">
                Deposits:{" "}
                <span className="font-semibold text-[#d8ff81]">2 / 3 / 5 USDC</span>
              </div>
              <Link
                href={`/products/${product.slug}`}
                className="rounded-full bg-[linear-gradient(135deg,#c2ff63,#73f5d7)] px-4 py-2 text-sm font-bold text-[#051217]"
              >
                Open
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
