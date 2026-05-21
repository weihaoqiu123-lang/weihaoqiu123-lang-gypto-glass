import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductPurchasePanel } from "@/components/product-purchase-panel";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getProductBySlug } from "@/data/products";

type CheckoutPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ color?: string; size?: string }>;
};

export default async function CheckoutPage({ params, searchParams }: CheckoutPageProps) {
  const { slug } = await params;
  const query = await searchParams;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="flex w-full flex-col bg-[#f5efe5] pb-20">
      <section className="w-full overflow-hidden bg-[#f5efe5]">
        <SiteHeader active="sunglasses" />
      </section>

      <section className="mx-auto w-full max-w-[1200px] px-4 pt-8 sm:px-6 lg:px-8">
        <div className="border-b border-[rgba(23,19,16,0.08)] pb-6 text-sm text-[#6d645a]">
          <Link href="/" className="text-[#181411]">
            Home
          </Link>{" "}
          &gt;{" "}
          <Link href="/products" className="text-[#181411]">
            Sunglasses
          </Link>{" "}
          &gt;{" "}
          <Link href={`/products/${product.slug}`} className="text-[#181411]">
            {product.name}
          </Link>{" "}
          &gt; Checkout
        </div>

        <div className="grid gap-8 pt-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-[2rem] border border-[rgba(23,19,16,0.08)] bg-white p-7 shadow-[0_16px_40px_rgba(0,0,0,0.05)] sm:p-9">
            <p className="text-[11px] uppercase tracking-[0.24em] text-[#958a7d]">
              Order summary
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-[#171310]">
              {product.name}
            </h1>
            <div className="mt-5 grid gap-3">
              <div className="rounded-[1.4rem] bg-[#f6f1e8] px-4 py-4 text-sm text-[#171310]">
                Color: <span className="font-semibold">{query.color ?? product.colors[0]}</span>
              </div>
              <div className="rounded-[1.4rem] bg-[#f6f1e8] px-4 py-4 text-sm text-[#171310]">
                Size: <span className="font-semibold">{query.size ?? product.sizes[0]?.value}</span>
              </div>
              <div className="rounded-[1.4rem] bg-[#f6f1e8] px-4 py-4 text-sm text-[#171310]">
                Shipping: <span className="font-semibold">{product.shippingWindow}</span>
              </div>
            </div>
            <p className="mt-6 text-sm leading-7 text-[#61584e]">
              Complete checkout with your wallet and shipping details below.
              Fixed buy pays the full frame now. Dynamic buy pays the deposit now
              and settles on the shared weekly UTC close.
            </p>
          </div>

          <ProductPurchasePanel
            product={product}
            selectedColor={query.color}
            selectedSize={query.size}
          />
        </div>
      </section>

      <div className="mx-auto mt-10 w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <SiteFooter />
      </div>
    </main>
  );
}
