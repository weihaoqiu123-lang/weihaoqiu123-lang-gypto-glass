import Link from "next/link";
import { WalletConnectButton } from "@/components/wallet-connect-button";

const featureCards = [
  {
    title: "Dynamic Price Engine",
    body: "Lock a pair with USDC, bind the drop to a crypto ticker, and settle seven days later with a capped final price.",
  },
  {
    title: "1x / 2x / 3x Modes",
    body: "Higher deposit tiers amplify price movement without loans, liquidations, or margin calls.",
  },
  {
    title: "Collector Product Logic",
    body: "Every release behaves like a cultural drop: tight supply language, visible momentum, and clear fulfillment rules.",
  },
];

const marketSignals = [
  { label: "Settlement Window", value: "7D + 24H" },
  { label: "Base Pricing", value: "10-20 USDC" },
  { label: "Accepted Rail", value: "Solana USDC" },
  { label: "Leverage Tiers", value: "1x / 2x / 3x" },
];

const pricingModes = [
  {
    mode: "Fixed Buy",
    detail: "For buyers who want instant clarity and a direct checkout path.",
    accent: "bg-[rgba(114,182,255,0.14)] text-[#a8d6ff]",
  },
  {
    mode: "Dynamic Buy",
    detail: "For buyers who want price exposure linked to a selected crypto asset.",
    accent: "bg-[rgba(115,245,215,0.14)] text-[#8af5db]",
  },
  {
    mode: "Leverage Deposit",
    detail: "For buyers who want a stronger upside/downside swing with a larger commitment.",
    accent: "bg-[rgba(194,255,99,0.14)] text-[#d8ff7a]",
  },
];

const leverageRows = [
  { tier: "1x", deposit: "2 USDC", behavior: "Lowest swing, lowest commitment" },
  { tier: "2x", deposit: "3 USDC", behavior: "Balanced volatility and commitment" },
  { tier: "3x", deposit: "5 USDC", behavior: "Highest swing, strongest conviction" },
];

