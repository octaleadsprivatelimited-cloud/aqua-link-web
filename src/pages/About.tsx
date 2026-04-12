import { Link } from "react-router-dom";
import { Target, Eye, Award, Users, Droplets, Shield, Clock, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";

const milestones = [
  { year: "2015", title: "Founded", desc: "Started with a mission to provide clean water to every household" },
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

export default function About() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-navy text-primary-foreground py-16 md:py-24">
        <div className="container">
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
              Dedicated to providing clean, safe, and healthy water solutions for homes and businesses across India since 2015.
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
                  <strong className="font-heading text-foreground">Aqua Safe Water Technologies</strong> is a leading water purification solutions provider based in Visakhapatnam, Andhra Pradesh. Since our founding in 2015, we have been committed to ensuring every family has access to pure, healthy drinking water.
                </p>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  We offer a comprehensive range of water purifiers — from advanced RO+UV+UF systems for homes to industrial-grade commercial plants for businesses. Our expert team provides end-to-end service including consultation, installation, maintenance, and 24/7 support.
                </p>
              </div>
              <div className="lg:col-span-2 space-y-3">
                {["ISI & ISO Certified Products", "Free Installation & Delivery", "24/7 Customer Support", "2 Year Warranty on All Products"].map((item, i) => (
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
      <section className="py-14 md:py-20 bg-navy text-primary-foreground">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Users, num: "10,000+", label: "Happy Customers" },
              { icon: Award, num: "50+", label: "Products" },
              { icon: Clock, num: "10+", label: "Years Experience" },
              { icon: Droplets, num: "4.7★", label: "Average Rating" },
            ].map((s, i) => (
              <div key={i} className="text-center flex flex-col items-center gap-3 p-6">
                <div className="h-14 w-14 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 flex items-center justify-center">
                  <s.icon className="h-6 w-6" />
                </div>
                <p className="font-heading font-extrabold text-3xl md:text-4xl">{s.num}</p>
                <p className="text-xs md:text-sm opacity-60 font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 md:py-20 bg-background">
        <div className="container text-center">
          <h2 className="font-heading font-bold text-2xl md:text-4xl text-foreground mb-3">Ready to Get Pure Water?</h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto text-sm">
            Talk to our experts for free consultation and find the perfect purifier for your needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://wa.me/919985850777" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90 font-heading font-semibold rounded-full px-8">
                Chat on WhatsApp
              </Button>
            </a>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="rounded-full px-8 font-heading font-semibold border-foreground text-foreground hover:bg-foreground hover:text-background">
                Contact Us <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
