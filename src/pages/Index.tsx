import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Shield, Droplets, Clock, Award, Wrench, Package, Calendar, ChevronDown, ChevronUp, Star, Users, FlaskConical, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProductStore } from "@/stores/productStore";
import ProductCard from "@/components/products/ProductCard";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { useSiteSettingsStore } from "@/stores/siteSettingsStore";
import { openWhatsAppWithTracking } from "@/lib/whatsapp";
import heroSlide1 from "@/assets/hero-slide-1.jpg";
import heroSlide2 from "@/assets/hero-slide-2.jpg";
import productRange from "@/assets/product-range.jpg";
import bgPromise from "@/assets/bg-promise.jpg";
import bgCta from "@/assets/bg-cta.jpg";

const heroSlides = [
  {
    image: heroSlide1,
    title: "Advanced Water Purification",
    subtitle: "RO + UV + UF Technology",
    cta: "Explore Products",
    link: "/products",
  },
  {
    image: heroSlide2,
    title: "Pure Water, Healthy Family",
    subtitle: "Trusted by 10,000+ Families",
    cta: "Shop Now",
    link: "/products",
  },
];

const quickActions = [
  { icon: Wrench, label: "Schedule Service", link: "/contact" },
  { icon: Package, label: "Explore Products", link: "/products" },
  { icon: Calendar, label: "Book a Demo", link: "/contact" },
];

const trustBadges = [
  "Free Delivery",
  "EMI Options Available",
  "Free Installation",
  "Trusted by 10,000+",
  "ISI Certified",
  "2 Year Warranty",
];

const testimonials = [
  {
    name: "Rajesh Kumar",
    location: "Visakhapatnam",
    text: "Excellent water purifier! The whole family is happy with the taste and quality of water. Great after-sales service too. The installation was done on the same day.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    location: "Hyderabad",
    text: "Very professional installation and the purifier works perfectly. The alkaline feature is amazing for health. Highly recommend Aqua Safe!",
    rating: 5,
  },
  {
    name: "Suresh Reddy",
    location: "Vijayawada",
    text: "Best investment for our home. Water quality improved dramatically. The service team is very responsive and helpful. Highly recommend!",
    rating: 4,
  },
];

const statIcons = [Users, FlaskConical, Award, UserCheck];

const faqs = [
  {
    q: "Why do I need a water purifier?",
    a: "Tap water can have impurities like bacteria, viruses, chemicals, or heavy metals. A purifier ensures your water is clean and safe for drinking.",
  },
  {
    q: "What are the benefits of Aqua Safe water purifiers?",
    a: "Aqua Safe water purifiers remove impurities from tap water, improve water quality, and ensure your family drinks safe and healthy water with essential minerals retained.",
  },
  {
    q: "Can I install the purifier myself?",
    a: "Professional installation is recommended to ensure it works perfectly. Aqua Safe offers free expert installation services with every purchase.",
  },
  {
    q: "Is the purifier suitable for all water sources?",
    a: "Aqua Safe offers a range of purifiers suitable for all water sources like municipal water, bore well, or tankers. Our products handle various impurities ensuring clean and safe drinking water.",
  },
  {
    q: "Does Aqua Safe offer customer support?",
    a: "Absolutely! Aqua Safe provides excellent after-sales support, including installation, servicing, and troubleshooting with dedicated customer service.",
  },
];

