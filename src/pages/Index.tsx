
import { lazy, Suspense, useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";

// Lazy load components
const AboutSection = lazy(() => import("@/components/AboutSection"));
const ProductsSection = lazy(() => import("@/components/ProductsSection"));

const Index = () => {
  useEffect(() => {
    // Intersection Observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".slide-in");
    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      elements.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, []);

  // Function to render a section with Suspense
  const renderSection = (Component: React.LazyExoticComponent<() => JSX.Element>) => (
    <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading section...</div>}>
      <Component />
    </Suspense>
  );

  return (
    <div className="min-h-screen w-full">
      <Header />
      <main>
        <Hero />
        {renderSection(AboutSection)}
        {renderSection(ProductsSection)}
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
};

export default Index;
