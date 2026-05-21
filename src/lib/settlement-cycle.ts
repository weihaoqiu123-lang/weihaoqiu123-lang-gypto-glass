const DAY_MS = 24 * 60 * 60 * 1000;

export type SettlementCycle = {
  cycleStartAt: string;
  settlementAt: string;
  finalPaymentDeadline: string;
};

export function getCurrentWeeklySettlementCycle(now = new Date()): SettlementCycle {
  const utcYear = now.getUTCFullYear();
  const utcMonth = now.getUTCMonth();
  const utcDate = now.getUTCDate();
  const utcDay = now.getUTCDay();
  const daysSinceMonday = (utcDay + 6) % 7;

  const cycleStart = new Date(
    Date.UTC(utcYear, utcMonth, utcDate - daysSinceMonday, 0, 0, 0, 0),
  );
  const settlementAt = new Date(cycleStart.getTime() + 7 * DAY_MS);
  const finalPaymentDeadline = new Date(settlementAt.getTime() + DAY_MS);

  return {
    cycleStartAt: cycleStart.toISOString(),
    settlementAt: settlementAt.toISOString(),
    finalPaymentDeadline: finalPaymentDeadline.toISOString(),
  };
}

export function formatUtcDateTime(isoString: string) {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "UTC",
  }).format(new Date(isoString));
}
