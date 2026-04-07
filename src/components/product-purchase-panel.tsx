"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";
import type { Product } from "@/data/products";
import { WalletConnectButton } from "@/components/wallet-connect-button";

type ProductPurchasePanelProps = {
  product: Product;
};

type PurchaseMode = "fixed" | "dynamic";
type LeverageTier = "1x" | "2x" | "3x";

type OrderResponse = {
  order: {
    orderNo: string;
    amountUsdc: number;
    purchaseMode: PurchaseMode;
    leverageTier?: LeverageTier;
  };
};

type OrderErrorResponse = {
  error?: string;
};

export function ProductPurchasePanel({ product }: ProductPurchasePanelProps) {
  const router = useRouter();
  const { publicKey, connected } = useWallet();
  const [purchaseMode, setPurchaseMode] = useState<PurchaseMode>("fixed");
  const [leverageTier, setLeverageTier] = useState<LeverageTier>("1x");
  const [receiverName, setReceiverName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<OrderResponse["order"] | null>(null);

  const selectedDeposit = useMemo(() => {
    return product.leverageTiers.find((item) => item.tier === leverageTier)?.depositUsdc ?? 0;
  }, [leverageTier, product.leverageTiers]);

  const payNowAmount = purchaseMode === "fixed" ? product.basePriceUsdc : selectedDeposit;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess(null);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slug: product.slug,
          walletAddress: publicKey?.toBase58() ?? "",
          purchaseMode,
          leverageTier,
          receiverName,
          phone,
          address,
        }),
      });

      const data = (await response.json()) as OrderResponse | OrderErrorResponse;

      if (!response.ok || !("order" in data)) {
        throw new Error(("error" in data && data.error) || "Unable to create order.");
      }

      setSuccess(data.order);
      setReceiverName("");
      setPhone("");
      setAddress("");
      router.push(`/orders/${data.order.orderNo}`);
    } catch (submissionError) {
      setError(
        submissionError instanceof Error ? submissionError.message : "Unable to create order.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="glass-panel rounded-[2rem] p-6">
      <p className="text-xs uppercase tracking-[0.24em] text-[#97f6e1]">
        Purchase panel
      </p>
      <h2 className="mt-3 text-2xl font-semibold text-white">
        Reserve this frame with USDC
      </h2>
      <p className="mt-3 text-sm leading-6 text-[#b8d4ce]">
        We are wiring in real payment next. For now, this creates a valid draft
        order and prepares the checkout shape.
      </p>

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setPurchaseMode("fixed")}
          className={`rounded-full px-4 py-2 text-sm font-semibold ${
            purchaseMode === "fixed"
              ? "bg-[linear-gradient(135deg,#c2ff63,#73f5d7)] text-[#041115]"
              : "border border-[rgba(255,255,255,0.08)] text-[#d7f7ef]"
          }`}
        >
          Fixed buy
        </button>
        <button
          type="button"
          onClick={() => setPurchaseMode("dynamic")}
          className={`rounded-full px-4 py-2 text-sm font-semibold ${
            purchaseMode === "dynamic"
              ? "bg-[linear-gradient(135deg,#72b6ff,#73f5d7)] text-[#041115]"
              : "border border-[rgba(255,255,255,0.08)] text-[#d7f7ef]"
          }`}
        >
          Dynamic buy
        </button>
      </div>

      {purchaseMode === "dynamic" ? (
        <div className="mt-5 grid grid-cols-3 gap-3">
          {product.leverageTiers.map((tier) => (
            <button
              key={tier.tier}
              type="button"
              onClick={() => setLeverageTier(tier.tier)}
              className={`rounded-[1.4rem] px-4 py-4 text-left transition-transform hover:-translate-y-0.5 ${
                leverageTier === tier.tier
                  ? "bg-[linear-gradient(180deg,rgba(194,255,99,0.16),rgba(115,245,215,0.12))] text-white"
                  : "border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] text-[#d8f0ea]"
              }`}
            >
              <p className="text-xs uppercase tracking-[0.2em] text-[#8ba59f]">
                {tier.tier}
              </p>
              <p className="mt-2 text-lg font-semibold">{tier.depositUsdc} USDC</p>
            </button>
          ))}
        </div>
      ) : null}

      <div className="mt-5 rounded-[1.5rem] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] p-4">
        <p className="text-sm text-[#8ea8a1]">Wallet status</p>
        <div className="mt-3 flex flex-col gap-3">
          <WalletConnectButton />
          <p className="text-sm text-[#c4dfd8]">
            {connected && publicKey
              ? `Connected: ${publicKey.toBase58().slice(0, 4)}...${publicKey.toBase58().slice(-4)}`
              : "Connect a Solana wallet to create an order."}
          </p>
        </div>
      </div>

      <form className="mt-5 grid gap-4" onSubmit={handleSubmit}>
        <label className="grid gap-2">
          <span className="text-sm font-medium text-[#dffdf4]">Receiver name</span>
          <input
            value={receiverName}
            onChange={(event) => setReceiverName(event.target.value)}
            className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] px-4 py-3 text-white outline-none placeholder:text-[#76918a]"
            placeholder="Alex Sol"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-[#dffdf4]">Phone</span>
          <input
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] px-4 py-3 text-white outline-none placeholder:text-[#76918a]"
            placeholder="+1 555 010 2048"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-[#dffdf4]">Address</span>
          <textarea
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            className="min-h-28 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] px-4 py-3 text-white outline-none placeholder:text-[#76918a]"
            placeholder="English shipping address"
          />
        </label>

        <div className="rounded-[1.5rem] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] px-4 py-4">
          <p className="text-sm text-[#8ea8a1]">Pay now</p>
          <p className="mt-2 text-3xl font-semibold text-white">{payNowAmount} USDC</p>
          <p className="mt-2 text-sm leading-6 text-[#bad7d0]">
            {purchaseMode === "fixed"
              ? "Fixed buy charges the full product price immediately."
              : `Dynamic buy takes the ${leverageTier} deposit now and opens a 24-hour final payment window after settlement.`}
          </p>
        </div>

        {error ? (
          <div className="rounded-2xl border border-[rgba(255,153,102,0.3)] bg-[rgba(255,153,102,0.08)] px-4 py-3 text-sm text-[#ffc3a7]">
            {error}
          </div>
        ) : null}

        {success ? (
          <div className="rounded-2xl border border-[rgba(115,245,215,0.24)] bg-[rgba(115,245,215,0.08)] px-4 py-3 text-sm text-[#dffff7]">
            Draft order created: <span className="font-semibold">{success.orderNo}</span>. Amount due now:{" "}
            <span className="font-semibold">{success.amountUsdc} USDC</span>.
          </div>
        ) : null}

        <button
          type="submit"
          disabled={!connected || submitting}
          className="rounded-full bg-[linear-gradient(135deg,#c2ff63,#73f5d7)] px-5 py-3 text-sm font-bold text-[#041115] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? "Creating order..." : "Create order draft"}
        </button>
      </form>
    </div>
  );
}
