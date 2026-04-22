import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface OrderItemPayload {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface OrderCustomerPayload {
  name?: string;
  phone?: string;
  address?: string;
}

export const createOrder = async (
  items: OrderItemPayload[],
  customer?: OrderCustomerPayload
) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  await addDoc(collection(db, "orders"), {
    items,
    customer: customer || {},
    total,
    source: "website_whatsapp_checkout",
    status: "new",
    createdAt: serverTimestamp(),
  });
};
