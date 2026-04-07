"use client";

import { useState } from "react";

type CopyButtonProps = {
  value: string;
  label: string;
};

export function CopyButton({ value, label }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="rounded-full border border-[rgba(255,255,255,0.08)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#dffdf4]"
      title={`Copy ${label}`}
    >
      {copied ? "Copied" : `Copy ${label}`}
    </button>
  );
}
