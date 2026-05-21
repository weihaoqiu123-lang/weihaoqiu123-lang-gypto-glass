import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function RegisterPage() {
  return (
    <main className="flex w-full flex-col bg-[#f5efe5] pb-20">
      <section className="w-full overflow-hidden bg-[#f5efe5]">
        <SiteHeader active="sunglasses" />
      </section>

      <section className="mx-auto w-full max-w-[900px] px-4 pt-10 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-[rgba(23,19,16,0.12)] bg-white p-8 shadow-[0_18px_40px_rgba(0,0,0,0.06)] sm:p-10">
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#8b806f]">Account</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-[-0.05em] text-[#171310]">
            Create Account
          </h1>
          <div className="mt-8 grid gap-4">
            <label className="grid gap-2">
              <span className="text-sm font-medium text-[#171310]">Email</span>
              <input
                type="email"
                placeholder="you@example.com"
                className="rounded-xl border border-[rgba(23,19,16,0.14)] px-4 py-3 text-[#171310] outline-none"
              />
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-medium text-[#171310]">Password</span>
              <input
                type="password"
                placeholder="Create password"
                className="rounded-xl border border-[rgba(23,19,16,0.14)] px-4 py-3 text-[#171310] outline-none"
              />
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-medium text-[#171310]">Invite Code</span>
              <input
                type="text"
                placeholder="Optional invite code"
                className="rounded-xl border border-[rgba(23,19,16,0.14)] px-4 py-3 text-[#171310] outline-none"
              />
            </label>
          </div>
          <button
            type="button"
            className="mt-6 w-full rounded-full bg-[#171310] px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#f7f1e8]"
          >
            Create Account
          </button>
          <p className="mt-5 text-sm text-[#61584e]">
            Already registered?{" "}
            <Link href="/login" className="font-semibold text-[#171310] underline underline-offset-4">
              Sign in
            </Link>
          </p>
        </div>
      </section>

      <div className="mx-auto mt-10 w-full max-w-[900px] px-4 sm:px-6 lg:px-8">
        <SiteFooter />
      </div>
    </main>
  );
}
