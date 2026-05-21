import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="rounded-[2.4rem] border border-[rgba(24,20,17,0.08)] bg-[#efe5d7] px-6 py-8 shadow-[0_16px_36px_rgba(0,0,0,0.05)] sm:px-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.24em] text-[#7b7064]">
            Gypto-Glass
          </p>
          <p className="mt-3 max-w-xl text-base leading-7 text-[#5d564d]">
            Product-led eyewear with a cleaner storefront and shared weekly pricing.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 text-sm font-semibold text-[#181411]">
          <Link href="/">Home</Link>
          <Link href="/products">Catalog</Link>
          <Link href="/products?category=eyeglasses">Eyeglasses</Link>
          <Link href="/products?category=reading-glasses">Reading Glasses</Link>
        </div>
      </div>
    </footer>
  );
}
