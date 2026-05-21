import Link from "next/link";

type SiteHeaderProps = {
  active?: "eyeglasses" | "sunglasses" | "reading";
  showPromoBanner?: boolean;
};

function navClass(isActive: boolean) {
  return isActive
    ? "text-[#171310]"
    : "text-[#7b7164] transition-colors hover:text-[#171310]";
}

export function SiteHeader({
  active = "sunglasses",
  showPromoBanner = false,
}: SiteHeaderProps) {
  return (
    <header>
      {showPromoBanner ? (
        <Link
          href="/vip"
          className="flex h-[60px] items-center justify-center bg-[#0f0d0c] px-4 text-center transition-opacity hover:opacity-90"
          style={{ color: "#ffffff" }}
        >
          <span
            className="block whitespace-nowrap"
            style={{
              color: "#ffffff",
              fontSize: "16px",
              fontWeight: 700,
              letterSpacing: "0.06em",
              lineHeight: 1.1,
            }}
          >
            JOIN OUR VIP PROGRAM FOR 50% OFF
          </span>
        </Link>
      ) : null}

      <div className="hidden items-center justify-between bg-[#e0aa12] px-7 py-4 text-[16px] uppercase tracking-[0.04em] text-[#171310] lg:flex">
        <Link
          href="/"
          className="text-[24px] font-semibold tracking-[0.06em] text-[#171310]"
        >
          GYPTO-GLASS
        </Link>

        <nav className="flex items-center gap-10">
          <Link href="/products?category=eyeglasses" className={navClass(active === "eyeglasses")}>
            Eyeglasses
          </Link>
          <Link href="/products" className={navClass(active === "sunglasses")}>
            Sunglasses
          </Link>
          <Link href="/products?category=reading-glasses" className={navClass(active === "reading")}>
            Reading Glasses
          </Link>
          <Link href="/vip" className="font-semibold tracking-[0.14em] text-[#171310]">
            VIP Plan
          </Link>
        </nav>

        <div className="flex items-center gap-6">
          <Link href="/account" className="font-medium transition-colors hover:text-[#171310]">
            Account
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-4 bg-[#e0aa12] px-4 py-4 lg:hidden">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-[18px] font-semibold uppercase tracking-[0.06em] text-[#171310]"
          >
            Gypto-Glass
          </Link>
          <div className="flex items-center gap-4 text-[15px] uppercase tracking-[0.06em] text-[#7b7164]">
            <Link href="/account" className="text-[#171310]">
              Account
            </Link>
          </div>
        </div>

        <nav className="flex flex-wrap gap-5 text-[15px] uppercase tracking-[0.06em] text-[#171310]">
          <Link href="/products?category=eyeglasses" className={navClass(active === "eyeglasses")}>
            Eyeglasses
          </Link>
          <Link href="/products" className={navClass(active === "sunglasses")}>
            Sunglasses
          </Link>
          <Link href="/products?category=reading-glasses" className={navClass(active === "reading")}>
            Reading Glasses
          </Link>
          <Link href="/vip" className="font-semibold tracking-[0.12em] text-[#171310]">
            VIP Plan
          </Link>
        </nav>
      </div>
    </header>
  );
}
