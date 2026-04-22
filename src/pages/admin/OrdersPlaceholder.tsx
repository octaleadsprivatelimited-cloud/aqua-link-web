import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { collection, onSnapshot, orderBy, query, type Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface OrderDoc {
  id: string;
  total: number;
  status: string;
  source: string;
  customer?: { name?: string; phone?: string; address?: string };
  items: Array<{ name: string; quantity: number; price: number }>;
  createdAt?: Timestamp;
}

export default function OrdersPlaceholder() {
  const [orders, setOrders] = useState<OrderDoc[]>([]);

  useEffect(() => {
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setOrders(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<OrderDoc, "id">),
        }))
      );
    });
    return unsubscribe;
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading font-bold text-2xl text-foreground">Orders Management</h2>
        <p className="text-sm text-muted-foreground">Real-time orders from website checkout.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-4 w-4" />
            Orders ({orders.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {orders.length === 0 ? (
            <p className="text-sm text-muted-foreground">No orders yet.</p>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="border rounded-lg p-3 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-foreground">
                    ₹{Number(order.total || 0).toLocaleString("en-IN")}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {order.createdAt?.toDate().toLocaleString("en-IN") || "Pending timestamp"}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">
                  {order.customer?.name || "Guest"} • {order.customer?.phone || "No phone"} • {order.status || "new"}
                </p>
                <div className="text-xs text-foreground">
                  {order.items?.map((item, index) => (
                    <p key={`${order.id}-${index}`}>
                      {item.name} x{item.quantity} - ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </p>
                  ))}
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
