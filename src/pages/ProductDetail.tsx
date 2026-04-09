import { useParams, Link } from "react-router-dom";
import { Star, ShoppingCart, ArrowLeft, Check, Shield } from "lucide-react";
import { useProductStore } from "@/stores/productStore";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/products/ProductCard";
import Layout from "@/components/layout/Layout";

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { getProductBySlug, getFeaturedProducts } = useProductStore();
  const product = getProductBySlug(slug || "");
  const addItem = useCartStore((s) => s.addItem);
  const related = getFeaturedProducts().filter((p) => p.slug !== slug).slice(0, 4);

  if (!product) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="font-heading font-bold text-2xl text-foreground">Product Not Found</h1>
          <Link to="/products"><Button className="mt-4">Browse Products</Button></Link>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price.selling,
      originalPrice: product.price.original,
      image: product.images[0],
    });
  };

  return (
    <Layout>
      <div className="container py-6 md:py-10">
        <nav className="text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          {" / "}
          <Link to="/products" className="hover:text-primary">Products</Link>
          {" / "}
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image */}
          <div className="bg-secondary rounded-lg aspect-square flex items-center justify-center overflow-hidden">
            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
          </div>

          {/* Info */}
          <div>
            <h1 className="font-heading font-bold text-2xl md:text-3xl text-foreground">{product.name}</h1>

            <div className="flex items-center gap-2 mt-3">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-border"}`} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">{product.rating} ({product.reviewCount} reviews)</span>
            </div>

            <p className="text-xs text-muted-foreground mt-2">SKU: {product.sku}</p>

            <div className="flex items-baseline gap-3 mt-4">
              <span className="font-heading font-bold text-3xl text-foreground">₹{product.price.selling.toLocaleString("en-IN")}</span>
              {product.price.original > product.price.selling && (
                <>
                  <span className="text-lg text-muted-foreground line-through">₹{product.price.original.toLocaleString("en-IN")}</span>
                  <span className="bg-accent/10 text-accent text-sm font-semibold px-2 py-0.5 rounded">-{product.price.discount}%</span>
                </>
              )}
            </div>

            <div className="mt-4 flex items-center gap-2">
              <span className={`inline-flex items-center gap-1 text-sm font-medium px-2 py-1 rounded ${product.stock === "in_stock" ? "bg-whatsapp/10 text-whatsapp" : "bg-accent/10 text-accent"}`}>
                <Check className="h-3.5 w-3.5" />
                {product.stock === "in_stock" ? "In Stock" : "Low Stock"}
              </span>
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Shield className="h-3.5 w-3.5" /> {product.warranty}
              </span>
            </div>

            <p className="mt-6 text-foreground leading-relaxed">{product.description}</p>

            {/* Features */}
            <div className="mt-6">
              <h3 className="font-heading font-semibold text-sm text-foreground mb-3">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" /> {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA buttons */}
            <div className="flex gap-3 mt-8 sticky bottom-4 lg:static bg-card/95 backdrop-blur-sm p-4 -mx-4 lg:mx-0 lg:p-0 border-t lg:border-0">
              <Button size="lg" variant="outline" className="flex-1" onClick={handleAddToCart}>
                <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
              </Button>
              <a
                href={`https://wa.me/919985850777?text=${encodeURIComponent(`Hi! I'd like to order: ${product.name} — ₹${product.price.selling.toLocaleString("en-IN")}. Please share delivery details.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button size="lg" className="w-full bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90 font-heading font-semibold">
                  Order on WhatsApp
                </Button>
              </a>
            </div>

            {/* Specifications */}
            <div className="mt-10">
              <h3 className="font-heading font-semibold text-foreground mb-4">Specifications</h3>
              <div className="border rounded-lg overflow-hidden">
                {Object.entries(product.specifications).map(([key, value], i) => (
                  <div key={key} className={`flex text-sm ${i % 2 === 0 ? "bg-surface" : "bg-card"}`}>
                    <span className="w-1/2 px-4 py-3 font-medium text-foreground">{key}</span>
                    <span className="w-1/2 px-4 py-3 text-muted-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="font-heading font-bold text-2xl text-foreground mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
}
