"use client";

import { FormEvent, useState } from "react";

type PaymentStatusPanelProps = {
  orderNo: string;
  status: "pending_payment" | "paid";
  existingSignature?: string;
};

type ConfirmResponse = {
  order: {
    status: "pending_payment" | "paid";
    txSignature?: string;
  };
  alreadyPaid?: boolean;
};

export function PaymentStatusPanel({
  orderNo,
  status,
  existingSignature,
}: PaymentStatusPanelProps) {
  const [currentStatus, setCurrentStatus] = useState(status);
  const [signature, setSignature] = useState(existingSignature ?? "");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleConfirm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch("/api/payments/confirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderNo,
          txSignature: signature,
        }),
      });

      const data = (await response.json()) as ConfirmResponse | { error?: string };

      if (!response.ok || !("order" in data)) {
        throw new Error(("error" in data && data.error) || "Unable to confirm payment.");
      }

      setCurrentStatus(data.order.status);
      setSignature(data.order.txSignature ?? signature);
      setMessage(
        data.alreadyPaid
          ? "Order was already verified as paid."
          : "Onchain payment verified and order updated.",
      );
    } catch (confirmationError) {
      setError(
        confirmationError instanceof Error
          ? confirmationError.message
          : "Unable to confirm payment.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="glass-panel rounded-[2rem] p-6">
      <p className="text-xs uppercase tracking-[0.24em] text-[#97f6e1]">
        Payment status
      </p>

      <div className="mt-4 rounded-[1.5rem] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] px-4 py-4">
        <p className="text-sm text-[#8ea8a1]">Current order state</p>
        <p className="mt-2 text-2xl font-semibold text-white">{currentStatus}</p>
      </div>

      {currentStatus === "paid" ? (
        <div className="mt-4 rounded-2xl border border-[rgba(115,245,215,0.24)] bg-[rgba(115,245,215,0.08)] px-4 py-3 text-sm text-[#dffff7]">
          Payment has been verified for this order.
          {signature ? (
            <>
              {" "}
              Signature: <span className="font-semibold break-all">{signature}</span>
            </>
          ) : null}
        </div>
      ) : (
        <form className="mt-4 grid gap-4" onSubmit={handleConfirm}>
          <label className="grid gap-2">
            <span className="text-sm font-medium text-[#dffdf4]">Transaction signature</span>
            <textarea
              value={signature}
              onChange={(event) => setSignature(event.target.value)}
              className="min-h-24 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] px-4 py-3 text-white outline-none placeholder:text-[#76918a]"
              placeholder="Paste the Solana transaction signature after payment"
            />
          </label>

          {error ? (
            <div className="rounded-2xl border border-[rgba(255,153,102,0.3)] bg-[rgba(255,153,102,0.08)] px-4 py-3 text-sm text-[#ffc3a7]">
              {error}
            </div>
          ) : null}

          {message ? (
            <div className="rounded-2xl border border-[rgba(115,245,215,0.24)] bg-[rgba(115,245,215,0.08)] px-4 py-3 text-sm text-[#dffff7]">
              {message}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={submitting || !signature.trim()}
            className="rounded-full bg-[linear-gradient(135deg,#72b6ff,#73f5d7)] px-5 py-3 text-sm font-bold text-[#041115] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? "Verifying..." : "Verify payment onchain"}
          </button>
        </form>
      )}
    </div>
  );
}
