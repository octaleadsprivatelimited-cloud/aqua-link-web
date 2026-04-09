import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-10 w-10 rounded-full bg-hero-gradient flex items-center justify-center">
                <span className="font-heading font-bold text-lg">A</span>
              </div>
              <div>
                <p className="font-heading font-bold text-sm">Aqua Safe</p>
                <p className="text-[10px] opacity-70">Water Technologies</p>
              </div>
            </div>
            <p className="text-sm opacity-70 leading-relaxed mb-4">
              Providing clean, safe, and healthy water solutions for homes and businesses across India since 2015.
            </p>
            <p className="text-xs opacity-50">GSTIN: 37ACHPL4663M1Z2</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm opacity-70">
              {[
                { label: "Products", to: "/products" },
                { label: "About Us", to: "/about" },
                { label: "Blog", to: "/blog" },
                { label: "FAQ", to: "/faq" },
                { label: "Contact", to: "/contact" },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="hover:opacity-100 transition-opacity">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm opacity-70">
              {["RO Purifiers", "UV Purifiers", "Gravity Purifiers", "Filters & Cartridges", "Commercial Plants", "Accessories"].map((cat) => (
                <li key={cat}>
                  <Link to="/products" className="hover:opacity-100 transition-opacity">
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Contact Us</h4>
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
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
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
