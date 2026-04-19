import { useState, useMemo, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useProductStore } from "@/stores/productStore";
import { categories } from "@/data/categories";
import ProductCard from "@/components/products/ProductCard";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import bgHero from "@/assets/bg-hero-dark.jpg";

export default function Products() {
  const products = useProductStore((s) => s.products);
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const [search, setSearch] = useState(initialSearch);
  const [showFilters, setShowFilters] = useState(false);
  const activeCategory = searchParams.get("category") || "";
  const [sort, setSort] = useState("popular");

  useEffect(() => {
    const urlSearch = searchParams.get("search") || "";
    if (urlSearch !== search) setSearch(urlSearch);
  }, [searchParams, search]);

  const filtered = useMemo(() => {
    let result = products.filter((p) => p.stock !== "out_of_stock");
    if (activeCategory) result = result.filter((p) => p.category === activeCategory);
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    if (sort === "price-low") result.sort((a, b) => a.price.selling - b.price.selling);
    else if (sort === "price-high") result.sort((a, b) => b.price.selling - a.price.selling);
    else if (sort === "rating") result.sort((a, b) => b.rating - a.rating);
    return result;
  }, [activeCategory, search, sort, products]);

  const setCategory = (slug: string) => {
    if (slug) setSearchParams({ category: slug });
    else setSearchParams({});
  };

  return (
    <Layout>
      <SEO title="Products" description="Explore our range of premium water purifiers, commercial RO plants, UV filters, and accessories." />
      <div className="relative text-primary-foreground py-10 md:py-14 overflow-hidden">
        <img src={bgHero} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-navy/80" />
        <div className="container relative z-10">
          <nav className="text-sm mb-4 opacity-70">
            <Link to="/" className="hover:opacity-100">Home</Link> / <span>Products</span>
          </nav>
          <h1 className="font-heading font-bold text-3xl md:text-4xl">Our Products</h1>
          <p className="mt-2 opacity-80">Premium water purification solutions for every need</p>
        </div>
      </div>

      <div className="container py-8 md:py-12">
        {/* Search & Sort bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="h-10 rounded-md border bg-background px-3 text-sm"
          >
            <option value="popular">Most Popular</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
          <Button variant="outline" className="sm:hidden" onClick={() => setShowFilters(!showFilters)}>
            <SlidersHorizontal className="h-4 w-4 mr-2" /> Filters
          </Button>
        </div>

        <div className="flex gap-8">
          {/* Sidebar filters */}
          <aside className={`${showFilters ? "block" : "hidden"} sm:block w-full sm:w-56 shrink-0`}>
            <div className="sticky top-24 space-y-4">
              <div>
                <h3 className="font-heading font-semibold text-sm mb-3 text-foreground">Categories</h3>
                <div className="space-y-1">
                  <button
                    onClick={() => setCategory("")}
                    className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${!activeCategory ? "bg-primary text-primary-foreground" : "hover:bg-secondary text-foreground"}`}
                  >
                    All Products
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setCategory(cat.slug)}
                      className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${activeCategory === cat.slug ? "bg-primary text-primary-foreground" : "hover:bg-secondary text-foreground"}`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
              {activeCategory && (
                <Button variant="ghost" size="sm" onClick={() => setCategory("")} className="text-xs">
                  <X className="h-3 w-3 mr-1" /> Clear Filter
                </Button>
              )}
            </div>
          </aside>

          {/* Product grid */}
          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-4">{filtered.length} products found</p>
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">No products found</p>
                <Button variant="outline" className="mt-4" onClick={() => { setSearch(""); setCategory(""); }}>
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
