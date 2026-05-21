import Link from "next/link";
import { notFound } from "next/navigation";
import { PaymentStatusPanel } from "@/components/payment-status-panel";
import { SettlementCountdown } from "@/components/settlement-countdown";
import { getOrderByOrderNo } from "@/lib/orders";
import { paymentConfig } from "@/lib/payment-config";
import { buildQrDataUrl } from "@/lib/qr";
import { formatUtcDateTime } from "@/lib/settlement-cycle";
import { buildSolanaPayUrl } from "@/lib/solana-pay";

type OrderPageProps = {
  params: Promise<{ orderNo: string }>;
};

export default async function OrderPage({ params }: OrderPageProps) {
  const { orderNo } = await params;
  const order = await getOrderByOrderNo(orderNo);

  if (!order) {
    notFound();
  }

  const payNowLabel =
    order.purchaseMode === "fixed"
      ? "Full payment due now"
      : `${order.leverageTier ?? "1x"} deposit due now`;
  const paymentUrl = buildSolanaPayUrl(order);
  const qrCodeUrl = await buildQrDataUrl(paymentUrl);

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-5 pb-16 pt-6 sm:px-8 lg:px-10">
      <section className="glass-panel rounded-[2rem] px-6 py-7 sm:px-8 sm:py-9">
        <p className="text-xs uppercase tracking-[0.28em] text-[#97f6e1]">
          Order created
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
          {order.orderNo}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[#b7d4ce]">
          This order is now waiting for Solana USDC payment. Real onchain payment
          is the next integration step, but the full order state is already being
          tracked.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <div className="glass-panel rounded-[2rem] p-6 sm:p-8">
          <p className="text-xs uppercase tracking-[0.24em] text-[#d7ff79]">
            Order snapshot
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.4rem] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] px-4 py-4">
              <p className="text-sm text-[#8da7a0]">Product</p>
              <p className="mt-2 text-lg font-semibold text-white">{order.productName}</p>
            </div>
            <div className="rounded-[1.4rem] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] px-4 py-4">
              <p className="text-sm text-[#8da7a0]">Status</p>
              <p className="mt-2 text-lg font-semibold text-white">{order.status}</p>
            </div>
            <div className="rounded-[1.4rem] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] px-4 py-4">
              <p className="text-sm text-[#8da7a0]">Purchase mode</p>
              <p className="mt-2 text-lg font-semibold text-white">{order.purchaseMode}</p>
            </div>
            <div className="rounded-[1.4rem] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] px-4 py-4">
              <p className="text-sm text-[#8da7a0]">Chain / token</p>
              <p className="mt-2 text-lg font-semibold text-white">
                {order.chain} / {order.paymentToken}
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-[1.5rem] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] px-4 py-4">
            <p className="text-sm text-[#8da7a0]">Wallet</p>
            <p className="mt-2 break-all text-sm text-[#dffdf4]">{order.walletAddress}</p>
          </div>

          {order.purchaseMode === "dynamic" && order.settlementAt ? (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <SettlementCountdown settlementAt={order.settlementAt} />
              <div className="rounded-[1.4rem] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] px-4 py-4">
                <p className="text-sm text-[#8da7a0]">Reference market</p>
                <p className="mt-2 text-lg font-semibold text-white">
                  {order.referenceSymbol ?? "N/A"} entry at{" "}
                  {order.entryPriceUsd ? `$${order.entryPriceUsd.toFixed(2)}` : "N/A"}
                </p>
                <p className="mt-3 text-sm leading-6 text-[#bad7d0]">
                  Shared weekly UTC settlement: {formatUtcDateTime(order.settlementAt)}
                </p>
                {order.finalPaymentDeadline ? (
                  <p className="mt-2 text-sm leading-6 text-[#bad7d0]">
                    Final payment deadline: {formatUtcDateTime(order.finalPaymentDeadline)}
                  </p>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>

        <div className="flex flex-col gap-6">
          <div className="glass-panel rounded-[2rem] p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-[#97f6e1]">
              Payment brief
            </p>
            <div className="mt-4 rounded-[1.5rem] border border-[rgba(255,255,255,0.06)] bg-[linear-gradient(180deg,rgba(194,255,99,0.12),rgba(115,245,215,0.06))] px-4 py-5">
              <p className="text-sm text-[#18353b]">{payNowLabel}</p>
              <p className="mt-2 text-4xl font-semibold text-[#041013]">
                {order.amountUsdc} USDC
              </p>
              {order.purchaseMode === "dynamic" ? (
                <p className="mt-3 text-sm leading-6 text-[#103139]">
                  Dynamic orders now share one weekly UTC settlement point. Your
                  entry price was captured at checkout, and the remaining balance
                  opens for 24 hours after settlement.
                </p>
              ) : (
                <p className="mt-3 text-sm leading-6 text-[#103139]">
                  Fixed buy completes with one payment and moves into production
                  or fulfillment once the transaction is confirmed.
                </p>
              )}
            </div>

            <div className="mt-4 space-y-3 rounded-[1.5rem] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] px-4 py-4 text-sm leading-6 text-[#c4dfd8]">
              <div className="flex justify-center rounded-[1.5rem] bg-[#ecfff6] p-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={qrCodeUrl}
                  alt={`Solana Pay QR for ${order.orderNo}`}
                  className="h-48 w-48 rounded-2xl"
                />
              </div>
              <p>
                <span className="text-[#8ea8a1]">Merchant wallet:</span>{" "}
                <span className="break-all text-white">{paymentConfig.merchantWallet}</span>
              </p>
              <p>
                <span className="text-[#8ea8a1]">Payment reference:</span>{" "}
                <span className="break-all text-white">{order.paymentReference}</span>
              </p>
              <p>
                <span className="text-[#8ea8a1]">USDC mint:</span>{" "}
                <span className="break-all text-white">{paymentConfig.tokenMint}</span>
              </p>
              <p className="text-[#9eb8b2]">
                Scan with a Solana wallet that supports Solana Pay, or open the
                payment link directly on a compatible device.
              </p>
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href={paymentUrl}
                className="rounded-full bg-[linear-gradient(135deg,#c2ff63,#73f5d7)] px-5 py-3 text-sm font-bold text-[#041115]"
              >
                Open Solana Pay link
              </a>
              <span className="rounded-full border border-[rgba(115,245,215,0.24)] px-5 py-3 text-sm font-semibold text-[#ddfff4]">
                Payment prepare API wired
              </span>
            </div>
          </div>

          <PaymentStatusPanel
            orderNo={order.orderNo}
            status={order.status}
            existingSignature={order.txSignature}
          />

          <div className="glass-panel rounded-[2rem] p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-[#ffb18b]">
              Shipping
            </p>
            <div className="mt-4 space-y-3 text-sm leading-6 text-[#c3dfd8]">
              <p>
                <span className="text-[#8ea8a1]">Receiver:</span> {order.receiverName}
              </p>
              <p>
                <span className="text-[#8ea8a1]">Phone:</span> {order.phone}
              </p>
              <p>
                <span className="text-[#8ea8a1]">Address:</span> {order.address}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-[rgba(194,255,99,0.14)] bg-[linear-gradient(135deg,rgba(194,255,99,0.1),rgba(115,245,215,0.06),rgba(114,182,255,0.08))] px-6 py-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[#163238]">
              Next integration
            </p>
            <p className="mt-2 text-base leading-7 text-[#0c2a31]">
              Next we wire this order page to a real Solana USDC payment request
              and transaction confirmation flow.
            </p>
          </div>
          <Link
            href="/products"
            className="rounded-full bg-[#041013] px-5 py-3 text-sm font-semibold text-[#eafff8]"
          >
            Back to catalog
          </Link>
        </div>
      </section>
    </main>
  );
}
