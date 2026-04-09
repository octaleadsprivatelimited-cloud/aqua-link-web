import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Shield, Droplets, Clock, Award, Wrench, Package, Calendar, ChevronDown, ChevronUp, Star, Users, FlaskConical, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProductStore } from "@/stores/productStore";
import ProductCard from "@/components/products/ProductCard";
import Layout from "@/components/layout/Layout";
import heroSlide1 from "@/assets/hero-slide-1.jpg";
import heroSlide2 from "@/assets/hero-slide-2.jpg";
import productRange from "@/assets/product-range.jpg";
import catHome from "@/assets/cat-home.jpg";
import catCommercial from "@/assets/cat-commercial.jpg";
import catUv from "@/assets/cat-uv.jpg";
import catFilters from "@/assets/cat-filters.jpg";

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

const solutionCategories = [
  {
    image: catHome,
    title: "Home Water Solutions",
    desc: "Clean water, happy home. Choose the ideal filter for your family.",
    link: "/products?category=ro-purifiers",
  },
  {
    image: catCommercial,
    title: "Commercial Water Solutions",
    desc: "Enhance purity, elevate performance. Solutions for your commercial needs.",
    link: "/products?category=commercial",
  },
  {
    image: catUv,
    title: "UV Water Purifiers",
    desc: "Advanced UV technology for safe, mineral-rich drinking water.",
    link: "/products?category=uv-purifiers",
  },
  {
    image: catFilters,
    title: "Filters & Accessories",
    desc: "Replacement filters, membranes, and maintenance kits.",
    link: "/products?category=filters-cartridges",
  },
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

const stats = [
  { value: "98%", label: "Customer Satisfaction" },
  { value: "10+", label: "Years of Experience" },
  { value: "10,000+", label: "Happy Customers" },
  { value: "50+", label: "Certified Engineers" },
];

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
  const featured = useProductStore((s) => s.getFeaturedProducts());
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
      {/* Hero Slider */}
      <section className="relative h-[400px] md:h-[500px] lg:h-[550px] overflow-hidden">
        {heroSlides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              width={1920}
              height={800}
              className="w-full h-full object-cover"
              {...(i === 0 ? {} : { loading: "lazy" as const })}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent" />
            <div className="absolute inset-0 flex items-center">
              <div className="container">
                <div className="max-w-lg">
                  <h1 className="font-heading font-extrabold text-3xl md:text-5xl lg:text-6xl text-primary-foreground leading-tight mb-3">
                    {slide.title}
                  </h1>
                  <p className="text-primary-foreground/80 text-base md:text-lg mb-6">
                    {slide.subtitle}
                  </p>
                  <Link to={slide.link}>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/10 font-heading font-semibold rounded-full px-8"
                    >
                      {slide.cta}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
        {/* Nav arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors"
          aria-label="Previous slide"
        >
          <ArrowLeft className="h-8 w-8" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors"
          aria-label="Next slide"
        >
          <ArrowRight className="h-8 w-8" />
        </button>
        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-2.5 rounded-full transition-all ${
                i === currentSlide ? "w-8 bg-primary-foreground" : "w-2.5 bg-primary-foreground/40"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Quick Actions Bar */}
      <section className="py-6 bg-background border-b">
        <div className="container">
          <p className="text-center text-accent font-heading font-semibold text-sm mb-4">
            Explore Your Options
          </p>
          <div className="flex justify-center gap-8 md:gap-16">
            {quickActions.map((action) => (
              <Link
                key={action.label}
                to={action.link}
                className="flex flex-col items-center gap-2 group"
              >
                <div className="p-3 rounded-full border border-border group-hover:border-accent group-hover:bg-accent/5 transition-colors">
                  <action.icon className="h-5 w-5 text-foreground group-hover:text-accent transition-colors" />
                </div>
                <span className="text-xs md:text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                  {action.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Categories - ZeroB style cards */}
      <section className="py-12 md:py-16 bg-surface">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {solutionCategories.map((cat) => (
              <Link
                key={cat.title}
                to={cat.link}
                className="group relative rounded-2xl overflow-hidden bg-card shadow-card hover:shadow-card-hover transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row">
                  <div className="p-6 sm:p-8 flex-1 flex flex-col justify-center">
                    <h2 className="font-heading font-bold text-xl md:text-2xl text-foreground mb-2">
                      {cat.title}
                    </h2>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {cat.desc}
                    </p>
                    <span className="text-accent font-medium text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                      Explore Your Options <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                  <div className="sm:w-48 md:w-56 h-48 sm:h-auto overflow-hidden">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      loading="lazy"
                      width={400}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Scrolling Trust Marquee */}
      <section className="py-4 bg-navy overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...trustBadges, ...trustBadges].map((badge, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 mx-8 text-primary-foreground/90 text-sm font-medium"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {badge}
            </span>
          ))}
        </div>
      </section>

      {/* Product Range Section */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container">
          <div className="rounded-2xl overflow-hidden bg-surface">
            <div className="flex flex-col lg:flex-row">
              <div className="p-8 lg:p-12 flex-1 flex flex-col justify-center">
                <h2 className="font-heading font-bold text-2xl md:text-3xl lg:text-4xl text-foreground mb-4">
                  Multiple Options,{" "}
                  <span className="text-accent">One Destination</span>
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Choose the right water filter for your home. Our product range is
                  thoughtfully crafted to suit your unique needs. Whatever you're
                  looking for, we've got the perfect fit for you!
                </p>
                <div className="flex gap-3">
                  <Link to="/products">
                    <Button
                      variant="outline"
                      className="rounded-full border-foreground text-foreground hover:bg-foreground hover:text-background font-medium"
                    >
                      Get Assistance <ArrowRight className="ml-2 h-4 w-4" />
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
      <section className="py-12 md:py-16 bg-background">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground">
                Best Sellers
              </h2>
              <p className="text-muted-foreground mt-1 text-sm">
                Our most popular water purifiers
              </p>
            </div>
            <Link to="/products">
              <Button variant="outline" size="sm" className="hidden sm:inline-flex rounded-full">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link to="/products">
              <Button variant="outline" className="rounded-full">
                View All Products <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 md:py-16 bg-navy text-primary-foreground">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="font-heading font-bold text-2xl md:text-3xl">
              Why Choose Aqua Safe?
            </h2>
            <p className="mt-2 opacity-70 max-w-lg mx-auto text-sm">
              Trusted by families across Andhra Pradesh
            </p>
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
                className="text-center bg-primary-foreground/5 backdrop-blur-sm rounded-xl p-5 md:p-6 border border-primary-foreground/10"
              >
                <b.icon className="h-8 w-8 mx-auto mb-3" />
                <h3 className="font-heading font-semibold text-sm md:text-base mb-1">
                  {b.title}
                </h3>
                <p className="text-xs md:text-sm opacity-70">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container max-w-3xl">
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="border rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-surface transition-colors"
                >
                  <span className="font-heading font-medium text-sm md:text-base text-foreground pr-4">
                    {faq.q}
                  </span>
                  {openFaq === i ? (
                    <ChevronUp className="h-5 w-5 text-accent shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 md:py-16 bg-surface">
        <div className="container">
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground text-center mb-8">
            Testimonials
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-card rounded-xl p-6 shadow-card border"
              >
                <p className="text-sm text-foreground leading-relaxed mb-4 italic">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-navy flex items-center justify-center text-primary-foreground font-heading font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-sm text-foreground">
                      {t.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{t.location}</p>
                  </div>
                </div>
                <div className="flex gap-0.5 mt-3">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star
                      key={j}
                      className={`h-3.5 w-3.5 ${
                        j < t.rating
                          ? "fill-accent text-accent"
                          : "text-border"
                      }`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Counter */}
      <section className="py-10 md:py-14 bg-navy text-primary-foreground">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat, i) => (
              <div key={i}>
                <p className="font-heading font-extrabold text-3xl md:text-4xl mb-1">
                  {stat.value}
                </p>
                <p className="text-xs md:text-sm opacity-70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container text-center">
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-3">
            Get Your Perfect Water Purifier Today
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto text-sm">
            Free delivery & installation. Talk to our experts on WhatsApp for
            personalized recommendations.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://wa.me/919985850777?text=Hi!%20I%20need%20help%20choosing%20a%20water%20purifier."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90 font-heading font-semibold rounded-full px-8"
              >
                Chat on WhatsApp
              </Button>
            </a>
            <a href="tel:+919985850777">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 font-heading font-semibold"
              >
                Call +91 9985850777
              </Button>
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
