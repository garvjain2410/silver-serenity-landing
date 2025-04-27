
import { useState } from "react";
import Container from "./Container";
import SectionTitle from "./SectionTitle";
import TimelineCard from "./TimelineCard";
import { Milestone } from "lucide-react";

const generations = [
  {
    id: 1,
    title: "First Generation",
    year: "1985-2000",
    description: "Founded by Mr. Om Prakash, establishing the foundation of traditional silver craftsmanship with dedication to quality and authenticity. This era was marked by creating classic designs that stood the test of time."
  },
  {
    id: 2,
    title: "Second Generation",
    year: "2000-2015",
    description: "Led by Rajesh Kumar, modernizing production processes while maintaining artisanal quality, expanding into international markets. The business grew from a local Mumbai workshop to a recognized brand across India."
  },
  {
    id: 3,
    title: "Third Generation",
    year: "2015-Present",
    description: "Under Amit Kumar's leadership, embracing digital transformation and sustainable practices while honoring our heritage. The family tradition continues with innovative designs that respect traditional silversmithing techniques."
  }
];

const RoadmapSection = () => {
  const [activeGeneration, setActiveGeneration] = useState(3);

  return (
    <section id="history" className="py-24 bg-charcoal text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-silver/5 rounded-full translate-y-1/2 -translate-x-1/3"></div>
      
      <Container>
        <SectionTitle
          title="Our Heritage"
          subtitle="A legacy of excellence spanning three generations of silver artisans"
          centered
          className="text-white"
        />
        
        <div className="relative mt-16 mb-8 flex justify-center">
          <div className="hidden md:flex items-center justify-between w-full max-w-2xl mx-auto mb-8">
            {generations.map((gen) => (
              <div 
                key={gen.id} 
                className={`relative cursor-pointer transition-all duration-300 flex flex-col items-center ${activeGeneration === gen.id ? "scale-110" : "opacity-70 hover:opacity-100"}`}
                onClick={() => setActiveGeneration(gen.id)}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 transition-colors ${
                  activeGeneration === gen.id ? "bg-gold text-charcoal" : "bg-silver/20 text-white hover:bg-silver/30"
                }`}>
                  <span className="font-playfair font-bold text-xl">{gen.id}</span>
                </div>
                <p className="text-sm font-medium">{gen.year}</p>
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                  {activeGeneration === gen.id && (
                    <div className="w-2 h-2 rounded-full bg-gold"></div>
                  )}
                </div>
              </div>
            ))}
            <div className="absolute top-8 left-0 w-full h-0.5 bg-silver/20"></div>
          </div>
        </div>
        
        <div className="mt-12 space-y-8">
          {generations.map((gen) => (
            <TimelineCard
              key={gen.id}
              title={gen.title}
              year={gen.year}
              description={gen.description}
              isActive={activeGeneration === gen.id}
              className={`slide-in cursor-pointer max-w-3xl mx-auto ${
                activeGeneration === gen.id ? "visible" : ""
              }`}
              onClick={() => setActiveGeneration(gen.id)}
            />
          ))}
        </div>
        
        <div className="mt-20 flex justify-center">
          <div className="flex flex-col items-center slide-in">
            <Milestone className="w-10 h-10 text-gold mb-4" />
            <p className="text-center max-w-lg text-silver">
              Our journey continues as we blend age-old techniques with modern innovation, 
              creating timeless pieces that carry the soul of our heritage and the promise of our future.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default RoadmapSection;
