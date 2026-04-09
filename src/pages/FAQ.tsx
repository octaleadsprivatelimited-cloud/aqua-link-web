import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";

const faqCategories = [
  {
    name: "Water Purification",
    faqs: [
      { q: "What is the difference between RO, UV, and UF purification?", a: "RO (Reverse Osmosis) removes dissolved impurities and heavy metals, making it ideal for high TDS water. UV (Ultraviolet) kills bacteria and viruses but doesn't remove dissolved solids. UF (Ultrafiltration) removes bacteria and larger particles without electricity. Many modern purifiers combine all three for comprehensive purification." },
      { q: "How do I know which purifier is right for my home?", a: "It depends on your water source and TDS level. For municipal/corporation water (TDS < 200), a UV purifier is sufficient. For borewell or tanker water (TDS 200-2000), an RO purifier is recommended. For very high TDS water, an RO+UV+UF combination is ideal. Contact us for a free water quality assessment!" },
      { q: "What is TDS and why does it matter?", a: "TDS (Total Dissolved Solids) measures the concentration of dissolved substances in water, including minerals, salts, and metals. While some minerals are beneficial, high TDS water can taste bad and may contain harmful substances. The ideal TDS for drinking water is 50-150 ppm." },
    ],
  },
  {
    name: "Products & Installation",
    faqs: [
      { q: "Do you offer free installation?", a: "Yes! We provide free installation for all water purifiers purchased from our store. Our trained technicians will install the unit within 24-48 hours of purchase in Visakhapatnam. For other cities, installation is scheduled within 3-5 business days." },
      { q: "How long does installation take?", a: "Standard installation takes 30-60 minutes. Our technician will test the water quality, install the purifier, and demonstrate how to use it. They'll also explain the maintenance schedule." },
      { q: "Do I need a separate tap for the purifier?", a: "Most RO purifiers come with their own dedicated faucet. We'll drill a small hole in your kitchen sink or countertop during installation. If you prefer not to drill, wall-mounted options are also available." },
    ],
  },
  {
    name: "Warranty & Service",
    faqs: [
      { q: "What does the warranty cover?", a: "Our comprehensive warranty covers manufacturing defects, motor/pump failures, and electrical issues. It does not cover consumables like filters, cartridges, and membranes, which need periodic replacement." },
      { q: "How often should I service my water purifier?", a: "We recommend servicing every 6 months. This includes filter replacement, sanitization, and performance testing. Regular maintenance ensures your purifier works efficiently and provides safe water." },
      { q: "What is the cost of annual maintenance?", a: "Annual maintenance costs vary by model. For RO+UV systems, it typically ranges from ₹2,000 to ₹4,000 including filters and labor. We offer annual maintenance contracts (AMC) at discounted rates." },
    ],
  },
  {
    name: "Ordering & Delivery",
    faqs: [
      { q: "How do I place an order?", a: "You can order through our website by adding products to your cart and completing the checkout via WhatsApp. Alternatively, call us at +91 9985850777 or send a WhatsApp message directly. Our team will confirm your order and arrange delivery." },
      { q: "What are the payment options?", a: "We accept UPI, bank transfer, cash on delivery, and EMI options for select products. Payment details will be shared via WhatsApp after order confirmation." },
      { q: "Do you deliver outside Visakhapatnam?", a: "Yes! We deliver across Andhra Pradesh, Telangana, and other states. Delivery within Visakhapatnam is free. For other locations, shipping charges may apply based on distance and product size." },
    ],
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-left px-5 py-4 hover:bg-secondary/50 transition-colors"
      >
        <span className="font-heading font-medium text-sm text-foreground pr-4">{q}</span>
        <ChevronDown className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed animate-fade-in">
          {a}
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  return (
    <Layout>
      <div className="bg-hero-gradient text-primary-foreground py-16 md:py-20">
        <div className="container">
          <nav className="text-sm mb-4 opacity-70">
            <Link to="/" className="hover:opacity-100">Home</Link> / <span>FAQ</span>
          </nav>
          <h1 className="font-heading font-bold text-3xl md:text-5xl">Frequently Asked Questions</h1>
          <p className="mt-4 opacity-80 text-lg">Find answers to common questions about our products and services</p>
        </div>
      </div>

      <section className="py-16 md:py-20">
        <div className="container max-w-3xl">
          {faqCategories.map((cat, i) => (
            <div key={i} className="mb-10">
              <h2 className="font-heading font-bold text-xl text-foreground mb-4">{cat.name}</h2>
              <div className="space-y-3">
                {cat.faqs.map((faq, j) => (
                  <FAQItem key={j} q={faq.q} a={faq.a} />
                ))}
              </div>
            </div>
          ))}

          <div className="bg-surface rounded-lg p-8 text-center mt-12">
            <h3 className="font-heading font-bold text-xl text-foreground mb-2">Still Have Questions?</h3>
            <p className="text-muted-foreground mb-6">Our experts are here to help. Reach out anytime!</p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="https://wa.me/919985850777" target="_blank" rel="noopener noreferrer">
                <Button className="bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90 font-heading font-semibold">
                  WhatsApp Us
                </Button>
              </a>
              <Link to="/contact">
                <Button variant="outline">Contact Page</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
