import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { products } from "@/data/products";

const shapeCards = [
  { name: "Aviator", count: 2, icon: "rounded-[1.7rem]" },
  { name: "Cat-eye", count: 4, icon: "rounded-[2.2rem] rounded-bl-[1rem]" },
  { name: "Round", count: 2, icon: "rounded-full" },
  { name: "Square", count: 2, icon: "rounded-[0.8rem]" },
];

const sizeOptions = [
  { name: "Narrow", count: 6 },
  { name: "Average", count: 10 },
];

const colorOptions = [
  { name: "Tortoise", count: 4, swatch: "#7a5032" },
  { name: "Black", count: 1, swatch: "#1f1b18" },
  { name: "Purple", count: 1, swatch: "#6c4ba7" },
  { name: "Blush", count: 2, swatch: "#e3c6c3" },
  { name: "Clear Mix", count: 2, swatch: "#ddd4ca" },
];

export default function ProductsPage() {
  return (
    <main className="flex w-full flex-col bg-[#f5efe5] pb-20">
      <section className="w-full overflow-hidden bg-[#f5efe5]">
        <SiteHeader active="sunglasses" />
      </section>

      <section className="mx-auto w-full max-w-[1600px] px-4 pt-8 sm:px-6 lg:px-8">
        <div className="border-b border-[rgba(23,19,16,0.08)] pb-6">
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#8b806f]">
            Reading glasses collection | Browse
          </p>
        </div>

        <div className="relative mt-8 overflow-hidden rounded-[2.2rem] bg-[#e9dece]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={products[0].heroImage}
            alt="Products hero banner"
            className="h-[18rem] w-full object-cover sm:h-[22rem] lg:h-[24rem]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.42),rgba(0,0,0,0.08)_56%)]" />
          <div className="absolute inset-y-0 left-0 flex items-center px-6 sm:px-10">
            <div className="max-w-xl">
              <p className="text-[11px] uppercase tracking-[0.24em] text-[#f3eadf]">
                Optical batch one
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
                Ten frames ready to browse.
              </h1>
              <p className="mt-4 max-w-lg text-sm leading-6 text-[#f2e9dd] sm:text-base">
                Front-view storefront images stay clean here. Inside each detail page, we open the angle, side profile, and a softer lifestyle reference.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-10 pt-8 lg:grid-cols-[320px_minmax(0,1fr)] lg:items-start">
          <aside className="lg:sticky lg:top-6">
            <div className="border-b border-[rgba(23,19,16,0.08)] pb-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-[#171310]">Filter</p>
                <button
                  type="button"
                  className="text-sm underline decoration-[rgba(23,19,16,0.3)] underline-offset-4"
                >
                  Clear All
                </button>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-md bg-[#f0e7da] px-4 py-2 text-sm text-[#171310]">
                  Optical batch
                  <span className="text-[#7f7568]">×</span>
                </span>
              </div>
            </div>

            <div className="border-b border-[rgba(23,19,16,0.08)] py-8">
              <div className="flex items-center justify-between">
                <h2 className="text-[1.45rem] font-semibold uppercase tracking-[0.06em] text-[#171310]">
                  Shape
                </h2>
                <span className="text-xl text-[#171310]">+</span>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                {shapeCards.map((shape) => (
                  <button
                    key={shape.name}
                    type="button"
                    className="rounded-md border border-[rgba(23,19,16,0.14)] bg-white px-4 py-5 text-center"
                  >
                    <div className="flex justify-center">
                      <div className="relative flex items-center gap-1">
                        <div className={`h-10 w-12 border-[3px] border-[#171310] ${shape.icon}`} />
                        <div className={`h-10 w-12 border-[3px] border-[#171310] ${shape.icon}`} />
                        <div className="absolute left-1/2 top-1/2 h-[3px] w-4 -translate-x-1/2 -translate-y-1/2 bg-[#171310]" />
                      </div>
                    </div>
                    <p className="mt-4 text-[1rem] text-[#171310]">
                      {shape.name} ({shape.count})
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div className="border-b border-[rgba(23,19,16,0.08)] py-8">
              <div className="flex items-center justify-between">
                <h2 className="text-[1.45rem] font-semibold uppercase tracking-[0.06em] text-[#171310]">
                  Size
                </h2>
                <span className="text-xl text-[#171310]">+</span>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-4">
                {sizeOptions.map((size) => (
                  <label key={size.name} className="flex items-center gap-3 text-[1rem] text-[#171310]">
                    <span className="h-5 w-5 border border-[rgba(23,19,16,0.22)] bg-white" />
                    <span>
                      {size.name} ({size.count})
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="py-8">
              <div className="flex items-center justify-between">
                <h2 className="text-[1.45rem] font-semibold uppercase tracking-[0.06em] text-[#171310]">
                  Color
                </h2>
                <span className="text-xl text-[#171310]">+</span>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-4">
                {colorOptions.map((color) => (
                  <label key={color.name} className="flex items-center gap-3 text-[1rem] text-[#171310]">
                    <span
                      className="h-5 w-5 rounded-full border border-[rgba(23,19,16,0.14)]"
                      style={{ backgroundColor: color.swatch }}
                    />
                    <span>
                      {color.name} ({color.count})
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          <div>
            <div className="grid gap-x-8 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
                <Link key={product.id} href={`/products/${product.slug}`} className="group">
                  <div className="relative overflow-hidden rounded-[1.8rem] bg-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={product.heroImage}
                      alt={product.name}
                      className="aspect-[4/3] w-full object-contain bg-white p-8 transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                    <div className="absolute left-5 top-5 rounded-full bg-white/92 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#5e5549] shadow-[0_10px_18px_rgba(0,0,0,0.05)]">
                      {product.frameCode}
                    </div>
                  </div>

                  <div className="px-1 pt-4">
                    <h3 className="text-[1.2rem] font-semibold uppercase tracking-[0.02em] text-[#171310]">
                      {product.name}
                    </h3>
                    <div className="mt-2 flex items-center justify-between text-[13px] text-[#61584e]">
                      <span className="font-medium text-[#171310]">${product.basePriceUsdc}.00 USD</span>
                      <span className="uppercase tracking-[0.14em] text-[#8b806f]">
                        {product.colors[0]}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto mt-10 w-full max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <SiteFooter />
      </div>
    </main>
  );
}
