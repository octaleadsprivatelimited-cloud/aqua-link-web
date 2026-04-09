import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingCart, Search, ChevronDown, User } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";

const navLinks = [
  { label: "Products", to: "/products", hasDropdown: true },
  { label: "About Us", to: "/about" },
  { label: "Blog", to: "/blog" },
  { label: "FAQ", to: "/faq" },
  { label: "Contact", to: "/contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const totalItems = useCartStore((s) => s.totalItems());

  return (
    <header className="sticky top-0 z-50">
      {/* Main nav bar - dark navy like ZeroB */}
      <div className="bg-navy">
        <div className="container flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="h-9 w-9 rounded-full bg-background flex items-center justify-center">
              <span className="text-navy font-heading font-bold text-base">A</span>
            </div>
            <div className="hidden sm:block">
              <p className="font-heading font-bold text-primary-foreground text-sm leading-tight">
                Aqua Safe
              </p>
              <p className="text-[10px] text-primary-foreground/60 leading-tight">
                Water Technologies
              </p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link, i) => (
              <span key={link.to} className="flex items-center">
                {i > 0 && (
                  <span className="text-primary-foreground/30 mx-0.5">|</span>
                )}
                <Link
                  to={link.to}
                  className="px-3 py-2 text-sm font-medium text-primary-foreground/90 hover:text-primary-foreground transition-colors flex items-center gap-1"
                >
                  {link.label}
                  {link.hasDropdown && <ChevronDown className="h-3.5 w-3.5" />}
                </Link>
              </span>
            ))}
          </nav>

          {/* Right side: search, user, cart */}
          <div className="flex items-center gap-1">
            {/* Search bar (desktop) */}
            <div className="hidden md:flex items-center bg-primary-foreground/10 rounded-full px-3 py-1.5 border border-primary-foreground/20">
              <input
                type="text"
                placeholder="Type to search"
                className="bg-transparent text-primary-foreground placeholder:text-primary-foreground/50 text-sm w-36 lg:w-44 outline-none"
              />
              <Search className="h-4 w-4 text-primary-foreground/60" />
            </div>

            {/* Search icon (mobile) */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="md:hidden p-2 text-primary-foreground/80 hover:text-primary-foreground"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* User icon */}
            <button className="p-2 text-primary-foreground/80 hover:text-primary-foreground">
              <User className="h-5 w-5" />
            </button>

            {/* Cart */}
            <Link to="/cart" className="relative p-2 text-primary-foreground/80 hover:text-primary-foreground">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4.5 w-4.5 rounded-full bg-accent text-accent-foreground text-[10px] font-bold flex items-center justify-center min-w-[18px] h-[18px]">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 text-primary-foreground/80 hover:text-primary-foreground"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile search bar */}
      {searchOpen && (
        <div className="md:hidden bg-navy border-t border-primary-foreground/10 px-4 py-3">
          <div className="flex items-center bg-primary-foreground/10 rounded-full px-3 py-2 border border-primary-foreground/20">
            <input
              type="text"
              placeholder="Type to search"
              className="bg-transparent text-primary-foreground placeholder:text-primary-foreground/50 text-sm flex-1 outline-none"
              autoFocus
            />
            <Search className="h-4 w-4 text-primary-foreground/60" />
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden fixed inset-0 top-14 z-40 bg-background animate-fade-in">
          <nav className="container flex flex-col py-6 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 text-base font-medium text-foreground hover:text-accent hover:bg-secondary rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://wa.me/919985850777"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 mx-4"
            >
              <div className="w-full py-3 px-4 bg-whatsapp text-whatsapp-foreground rounded-lg text-center font-medium">
                WhatsApp Us — +91 9985850777
              </div>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
