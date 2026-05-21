"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";
import type { Product } from "@/data/products";
import { WalletConnectButton } from "@/components/wallet-connect-button";

type ProductPurchasePanelProps = {
  product: Product;
  selectedColor?: string;
  selectedSize?: string;
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

export function ProductPurchasePanel({
  product,
  selectedColor,
  selectedSize,
}: ProductPurchasePanelProps) {
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
    <div className="rounded-[2rem] border border-[rgba(24,20,17,0.08)] bg-[#fbfaf7] p-6 shadow-[0_16px_40px_rgba(0,0,0,0.08)]">
      <div className="border-b border-[rgba(24,20,17,0.08)] pb-5">
        <p className="text-[11px] uppercase tracking-[0.24em] text-[#958a7d]">
          Purchase
        </p>
        <div className="mt-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm text-[#958a7d]">From</p>
            <p className="mt-1 text-3xl font-semibold text-[#181411]">
              {product.basePriceUsdc} USDC
            </p>
          </div>
          <p className="text-right text-sm leading-6 text-[#5d564d]">
            Dynamic range
            <br />
            <span className="font-semibold text-[#8f6222]">{product.priceRangeUsdc}</span>
          </p>
        </div>
        {selectedColor || selectedSize ? (
          <div className="mt-4 flex flex-wrap gap-3 text-sm text-[#5d564d]">
            {selectedColor ? (
              <span className="rounded-full bg-white px-3 py-1.5">
                Color: <span className="font-semibold text-[#181411]">{selectedColor}</span>
              </span>
            ) : null}
            {selectedSize ? (
              <span className="rounded-full bg-white px-3 py-1.5">
                Size: <span className="font-semibold text-[#181411]">{selectedSize}</span>
              </span>
            ) : null}
          </div>
        ) : null}
      </div>

      <div className="mt-5">
        <p className="text-[11px] uppercase tracking-[0.22em] text-[#958a7d]">
          Purchase mode
        </p>
      </div>

      <div className="mt-3 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setPurchaseMode("fixed")}
          className={`rounded-full px-4 py-2 text-sm font-semibold ${
            purchaseMode === "fixed"
              ? "bg-[#181411] text-[#f7f3ec]"
              : "border border-[rgba(24,20,17,0.08)] text-[#5d564d]"
          }`}
        >
          Fixed buy
        </button>
        <button
          type="button"
          onClick={() => setPurchaseMode("dynamic")}
          className={`rounded-full px-4 py-2 text-sm font-semibold ${
            purchaseMode === "dynamic"
              ? "bg-[#c58b2a] text-[#fffaf2]"
              : "border border-[rgba(24,20,17,0.08)] text-[#5d564d]"
          }`}
        >
          Dynamic buy
        </button>
      </div>

      {purchaseMode === "dynamic" ? (
        <div className="mt-5">
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#958a7d]">
            Deposit tier
          </p>
          <div className="mt-3 grid grid-cols-3 gap-3">
          {product.leverageTiers.map((tier) => (
            <button
              key={tier.tier}
              type="button"
              onClick={() => setLeverageTier(tier.tier)}
              className={`rounded-[1.4rem] px-4 py-4 text-left transition-transform hover:-translate-y-0.5 ${
                leverageTier === tier.tier
                  ? "border border-[rgba(197,139,42,0.28)] bg-[rgba(197,139,42,0.08)] text-[#181411]"
                  : "border border-[rgba(24,20,17,0.08)] bg-white text-[#5d564d]"
              }`}
            >
              <p className="text-xs uppercase tracking-[0.2em] text-[#958a7d]">
                {tier.tier}
              </p>
              <p className="mt-2 text-lg font-semibold">{tier.depositUsdc} USDC</p>
            </button>
          ))}
          </div>
        </div>
      ) : null}

      <div className="mt-5 rounded-[1.5rem] border border-[rgba(24,20,17,0.08)] bg-white p-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm text-[#958a7d]">Wallet</p>
          <span className="text-[11px] uppercase tracking-[0.16em] text-[#958a7d]">
            Solana
          </span>
        </div>
        <div className="mt-3 flex flex-col gap-3">
          <WalletConnectButton />
          <p className="text-sm text-[#5d564d]">
            {connected && publicKey
              ? `Connected: ${publicKey.toBase58().slice(0, 4)}...${publicKey.toBase58().slice(-4)}`
              : "Connect a Solana wallet to create an order."}
          </p>
        </div>
      </div>

      <form className="mt-5 grid gap-4" onSubmit={handleSubmit}>
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#958a7d]">
            Shipping details
          </p>
        </div>
        <label className="grid gap-2">
          <span className="text-sm font-medium text-[#181411]">Receiver name</span>
          <input
            value={receiverName}
            onChange={(event) => setReceiverName(event.target.value)}
            className="rounded-2xl border border-[rgba(24,20,17,0.08)] bg-white px-4 py-3 text-[#181411] outline-none placeholder:text-[#958a7d]"
            placeholder="Alex Sol"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-[#181411]">Phone</span>
          <input
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            className="rounded-2xl border border-[rgba(24,20,17,0.08)] bg-white px-4 py-3 text-[#181411] outline-none placeholder:text-[#958a7d]"
            placeholder="+1 555 010 2048"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-[#181411]">Address</span>
          <textarea
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            className="min-h-28 rounded-2xl border border-[rgba(24,20,17,0.08)] bg-white px-4 py-3 text-[#181411] outline-none placeholder:text-[#958a7d]"
            placeholder="English shipping address"
          />
        </label>

        <div className="rounded-[1.5rem] border border-[rgba(24,20,17,0.08)] bg-white px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-[#958a7d]">Pay now</p>
            <p className="text-2xl font-semibold text-[#181411]">{payNowAmount} USDC</p>
          </div>
          <p className="mt-3 text-sm leading-6 text-[#5d564d]">
            {purchaseMode === "fixed"
              ? "Fixed buy charges the full product price immediately."
              : `Dynamic buy takes the ${leverageTier} deposit now and settles on the shared weekly close.`}
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
          className="rounded-full bg-[#181411] px-5 py-3 text-sm font-bold text-[#f7f3ec] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? "Creating order..." : "Create order draft"}
        </button>
      </form>
    </div>
  );
}
