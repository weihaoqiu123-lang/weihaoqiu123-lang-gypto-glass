import Link from "next/link";
import type { Product } from "@/data/products";
import { TryOnLauncher } from "@/components/try-on-launcher";

type ProductSummaryPanelProps = {
  product: Product;
  selectedColor?: string;
  selectedSize?: string;
  selectedImageIndex?: number;
};

export function ProductSummaryPanel({
  product,
  selectedColor,
  selectedSize,
  selectedImageIndex = 0,
}: ProductSummaryPanelProps) {
  const activeColor = selectedColor ?? product.colors[0];
  const activeSize = selectedSize ?? product.sizes[0]?.value ?? "";

  function buildProductHref(next: {
    color?: string;
    size?: string;
    image?: number;
    sizeChart?: boolean;
  }) {
    const query = new URLSearchParams();
    query.set("image", String(next.image ?? selectedImageIndex));
    query.set("color", next.color ?? activeColor);
    query.set("size", next.size ?? activeSize);
    if (next.sizeChart) {
      query.set("sizeChart", "1");
    }
    return `/products/${product.slug}?${query.toString()}`;
  }

  const checkoutHref = `/checkout/${product.slug}?${new URLSearchParams({
    color: activeColor,
    size: activeSize,
  }).toString()}`;

  return (
    <>
      <div>
        <div className="border-b border-[rgba(23,19,16,0.12)] pb-7">
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#8b806f]">Reading frame</p>
          <div className="flex items-start justify-between gap-4">
            <h1 className="mt-3 text-[2.6rem] font-semibold leading-[0.95] tracking-[-0.05em] text-[#171310] sm:text-[3.1rem]">
              {product.name}
            </h1>
            <p className="whitespace-nowrap pt-3 text-[1.8rem] font-semibold text-[#171310]">
              ${product.basePriceUsdc}.00
            </p>
          </div>
        </div>

        <div className="border-b border-[rgba(23,19,16,0.12)] py-7">
          <p className="text-base font-semibold text-[#171310]">{product.colors.length} Colors</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {product.colors.map((color) => (
              <Link
                key={color}
                href={buildProductHref({ color })}
                className={`overflow-hidden rounded-md border p-1 ${
                  activeColor === color
                    ? "border-[#171310] shadow-[inset_0_0_0_1px_#171310]"
                    : "border-[rgba(23,19,16,0.12)]"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.heroImage}
                  alt={`${product.name} ${color}`}
                  className="h-14 w-20 rounded-sm bg-white object-contain p-2"
                />
              </Link>
            ))}
          </div>
          <p className="mt-4 text-[15px] text-[#171310]">
            Color : <span className="text-[#61584e]">{activeColor}</span>
          </p>
        </div>

        <div className="border-b border-[rgba(23,19,16,0.12)] py-7">
          <div className="flex items-center justify-between gap-4">
            <p className="text-base font-semibold text-[#171310]">Size</p>
            <Link
              href={buildProductHref({ sizeChart: true })}
              className="text-sm underline underline-offset-4 text-[#171310]"
            >
              Size Chart
            </Link>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            {product.sizes.map((size) => {
              const label = `${size.value} (${size.fit})`;
              const isActive = activeSize === size.value;
              return (
                <Link
                  key={size.value}
                  href={buildProductHref({ size: size.value })}
                  className={`inline-flex items-center justify-center rounded-md border px-5 py-3 text-[15px] font-medium no-underline transition-colors ${
                    isActive
                      ? "border-[#171310] bg-[#171310]"
                      : "border-[rgba(23,19,16,0.14)] bg-white text-[#171310] hover:border-[#171310]"
                  }`}
                >
                  <span className={isActive ? "text-white" : "text-[#171310]"}>
                    {label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="space-y-3 py-7">
          <TryOnLauncher
            className="w-full border border-[rgba(23,19,16,0.14)] bg-white px-5 py-4 text-[15px] font-semibold uppercase tracking-[0.16em] text-[#171310]"
            label="Try On"
          />
          <Link
            href={checkoutHref}
            className="block w-full bg-[#e0aa12] px-5 py-4 text-center text-[15px] font-semibold uppercase tracking-[0.16em] text-[#171310]"
          >
            Buy the frame now
          </Link>
        </div>

        <div className="border-b border-[rgba(23,19,16,0.12)] pb-6 text-sm text-[#61584e]">
          Available to ship within the first production batch.
        </div>

        <details className="border-b border-[rgba(23,19,16,0.12)] py-5" open>
          <summary className="cursor-pointer list-none text-[1.25rem] font-semibold uppercase tracking-[0.08em] text-[#171310]">
            Details
          </summary>
          <div className="pt-4 text-sm leading-7 text-[#61584e]">{product.description}</div>
        </details>

        <details className="border-b border-[rgba(23,19,16,0.12)] py-5">
          <summary className="cursor-pointer list-none text-[1.25rem] font-semibold uppercase tracking-[0.08em] text-[#171310]">
            Measurements
          </summary>
          <div className="pt-4 text-sm leading-7 text-[#61584e]">
            Frame total width: 137 mm. Lens width: 44 mm / 47 mm. Bridge: 24 mm.
            Temple length: 145 mm. Lens height: 39 mm. Built for a balanced
            sunglass fit with a slightly narrow front and lightweight daily wear feel.
          </div>
        </details>

        <details className="border-b border-[rgba(23,19,16,0.12)] py-5">
          <summary className="cursor-pointer list-none text-[1.25rem] font-semibold uppercase tracking-[0.08em] text-[#171310]">
            Shipping & Returns
          </summary>
          <div className="pt-4 text-sm leading-7 text-[#61584e]">
            Profun ships the first production run within 30 days after confirmation.
            Returns are reviewed after delivery for unused frames in original
            packaging. Dynamic orders settle on the shared weekly UTC close and open
            a 24-hour final payment window before fulfillment.
          </div>
        </details>
      </div>

      {selectedColor && selectedSize ? null : null}
    </>
  );
}
