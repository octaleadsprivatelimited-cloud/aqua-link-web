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
    <div className="group bg-card rounded-lg border overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
      <Link to={`/products/${product.slug}`} className="block">
        <div className="relative aspect-square bg-secondary overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {product.price.discount > 0 && (
            <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded-md">
              -{product.price.discount}%
            </span>
          )}
          {product.stock === "low_stock" && (
            <span className="absolute top-3 right-3 bg-destructive text-destructive-foreground text-xs font-medium px-2 py-1 rounded-md">
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

        <div className="flex gap-2 mt-3">
          <Button size="sm" variant="outline" className="flex-1 text-xs" onClick={handleAddToCart}>
            <ShoppingCart className="h-3.5 w-3.5 mr-1" /> Add to Cart
          </Button>
          <a
            href={`https://wa.me/919985850777?text=${encodeURIComponent(`Hi! I'm interested in ${product.name} (₹${product.price.selling}). Please share details.`)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="sm" className="bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90 text-xs">
              Order
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
