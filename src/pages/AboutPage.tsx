
import { lazy, Suspense } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import Loader from "@/components/Loader";

// Lazy load components for better performance
const AboutSection = lazy(() => import('@/components/AboutSection'));
const RoadmapSection = lazy(() => import('@/components/RoadmapSection'));

const AboutPage = () => {
  return (
    <div className="min-h-screen w-full">
      <Header />
      <main className="pt-20">
        <Suspense fallback={<Loader />}>
          <AboutSection />
        </Suspense>
        <Suspense fallback={<Loader />}>
          <RoadmapSection />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
