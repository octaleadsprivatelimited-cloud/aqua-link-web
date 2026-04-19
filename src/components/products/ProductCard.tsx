import { Link } from "react-router-dom";
import { Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import type { Product } from "@/data/products";

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);

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
    <div className="group bg-card overflow-hidden transition-all duration-300 relative">
      <Link to={`/products/${product.slug}`} className="block relative z-10">
        <div className="relative aspect-[4/5] bg-secondary/30 overflow-hidden flex items-center justify-center">
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-700"
          />
          {product.price.discount > 0 && (
            <span className="absolute top-3 left-3 bg-foreground text-background text-[10px] uppercase tracking-wider font-bold px-3 py-1">
              Save {product.price.discount}%
            </span>
          )}
          {product.stock === "low_stock" && (
            <span className="absolute top-3 right-3 bg-secondary text-secondary-foreground text-[10px] uppercase tracking-wider font-medium px-3 py-1">
              Low Stock
            </span>
          )}
        </div>
      </Link>

      <div className="p-4">
        <Link to={`/products/${product.slug}`}>
          <h3 className="font-heading font-semibold text-sm line-clamp-2 text-foreground hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1 mt-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-3.5 w-3.5 ${i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-border"}`}
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1">({product.reviewCount})</span>
        </div>

        <div className="flex items-baseline gap-2 mt-2">
          <span className="font-heading font-bold text-lg text-foreground">
            ₹{product.price.selling.toLocaleString("en-IN")}
          </span>
          {product.price.original > product.price.selling && (
            <span className="text-sm text-muted-foreground line-through">
              ₹{product.price.original.toLocaleString("en-IN")}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2 mt-4 relative z-10">
          <Button variant="default" className="w-full rounded-none h-11 text-xs uppercase tracking-wide font-semibold hover:bg-foreground/90 transition-all" onClick={handleAddToCart}>
            Add to Cart
          </Button>
          <a
            href={`https://wa.me/919985850777?text=${encodeURIComponent(`Hi! I'm interested in ${product.name} (₹${product.price.selling}). Please share details.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Button variant="outline" className="w-full rounded-none h-11 text-xs uppercase tracking-wide font-semibold border-foreground hover:bg-secondary transition-all">
              Quick Order via WhatsApp
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
