import React, { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster"; // Ensure this path matches the actual file structure
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoadingProvider } from "./contexts/LoadingContext";
import { CartProvider } from "./contexts/CartContext";
import Loader from "./components/Loader";

// Lazy load pages with error boundaries
const Index = lazy(() => import("./pages/Index"));
const ProductsPage = lazy(() => 
  import("./pages/ProductsPage")
    .catch(error => {
      console.error("Failed to load ProductsPage:", error);
      return { default: () => <div>Error loading page</div> };
    })
);
const CategoryProductsPage = lazy(() => 
  import("./pages/CategoryProductsPage")
    .catch(error => {
      console.error("Failed to load CategoryProductsPage:", error);
      return { default: () => <div>Error loading page</div> };
    })
);
const ProductDetailPage = lazy(() => 
  import("./pages/ProductDetailPage")
    .catch(error => {
      console.error("Failed to load ProductDetailPage:", error);
      return { default: () => <div>Error loading page</div> };
    })
);
const TestimonialsPage = lazy(() => import("./pages/TestimonialsPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const BlogIndex = lazy(() => import("./pages/BlogIndex"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Make sure .env variables are available
// Check if we have the WhatsApp number available
if (!import.meta.env.VITE_WHATSAPP_NUMBER && import.meta.env.DEV) {
  console.warn('VITE_WHATSAPP_NUMBER is not defined in .env file. Using default number.');
}

// Create query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

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
                <Route path="/products/:productId" element={<ProductDetailPage />} />
                <Route path="/testimonials" element={<TestimonialsPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/blog" element={<BlogIndex />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
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
