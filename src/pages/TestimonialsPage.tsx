
import { lazy, Suspense } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TestimonialsSection = lazy(() => import('@/components/TestimonialsSection'));

const TestimonialsPage = () => {
  return (
    <div className="min-h-screen w-full">
      <Header />
      <main className="pt-20">
        <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading...</div>}>
          <TestimonialsSection />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default TestimonialsPage;
