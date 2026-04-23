import { Link } from "react-router-dom";
import { Target, Eye, Users, Droplets, Shield, Clock, ArrowRight, CheckCircle, Star, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import bgHero from "@/assets/bg-hero-dark.jpg";
import bgCta from "@/assets/bg-cta.jpg";
import { openWhatsAppWithTracking } from "@/lib/whatsapp";
import { useSiteSettingsStore } from "@/stores/siteSettingsStore";

const milestones = [
  { year: "2006", title: "Founded", desc: "Started with a mission to provide clean water to every household" },
  { year: "2018", title: "1,000+ Installations", desc: "Crossed 1,000 water purifier installations across AP" },
  { year: "2020", title: "Commercial Expansion", desc: "Launched commercial RO plant division for businesses" },
  { year: "2024", title: "10,000+ Customers", desc: "Trusted by over 10,000 families and businesses" },
];

const values = [
  { icon: Droplets, title: "Purity First", desc: "Every product meets the highest standards of water purification." },
  { icon: Shield, title: "Trust & Transparency", desc: "Honest pricing, genuine products, and reliable service." },
  { icon: Users, title: "Customer Centric", desc: "Your satisfaction drives everything we do." },
  { icon: Clock, title: "Swift Service", desc: "Same-day installation and responsive after-sales support." },
];

const aboutStatIcons = [Users, Package, Clock, Star] as const;

export default function About() {
  const settings = useSiteSettingsStore((s) => s.settings);
  return (
    <Layout>
      <SEO title="About Us" description="Learn about WaterFilterStore, our mission, vision, and dedication to providing clean and safe water solutions since 2006." />
      {/* Hero */}
      <section className="relative text-primary-foreground py-10 md:py-14 overflow-hidden">
        <img src={settings.heroImages.about || bgHero} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-navy/80" />
        <div className="container relative z-10">
          <nav className="text-sm mb-6 opacity-60 font-medium">
            <Link to="/" className="hover:opacity-100 transition-opacity">Home</Link>
            <span className="mx-2">/</span>
            <span>About Us</span>
          </nav>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-accent font-heading font-semibold text-sm uppercase tracking-wider mb-3">Who We Are</p>
            <h1 className="font-heading font-bold text-3xl md:text-5xl lg:text-6xl leading-tight mb-5">
              Pure Water, <span className="text-accent">Healthy Lives</span>
            </h1>
            <p className="opacity-80 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              Dedicated to providing clean, safe, and healthy water solutions for homes and businesses across India since 2006.
            </p>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-14 md:py-20 bg-background">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
              <div className="lg:col-span-3">
                <p className="text-foreground leading-relaxed text-base md:text-lg mb-5">
                  <strong className="font-heading text-foreground">WaterFilterStore</strong> is a leading water purification solutions provider based in Visakhapatnam, Andhra Pradesh. Since our founding in 2006, we have been committed to ensuring every family has access to pure, healthy drinking water.
                </p>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  We offer a comprehensive range of water purifiers — from advanced RO+UV+UF systems for homes to industrial-grade commercial plants for businesses. Our expert team provides end-to-end service including consultation, installation, maintenance, and 24/7 support.
                </p>
              </div>
              <div className="lg:col-span-2 space-y-3">
                {["ISI & ISO Certified Products", "Free Installation & Delivery", "24/7 Customer Support", "1 Year Warranty on All Products"].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-surface border border-border">
                    <CheckCircle className="h-5 w-5 text-accent shrink-0" />
                    <span className="text-sm font-medium text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-14 md:py-20 bg-surface">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-card rounded-2xl p-8 md:p-10 border border-border hover:border-accent/20 hover:shadow-card-hover transition-all duration-300">
              <div className="h-14 w-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-5">
                <Target className="h-7 w-7 text-accent" />
              </div>
              <h3 className="font-heading font-bold text-xl text-foreground mb-3">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">To make clean, safe drinking water accessible and affordable for every household and business through innovative purification technology and exceptional service.</p>
            </div>
            <div className="bg-card rounded-2xl p-8 md:p-10 border border-border hover:border-accent/20 hover:shadow-card-hover transition-all duration-300">
              <div className="h-14 w-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-5">
                <Eye className="h-7 w-7 text-accent" />
              </div>
              <h3 className="font-heading font-bold text-xl text-foreground mb-3">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">To become India's most trusted water purification brand, known for quality products, honest pricing, and unmatched customer care.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-14 md:py-20 bg-background">
        <div className="container">
          <div className="text-center mb-10">
            <p className="text-accent font-heading font-semibold text-sm uppercase tracking-wider mb-2">What Drives Us</p>
            <h2 className="font-heading font-bold text-2xl md:text-4xl text-foreground">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {values.map((v, i) => (
              <div key={i} className="text-center p-6 rounded-2xl bg-surface border border-border hover:border-accent/20 hover:shadow-card transition-all duration-300">
                <div className="h-12 w-12 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <v.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-heading font-semibold text-sm md:text-base text-foreground mb-1.5">{v.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-14 md:py-20 bg-surface">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-accent font-heading font-semibold text-sm uppercase tracking-wider mb-2">Our Story</p>
            <h2 className="font-heading font-bold text-2xl md:text-4xl text-foreground">Our Journey</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {milestones.map((m, i) => (
              <div key={i} className="bg-card rounded-2xl p-6 border border-border hover:border-accent/20 hover:shadow-card-hover transition-all duration-300 text-center group">
                <div className="h-16 w-16 rounded-2xl bg-navy text-primary-foreground flex items-center justify-center font-heading font-bold text-lg mx-auto mb-4 group-hover:bg-accent transition-colors duration-300">
                  {m.year}
                </div>
                <h3 className="font-heading font-semibold text-base text-foreground mb-2">{m.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-muted/50 py-14 md:py-20">
        <div className="container">
          <div className="mx-auto mb-10 max-w-5xl text-center md:mb-12">
            <p className="mb-2 font-heading text-sm font-semibold uppercase tracking-wider text-accent">Our impact</p>
            <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl">Trusted by families across India</h2>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
            {settings.aboutStats.map((s, i) => {
              const StatIcon = aboutStatIcons[i] ?? Users;
              return (
                <div
                  key={`${s.label}-${i}`}
                  className="group flex flex-col items-center rounded-2xl border border-border bg-card px-4 py-7 text-center shadow-card transition-all duration-300 hover:border-accent/25 hover:shadow-card-hover sm:px-6 sm:py-9"
                >
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent ring-1 ring-accent/15 transition-colors group-hover:bg-accent/15">
                    <StatIcon className="h-7 w-7" aria-hidden />
                  </div>
                  <p className="font-heading text-2xl font-extrabold leading-none tracking-tight text-foreground sm:text-3xl md:text-4xl">
                    {s.value}
                  </p>
                  <p className="mt-3 max-w-[11rem] text-xs font-medium leading-snug text-muted-foreground sm:max-w-none sm:text-sm">
                    {s.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 md:py-20 relative overflow-hidden">
        <img src={bgCta} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-navy/80" />
        <div className="container text-center relative z-10 text-primary-foreground">
          <h2 className="font-heading font-bold text-2xl md:text-4xl mb-3">Ready to Get Pure Water?</h2>
          <p className="text-primary-foreground/70 mb-8 max-w-lg mx-auto text-sm">
            Talk to our experts for free consultation and find the perfect purifier for your needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              type="button"
              size="lg"
              onClick={() => openWhatsAppWithTracking("About CTA", "Hi! I need help with WaterFilterStore products.")}
              className="bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90 font-heading font-semibold rounded-full px-8"
            >
              Chat on WhatsApp
            </Button>
            <Link to="/contact">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 font-heading font-semibold border-primary-foreground/30 text-primary-foreground bg-transparent hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                Contact Us <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