const launchSteps = [
  "Connect wallet and choose a frame.",
  "Pick fixed price or dynamic price mode.",
  "If dynamic, select 1x, 2x, or 3x and pay the deposit in USDC.",
  "We lock the opening price, settle again after 7 days, then open a 24-hour balance payment window.",
];

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <section className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 pb-16 pt-5 sm:px-8 lg:px-10">
        <div className="glass-panel fade-up sticky top-4 z-20 flex items-center justify-between rounded-full px-5 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[linear-gradient(135deg,#c2ff63,#73f5d7)] text-sm font-bold text-[#041013]">
              GG
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-[var(--muted)]">
                Gypto-Glass
              </p>
              <p className="text-sm font-medium text-white">
                Crypto-native eyewear protocol
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-6 text-sm text-[var(--muted)] md:flex">
            <a href="#product">Product</a>
            <a href="#engine">Engine</a>
            <a href="#deposit">Deposit</a>
            <a href="#launch">Launch</a>
            <Link href="/admin/orders">Admin</Link>
            <Link href="/admin/products">Products Admin</Link>
          </div>

          <div className="hidden md:block">
            <WalletConnectButton />
          </div>
        </div>

        <div className="relative grid flex-1 gap-10 pt-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-14 lg:pt-18">
          <div className="relative">
            <div className="hero-orb left-8 top-2 h-32 w-32 bg-[rgba(114,182,255,0.22)]" />
            <div className="hero-orb left-36 top-40 h-44 w-44 bg-[rgba(194,255,99,0.16)]" />

            <div className="fade-up mb-6 inline-flex items-center gap-3 rounded-full border border-[rgba(115,245,215,0.22)] bg-[rgba(115,245,215,0.08)] px-4 py-2 text-xs uppercase tracking-[0.28em] text-[#96f9e2]">
              Solana USDC only
              <span className="h-1.5 w-1.5 rounded-full bg-[#c2ff63]" />
              First collector drop
            </div>

            <h1 className="fade-up max-w-4xl text-5xl font-bold leading-[0.96] tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl">
              Eyewear for the market that lives onchain.
            </h1>

            <p className="fade-up-delay mt-6 max-w-2xl text-lg leading-8 text-[#b6d1cb] sm:text-xl">
              Gypto-Glass turns sunglasses into a cultural trading object:
              clean frames, crypto-coded identity, and a pricing engine that
              reacts to the asset you choose.
            </p>

            <div className="fade-up-delay mt-8 flex flex-wrap gap-3">
              <a
                href="#product"
                className="rounded-full bg-[linear-gradient(135deg,#c2ff63,#73f5d7)] px-6 py-3 text-sm font-bold text-[#051217] transition-transform hover:-translate-y-0.5"
              >
                Explore V1
              </a>
              <a
                href="#engine"
                className="rounded-full border border-[rgba(115,245,215,0.22)] px-6 py-3 text-sm font-semibold text-[#c7f6ea] transition-colors hover:bg-[rgba(115,245,215,0.08)]"
              >
                See Pricing Logic
              </a>
              <div className="md:hidden">
                <WalletConnectButton />
              </div>
            </div>

            <div className="fade-up-delay-2 mt-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {marketSignals.map((signal) => (
                <div
                  key={signal.label}
                  className="glass-panel rounded-3xl px-4 py-4"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                    {signal.label}
                  </p>
                  <p className="mt-2 text-xl font-semibold text-white">
                    {signal.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="fade-up-delay-2 mt-6">
              <Link
                href="/products/sol-signal-genesis-frame"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#d9ff81] transition-transform hover:translate-x-1"
              >
                View the first product page
                <span aria-hidden="true">-&gt;</span>
              </Link>
            </div>
          </div>

          <div className="fade-up-delay relative">
            <div className="hero-orb right-8 top-18 h-48 w-48 bg-[rgba(255,153,102,0.14)]" />
            <div className="glass-panel relative overflow-hidden rounded-[2rem] p-5 sm:p-7">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.26em] text-[var(--muted)]">
                    Launch board
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">
                    SOL SIGNAL // GENESIS FRAME
                  </h2>
                </div>
                <span className="rounded-full border border-[rgba(115,245,215,0.25)] bg-[rgba(115,245,215,0.1)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[#9ef6e4]">
                  Live concept
                </span>
              </div>

              <div className="rounded-[1.6rem] border border-[rgba(255,255,255,0.06)] bg-[linear-gradient(135deg,rgba(14,59,65,0.6),rgba(5,16,22,0.95))] p-5">
                <div className="flex items-center justify-between text-sm text-[#9fb6b0]">
                  <span>Frame mood</span>
                  <span>Signal green / vacuum black</span>
                </div>

                <div className="mt-6 rounded-[1.4rem] border border-[rgba(255,255,255,0.07)] bg-[radial-gradient(circle_at_top,rgba(115,245,215,0.18),transparent_38%),linear-gradient(180deg,rgba(5,16,22,0.4),rgba(5,16,22,0.92))] px-6 py-8">
                  <div className="mx-auto aspect-[1.25/1] max-w-sm rounded-[1.6rem] border border-[rgba(194,255,99,0.12)] bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] px-6 py-7 shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
                    <div className="flex h-full flex-col justify-between">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-xs uppercase tracking-[0.28em] text-[#d5ff96]">
                            Edition
                          </p>
                          <p className="mt-2 text-3xl font-semibold text-white">
                            01
                          </p>
                        </div>
                        <div className="rounded-full border border-[rgba(115,245,215,0.2)] px-3 py-1 text-xs font-medium text-[#8bf4d8]">
                          Crypto-coded silhouette
                        </div>
                      </div>

                      <div className="relative mx-auto mt-6 h-28 w-full max-w-[17rem]">
                        <div className="absolute left-1/2 top-1/2 h-18 w-18 -translate-x-[118%] -translate-y-1/2 rounded-full border-[5px] border-[#d8fff2] shadow-[0_0_30px_rgba(115,245,215,0.16)]" />
                        <div className="absolute left-1/2 top-1/2 h-18 w-18 translate-x-[18%] -translate-y-1/2 rounded-full border-[5px] border-[#d8fff2] shadow-[0_0_30px_rgba(115,245,215,0.16)]" />
                        <div className="absolute left-1/2 top-1/2 h-2 w-18 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d8fff2]" />
                        <div className="absolute left-[2%] top-[46%] h-1.5 w-18 rounded-full bg-[linear-gradient(90deg,#d8fff2,transparent)]" />
                        <div className="absolute right-[2%] top-[46%] h-1.5 w-18 rounded-full bg-[linear-gradient(90deg,transparent,#d8fff2)]" />
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        {leverageRows.map((row) => (
                          <div
                            key={row.tier}
                            className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] px-3 py-3"
                          >
                            <p className="text-xs uppercase tracking-[0.2em] text-[#89a39d]">
                              {row.tier}
                            </p>
                            <p className="mt-2 text-lg font-semibold text-white">
                              {row.deposit}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {pricingModes.map((item) => (
                    <div
                      key={item.mode}
                      className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] p-4"
                    >
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${item.accent}`}
                      >
                        {item.mode}
                      </span>
                      <p className="mt-3 text-sm leading-6 text-[#b9d6cf]">
                        {item.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="product"
        className="mx-auto grid w-full max-w-7xl gap-6 px-5 py-10 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-10"
      >
        <div className="glass-panel rounded-[2rem] p-6 sm:p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-[#99f6e1]">
            Product thesis
          </p>
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
            A fashion product that borrows the energy of crypto without becoming
            a finance app.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#b4d0ca]">
            We are building a drop experience for crypto-native buyers: strong
            frame language, collectible scarcity, and a checkout flow that feels
            familiar to people already living with wallets, tokens, and market
            timing.
          </p>
        </div>

        <div className="grid gap-4">
          {featureCards.map((card) => (
            <article
              key={card.title}
              className="glass-panel highlight-line rounded-[1.7rem] p-5"
            >
              <h3 className="text-xl font-semibold text-white">{card.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#aecbc4]">
                {card.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        id="engine"
        className="mx-auto grid w-full max-w-7xl gap-6 px-5 py-10 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-10"
      >
        <div className="glass-panel rounded-[2rem] p-6 sm:p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-[#d7ff79]">
            Pricing engine
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
            Price up on the chart, price down on the frame.
          </h2>
          <div className="mt-6 space-y-4 text-sm leading-7 text-[#b7d5ce]">
            <p>
              Buyers choose a reference asset, enter with a USDC deposit, and
              let the product price react to market movement over a seven-day
              settlement window.
            </p>
            <p>
              Final pricing is capped between <span className="text-white">50%</span> and{" "}
              <span className="text-white">130%</span> of the base item price,
              keeping the mechanic readable and controlled.
            </p>
            <p>
              The leverage tier only changes how strongly the movement affects
              the final product price. There are no loans, no liquidations, and
              no hidden math.
            </p>
          </div>
        </div>

        <div className="glass-panel rounded-[2rem] p-6 sm:p-8">
          <div className="grid gap-4 md:grid-cols-[0.8fr_1.2fr]">
            <div className="rounded-[1.6rem] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
                Example signal
              </p>
              <p className="mt-3 text-4xl font-semibold text-white">SOL</p>
              <p className="mt-5 text-sm leading-6 text-[#aecaC4]">
                Start price recorded at deposit. End price recorded at settlement.
                Final price updates automatically after the seven-day timer.
              </p>
            </div>

            <div className="grid gap-3">
              {leverageRows.map((row) => (
                <div
                  key={row.tier}
                  className="rounded-[1.4rem] border border-[rgba(255,255,255,0.06)] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-4 sm:flex sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
                      {row.tier} deposit tier
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-white">
                      {row.deposit}
                    </p>
                  </div>
                  <p className="mt-3 max-w-xs text-sm leading-6 text-[#b8d5ce] sm:mt-0 sm:text-right">
                    {row.behavior}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="deposit"
        className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 lg:px-10"
      >
        <div className="glass-panel rounded-[2rem] px-6 py-7 sm:px-8 sm:py-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#ffb38f]">
                Deposit logic
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
                Small entry, meaningful commitment.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-[#b5d0ca]">
                Deposits are not symbolic. They create actual buyer discipline,
                keep the mechanic credible, and reduce empty speculation around
                the drop.
              </p>
            </div>

            <div className="grid gap-3">
              {launchSteps.map((step, index) => (
                <div
                  key={step}
                  className="rounded-[1.5rem] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] px-4 py-4"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#73f5d7,#72b6ff)] text-sm font-bold text-[#031217]">
                      {index + 1}
                    </span>
                    <p className="pt-1 text-sm leading-6 text-[#c0ddd6]">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="launch"
        className="mx-auto w-full max-w-7xl px-5 pb-16 pt-10 sm:px-8 lg:px-10"
      >
        <div className="rounded-[2.2rem] border border-[rgba(194,255,99,0.14)] bg-[linear-gradient(135deg,rgba(194,255,99,0.12),rgba(115,245,215,0.06),rgba(114,182,255,0.08))] px-6 py-8 shadow-[0_30px_90px_rgba(0,0,0,0.25)] sm:px-8 sm:py-10">
          <p className="text-xs uppercase tracking-[0.3em] text-[#dbff8d]">
            First build target
          </p>
          <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="max-w-3xl text-3xl font-semibold tracking-[-0.04em] text-[#041013] sm:text-4xl">
                Next: product detail, order creation, wallet connect, and Solana
                USDC checkout.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[#10313a]">
                The brand shell is ready. From here we move into product pages,
                pricing states, checkout, and the first admin-ready order model.
              </p>
            </div>

            <div className="flex gap-3">
              <a
                href="#engine"
                className="rounded-full border border-[rgba(4,16,19,0.12)] px-5 py-3 text-sm font-semibold text-[#0b2a31]"
              >
                Review logic
              </a>
              <a
                href="#product"
                className="rounded-full bg-[#041013] px-5 py-3 text-sm font-semibold text-[#eafff8]"
              >
                Continue build
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
