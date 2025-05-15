
import { lazy, Suspense } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ContactSection = lazy(() => import('@/components/ContactSection'));

const ContactPage = () => {
  return (
    <div className="min-h-screen w-full">
      <Header />
      <main className="pt-20">
        <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading...</div>}>
          <ContactSection />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
