
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
    <section id="about" className="py-20 bg-silver-light" ref={sectionRef}>
      <Container>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <SectionTitle
              title="About SilverElite"
              subtitle="Premium Wholesale Silver Jewelry Since 2005"
            />
            <div className="slide-in">
              <p className="mb-6 text-lg">
                SilverElite is a distinguished wholesale supplier of premium silver jewelry, dedicated to providing retailers with exceptional craftsmanship and timeless designs that captivate customers.
              </p>
            </div>
            <div className="slide-in" style={{ transitionDelay: "200ms" }}>
              <p className="mb-6 text-lg">
                Our artisans blend traditional techniques with contemporary innovation to create pieces that stand apart in quality and aesthetic appeal.
              </p>
            </div>
            <div className="slide-in" style={{ transitionDelay: "400ms" }}>
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="text-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-playfair font-bold text-3xl text-silver-dark mb-2">17+</h3>
                  <p className="text-sm text-muted-foreground">Years of Excellence</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-playfair font-bold text-3xl text-silver-dark mb-2">500+</h3>
                  <p className="text-sm text-muted-foreground">Global Partners</p>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2 relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-jewel-blue rounded-full opacity-50 -z-10"></div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-jewel-purple rounded-full opacity-50 -z-10"></div>
            <div className="slide-in h-full">
              <div className="relative h-96 w-full">
                <img
                  src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
                  alt="Silver jewelry craftsmanship"
                  className="rounded-lg object-cover w-full h-full hover-shine"
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
