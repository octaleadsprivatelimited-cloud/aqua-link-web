import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ScrollToTop from "@/components/ScrollToTop";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/NotFound";
import AdminLayout from "./components/admin/AdminLayout";
import RequireAdminAuth from "./components/admin/RequireAdminAuth";
import AdminDashboard from "./pages/admin/Dashboard";
import ProductsList from "./pages/admin/ProductsList";
import ProductForm from "./pages/admin/ProductForm";
import OrdersPlaceholder from "./pages/admin/OrdersPlaceholder";
import CustomersPlaceholder from "./pages/admin/CustomersPlaceholder";
import SettingsPlaceholder from "./pages/admin/SettingsPlaceholder";
import AdminLogin from "./pages/admin/Login";
import BlogsManager from "./pages/admin/BlogsManager";
import HeroSettings from "./pages/admin/HeroSettings";
import StatsSettings from "./pages/admin/StatsSettings";
import SolutionsSettings from "./pages/admin/SolutionsSettings";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:slug" element={<ProductDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/faq" element={<FAQ />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<RequireAdminAuth />}>
              <Route element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="products" element={<ProductsList />} />
                <Route path="products/new" element={<ProductForm />} />
                <Route path="products/edit/:id" element={<ProductForm />} />
                <Route path="blogs" element={<BlogsManager />} />
                <Route path="orders" element={<OrdersPlaceholder />} />
                <Route path="customers" element={<CustomersPlaceholder />} />
                <Route path="settings" element={<SettingsPlaceholder />} />
                <Route path="settings/hero-images" element={<HeroSettings />} />
                <Route path="settings/stats" element={<StatsSettings />} />
                <Route path="settings/solutions" element={<SolutionsSettings />} />
              </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
