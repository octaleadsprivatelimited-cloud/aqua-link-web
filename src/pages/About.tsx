import { Link } from "react-router-dom";
import { Droplets, Target, Eye, Award, Users, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";

const milestones = [
  { year: "2015", title: "Founded", desc: "Started with a mission to provide clean water to every household" },
  { year: "2018", title: "1,000+ Installations", desc: "Crossed 1,000 water purifier installations across AP" },
  { year: "2020", title: "Commercial Expansion", desc: "Launched commercial RO plant division for businesses" },
  { year: "2024", title: "10,000+ Customers", desc: "Trusted by over 10,000 families and businesses" },
];

export default function About() {
  return (
    <Layout>
      <div className="bg-hero-gradient text-primary-foreground py-16 md:py-20">
        <div className="container">
          <nav className="text-sm mb-4 opacity-70">
            <Link to="/" className="hover:opacity-100">Home</Link> / <span>About Us</span>
          </nav>
          <h1 className="font-heading font-bold text-3xl md:text-5xl">About Aqua Safe</h1>
          <p className="mt-4 opacity-80 max-w-2xl text-lg">Dedicated to providing clean, safe, and healthy water solutions for homes and businesses across India.</p>
        </div>
      </div>

      <section className="py-16 md:py-20">
        <div className="container max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <p className="text-foreground leading-relaxed text-lg">
              <strong className="font-heading">Aqua Safe Water Technologies</strong> is a leading water purification solutions provider based in Visakhapatnam, Andhra Pradesh. Since our founding in 2015, we have been committed to ensuring every family has access to pure, healthy drinking water.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              We offer a comprehensive range of water purifiers — from advanced RO+UV+UF systems for homes to industrial-grade commercial plants for businesses. Our expert team provides end-to-end service including consultation, installation, maintenance, and 24/7 support.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-surface">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-card rounded-lg p-8 shadow-card">
              <Target className="h-10 w-10 text-primary mb-4" />
              <h3 className="font-heading font-bold text-xl text-foreground mb-3">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">To make clean, safe drinking water accessible and affordable for every household and business through innovative purification technology and exceptional service.</p>
            </div>
            <div className="bg-card rounded-lg p-8 shadow-card">
              <Eye className="h-10 w-10 text-primary mb-4" />
              <h3 className="font-heading font-bold text-xl text-foreground mb-3">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">To become India's most trusted water purification brand, known for quality products, honest pricing, and unmatched customer care.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-16 md:py-20">
        <div className="container max-w-4xl">
          <h2 className="font-heading font-bold text-3xl text-foreground text-center mb-12">Our Journey</h2>
          <div className="space-y-6">
            {milestones.map((m, i) => (
              <div key={i} className="flex gap-6 items-start">
                <div className="shrink-0 w-20 h-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-heading font-bold text-lg">
                  {m.year}
                </div>
                <div className="pt-2">
                  <h3 className="font-heading font-semibold text-lg text-foreground">{m.title}</h3>
                  <p className="text-muted-foreground mt-1">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-hero-gradient text-primary-foreground">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: "10,000+", label: "Happy Customers" },
              { num: "50+", label: "Products" },
              { num: "8+", label: "Years Experience" },
              { num: "4.7★", label: "Average Rating" },
            ].map((s, i) => (
              <div key={i}>
                <p className="font-heading font-extrabold text-3xl md:text-4xl">{s.num}</p>
                <p className="text-sm opacity-70 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-card">
        <div className="container text-center">
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-4">Ready to Get Pure Water?</h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">Talk to our experts for free consultation and find the perfect purifier for your needs.</p>
          <a href="https://wa.me/919985850777" target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90 font-heading font-semibold">
              Chat with Us on WhatsApp
            </Button>
          </a>
        </div>
      </section>
    </Layout>
  );
}
