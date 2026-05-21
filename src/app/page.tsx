import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { products } from "@/data/products";

export default function Home() {
  const heroProduct = products[0];
  const heroImage = "/hero/btc-shield-hero.png";

  return (
    <main className="flex w-full flex-col gap-0 pb-20">
      <section className="w-full overflow-hidden bg-[#f5efe5] shadow-[0_28px_80px_rgba(0,0,0,0.08)]">
        <SiteHeader active="sunglasses" showPromoBanner />

        <div className="relative h-[68vh] min-h-[30rem] max-h-[46rem] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={heroImage}
            alt={heroProduct.name}
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.28),rgba(0,0,0,0.18)_26%,rgba(0,0,0,0.42))]" />

          <div className="relative z-10 flex h-full items-start justify-start px-6 py-8 sm:px-10 sm:py-10">
            <div className="max-w-2xl text-left">
              <p className="text-[11px] uppercase tracking-[0.28em] text-[#f5eee4]">
                Optical collection
              </p>
              <h1 className="mt-4 text-5xl font-semibold tracking-[-0.06em] text-white sm:text-6xl lg:text-[4.8rem]">
                {heroProduct.name}
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-[#f4ecdf] sm:text-lg">
                Ten reading frames, each with a front view on the storefront and full-angle views inside the detail page.
              </p>
            </div>
          </div>

          <div className="absolute bottom-8 right-8 z-10 sm:bottom-10 sm:right-10">
            <Link
              href={`/products/${heroProduct.slug}`}
              className="rounded-full bg-white px-9 py-4 text-[15px] font-semibold uppercase tracking-[0.18em] text-[#171310] shadow-[0_14px_28px_rgba(0,0,0,0.2)]"
            >
              Shop now
            </Link>
          </div>
        </div>
      </section>

      <section className="w-full bg-[#f5efe5]">
        <div className="mx-auto w-full max-w-[1600px] px-6 pb-10 pt-8 sm:px-8 lg:px-10">
          <div className="flex items-end justify-between gap-4 border-b border-[rgba(23,19,16,0.08)] pb-5">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#8b806f]">
                Featured sunglasses
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#171310] sm:text-4xl">
                Ten frames for the first drop.
              </h2>
            </div>
          </div>

          <div className="mt-8 grid gap-8 sm:grid-cols-2 xl:grid-cols-5">
            {products.map((product) => (
              <Link key={product.id} href={`/products/${product.slug}`} className="group">
                <div className="relative overflow-hidden rounded-[2rem] bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.heroImage}
                    alt={product.name}
                    className="aspect-[4/3] w-full object-contain bg-white p-8 transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                  <div className="absolute left-5 top-5 rounded-full bg-white/88 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#5e5549] shadow-[0_10px_18px_rgba(0,0,0,0.05)]">
                    {product.frameCode}
                  </div>
                </div>
                <div className="px-1 pb-1 pt-4">
                  <h3 className="text-[1.35rem] font-semibold tracking-[-0.04em] text-[#171310]">
                    {product.name}
                  </h3>
                  <div className="mt-2 flex items-center justify-between text-sm text-[#61584e]">
                    <span>{product.basePriceUsdc} USDC</span>
                    <span className="uppercase tracking-[0.14em] text-[#8b806f]">
                      {product.colors[0]}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
