import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import bgFooter from "@/assets/bg-footer.jpg";

export default function Footer() {
  return (
    <footer className="relative text-primary-foreground overflow-hidden">
      <img src={bgFooter} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
      <div className="absolute inset-0 bg-navy/90" />
      <div className="container py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-10 w-10 rounded-full bg-background flex items-center justify-center">
                <span className="text-navy font-heading font-bold text-lg">A</span>
              </div>
              <div>
                <p className="font-heading font-bold text-sm">Aqua Safe</p>
                <p className="text-[10px] opacity-60">Water Technologies</p>
              </div>
            </div>
            <p className="text-sm opacity-70 leading-relaxed mb-4">
              Providing clean, safe, and healthy water solutions for homes and businesses across India since 2015.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a href="https://www.facebook.com/share/v/1D86G96Zaf/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold mb-4 text-base">Quick Links</h4>
            <ul className="space-y-2.5 text-sm opacity-70">
              {[
                { label: "Products", to: "/products" },
                { label: "About Us", to: "/about" },
                { label: "Blog", to: "/blog" },
                { label: "FAQ", to: "/faq" },
                { label: "Contact", to: "/contact" },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="hover:opacity-100 transition-opacity hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-heading font-semibold mb-4 text-base">Categories</h4>
            <ul className="space-y-2.5 text-sm opacity-70">
              {[
                { label: "RO Purifiers", slug: "ro-purifiers" },
                { label: "UV Purifiers", slug: "uv-purifiers" },
                { label: "Gravity Purifiers", slug: "gravity-purifiers" },
                { label: "Filters & Cartridges", slug: "filters-cartridges" },
                { label: "Commercial Plants", slug: "commercial" },
                { label: "Accessories", slug: "accessories" },
              ].map((cat) => (
                <li key={cat.slug}>
                  <Link to={`/products?category=${cat.slug}`} className="hover:opacity-100 transition-opacity hover:underline">
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold mb-4 text-base">Contact Us</h4>
            <ul className="space-y-3 text-sm opacity-70">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>#7-13-23/2, NH-16 Main Road, Old Gajuwaka, Visakhapatnam - 530026</span>
              </li>
              <li>
                <a href="tel:+919985850777" className="flex items-center gap-2 hover:opacity-100">
                  <Phone className="h-4 w-4" /> +91 9985850777
                </a>
              </li>
              <li>
                <a href="mailto:info@waterfilterstore.in" className="flex items-center gap-2 hover:opacity-100">
                  <Mail className="h-4 w-4" /> info@waterfilterstore.in
                </a>
              </li>
            </ul>
            <p className="text-xs opacity-50 mt-4">GSTIN: 37ACHPL4663M1Z2</p>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10 relative z-10">
        <div className="container py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs opacity-50">
          <p>© {new Date().getFullYear()} Aqua Safe Water Technologies. All rights reserved.</p>
          <p>
            Developed by{" "}
            <a href="https://www.octaleads.com" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-100">
              Octaleads Pvt Ltd
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
