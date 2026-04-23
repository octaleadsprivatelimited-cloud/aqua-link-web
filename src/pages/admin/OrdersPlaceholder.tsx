import { useEffect, useState } from "react";
import { Eye, Loader2, Printer, ShoppingCart } from "lucide-react";
import { collection, onSnapshot, orderBy, query, type Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useSiteSettingsStore } from "@/stores/siteSettingsStore";
import type { SiteSettings } from "@/stores/siteSettingsStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface OrderLine {
  id?: string;
  name: string;
  quantity: number;
  price: number;
}

interface OrderDoc {
  id: string;
  total: number;
  status: string;
  source: string;
  customer?: { name?: string; phone?: string; address?: string };
  items: OrderLine[];
  createdAt?: Timestamp;
}

function formatInr(n: number) {
  return `₹${Number(n || 0).toLocaleString("en-IN")}`;
}

function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function customerName(order: OrderDoc) {
  const n = order.customer?.name?.trim();
  return n || "Guest";
}

function customerSubtitle(order: OrderDoc) {
  const phone = order.customer?.phone?.trim();
  const addr = order.customer?.address?.trim();
  const line = phone || (addr ? addr.split("\n")[0].slice(0, 72) : "");
  const date = order.createdAt?.toDate().toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
  if (line) return line;
  if (date) return `Placed ${date}`;
  return `Order #${order.id.slice(0, 8)}…`;
}

function channelLabel(source: string) {
  if (source.includes("whatsapp")) return "WhatsApp checkout";
  if (source.includes("website")) return "Website";
  return source || "—";
}

function totalUnits(order: OrderDoc) {
  return (order.items || []).reduce((s, i) => s + (i.quantity || 0), 0);
}

function buildInvoiceHtml(order: OrderDoc, settings: SiteSettings) {
  const dateStr =
    order.createdAt?.toDate().toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    }) || "—";
  const rows = (order.items || [])
    .map(
      (item) => `
    <tr>
      <td style="padding:8px;border:1px solid #ddd;">${esc(item.name)}</td>
      <td style="padding:8px;border:1px solid #ddd;text-align:center;">${item.quantity}</td>
      <td style="padding:8px;border:1px solid #ddd;text-align:right;">${formatInr(item.price)}</td>
      <td style="padding:8px;border:1px solid #ddd;text-align:right;">${formatInr(item.price * item.quantity)}</td>
    </tr>`
    )
    .join("");

  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"/><title>Invoice ${esc(order.id)}</title></head>
<body style="font-family:system-ui,sans-serif;max-width:720px;margin:24px auto;color:#111;">
  <h1 style="font-size:22px;margin:0 0 4px;">WaterFilterStore</h1>
  <p style="margin:0 0 16px;font-size:13px;color:#444;">${esc(settings.address)}</p>
  <p style="margin:0 0 4px;font-size:13px;"><strong>Phone:</strong> ${esc(settings.phone)}</p>
  <p style="margin:0 0 4px;font-size:13px;"><strong>Email:</strong> ${esc(settings.email)}</p>
  <p style="margin:0 0 20px;font-size:13px;"><strong>GSTIN:</strong> ${esc(settings.gstin)}</p>
  <hr style="border:none;border-top:1px solid #ccc;margin:16px 0;"/>
  <h2 style="font-size:16px;margin:0 0 12px;">Tax invoice / Order summary</h2>
  <p style="font-size:13px;margin:4px 0;"><strong>Order ID:</strong> ${esc(order.id)}</p>
  <p style="font-size:13px;margin:4px 0;"><strong>Date:</strong> ${esc(dateStr)}</p>
  <p style="font-size:13px;margin:4px 0;"><strong>Status:</strong> ${esc(order.status || "new")}</p>
  <p style="font-size:13px;margin:16px 0 8px;"><strong>Bill to</strong></p>
  <p style="font-size:13px;margin:2px 0;">${esc(customerName(order))}</p>
  ${order.customer?.phone ? `<p style="font-size:13px;margin:2px 0;">${esc(order.customer.phone)}</p>` : ""}
  ${order.customer?.address ? `<p style="font-size:13px;margin:2px 0;white-space:pre-wrap;">${esc(order.customer.address)}</p>` : ""}
  <table style="width:100%;border-collapse:collapse;margin-top:20px;font-size:13px;">
    <thead>
      <tr style="background:#f4f4f5;">
        <th style="padding:8px;border:1px solid #ddd;text-align:left;">Product</th>
        <th style="padding:8px;border:1px solid #ddd;">Qty</th>
        <th style="padding:8px;border:1px solid #ddd;text-align:right;">Price</th>
        <th style="padding:8px;border:1px solid #ddd;text-align:right;">Amount</th>
      </tr>
    </thead>
    <tbody>${rows}</tbody>
    <tfoot>
      <tr>
        <td colspan="3" style="padding:10px;border:1px solid #ddd;text-align:right;font-weight:bold;">Total</td>
        <td style="padding:10px;border:1px solid #ddd;text-align:right;font-weight:bold;">${formatInr(order.total)}</td>
      </tr>
    </tfoot>
  </table>
  <p style="margin-top:24px;font-size:12px;color:#666;">Thank you for your business.</p>
