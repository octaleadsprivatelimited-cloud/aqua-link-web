import { useEnquiryStore } from "@/stores/enquiryStore";
import { useSiteSettingsStore } from "@/stores/siteSettingsStore";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export const generateWhatsAppLink = (message: string) => {
  const number = useSiteSettingsStore.getState().settings.whatsappNumber || "919985850777";
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
};

export const generateOrderMessage = (
  items: CartItem[],
  customerInfo?: { name: string; phone: string; address: string }
) => {
  const itemLines = items
    .map((item) => `• ${item.name} x${item.quantity} — ₹${(item.price * item.quantity).toLocaleString("en-IN")}`)
    .join("\n");

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  let message = `🛒 *New Order from Aqua Safe Water Technologies*\n\n`;
  message += `*Order Items:*\n${itemLines}\n\n`;
  message += `*Total: ₹${total.toLocaleString("en-IN")}*\n`;

  if (customerInfo) {
    message += `\n*Customer Details:*\n`;
    message += `Name: ${customerInfo.name}\n`;
    message += `Phone: ${customerInfo.phone}\n`;
    message += `Address: ${customerInfo.address}\n`;
  }

  message += `\nPlease confirm the order and share payment details. Thank you! 🙏`;

  return message;
};

export const generateProductEnquiry = (productName: string, price: number) => {
  return `Hi! I'm interested in *${productName}* (₹${price.toLocaleString("en-IN")}). Could you share more details and availability?`;
};

export const openWhatsAppWithTracking = (source: string, message: string) => {
  useEnquiryStore.getState().addEnquiry({ source, message });
  window.open(generateWhatsAppLink(message), "_blank", "noopener,noreferrer");
};
