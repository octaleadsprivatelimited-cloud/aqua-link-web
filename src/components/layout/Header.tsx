import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingCart, Phone, Search } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Products", to: "/products" },
  { label: "About Us", to: "/about" },
  { label: "Blog", to: "/blog" },
  { label: "FAQ", to: "/faq" },
  { label: "Contact", to: "/contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const totalItems = useCartStore((s) => s.totalItems());

  return (
    <>
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground text-xs sm:text-sm">
        <div className="container flex items-center justify-between py-1.5">
          <div className="flex items-center gap-4">
            <a href="tel:+919985850777" className="flex items-center gap-1 hover:opacity-80">
              <Phone className="h-3 w-3" /> +91 9985850777
            </a>
            <span className="hidden sm:inline">info@waterfilterstore.in</span>
          </div>
          <span className="hidden md:inline">Free Delivery on Orders Above ₹5,000</span>
        </div>
      </div>

      {/* Main header */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b shadow-sm">
        <div className="container flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-hero-gradient flex items-center justify-center">
              <span className="text-primary-foreground font-heading font-bold text-lg">A</span>
            </div>
            <div className="hidden sm:block">
              <p className="font-heading font-bold text-foreground text-sm leading-tight">Aqua Safe</p>
              <p className="text-[10px] text-muted-foreground leading-tight">Water Technologies</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors rounded-md hover:bg-secondary"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link to="/cart" className="relative p-2 hover:bg-secondary rounded-md transition-colors">
              <ShoppingCart className="h-5 w-5 text-foreground" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-5 w-5 rounded-full bg-accent text-accent-foreground text-[10px] font-bold flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <a
              href="https://wa.me/919985850777"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex"
            >
              <Button size="sm" className="bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90 font-medium text-xs">
                WhatsApp Us
              </Button>
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 hover:bg-secondary rounded-md"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden fixed inset-0 top-[calc(4rem+1px+28px)] z-40 bg-card/98 backdrop-blur-lg animate-fade-in">
            <nav className="container flex flex-col py-6 gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-3 text-base font-medium text-foreground hover:text-primary hover:bg-secondary rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://wa.me/919985850777"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4"
              >
                <Button className="w-full bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90">
                  WhatsApp Us — +91 9985850777
                </Button>
              </a>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
