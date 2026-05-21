import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const vipTiers = [
  {
    name: "Starter",
    invites: "0-1 invites",
    discount: "Voucher reward",
    active: false,
  },
  {
    name: "Core",
    invites: "2-4 invites",
    discount: "5% off every next purchase",
    active: true,
  },
  {
    name: "Collector",
    invites: "5+ invites",
    discount: "10% off every next purchase",
    active: false,
  },
];

export default function VipPage() {
  return (
    <main className="flex w-full flex-col bg-[#f5efe5] pb-20">
      <section className="w-full overflow-hidden bg-[#f5efe5]">
        <SiteHeader active="sunglasses" />
      </section>

      <section className="mx-auto w-full max-w-[1500px] px-4 pt-10 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[2rem] bg-[#e8ddcd]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&fm=jpg&q=80&w=1800"
            alt="VIP program hero"
            className="h-[18rem] w-full object-cover sm:h-[24rem] lg:h-[30rem]"
          />
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#8b806f]">
              VIP Plan
            </p>
            <h1 className="mt-4 text-5xl font-semibold tracking-[-0.05em] text-[#171310]">
              Invite more, save more.
            </h1>
            <p className="mt-5 max-w-lg text-base leading-8 text-[#61584e]">
              Our VIP Plan rewards customers who bring new people into the
              Profun storefront and keep the collector cycle growing.
            </p>

            <div className="mt-8 rounded-[1.6rem] border border-[rgba(23,19,16,0.12)] bg-white px-6 py-6">
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#8b806f]">
                Your invite code
              </p>
              <div className="mt-4 flex items-center justify-between gap-4 rounded-[1.1rem] bg-[#f6f1e8] px-4 py-4">
                <span className="text-xl font-semibold tracking-[0.08em] text-[#171310]">
                  PROFUN-CORE-27
                </span>
                <button
                  type="button"
                  className="rounded-full border border-[rgba(23,19,16,0.14)] px-4 py-2 text-sm font-semibold uppercase tracking-[0.14em] text-[#171310]"
                >
                  Copy
                </button>
              </div>
              <p className="mt-4 text-sm leading-7 text-[#61584e]">
                Share this code with new users so their registration can be tied
                to your VIP reward progress.
              </p>
            </div>

            <div className="mt-8 rounded-[1.6rem] border border-[rgba(23,19,16,0.12)] bg-white px-6 py-6">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#171310]">
                Invite flow
              </p>
              <ol className="mt-4 space-y-3 text-sm leading-7 text-[#61584e]">
                <li>1. Enter your invite code during registration.</li>
                <li>2. After the invite code is submitted, the invited user also receives a coupon.</li>
              </ol>
            </div>
          </div>

          <div className="grid gap-5">
            <div className="rounded-[1.8rem] border border-[rgba(23,19,16,0.12)] bg-white px-6 py-6">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#171310]">
                How it works
              </p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.4rem] bg-[#f6f1e8] px-5 py-5">
                  <p className="text-sm font-semibold text-[#171310]">Invite with code</p>
                  <p className="mt-3 text-sm leading-7 text-[#61584e]">
                    Invite new users to register and submit your invite code to
                    unlock voucher rewards.
                  </p>
                </div>
                <div className="rounded-[1.4rem] bg-[#f6f1e8] px-5 py-5">
                  <p className="text-sm font-semibold text-[#171310]">Unlock ongoing discounts</p>
                  <p className="mt-3 text-sm leading-7 text-[#61584e]">
                    After more than two successful invites, every future purchase
                    receives a discount.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[1.8rem] border border-[rgba(23,19,16,0.12)] bg-white px-6 py-6">
              <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[rgba(23,19,16,0.08)] pb-5">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#171310]">
                    Current VIP status
                  </p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#171310]">
                    Core Tier
                  </h2>
                </div>
                <div className="text-right">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-[#8b806f]">
                    Current invites
                  </p>
                  <p className="mt-2 text-3xl font-semibold text-[#171310]">3</p>
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                <div className="rounded-[1.4rem] bg-[#f6f1e8] px-5 py-5">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-[#8b806f]">
                    Invite level
                  </p>
                  <p className="mt-3 text-xl font-semibold text-[#171310]">Core</p>
                </div>
                <div className="rounded-[1.4rem] bg-[#f6f1e8] px-5 py-5">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-[#8b806f]">
                    Successful invites
                  </p>
                  <p className="mt-3 text-xl font-semibold text-[#171310]">3 users</p>
                </div>
                <div className="rounded-[1.4rem] bg-[#f6f1e8] px-5 py-5">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-[#8b806f]">
                    Current discount
                  </p>
                  <p className="mt-3 text-xl font-semibold text-[#171310]">5% off</p>
                </div>
              </div>

              <div className="mt-6 h-3 overflow-hidden rounded-full bg-[#ece2d3]">
                <div className="h-full w-[62%] rounded-full bg-[#171310]" />
              </div>
              <p className="mt-3 text-sm text-[#61584e]">
                2 more successful invites to unlock the Collector tier.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {vipTiers.map((tier) => (
                <div
                  key={tier.name}
                  className={`rounded-[1.6rem] border px-5 py-5 ${
                    tier.active
                      ? "border-[#171310] bg-[#171310] text-white"
                      : "border-[rgba(23,19,16,0.12)] bg-white text-[#171310]"
                  }`}
                >
                  <p className="text-[11px] uppercase tracking-[0.18em] opacity-70">
                    {tier.invites}
                  </p>
                  <p className="mt-3 text-2xl font-semibold tracking-[-0.04em]">
                    {tier.name}
                  </p>
                  <p className="mt-3 text-sm leading-6 opacity-80">{tier.discount}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto mt-10 w-full max-w-[1500px] px-4 sm:px-6 lg:px-8">
        <SiteFooter />
      </div>
    </main>
  );
}
