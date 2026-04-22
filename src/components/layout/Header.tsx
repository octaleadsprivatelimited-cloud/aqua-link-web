import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingCart, Search, ChevronDown, ChevronRight, User } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { categories } from "@/data/categories";
import { useSiteSettingsStore } from "@/stores/siteSettingsStore";
import { openWhatsAppWithTracking } from "@/lib/whatsapp";

import megaRo from "@/assets/mega-ro.jpg";
import megaUv from "@/assets/mega-uv.jpg";
import megaGravity from "@/assets/mega-gravity.jpg";
import megaFilters from "@/assets/mega-filters.jpg";
import megaCommercial from "@/assets/mega-commercial.jpg";
import megaAccessories from "@/assets/mega-accessories.jpg";

const categoryImages: Record<string, string> = {
  "ro-purifiers": megaRo,
  "uv-purifiers": megaUv,
  "gravity-purifiers": megaGravity,
  "filters-cartridges": megaFilters,
  commercial: megaCommercial,
  accessories: megaAccessories,
};

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
  const [megaOpen, setMegaOpen] = useState(false);
  const [hoveredCat, setHoveredCat] = useState(categories[0]?.slug || "");
  const totalItems = useCartStore((s) => s.totalItems());
  const megaTimeout = useRef<ReturnType<typeof setTimeout>>();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileSearchQuery, setMobileSearchQuery] = useState("");
  const settings = useSiteSettingsStore((s) => s.settings);

  const handleSearch = (query: string) => {
    if (query.trim()) {
      navigate(`/products?search=${encodeURIComponent(query.trim())}`);
      setSearchQuery("");
      setMobileSearchQuery("");
      setSearchOpen(false);
    }
  };

  const openMega = () => {
    clearTimeout(megaTimeout.current);
    setMegaOpen(true);
  };
  const closeMega = () => {
    megaTimeout.current = setTimeout(() => setMegaOpen(false), 200);
  };

  const activeCat = categories.find((c) => c.slug === hoveredCat) || categories[0];

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-[#0B1E36]/95 backdrop-blur-xl border-b border-white/5 shadow-sm supports-[backdrop-filter]:bg-[#0B1E36]/90">
        <div className="container flex items-center justify-between h-16 md:h-[68px]">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="h-10 w-10 rounded-xl bg-background flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
              <span className="text-navy font-heading font-bold text-lg">A</span>
            </div>
            <div className="hidden sm:block">
              <p className="font-heading font-bold text-primary-foreground text-[15px] leading-tight tracking-tight">
                Aqua Safe
              </p>
              <p className="text-[10px] text-primary-foreground/50 leading-tight tracking-wide uppercase">
                Water Technologies
              </p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <span
                key={link.to}
                className="flex items-center"
                onMouseEnter={link.hasDropdown ? openMega : undefined}
                onMouseLeave={link.hasDropdown ? closeMega : undefined}
              >
                <Link
                  to={link.to}
                  className="relative px-4 py-2 text-[13px] font-medium text-primary-foreground/75 hover:text-primary-foreground transition-colors flex items-center gap-1 rounded-lg hover:bg-primary-foreground/5"
                >
                  {link.label}
                  {link.hasDropdown && <ChevronDown className="h-3 w-3 opacity-60" />}
                </Link>
              </span>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-0.5">
            <form onSubmit={(e) => { e.preventDefault(); handleSearch(searchQuery); }} className="hidden md:flex items-center bg-primary-foreground/8 rounded-xl px-3.5 py-2 border border-primary-foreground/10 focus-within:border-primary-foreground/25 transition-colors">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-primary-foreground placeholder:text-primary-foreground/40 text-sm w-32 lg:w-40 outline-none"
              />
              <button type="submit"><Search className="h-4 w-4 text-primary-foreground/40" /></button>
            </form>
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="md:hidden p-2.5 text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/5 rounded-lg transition-colors"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
            <Link to="/admin" className="p-2.5 text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/5 rounded-lg transition-colors">
              <User className="h-5 w-5" />
            </Link>
            <Link to="/cart" className="relative p-2.5 text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/5 rounded-lg transition-colors">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute top-0.5 right-0.5 rounded-full bg-accent text-accent-foreground text-[10px] font-bold flex items-center justify-center min-w-[18px] h-[18px] shadow-sm">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2.5 text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/5 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* ===== MEGA DROPDOWN ===== */}
      {megaOpen && (
        <div
          className="hidden lg:block absolute left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border shadow-2xl animate-fade-in supports-[backdrop-filter]:bg-background/80"
          onMouseEnter={openMega}
          onMouseLeave={closeMega}
        >
          <div className="container py-6">
            <div className="flex gap-0">
              {/* Left: category list */}
              <div className="w-64 border-r border-border pr-4 space-y-0.5">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">
                  Categories
                </p>
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    to={`/products?category=${cat.slug}`}
                    onMouseEnter={() => setHoveredCat(cat.slug)}
                    onClick={() => setMegaOpen(false)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      hoveredCat === cat.slug
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-secondary"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{cat.icon}</span>
                      {cat.name}
                    </span>
                    <ChevronRight className="h-3.5 w-3.5 opacity-50" />
                  </Link>
                ))}
                <div className="pt-3 mt-3 border-t border-border">
                  <Link
                    to="/products"
                    onClick={() => setMegaOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-primary hover:underline"
                  >
                    View All Products
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>

              {/* Right: image + description */}
              <div className="flex-1 pl-8 flex gap-8 items-start">
                <div className="flex-1">
                  <h3 className="font-heading font-bold text-lg text-foreground mb-1">
                    {activeCat.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {activeCat.description}
                  </p>
                  <Link
                    to={`/products?category=${activeCat.slug}`}
                    onClick={() => setMegaOpen(false)}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                  >
                    Explore {activeCat.name}
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="w-64 h-48 rounded-xl overflow-hidden bg-secondary shrink-0">
                  <img
                    src={categoryImages[activeCat.slug] || megaRo}
                    alt={activeCat.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    width={256}
                    height={192}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile search */}
      {searchOpen && (
        <form onSubmit={(e) => { e.preventDefault(); handleSearch(mobileSearchQuery); }} className="md:hidden bg-[#0B1E36] border-t border-primary-foreground/10 px-4 py-3">
          <div className="flex items-center bg-primary-foreground/10 rounded-full px-3 py-2 border border-primary-foreground/20">
            <input
              type="text"
              placeholder="Type to search"
              value={mobileSearchQuery}
              onChange={(e) => setMobileSearchQuery(e.target.value)}
              className="bg-transparent text-primary-foreground placeholder:text-primary-foreground/50 text-sm flex-1 outline-none"
              autoFocus
            />
            <button type="submit"><Search className="h-4 w-4 text-primary-foreground/60" /></button>
          </div>
        </form>
      )}

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden fixed inset-0 top-14 z-40 bg-background/95 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <nav className="container flex flex-col py-4 gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between px-4 py-3.5 text-base font-medium text-foreground hover:text-accent border-b border-border/50 transition-colors"
              >
                {link.label}
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            ))}

            {/* Categories */}
            <div className="mt-4 px-4">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Shop by Category
              </p>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    to={`/products?category=${cat.slug}`}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-3 text-sm text-foreground bg-secondary/50 hover:bg-secondary rounded-lg transition-colors"
                  >
                    <span className="text-base">{cat.icon}</span>
                    <span className="truncate">{cat.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 px-4 space-y-3">
              <Link
                to="/cart"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-[#0B1E36] text-primary-foreground rounded-lg text-center font-medium hover:bg-[#0B1E36]/90 transition-colors"
              >
                <ShoppingCart className="h-4 w-4" />
                View Cart {totalItems > 0 && `(${totalItems})`}
              </Link>
              <button
                type="button"
                onClick={() => openWhatsAppWithTracking("Header Mobile Menu", "Hi! I need help choosing a water purifier.")}
                className="w-full py-3 px-4 bg-whatsapp text-whatsapp-foreground rounded-lg text-center font-medium"
              >
                WhatsApp Us - {settings.phone}
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
