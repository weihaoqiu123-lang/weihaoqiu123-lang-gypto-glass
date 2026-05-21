"use client";

import { useEffect, useMemo, useState } from "react";

type SettlementCountdownProps = {
  settlementAt: string;
};

function formatRemaining(ms: number) {
  if (ms <= 0) {
    return "Settlement window reached";
  }

  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

export function SettlementCountdown({ settlementAt }: SettlementCountdownProps) {
  const target = useMemo(() => new Date(settlementAt).getTime(), [settlementAt]);
  const [remaining, setRemaining] = useState(() => formatRemaining(target - Date.now()));

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRemaining(formatRemaining(target - Date.now()));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [target]);

  return (
    <div className="rounded-[1.4rem] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] px-4 py-4">
      <p className="text-sm text-[#8da7a0]">Settlement countdown</p>
      <p className="mt-2 text-2xl font-semibold text-white">{remaining}</p>
    </div>
  );
}
