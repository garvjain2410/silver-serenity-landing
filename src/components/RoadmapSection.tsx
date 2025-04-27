
import { useState } from "react";
import Container from "./Container";
import SectionTitle from "./SectionTitle";
import TimelineCard from "./TimelineCard";

const generations = [
  {
    id: 1,
    title: "First Generation",
    year: "1985-2000",
    description: "Founded by Mr. Om Prakash, establishing the foundation of traditional silver craftsmanship with dedication to quality and authenticity."
  },
  {
    id: 2,
    title: "Second Generation",
    year: "2000-2015",
    description: "Led by Rajesh Kumar, modernizing production processes while maintaining artisanal quality, expanding into international markets."
  },
  {
    id: 3,
    title: "Third Generation",
    year: "2015-Present",
    description: "Under Amit Kumar's leadership, embracing digital transformation and sustainable practices while honoring our heritage."
  }
];

const RoadmapSection = () => {
  const [activeGeneration, setActiveGeneration] = useState(1);

  return (
    <section id="history" className="py-20 bg-background">
      <Container>
        <SectionTitle
          title="Our Heritage"
          subtitle="A legacy of excellence spanning three generations"
          centered
        />
        <div className="mt-12 space-y-8">
          {generations.map((gen) => (
            <TimelineCard
              key={gen.id}
              title={gen.title}
              year={gen.year}
              description={gen.description}
              isActive={activeGeneration === gen.id}
              className="slide-in cursor-pointer"
              onClick={() => setActiveGeneration(gen.id)}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default RoadmapSection;
