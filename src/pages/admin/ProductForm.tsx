import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Plus, X, Save } from "lucide-react";
import { useProductStore } from "@/stores/productStore";
import { categories } from "@/data/categories";
import { Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const emptyProduct = {
  name: "",
  slug: "",
  sku: "",
  category: "ro-purifiers",
  description: "",
  features: [""],
  specifications: {} as Record<string, string>,
  price: { selling: 0, original: 0, discount: 0 },
  images: ["/placeholder.svg"],
  stock: "in_stock" as const,
  warranty: "1 Year Comprehensive",
  rating: 0,
  reviewCount: 0,
};

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addProduct, updateProduct } = useProductStore();
  const { toast } = useToast();
  const isEdit = Boolean(id);

  const [form, setForm] = useState(emptyProduct);
  const [specKey, setSpecKey] = useState("");
  const [specValue, setSpecValue] = useState("");

  useEffect(() => {
    if (isEdit && id) {
      const product = products.find((p) => p.id === id);
      if (product) {
        setForm({
          name: product.name,
          slug: product.slug,
          sku: product.sku,
          category: product.category,
          description: product.description,
          features: product.features.length > 0 ? product.features : [""],
          specifications: { ...product.specifications },
          price: { ...product.price },
          images: [...product.images],
          stock: product.stock,
          warranty: product.warranty,
          rating: product.rating,
          reviewCount: product.reviewCount,
        });
      }
    }
  }, [isEdit, id, products]);

  const generateSlug = (name: string) =>
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const handleNameChange = (name: string) => {
    setForm((f) => ({ ...f, name, slug: generateSlug(name) }));
  };

  const handlePriceChange = (field: "selling" | "original", value: number) => {
    setForm((f) => {
      const price = { ...f.price, [field]: value };
      if (price.original > 0 && price.selling > 0) {
        price.discount = Math.round(((price.original - price.selling) / price.original) * 100);
      }
      return { ...f, price };
    });
  };

  const handleFeatureChange = (index: number, value: string) => {
    setForm((f) => {
      const features = [...f.features];
      features[index] = value;
      return { ...f, features };
    });
  };

  const addFeature = () => setForm((f) => ({ ...f, features: [...f.features, ""] }));
  const removeFeature = (index: number) =>
    setForm((f) => ({ ...f, features: f.features.filter((_, i) => i !== index) }));

  const addSpec = () => {
    if (specKey.trim() && specValue.trim()) {
      setForm((f) => ({
        ...f,
        specifications: { ...f.specifications, [specKey.trim()]: specValue.trim() },
      }));
      setSpecKey("");
      setSpecValue("");
    }
  };

  const removeSpec = (key: string) => {
    setForm((f) => {
      const specifications = { ...f.specifications };
      delete specifications[key];
      return { ...f, specifications };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !form.sku.trim()) {
      toast({ title: "Error", description: "Name and SKU are required.", variant: "destructive" });
      return;
    }

    const cleanFeatures = form.features.filter((f) => f.trim());
    const productData = { ...form, features: cleanFeatures };

    if (isEdit && id) {
      updateProduct(id, productData);
      toast({ title: "Product updated", description: `"${form.name}" has been updated.` });
    } else {
      addProduct(productData);
      toast({ title: "Product added", description: `"${form.name}" has been created.` });
    }

    navigate("/admin/products");
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h2 className="font-heading font-bold text-2xl text-foreground">
            {isEdit ? "Edit Product" : "Add New Product"}
          </h2>
          <p className="text-sm text-muted-foreground">
            {isEdit ? "Update product information" : "Fill in the details to add a new product"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g. Aqua Safe RO Purifier"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sku">SKU *</Label>
                <Input
                  id="sku"
                  value={form.sku}
                  onChange={(e) => setForm((f) => ({ ...f, sku: e.target.value }))}
                  placeholder="e.g. ASW-RO-009"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="slug">URL Slug</Label>
                <Input
                  id="slug"
                  value={form.slug}
                  onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                  placeholder="auto-generated-from-name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  value={form.category}
                  onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                  className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.slug}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                placeholder="Product description..."
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Pricing */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Pricing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="selling">Selling Price (₹) *</Label>
                <Input
                  id="selling"
                  type="number"
                  min={0}
                  value={form.price.selling || ""}
                  onChange={(e) => handlePriceChange("selling", Number(e.target.value))}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="original">Original Price (₹)</Label>
                <Input
                  id="original"
                  type="number"
                  min={0}
                  value={form.price.original || ""}
                  onChange={(e) => handlePriceChange("original", Number(e.target.value))}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label>Discount</Label>
                <div className="h-10 flex items-center px-3 bg-surface rounded-md text-sm text-foreground font-semibold">
                  {form.price.discount}%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stock & Warranty */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Stock & Warranty</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="stock">Stock Status</Label>
                <select
                  id="stock"
                  value={form.stock}
                  onChange={(e) => setForm((f) => ({ ...f, stock: e.target.value as Product["stock"] }))}
                  className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                >
                  <option value="in_stock">In Stock</option>
                  <option value="low_stock">Low Stock</option>
                  <option value="out_of_stock">Out of Stock</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="warranty">Warranty</Label>
                <Input
                  id="warranty"
                  value={form.warranty}
                  onChange={(e) => setForm((f) => ({ ...f, warranty: e.target.value }))}
                  placeholder="e.g. 1 Year Comprehensive"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center justify-between">
              Features
              <Button type="button" variant="outline" size="sm" onClick={addFeature}>
                <Plus className="h-3 w-3 mr-1" /> Add
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {form.features.map((feature, i) => (
              <div key={i} className="flex gap-2">
                <Input
                  value={feature}
                  onChange={(e) => handleFeatureChange(i, e.target.value)}
                  placeholder={`Feature ${i + 1}`}
                />
                {form.features.length > 1 && (
                  <Button type="button" variant="ghost" size="icon" onClick={() => removeFeature(i)}>
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Specifications */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Specifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={specKey}
                onChange={(e) => setSpecKey(e.target.value)}
                placeholder="Specification name"
                className="flex-1"
              />
              <Input
                value={specValue}
                onChange={(e) => setSpecValue(e.target.value)}
                placeholder="Value"
                className="flex-1"
              />
              <Button type="button" variant="outline" onClick={addSpec}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {Object.entries(form.specifications).length > 0 && (
              <div className="border rounded-lg overflow-hidden">
                {Object.entries(form.specifications).map(([key, value], i) => (
                  <div key={key} className={`flex items-center text-sm ${i % 2 === 0 ? "bg-surface" : "bg-card"}`}>
                    <span className="w-2/5 px-4 py-2.5 font-medium text-foreground">{key}</span>
                    <span className="flex-1 px-4 py-2.5 text-muted-foreground">{value}</span>
                    <button
                      type="button"
                      onClick={() => removeSpec(key)}
                      className="px-3 text-destructive hover:text-destructive/80"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Image URL */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Product Image</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input
              id="imageUrl"
              value={form.images[0]}
              onChange={(e) => setForm((f) => ({ ...f, images: [e.target.value] }))}
              placeholder="https://example.com/image.jpg or /placeholder.svg"
            />
            {form.images[0] && (
              <div className="h-32 w-32 bg-surface rounded-lg overflow-hidden mt-2">
                <img src={form.images[0]} alt="Preview" className="h-full w-full object-cover" />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex gap-3 sticky bottom-4 bg-card/95 backdrop-blur-sm p-4 rounded-lg border">
          <Button type="submit" size="lg" className="flex-1 sm:flex-none">
            <Save className="h-4 w-4 mr-2" /> {isEdit ? "Update Product" : "Add Product"}
          </Button>
          <Button type="button" variant="outline" size="lg" onClick={() => navigate("/admin/products")}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
