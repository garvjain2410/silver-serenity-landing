
import { lazy, Suspense } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import RoadmapSection from "@/components/RoadmapSection";

const AboutSection = lazy(() => import('@/components/AboutSection'));

const AboutPage = () => {
  return (
    <div className="min-h-screen w-full">
      <Header />
      <main className="pt-20">
        <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading...</div>}>
          <AboutSection />
        </Suspense>
        <RoadmapSection />
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
