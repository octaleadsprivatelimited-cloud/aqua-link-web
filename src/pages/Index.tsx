import { Link } from "react-router-dom";
import { ArrowRight, Shield, Droplets, Clock, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { categories } from "@/data/categories";
import { getFeaturedProducts } from "@/data/products";
import ProductCard from "@/components/products/ProductCard";
import Layout from "@/components/layout/Layout";
import heroBg from "@/assets/hero-bg.jpg";

const benefits = [
  { icon: Droplets, title: "99.9% Pure Water", desc: "Advanced RO+UV+UF technology removes all impurities" },
  { icon: Shield, title: "Certified Quality", desc: "ISI & ISO certified products with premium components" },
  { icon: Clock, title: "Quick Installation", desc: "Free same-day installation by trained technicians" },
  { icon: Award, title: "Warranty Assured", desc: "Up to 2 years comprehensive warranty on all purifiers" },
];

const testimonials = [
  { name: "Rajesh Kumar", location: "Visakhapatnam", text: "Excellent water purifier! The whole family is happy with the taste and quality of water. Great after-sales service too.", rating: 5 },
  { name: "Priya Sharma", location: "Hyderabad", text: "Very professional installation and the purifier works perfectly. The alkaline feature is amazing for health.", rating: 5 },
  { name: "Suresh Reddy", location: "Vijayawada", text: "Best investment for our home. Water quality improved dramatically. Highly recommend Aqua Safe!", rating: 4 },
];

export default function Index() {
  const featured = getFeaturedProducts();

  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[600px] md:min-h-[700px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="Water purification" width={1920} height={1080} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
        </div>
        <div className="container relative z-10 py-20">
          <div className="max-w-xl">
            <span className="inline-block bg-accent/20 text-accent-foreground text-sm font-medium px-3 py-1 rounded-full mb-4 backdrop-blur-sm border border-accent/30">
              #1 Water Purifier Store in Visakhapatnam
            </span>
            <h1 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl text-primary-foreground leading-tight mb-6">
              Pure Water,{" "}
              <span className="text-accent">Healthy Life</span>
            </h1>
            <p className="text-primary-foreground/80 text-lg md:text-xl mb-8 leading-relaxed">
              Advanced water purification systems for your home and business. RO, UV, UF and more — delivered and installed free across Andhra Pradesh.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/products">
                <Button size="lg" className="font-heading font-semibold bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg">
                  Explore Products <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <a href="https://wa.me/919985850777" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="font-heading font-semibold border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  WhatsApp Us
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 md:py-20 bg-card">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground">Shop by Category</h2>
            <p className="text-muted-foreground mt-3 max-w-lg mx-auto">Find the perfect water purification solution for your needs</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/products?category=${cat.slug}`}
                className="group bg-surface rounded-lg p-5 text-center hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 border border-transparent hover:border-primary/20"
              >
                <span className="text-4xl block mb-3">{cat.icon}</span>
                <h3 className="font-heading font-semibold text-sm text-foreground group-hover:text-primary transition-colors">{cat.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{cat.productCount} products</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground">Best Sellers</h2>
              <p className="text-muted-foreground mt-2">Our most popular water purifiers</p>
            </div>
            <Link to="/products">
              <Button variant="outline" className="hidden sm:inline-flex">
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
              <Button variant="outline">View All Products <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-20 bg-hero-gradient text-primary-foreground">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl">Why Choose Aqua Safe?</h2>
            <p className="mt-3 opacity-80 max-w-lg mx-auto">Trusted by 10,000+ families across Andhra Pradesh</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, i) => (
              <div key={i} className="text-center bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-6 border border-primary-foreground/10">
                <b.icon className="h-10 w-10 mx-auto mb-4" />
                <h3 className="font-heading font-semibold text-lg mb-2">{b.title}</h3>
                <p className="text-sm opacity-80">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-20 bg-card">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground">What Our Customers Say</h2>
            <p className="text-muted-foreground mt-3">Real reviews from happy families</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-background rounded-lg p-6 shadow-card border">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <span key={j} className={`text-sm ${j < t.rating ? "text-accent" : "text-border"}`}>★</span>
                  ))}
                </div>
                <p className="text-sm text-foreground leading-relaxed mb-4">"{t.text}"</p>
                <div>
                  <p className="font-heading font-semibold text-sm text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-accent-gradient text-accent-foreground">
        <div className="container text-center">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">Get Your Perfect Water Purifier Today</h2>
          <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto">Free delivery & installation. Talk to our experts on WhatsApp for personalized recommendations.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="https://wa.me/919985850777?text=Hi!%20I%20need%20help%20choosing%20a%20water%20purifier." target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90 font-heading font-semibold shadow-lg">
                Chat on WhatsApp
              </Button>
            </a>
            <a href="tel:+919985850777">
              <Button size="lg" variant="outline" className="border-accent-foreground/30 text-accent-foreground hover:bg-accent-foreground/10 font-heading font-semibold">
                Call +91 9985850777
              </Button>
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
