import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { ProductGallery } from "@/components/product-gallery";
import { ProductSummaryPanel } from "@/components/product-summary-panel";
import { SiteHeader } from "@/components/site-header";
import { getProductBySlug } from "@/data/products";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    color?: string;
    size?: string;
    image?: string;
    sizeChart?: string;
  }>;
};

export default async function ProductPage({ params, searchParams }: ProductPageProps) {
  const { slug } = await params;
  const query = await searchParams;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const selectedColor = product.colors.includes(query.color ?? "")
    ? query.color
    : product.colors[0];
  const selectedSize = product.sizes.some((size) => size.value === query.size)
    ? query.size
    : product.sizes[0]?.value;
  const selectedImageIndex = Number.isFinite(Number(query.image))
    ? Number(query.image)
    : 0;
  const sizeChartOpen = query.sizeChart === "1";

  return (
    <main className="flex w-full flex-col bg-[#f5efe5] pb-20">
      <section className="w-full overflow-hidden bg-[#f5efe5]">
        <SiteHeader active="sunglasses" />
      </section>

      <section className="mx-auto w-full max-w-[1600px] px-4 pt-8 sm:px-6 lg:px-8">
        <div className="border-b border-[rgba(23,19,16,0.08)] pb-6 text-sm text-[#6d645a]">
          <Link href="/" className="text-[#181411]">
            Home
          </Link>{" "}
          &gt;{" "}
          <Link href="/products" className="text-[#181411]">
            Sunglasses
          </Link>{" "}
          &gt; {product.name}
        </div>

        <div className="grid gap-10 pt-8 xl:grid-cols-[1.36fr_0.64fr]">
          <ProductGallery
            product={product}
            selectedColor={selectedColor}
            selectedSize={selectedSize}
            selectedImageIndex={selectedImageIndex}
          />
          <ProductSummaryPanel
            product={product}
            selectedColor={selectedColor}
            selectedSize={selectedSize}
            selectedImageIndex={selectedImageIndex}
          />
        </div>

        <section className="mt-12 grid gap-8 border-t border-[rgba(23,19,16,0.08)] pt-10 lg:grid-cols-[0.72fr_0.28fr]">
          <div className="overflow-hidden rounded-[2rem] bg-[#f7f3ec]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.lifestyleImage}
              alt={`${product.name} mature fit preview`}
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
          <div className="rounded-[2rem] border border-[rgba(23,19,16,0.08)] bg-white p-6">
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#8b806f]">
              Mature fit preview
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#171310]">
              See the frame in a softer everyday context.
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#61584e]">
              We keep a warm at-home reference image on each product page so you can judge how the front shape feels outside a plain white product background. The gallery above still carries the three technical product views for comparison.
            </p>
            <div className="mt-6 rounded-[1.4rem] bg-[#f7f1e8] p-5 text-sm leading-7 text-[#61584e]">
              Front view on storefront. Angle and side view inside the gallery. Lifestyle reference below for softer fit judgment.
            </div>
          </div>
        </section>
      </section>

      <div className="mx-auto mt-10 w-full max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <SiteFooter />
      </div>

      {sizeChartOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.72)] px-4">
          <div className="w-full max-w-2xl rounded-[2rem] bg-[#f7f1e8] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.2)]">
            <div className="flex items-center justify-between gap-4 border-b border-[rgba(23,19,16,0.08)] pb-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-[#8b806f]">
                  Size chart
                </p>
                <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[#171310]">
                  Frame measurements
                </h3>
              </div>
              <Link
                href={`/products/${product.slug}?${new URLSearchParams({
                  color: selectedColor ?? product.colors[0],
                  size: selectedSize ?? product.sizes[0]?.value ?? "",
                  image: String(selectedImageIndex),
                }).toString()}`}
                className="rounded-full border border-[rgba(23,19,16,0.12)] px-4 py-2 text-sm font-semibold text-[#171310]"
              >
                Close
              </Link>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {product.sizes.map((size) => (
                <div
                  key={size.value}
                  className="rounded-[1.4rem] border border-[rgba(23,19,16,0.08)] bg-white p-5"
                >
                  <p className="text-lg font-semibold text-[#171310]">
                    {size.value} ({size.fit})
                  </p>
                  <div className="mt-4 space-y-2 text-sm text-[#61584e]">
                    <p>Lens width: {size.value} mm</p>
                    <p>Bridge: 24 mm</p>
                    <p>Temple length: 145 mm</p>
                    <p>Lens height: 39 mm</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
