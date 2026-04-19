import Header from "./Header";
import Footer from "./Footer";
import { MessageCircle } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-background">
      {/* Premium Background Glow (Aurora Effect) */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent/10 blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: '10s' }} />

      <Header />
      <main className="flex-1 relative z-10">{children}</main>
      <Footer />

      {/* Floating WhatsApp button */}
      <a
        href="https://wa.me/919985850777"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-whatsapp text-whatsapp-foreground shadow-elevated flex items-center justify-center hover:scale-110 hover:shadow-whatsapp/50 transition-all duration-300 group"
        aria-label="Chat on WhatsApp"
      >
        <div className="absolute inset-0 rounded-full bg-whatsapp animate-ping opacity-20 group-hover:opacity-40" />
        <MessageCircle className="h-7 w-7 relative z-10" />
      </a>
    </div>
  );
}
