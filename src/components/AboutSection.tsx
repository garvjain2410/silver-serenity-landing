
import { useEffect, useRef } from "react";
import Container from "./Container";
import SectionTitle from "./SectionTitle";

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

    const elements = sectionRef.current?.querySelectorAll(".slide-in");
    elements?.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      elements?.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, []);

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-white to-silver-light" ref={sectionRef}>
      <Container>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <SectionTitle
              title="About Omsilver"
              subtitle="Premium Sterling Silver Jewelry Since 1985"
            />
            <div className="slide-in">
              <p className="mb-6 text-lg">
                Omsilver is a distinguished silversmith dynasty from Mumbai, dedicated to preserving the ancient art of silver jewelry craftsmanship while embracing innovation across three generations.
              </p>
            </div>
            <div className="slide-in" style={{ transitionDelay: "200ms" }}>
              <p className="mb-6 text-lg">
                Founded by Mr. Om Prakash in 1985, our artisans blend traditional techniques with contemporary design to create pieces that stand apart in quality and aesthetic appeal.
              </p>
            </div>
            <div className="slide-in" style={{ transitionDelay: "400ms" }}>
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="text-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-playfair font-bold text-3xl text-gold mb-2">35+</h3>
                  <p className="text-sm text-muted-foreground">Years of Excellence</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-playfair font-bold text-3xl text-gold mb-2">3</h3>
                  <p className="text-sm text-muted-foreground">Generations of Craftsmanship</p>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2 relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-gold/20 rounded-full opacity-50 -z-10"></div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-silver rounded-full opacity-20 -z-10"></div>
            <div className="slide-in h-full">
              <div className="relative h-96 w-full">
                <img
                  src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
                  alt="Silver jewelry craftsmanship at Omsilver"
                  className="rounded-lg object-cover w-full h-full hover-shine shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AboutSection;
