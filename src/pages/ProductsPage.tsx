
import { lazy, Suspense } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ProductsSection = lazy(() => import('@/components/ProductsSection'));

const ProductsPage = () => {
  return (
    <div className="min-h-screen w-full">
      <Header />
      <main className="pt-20">
        <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading...</div>}>
          <ProductsSection />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default ProductsPage;
