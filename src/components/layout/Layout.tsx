import Header from "./Header";
import Footer from "./Footer";
import { MessageCircle } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />

      {/* Floating WhatsApp button */}
      <a
        href="https://wa.me/919985850777"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-whatsapp text-whatsapp-foreground shadow-elevated flex items-center justify-center hover:scale-110 transition-transform"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-7 w-7" />
      </a>
    </div>
  );
}
