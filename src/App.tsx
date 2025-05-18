
import React, { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoadingProvider } from "./contexts/LoadingContext";
import { CartProvider } from "./contexts/CartContext";
import Loader from "./components/Loader";

// Lazy load pages
const Index = lazy(() => import("./pages/Index"));
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const CategoryProductsPage = lazy(() => import("./pages/CategoryProductsPage"));
const TestimonialsPage = lazy(() => import("./pages/TestimonialsPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const BlogIndex = lazy(() => import("./pages/BlogIndex"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <LoadingProvider>
          <CartProvider>
            <Suspense fallback={<Loader />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/category/:category" element={<CategoryProductsPage />} />
                <Route path="/testimonials" element={<TestimonialsPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/blog" element={<BlogIndex />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            <Toaster />
            <Sonner />
          </CartProvider>
        </LoadingProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