</body></html>`;
}

function printOrderInvoice(order: OrderDoc, settings: SiteSettings) {
  const html = buildInvoiceHtml(order, settings);
  const w = window.open("", "_blank", "noopener,noreferrer,width=900,height=800");
  if (!w) return;
  w.document.open();
  w.document.write(html);
  w.document.close();
  w.focus();
  requestAnimationFrame(() => {
    w.print();
  });
}

function ProductsCell({ order }: { order: OrderDoc }) {
  const items = order.items || [];
  if (items.length === 0) {
    return <span className="text-sm text-muted-foreground">—</span>;
  }
  return (
    <div className="space-y-2 max-w-md">
      {items.map((item, index) => (
        <div key={item.id || `${order.id}-${index}`} className="leading-snug">
          <p className="text-sm font-semibold text-foreground">{item.name}</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Qty {item.quantity} · {formatInr(item.price)} each · Line {formatInr(item.price * item.quantity)}
          </p>
        </div>
      ))}
    </div>
  );
}

function OrderItemsTable({ order }: { order: OrderDoc }) {
  const items = order.items || [];
  return (
    <Table>
      <TableHeader>
        <TableRow className="border-b hover:bg-transparent">
          <TableHead>Product name</TableHead>
          <TableHead className="text-right w-24">Quantity</TableHead>
          <TableHead className="text-right w-28">Price</TableHead>
          <TableHead className="text-right w-32">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item, index) => (
          <TableRow key={item.id || `${order.id}-${index}`}>
            <TableCell className="font-medium">{item.name}</TableCell>
            <TableCell className="text-right tabular-nums">{item.quantity}</TableCell>
            <TableCell className="text-right tabular-nums text-muted-foreground">{formatInr(item.price)}</TableCell>
            <TableCell className="text-right tabular-nums font-medium">{formatInr(item.price * item.quantity)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

const statusBadgeClass = (status: string) => {
  const s = (status || "new").toLowerCase();
  if (s === "completed" || s === "delivered")
    return "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300";
  if (s === "cancelled") return "bg-red-100 text-red-800 dark:bg-red-950/40 dark:text-red-300";
  return "bg-sky-100 text-sky-800 dark:bg-sky-950/40 dark:text-sky-300";
};

export default function OrdersPlaceholder() {
  const settings = useSiteSettingsStore((s) => s.settings);
  const [orders, setOrders] = useState<OrderDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewOrder, setViewOrder] = useState<OrderDoc | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setOrders(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as Omit<OrderDoc, "id">),
          }))
        );
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading font-bold text-2xl text-foreground">Orders</h2>
        <p className="text-sm text-muted-foreground">
          All website orders in one table — customer, products, quantities, totals, and actions.
        </p>
      </div>

      {error && (
        <p className="text-sm text-destructive rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2">
          {error}
        </p>
      )}

      <Card className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <CardHeader className="border-b border-border px-6 py-4 space-y-1">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold tracking-tight">
            <ShoppingCart className="h-5 w-5 text-muted-foreground" />
            Orders
            {!loading && (
              <span className="text-sm font-normal text-muted-foreground">({orders.length})</span>
            )}
            {loading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading && orders.length === 0 ? (
            <p className="text-sm text-muted-foreground px-6 py-10 text-center">Loading orders…</p>
          ) : orders.length === 0 ? (
            <p className="text-sm text-muted-foreground px-6 py-10 text-center">No orders yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-border bg-muted/30 hover:bg-muted/30">
                    <TableHead className="h-12 px-5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Customer
                    </TableHead>
                    <TableHead className="h-12 px-5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Channel
                    </TableHead>
                    <TableHead className="h-12 px-5 text-xs font-medium uppercase tracking-wide text-muted-foreground min-w-[200px]">
                      Product
                    </TableHead>
                    <TableHead className="h-12 px-5 text-xs font-medium uppercase tracking-wide text-muted-foreground text-right w-24">
                      Quantity
                    </TableHead>
                    <TableHead className="h-12 px-5 text-xs font-medium uppercase tracking-wide text-muted-foreground text-right w-32">
                      Price
                    </TableHead>
                    <TableHead className="h-12 px-5 text-xs font-medium uppercase tracking-wide text-muted-foreground w-28">
                      Status
                    </TableHead>
                    <TableHead className="h-12 px-5 text-xs font-medium uppercase tracking-wide text-muted-foreground text-right w-[100px]">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow
                      key={order.id}
                      className="border-b border-border last:border-0 transition-colors hover:bg-muted/40"
                    >
                      <TableCell className="px-5 py-4 align-top">
                        <p className="text-sm font-semibold text-foreground leading-tight">{customerName(order)}</p>
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed max-w-[220px]">
                          {customerSubtitle(order)}
                        </p>
                      </TableCell>
                      <TableCell className="px-5 py-4 align-top text-sm text-foreground">
                        {channelLabel(order.source)}
                      </TableCell>
                      <TableCell className="px-5 py-4 align-top">
                        <ProductsCell order={order} />
                      </TableCell>
                      <TableCell className="px-5 py-4 align-top text-right tabular-nums text-sm font-medium text-foreground">
                        {totalUnits(order)}
                      </TableCell>
                      <TableCell className="px-5 py-4 align-top text-right tabular-nums text-sm font-semibold text-foreground">
                        {formatInr(order.total)}
                      </TableCell>
                      <TableCell className="px-5 py-4 align-top">
                        <span
                          className={cn(
                            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
                            statusBadgeClass(order.status)
                          )}
                        >
                          {(order.status || "new").replace(/_/g, " ")}
                        </span>
                      </TableCell>
                      <TableCell className="px-5 py-4 align-top text-right">
                        <div className="flex items-center justify-end gap-0.5">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 text-muted-foreground hover:text-foreground"
                            title="View order"
                            onClick={() => setViewOrder(order)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 text-muted-foreground hover:text-foreground"
                            title="Print invoice"
                            onClick={() => printOrderInvoice(order, settings)}
                          >
                            <Printer className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={!!viewOrder} onOpenChange={(open) => !open && setViewOrder(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {viewOrder && (
            <>
              <DialogHeader>
                <DialogTitle>Order details</DialogTitle>
                <DialogDescription className="font-mono text-xs">#{viewOrder.id}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 text-sm">
                <div className="grid gap-2 rounded-lg border p-3 bg-muted/20">
                  <p>
                    <span className="text-muted-foreground">Name</span>{" "}
                    <span className="font-medium">{customerName(viewOrder)}</span>
                  </p>
                  {viewOrder.customer?.phone && (
                    <p>
                      <span className="text-muted-foreground">Phone</span>{" "}
                      <span className="font-medium">{viewOrder.customer.phone}</span>
                    </p>
                  )}
                  {viewOrder.customer?.address && (
                    <p>
                      <span className="text-muted-foreground">Address</span>
                      <span className="block mt-1 whitespace-pre-wrap">{viewOrder.customer.address}</span>
                    </p>
                  )}
                  <p>
                    <span className="text-muted-foreground">Placed</span>{" "}
                    {viewOrder.createdAt?.toDate().toLocaleString("en-IN", {
                      dateStyle: "full",
                      timeStyle: "short",
                    }) || "—"}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Source</span>{" "}
                    <span className="font-medium">{viewOrder.source}</span>
                  </p>
                </div>
                <OrderItemsTable order={viewOrder} />
                <p className="text-right font-heading text-lg font-bold">Total {formatInr(viewOrder.total)}</p>
              </div>
              <DialogFooter className="gap-2 sm:gap-0">
                <Button type="button" variant="outline" onClick={() => setViewOrder(null)}>
                  Close
                </Button>
                <Button type="button" onClick={() => printOrderInvoice(viewOrder, settings)}>
                  <Printer className="h-4 w-4 mr-2" />
                  Print invoice
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