export default function Index() {
  const products = useProductStore((s) => s.products);
  const settings = useSiteSettingsStore((s) => s.settings);
  const featured = products.slice(0, 4);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <Layout>
      <SEO title="Home" description="Aqua Safe Water Technologies - Premium RO, UV, UF water purifiers for home & business. Free installation, best prices in Visakhapatnam. Call +91 9985850777." />
      {/* Hero Slider */}
      <section className="relative h-[350px] md:h-[420px] lg:h-[480px] overflow-hidden">
        {heroSlides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              i === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
          >
            <img
              src={
                i === 0
                  ? settings.heroImages.homeSlide1 || slide.image
                  : settings.heroImages.homeSlide2 || slide.image
              }
              alt={slide.title}
              width={1920}
              height={800}
              className="w-full h-full object-cover"
              {...(i === 0 ? {} : { loading: "lazy" as const })}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-foreground/20" />
            <div className="absolute inset-0 flex items-end pb-14 md:pb-16 lg:pb-20">
              <div className="container">
                <div className="max-w-xl">
                  <span className="inline-block px-3 py-1 rounded-full bg-accent/90 text-accent-foreground text-[10px] md:text-xs font-heading font-semibold uppercase tracking-wider mb-3">
                    {slide.subtitle}
                  </span>
                  <h1 className="font-heading font-extrabold text-2xl md:text-4xl lg:text-5xl text-primary-foreground leading-[1.15] mb-4 drop-shadow-lg">
                    {slide.title}
                  </h1>
                  <Link to={slide.link}>
                    <Button
                      size="lg"
                      className="bg-accent text-accent-foreground hover:bg-accent/90 font-heading font-semibold rounded-full px-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                    >
                      {slide.cta} <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
        {/* Progress dots */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2.5">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === currentSlide ? "w-10 bg-accent" : "w-3 bg-primary-foreground/30 hover:bg-primary-foreground/50"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Quick Actions Bar */}
      <section className="py-8 bg-background border-b border-border">
        <div className="container">
          <div className="flex justify-center gap-6 md:gap-12">
            {quickActions.map((action) => (
              <Link
                key={action.label}
                to={action.link}
                className="flex flex-col items-center gap-2.5 group"
              >
                <div className="h-14 w-14 rounded-2xl bg-accent/10 group-hover:bg-accent group-hover:shadow-lg flex items-center justify-center transition-all duration-300">
                  <action.icon className="h-6 w-6 text-accent group-hover:text-accent-foreground transition-colors" />
                </div>
                <span className="text-xs md:text-sm font-heading font-medium text-foreground group-hover:text-accent transition-colors">
                  {action.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Categories */}
      <section className="py-14 md:py-20 bg-surface">
        <div className="container">
          <div className="text-center mb-10">
            <p className="text-accent font-heading font-semibold text-sm uppercase tracking-wider mb-2">Our Solutions</p>
            <h2 className="font-heading font-bold text-2xl md:text-4xl text-foreground">
              Find Your Perfect Fit
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {settings.homepageSolutions.map((cat) => (
              <Link
                key={cat.title}
                to={cat.link}
                className="group relative rounded-2xl overflow-hidden bg-card border border-border hover:border-accent/30 shadow-card hover:shadow-card-hover transition-all duration-300"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    loading="lazy"
                    width={400}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-heading font-bold text-base text-foreground mb-1.5">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-2">
                    {cat.desc}
                  </p>
                  <span className="text-accent font-heading font-semibold text-xs inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Explore <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Scrolling Trust Marquee */}
      <section className="py-3.5 bg-navy overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...trustBadges, ...trustBadges].map((badge, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2.5 mx-8 text-primary-foreground/90 text-sm font-medium"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {badge}
            </span>
          ))}
        </div>
      </section>

      {/* Product Range Section */}
      <section className="py-14 md:py-20 bg-background">
        <div className="container">
          <div className="rounded-2xl overflow-hidden bg-surface border border-border">
            <div className="flex flex-col lg:flex-row">
              <div className="p-8 lg:p-12 flex-1 flex flex-col justify-center">
                <p className="text-accent font-heading font-semibold text-sm uppercase tracking-wider mb-3">Our Range</p>
                <h2 className="font-heading font-bold text-2xl md:text-3xl lg:text-4xl text-foreground mb-4">
                  Multiple Options,{" "}
                  <span className="text-accent">One Destination</span>
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6 text-sm">
                  Choose the right water filter for your home. Our product range is
                  thoughtfully crafted to suit your unique needs.
                </p>
                <div>
                  <Link to="/products">
                    <Button className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90 font-heading font-semibold px-8">
                      View Products <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="lg:w-1/2">
                <img
                  src={productRange}
                  alt="Range of water purification products"
                  loading="lazy"
                  width={1600}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-14 md:py-20 bg-surface">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10">
            <div>
              <p className="text-accent font-heading font-semibold text-sm uppercase tracking-wider mb-2">Top Picks</p>
              <h2 className="font-heading font-bold text-2xl md:text-4xl text-foreground">
                Our Best Sellers
              </h2>
              <p className="text-muted-foreground mt-2 text-sm max-w-md">
                Trusted by thousands of families — our most popular water purifiers
              </p>
            </div>
            <Link to="/products" className="mt-4 md:mt-0">
              <Button variant="outline" className="rounded-full px-6 font-heading font-semibold border-foreground text-foreground hover:bg-foreground hover:text-background text-sm">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-14 md:py-20 relative text-primary-foreground overflow-hidden">
        <img src={bgPromise} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-navy/85" />
        <div className="container relative z-10">
          <div className="text-center mb-12">
            <p className="text-accent font-heading font-semibold text-sm uppercase tracking-wider mb-2">Our Promise</p>
            <h2 className="font-heading font-bold text-2xl md:text-4xl">
              Why Choose Aqua Safe?
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: Droplets, title: "99.9% Pure Water", desc: "Advanced RO+UV+UF technology" },
              { icon: Shield, title: "Certified Quality", desc: "ISI & ISO certified products" },
              { icon: Clock, title: "Quick Installation", desc: "Free same-day installation" },
              { icon: Award, title: "Warranty Assured", desc: "Up to 2 years warranty" },
            ].map((b, i) => (
              <div
                key={i}
                className="text-center bg-primary-foreground/5 rounded-2xl p-6 md:p-8 border border-primary-foreground/10 hover:bg-primary-foreground/10 transition-colors"
              >
                <div className="h-14 w-14 rounded-2xl bg-accent/20 flex items-center justify-center mx-auto mb-4">
                  <b.icon className="h-7 w-7 text-accent" />
                </div>
                <h3 className="font-heading font-semibold text-sm md:text-base mb-1.5">
                  {b.title}
                </h3>
                <p className="text-xs md:text-sm opacity-60">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Counter */}
      <section className="py-14 md:py-20 bg-background">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {settings.homeStats.map((stat, i) => {
              const StatIcon = statIcons[i] || Users;
              return (
              <div key={i} className="text-center flex flex-col items-center gap-3 p-6 rounded-2xl bg-surface border border-border">
                <div className="h-14 w-14 rounded-full bg-accent/10 flex items-center justify-center">
                  <StatIcon className="h-6 w-6 text-accent" />
                </div>
                <p className="font-heading font-extrabold text-3xl md:text-4xl text-foreground">
                  {stat.value}
                </p>
                <p className="text-xs md:text-sm text-muted-foreground font-medium">{stat.label}</p>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-14 md:py-20 bg-surface">
        <div className="container">
          <div className="text-center mb-10">
            <p className="text-accent font-heading font-semibold text-sm uppercase tracking-wider mb-2">Got Questions?</p>
            <h2 className="font-heading font-bold text-2xl md:text-4xl text-foreground">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`rounded-xl border transition-colors ${openFaq === i ? "bg-card border-accent/30 shadow-card" : "bg-card border-border"}`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-heading font-medium text-sm md:text-base text-foreground pr-4">
                    {faq.q}
                  </span>
                  <span className={`shrink-0 h-8 w-8 rounded-full flex items-center justify-center transition-all ${openFaq === i ? "bg-accent text-accent-foreground rotate-180" : "bg-secondary text-muted-foreground"}`}>
                    <ChevronDown className="h-4 w-4" />
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-14 md:py-20 bg-background">
        <div className="container">
          <div className="text-center mb-10">
            <p className="text-accent font-heading font-semibold text-sm uppercase tracking-wider mb-2">Customer Love</p>
            <h2 className="font-heading font-bold text-2xl md:text-4xl text-foreground">
              What Our Customers Say
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-card rounded-2xl p-6 md:p-8 border border-border hover:border-accent/20 hover:shadow-card-hover transition-all duration-300 relative"
              >
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star
                      key={j}
                      className={`h-4 w-4 ${
                        j < t.rating
                          ? "fill-accent text-accent"
                          : "text-border"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-foreground leading-relaxed mb-6">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-heading font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-sm text-foreground">
                      {t.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 md:py-20 relative text-primary-foreground overflow-hidden">
        <img src={bgCta} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-navy/80" />
        <div className="container text-center relative z-10">
          <h2 className="font-heading font-bold text-2xl md:text-4xl mb-3">
            Get Your Perfect Water Purifier Today
          </h2>
          <p className="opacity-70 mb-8 max-w-xl mx-auto text-sm">
            Free delivery & installation. Talk to our experts on WhatsApp for
            personalized recommendations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              type="button"
              size="lg"
              onClick={() =>
                openWhatsAppWithTracking("Home CTA", "Hi! I need help choosing a water purifier.")
              }
              className="bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90 font-heading font-semibold rounded-full px-8"
            >
              Chat on WhatsApp
            </Button>
            <a href={`tel:${settings.phone.replace(/\s+/g, "")}`}>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 font-heading font-semibold border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              >
                Call {settings.phone}
              </Button>
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
