import { Link } from "react-router-dom";
import { Package, ShoppingCart, Users, TrendingUp, PlusCircle } from "lucide-react";
import { useProductStore } from "@/stores/productStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDashboard() {
  const products = useProductStore((s) => s.products);
  const inStock = products.filter((p) => p.stock === "in_stock").length;
  const lowStock = products.filter((p) => p.stock === "low_stock").length;

  const stats = [
    { icon: Package, label: "Total Products", value: products.length, color: "text-primary" },
    { icon: TrendingUp, label: "In Stock", value: inStock, color: "text-whatsapp" },
    { icon: ShoppingCart, label: "Low Stock", value: lowStock, color: "text-accent" },
    { icon: Users, label: "Categories", value: 6, color: "text-primary" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading font-bold text-2xl text-foreground">Dashboard</h2>
          <p className="text-sm text-muted-foreground">Welcome back, Admin</p>
        </div>
        <Link to="/admin/products/new">
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" /> Add Product
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-surface ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className="font-heading font-bold text-xl text-foreground">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Products */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {products.slice(0, 5).map((product) => (
              <div key={product.id} className="flex items-center justify-between py-2 border-b last:border-0">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-surface rounded overflow-hidden">
                    <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{product.name}</p>
                    <p className="text-xs text-muted-foreground">SKU: {product.sku}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground">₹{product.price.selling.toLocaleString("en-IN")}</p>
                  <span className={`text-xs px-2 py-0.5 rounded ${product.stock === "in_stock" ? "bg-whatsapp/10 text-whatsapp" : "bg-accent/10 text-accent"}`}>
                    {product.stock === "in_stock" ? "In Stock" : "Low Stock"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
