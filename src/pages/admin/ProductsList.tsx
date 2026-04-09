import { useState } from "react";
import { Link } from "react-router-dom";
import { PlusCircle, Pencil, Trash2, Search } from "lucide-react";
import { useProductStore } from "@/stores/productStore";
import { categories } from "@/data/categories";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

export default function ProductsList() {
  const { products, deleteProduct } = useProductStore();
  const [search, setSearch] = useState("");
  const { toast } = useToast();

  const filtered = search
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.sku.toLowerCase().includes(search.toLowerCase())
      )
    : products;

  const getCategoryName = (slug: string) =>
    categories.find((c) => c.slug === slug)?.name || slug;

  const handleDelete = (id: string, name: string) => {
    deleteProduct(id);
    toast({ title: "Product deleted", description: `"${name}" has been removed.` });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className="font-heading font-bold text-2xl text-foreground">Products</h2>
          <p className="text-sm text-muted-foreground">{products.length} total products</p>
        </div>
        <Link to="/admin/products/new">
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" /> Add Product
          </Button>
        </Link>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name or SKU..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="bg-card rounded-lg border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead className="hidden md:table-cell">SKU</TableHead>
              <TableHead className="hidden sm:table-cell">Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="hidden sm:table-cell">Stock</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-surface rounded overflow-hidden shrink-0">
                      <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" />
                    </div>
                    <span className="font-medium text-sm text-foreground line-clamp-1">{product.name}</span>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{product.sku}</TableCell>
                <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">{getCategoryName(product.category)}</TableCell>
                <TableCell className="text-sm font-medium text-foreground">₹{product.price.selling.toLocaleString("en-IN")}</TableCell>
                <TableCell className="hidden sm:table-cell">
                  <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                    product.stock === "in_stock" ? "bg-whatsapp/10 text-whatsapp" : product.stock === "low_stock" ? "bg-accent/10 text-accent" : "bg-destructive/10 text-destructive"
                  }`}>
                    {product.stock === "in_stock" ? "In Stock" : product.stock === "low_stock" ? "Low Stock" : "Out of Stock"}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Link to={`/admin/products/edit/${product.id}`}>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </Link>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Product</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{product.name}"? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(product.id, product.name)}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No products found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
