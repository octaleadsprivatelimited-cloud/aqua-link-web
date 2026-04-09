import { create } from "zustand";
import { persist } from "zustand/middleware";
import { products as defaultProducts, Product } from "@/data/products";

interface ProductStore {
  products: Product[];
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (id: string, data: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProductBySlug: (slug: string) => Product | undefined;
  getProductsByCategory: (cat: string) => Product[];
  getFeaturedProducts: () => Product[];
}

export const useProductStore = create<ProductStore>()(
  persist(
    (set, get) => ({
      products: defaultProducts,
      addProduct: (product) =>
        set((state) => ({
          products: [
            ...state.products,
            { ...product, id: Date.now().toString() },
          ],
        })),
      updateProduct: (id, data) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, ...data } : p
          ),
        })),
      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        })),
      getProductBySlug: (slug) => get().products.find((p) => p.slug === slug),
      getProductsByCategory: (cat) =>
        get().products.filter((p) => p.category === cat),
      getFeaturedProducts: () => get().products.slice(0, 4),
    }),
    { name: "aquasafe-products" }
  )
);
