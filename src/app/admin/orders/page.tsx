import Link from "next/link";
import { CopyButton } from "@/components/copy-button";
import { listOrders } from "@/lib/orders";

function statusClasses(status: "pending_payment" | "paid") {
  return status === "paid"
    ? "border-[rgba(115,245,215,0.24)] bg-[rgba(115,245,215,0.1)] text-[#dffff7]"
    : "border-[rgba(255,177,139,0.24)] bg-[rgba(255,177,139,0.08)] text-[#ffd7c4]";
}

function filterClasses(active: boolean) {
  return active
    ? "bg-[linear-gradient(135deg,#c2ff63,#73f5d7)] text-[#041115]"
    : "border border-[rgba(255,255,255,0.08)] text-[#d7f7ef]";
}

type AdminOrdersPageProps = {
  searchParams?: Promise<{
    status?: string;
    mode?: string;
    q?: string;
  }>;
};

export default async function AdminOrdersPage({ searchParams }: AdminOrdersPageProps) {
  const params = await searchParams;
  const statusFilter = params?.status === "paid" || params?.status === "pending_payment"
    ? params.status
    : "all";
  const modeFilter = params?.mode === "fixed" || params?.mode === "dynamic" ? params.mode : "all";
  const query = params?.q?.trim().toLowerCase() ?? "";

  const allOrders = await listOrders();
  const orders = allOrders.filter((order) => {
    const statusMatch = statusFilter === "all" ? true : order.status === statusFilter;
    const modeMatch = modeFilter === "all" ? true : order.purchaseMode === modeFilter;
    const queryMatch =
      query.length === 0
        ? true
        : order.orderNo.toLowerCase().includes(query) ||
          order.walletAddress.toLowerCase().includes(query) ||
          order.receiverName.toLowerCase().includes(query) ||
          order.phone.toLowerCase().includes(query) ||
          order.address.toLowerCase().includes(query) ||
          order.paymentReference.toLowerCase().includes(query) ||
          order.txSignature?.toLowerCase().includes(query) === true;
    return statusMatch && modeMatch && queryMatch;
  });

  const paidCount = allOrders.filter((order) => order.status === "paid").length;
  const pendingCount = allOrders.filter((order) => order.status === "pending_payment").length;
  const totalVolume = allOrders.reduce((sum, order) => sum + order.amountUsdc, 0);
  const fixedCount = allOrders.filter((order) => order.purchaseMode === "fixed").length;
  const dynamicCount = allOrders.filter((order) => order.purchaseMode === "dynamic").length;
  const recentPaidOrders = [...allOrders]
    .filter((order) => order.status === "paid")
    .sort((a, b) => {
      const aTime = a.paidAt ? new Date(a.paidAt).getTime() : 0;
      const bTime = b.paidAt ? new Date(b.paidAt).getTime() : 0;
      return bTime - aTime;
    })
    .slice(0, 3);
  const highValueOrders = [...allOrders].sort((a, b) => b.amountUsdc - a.amountUsdc).slice(0, 5);
  const paidVolume = allOrders
    .filter((order) => order.status === "paid")
    .reduce((sum, order) => sum + order.amountUsdc, 0);
  const hasActiveFilters = query.length > 0 || statusFilter !== "all" || modeFilter !== "all";
  const paidRatio = allOrders.length > 0 ? Math.round((paidCount / allOrders.length) * 100) : 0;
  const pendingRatio =
    allOrders.length > 0 ? Math.round((pendingCount / allOrders.length) * 100) : 0;

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 pb-16 pt-6 sm:px-8 lg:px-10">
      <section className="glass-panel rounded-[2rem] px-6 py-7 sm:px-8 sm:py-9">
        <p className="text-xs uppercase tracking-[0.28em] text-[#97f6e1]">
          Admin / Orders
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
          Lightweight order console
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[#b7d4ce]">
          This first admin view is intentionally simple: enough for you to see
          what was ordered, who ordered it, and whether payment has been
          confirmed.
        </p>
      </section>

      <section className="grid gap-4 lg:grid-cols-5">
        <div className="glass-panel rounded-[1.8rem] px-5 py-5">
          <p className="text-xs uppercase tracking-[0.22em] text-[#8ea8a1]">Total orders</p>
          <p className="mt-2 text-4xl font-semibold text-white">{orders.length}</p>
        </div>
        <div className="glass-panel rounded-[1.8rem] px-5 py-5">
          <p className="text-xs uppercase tracking-[0.22em] text-[#8ea8a1]">Paid</p>
          <p className="mt-2 text-4xl font-semibold text-white">{paidCount}</p>
        </div>
        <div className="glass-panel rounded-[1.8rem] px-5 py-5">
          <p className="text-xs uppercase tracking-[0.22em] text-[#8ea8a1]">
            Pending / volume
          </p>
          <p className="mt-2 text-2xl font-semibold text-white">
            {pendingCount} / {totalVolume.toFixed(2)} USDC
          </p>
        </div>
        <div className="glass-panel rounded-[1.8rem] px-5 py-5">
          <p className="text-xs uppercase tracking-[0.22em] text-[#8ea8a1]">Paid volume</p>
          <p className="mt-2 text-2xl font-semibold text-white">{paidVolume.toFixed(2)} USDC</p>
        </div>
        <div className="glass-panel rounded-[1.8rem] px-5 py-5">
          <p className="text-xs uppercase tracking-[0.22em] text-[#8ea8a1]">Paid / Pending</p>
          <p className="mt-2 text-2xl font-semibold text-white">
            {paidRatio}% / {pendingRatio}%
          </p>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="glass-panel rounded-[1.8rem] px-5 py-5">
          <p className="text-xs uppercase tracking-[0.22em] text-[#8ea8a1]">
            Purchase mix
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-[1.4rem] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] px-4 py-4">
              <p className="text-sm text-[#8ea8a1]">Fixed buy</p>
              <p className="mt-2 text-3xl font-semibold text-white">{fixedCount}</p>
            </div>
            <div className="rounded-[1.4rem] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] px-4 py-4">
              <p className="text-sm text-[#8ea8a1]">Dynamic buy</p>
              <p className="mt-2 text-3xl font-semibold text-white">{dynamicCount}</p>
            </div>
          </div>
        </div>

        <div className="glass-panel rounded-[1.8rem] px-5 py-5">
          <p className="text-xs uppercase tracking-[0.22em] text-[#8ea8a1]">
            Ops note
          </p>
          <p className="mt-4 text-sm leading-7 text-[#b7d4ce]">
            This admin page is intentionally lean. It helps you answer the first
            real operating questions: how many orders came in, which mode users
            picked, which ones are still unpaid, and which ones are ready to move
            toward production.
          </p>
        </div>
      </section>

      <section className="glass-panel rounded-[1.8rem] px-5 py-5">
        <p className="text-xs uppercase tracking-[0.22em] text-[#ffb18b]">Needs attention</p>
        {pendingCount > 0 ? (
          <p className="mt-4 text-sm leading-7 text-[#c8e3dc]">
            There are currently <span className="font-semibold text-white">{pendingCount}</span>{" "}
            orders still waiting for payment confirmation. These should be your first review priority
            before moving anything into fulfillment.
          </p>
        ) : (
          <p className="mt-4 text-sm leading-7 text-[#c8e3dc]">
            No pending payment orders right now. The queue is clear for the current dataset.
          </p>
        )}
      </section>

      <section className="glass-panel rounded-[1.8rem] px-5 py-5">
        <p className="text-xs uppercase tracking-[0.22em] text-[#97f6e1]">
          Recent paid orders
        </p>
        {recentPaidOrders.length > 0 ? (
          <div className="mt-4 grid gap-3 lg:grid-cols-3">
            {recentPaidOrders.map((order) => (
              <div
                key={order.id}
                className="rounded-[1.4rem] border border-[rgba(115,245,215,0.18)] bg-[rgba(115,245,215,0.06)] px-4 py-4"
              >
                <p className="text-xs uppercase tracking-[0.18em] text-[#8ea8a1]">
                  {order.orderNo}
                </p>
                <p className="mt-2 text-lg font-semibold text-white">{order.amountUsdc} USDC</p>
                <p className="mt-2 text-sm text-[#c9e4de]">{order.productName}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.16em] text-[#9ff6e5]">
                  {order.paidAt
                    ? new Date(order.paidAt).toLocaleString("en-US", {
                        month: "short",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "Paid"}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-sm leading-7 text-[#c8e3dc]">
            No paid orders yet. Once payments are confirmed, the most recent ones will appear here.
          </p>
        )}
      </section>

      <section className="glass-panel rounded-[1.8rem] px-5 py-5">
        <p className="text-xs uppercase tracking-[0.22em] text-[#d7ff79]">
          High value priority
        </p>
        {highValueOrders.length > 0 ? (
          <div className="mt-4 grid gap-3">
            {highValueOrders.map((order, index) => (
              <div
                key={order.id}
                className="flex flex-col gap-3 rounded-[1.4rem] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-[#8ea8a1]">
                    Priority #{index + 1}
                  </p>
                  <p className="mt-2 text-lg font-semibold text-white">{order.orderNo}</p>
                  <p className="mt-1 text-sm text-[#c8e3dc]">
                    {order.productName} / {order.purchaseMode}
                    {order.leverageTier ? ` / ${order.leverageTier}` : ""}
                  </p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-2xl font-semibold text-white">{order.amountUsdc} USDC</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[#9ff6e5]">
                    {order.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </section>

      <section className="glass-panel rounded-[1.8rem] px-5 py-5">
        <div className="mb-5 flex flex-wrap gap-3">
          <Link
            href={`/admin/orders?status=paid&mode=all&q=${encodeURIComponent(query)}`}
            className="rounded-full bg-[linear-gradient(135deg,#73f5d7,#c2ff63)] px-4 py-2 text-sm font-bold text-[#041115]"
          >
            Paid only
          </Link>
          <Link
            href={`/admin/orders?status=pending_payment&mode=all&q=${encodeURIComponent(query)}`}
            className="rounded-full border border-[rgba(255,177,139,0.24)] bg-[rgba(255,177,139,0.08)] px-4 py-2 text-sm font-semibold text-[#ffd7c4]"
          >
            Pending only
          </Link>
          <Link
            href="/admin/orders"
            className="rounded-full border border-[rgba(255,255,255,0.08)] px-4 py-2 text-sm font-semibold text-[#dffdf4]"
          >
            Reset all
          </Link>
        </div>

        {hasActiveFilters ? (
          <div className="mb-5 rounded-[1.4rem] border border-[rgba(115,245,215,0.18)] bg-[rgba(115,245,215,0.06)] px-4 py-3 text-sm text-[#dffff7]">
            Filters are active on this view. Use <span className="font-semibold">Reset all</span> to
            return to the full order list.
          </div>
        ) : null}

        <form className="mb-5 grid gap-3 lg:grid-cols-[1fr_auto]">
          <div className="grid gap-3 lg:grid-cols-[1fr_auto_auto]">
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Search by order number or wallet"
              className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] px-4 py-3 text-white outline-none placeholder:text-[#76918a]"
            />
            <input type="hidden" name="status" value={statusFilter} />
            <input type="hidden" name="mode" value={modeFilter} />
            <button
              type="submit"
              className="rounded-full bg-[linear-gradient(135deg,#72b6ff,#73f5d7)] px-5 py-3 text-sm font-bold text-[#041115]"
            >
              Search
            </button>
            <Link
              href="/admin/orders"
              className="rounded-full border border-[rgba(255,255,255,0.08)] px-5 py-3 text-sm font-semibold text-[#dffdf4]"
            >
              Clear
            </Link>
          </div>
        </form>

        <div className="grid gap-4 lg:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-[#8ea8a1]">Filter by status</p>
            <div className="mt-3 flex flex-wrap gap-3">
              <Link
                href={`/admin/orders?status=all&mode=${modeFilter}&q=${encodeURIComponent(query)}`}
                className={`rounded-full px-4 py-2 text-sm font-semibold ${filterClasses(statusFilter === "all")}`}
              >
                All
              </Link>
              <Link
                href={`/admin/orders?status=pending_payment&mode=${modeFilter}&q=${encodeURIComponent(query)}`}
                className={`rounded-full px-4 py-2 text-sm font-semibold ${filterClasses(
                  statusFilter === "pending_payment",
                )}`}
              >
                Pending
              </Link>
              <Link
                href={`/admin/orders?status=paid&mode=${modeFilter}&q=${encodeURIComponent(query)}`}
                className={`rounded-full px-4 py-2 text-sm font-semibold ${filterClasses(statusFilter === "paid")}`}
              >
                Paid
              </Link>
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-[#8ea8a1]">Filter by mode</p>
            <div className="mt-3 flex flex-wrap gap-3">
              <Link
                href={`/admin/orders?status=${statusFilter}&mode=all&q=${encodeURIComponent(query)}`}
                className={`rounded-full px-4 py-2 text-sm font-semibold ${filterClasses(modeFilter === "all")}`}
              >
                All
              </Link>
              <Link
                href={`/admin/orders?status=${statusFilter}&mode=fixed&q=${encodeURIComponent(query)}`}
                className={`rounded-full px-4 py-2 text-sm font-semibold ${filterClasses(modeFilter === "fixed")}`}
              >
                Fixed
              </Link>
              <Link
                href={`/admin/orders?status=${statusFilter}&mode=dynamic&q=${encodeURIComponent(query)}`}
                className={`rounded-full px-4 py-2 text-sm font-semibold ${filterClasses(modeFilter === "dynamic")}`}
              >
                Dynamic
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="glass-panel overflow-hidden rounded-[2rem]">
        <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.06)] px-6 py-5">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[#d7ff79]">
              Order list
            </p>
            <p className="mt-2 text-sm text-[#a9c6bf]">
              Latest orders appear first. Click through for full payment and shipping details.
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[#8ea8a1]">
              Showing {orders.length} result{orders.length === 1 ? "" : "s"}
            </p>
            {query ? (
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[#9ff6e5]">
                Search: {query}
              </p>
            ) : null}
            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[#8ea8a1]">
              Status: {statusFilter}
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[#8ea8a1]">
              Mode: {modeFilter}
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[#8ea8a1]">
              Export: current filtered results
            </p>
          </div>
          <div className="flex gap-3">
            <span className="rounded-full border border-[rgba(255,255,255,0.08)] px-4 py-2 text-sm font-semibold text-[#dffdf4]">
              {orders.length} result{orders.length === 1 ? "" : "s"}
            </span>
            <span className="rounded-full border border-[rgba(115,245,215,0.18)] px-4 py-2 text-sm font-semibold text-[#dffff7]">
              {hasActiveFilters ? "Filters active" : "No filters"}
            </span>
            <span className="rounded-full border border-[rgba(255,255,255,0.08)] px-4 py-2 text-sm font-semibold text-[#dffdf4]">
              {query ? "Search active" : "Search idle"}
            </span>
            <span className="rounded-full border border-[rgba(255,255,255,0.08)] px-4 py-2 text-sm font-semibold text-[#dffdf4]">
              status: {statusFilter}
            </span>
            <span className="rounded-full border border-[rgba(255,255,255,0.08)] px-4 py-2 text-sm font-semibold text-[#dffdf4]">
              mode: {modeFilter}
            </span>
            {query ? (
              <span className="rounded-full border border-[rgba(255,255,255,0.08)] px-4 py-2 text-sm font-semibold text-[#dffdf4]">
                query: {query}
              </span>
            ) : null}
            <a
              href={`/api/orders/export?status=${statusFilter}&mode=${modeFilter}&q=${encodeURIComponent(query)}`}
              className="rounded-full border border-[rgba(255,255,255,0.08)] px-4 py-2 text-sm font-semibold text-[#dffdf4]"
            >
              Export current results
            </a>
            <Link
              href="/products"
              className="rounded-full border border-[rgba(115,245,215,0.22)] px-4 py-2 text-sm font-semibold text-[#ddfff4]"
            >
              View storefront
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="border-b border-[rgba(255,255,255,0.06)] text-left text-xs uppercase tracking-[0.2em] text-[#86a29b]">
                <th className="px-6 py-4">Order</th>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Receiver</th>
                <th className="px-6 py-4">Mode</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Wallet</th>
                <th className="px-6 py-4">Reference</th>
                <th className="px-6 py-4">Signature</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Created</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td className="px-6 py-8 text-sm text-[#a8c6bf]" colSpan={8}>
                    No matching orders found. Try clearing the current search and filters, or create a
                    new order from the product page to populate the admin console.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr
                    key={order.id}
                    className={`border-b border-[rgba(255,255,255,0.05)] align-top text-sm text-[#d8f4ee] ${
                      order.status === "paid" ? "bg-[rgba(115,245,215,0.04)]" : ""
                    }`}
                  >
                    <td className="px-6 py-5">
                      <div className="flex flex-col gap-2">
                        <Link
                          href={`/orders/${order.orderNo}`}
                          className="font-semibold text-white transition-colors hover:text-[#d8ff81]"
                        >
                          {order.orderNo}
                        </Link>
                        <div>
                          <CopyButton value={order.orderNo} label="order" />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">{order.productName}</td>
                    <td className="px-6 py-5 text-[#b6d3cc]">
                      <div className="flex flex-col gap-2">
                        <span>{order.receiverName}</span>
                        <div>
                          <CopyButton value={order.receiverName} label="receiver" />
                        </div>
                        <span>{order.phone}</span>
                        <div>
                          <CopyButton value={order.phone} label="phone" />
                        </div>
                        <span className="max-w-xs break-words">{order.address}</span>
                        <div>
                          <CopyButton value={order.address} label="address" />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="space-y-1">
                        <p className="font-medium text-white">{order.purchaseMode}</p>
                        {order.leverageTier ? (
                          <p className="text-xs uppercase tracking-[0.18em] text-[#8da8a1]">
                            {order.leverageTier}
                          </p>
                        ) : null}
                      </div>
                    </td>
                    <td className="px-6 py-5 font-semibold text-white">
                      {order.amountUsdc} USDC
                    </td>
                    <td className="px-6 py-5 text-[#b6d3cc]">
                      <div className="flex flex-col gap-2">
                        <span>
                          {order.walletAddress.slice(0, 4)}...{order.walletAddress.slice(-4)}
                        </span>
                        <div>
                          <CopyButton value={order.walletAddress} label="wallet" />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-[#b6d3cc]">
                      <div className="flex flex-col gap-2">
                        <span>
                          {order.paymentReference.slice(0, 4)}...{order.paymentReference.slice(-4)}
                        </span>
                        <div>
                          <CopyButton value={order.paymentReference} label="reference" />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-[#b6d3cc]">
                      {order.txSignature ? (
                        <div className="flex flex-col gap-2">
                          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9ff6e5]">
                            Payment confirmed
                          </span>
                          <span>
                            {order.txSignature.slice(0, 4)}...{order.txSignature.slice(-4)}
                          </span>
                          <div>
                            <CopyButton value={order.txSignature} label="signature" />
                          </div>
                        </div>
                      ) : (
                        <span className="text-[#7f9892]">Not paid yet</span>
                      )}
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col gap-2">
                        <span
                          className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${statusClasses(order.status)}`}
                        >
                          {order.status}
                        </span>
                        {order.status === "paid" ? (
                          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9ff6e5]">
                            Ready for fulfillment
                          </span>
                        ) : (
                          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ffcfba]">
                            Waiting for payment
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-[#b6d3cc]">
                      {new Date(order.createdAt).toLocaleString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-6 py-5">
                      <Link
                        href={`/orders/${order.orderNo}`}
                        className="rounded-full border border-[rgba(115,245,215,0.22)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#ddfff4]"
                      >
                        Open
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
