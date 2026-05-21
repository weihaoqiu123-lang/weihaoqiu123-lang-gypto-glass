import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function AccountPage() {
  return (
    <main className="flex w-full flex-col bg-[#f5efe5] pb-20">
      <section className="w-full overflow-hidden bg-[#f5efe5]">
        <SiteHeader active="sunglasses" />
      </section>

      <section className="mx-auto w-full max-w-[1200px] px-4 pt-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[2rem] bg-[#e9dece] p-8">
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#8b806f]">
              Account
            </p>
            <h1 className="mt-4 text-5xl font-semibold tracking-[-0.05em] text-[#171310]">
              Sign in or create your account.
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-[#61584e]">
              Save your orders, keep your wallet purchases organized, and return
              faster when the next drop goes live.
            </p>
          </div>

          <div className="grid gap-4">
            <Link
              href="/login"
              className="rounded-[1.6rem] border border-[rgba(23,19,16,0.12)] bg-white px-6 py-7 transition-colors hover:border-[#171310]"
            >
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#8b806f]">
                Returning customer
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#171310]">
                Sign In
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#61584e]">
                Access your saved orders, profile, and future checkout history.
              </p>
            </Link>

            <Link
              href="/register"
              className="rounded-[1.6rem] border border-[rgba(23,19,16,0.12)] bg-white px-6 py-7 transition-colors hover:border-[#171310]"
            >
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#8b806f]">
                New customer
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#171310]">
                Create Account
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#61584e]">
                Register once so your next wallet purchase and VIP activity are easier to track.
              </p>
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto mt-10 w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <SiteFooter />
      </div>
    </main>
  );
}
