
import { useEffect, useRef } from "react";
import Container from "./Container";
import SectionTitle from "./SectionTitle";
import { Card, CardContent } from "@/components/ui/card";

// Sample testimonial data
const TESTIMONIALS = [
  {
    id: 1,
    name: "Priya Sharma",
    company: "Elegance Boutique, Delhi",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
    content: "Omsilver's jewellerycollection has transformed our boutique offerings. Their craftsmanship is unparalleled and our customers immediately recognize the quality. The traditional designs with modern touches are exactly what our market demands.",
    rating: 5,
  },
  {
    id: 2,
    name: "Vikram Mehta",
    company: "Silver Haven, Mumbai",
    image: "https://randomuser.me/api/portraits/men/51.jpg",
    content: "Working with Omsilver has been a game-changer for our business. The designs connect with our clientele's appreciation for heritage craftsmanship. Their silver work maintains its luster beautifully, which keeps our customers coming back.",
    rating: 5,
  },
  {
    id: 3,
    name: "Anita Desai",
    company: "Royal Jewels, Jaipur",
    image: "https://randomuser.me/api/portraits/women/23.jpg",
    content: "I've been sourcing silver jewelleryfor over a decade, and Omsilver stands out for their consistency and attention to detail. Their pieces tell a story of tradition while appealing to contemporary tastes - a remarkable balance.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
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
    <section id="testimonials" className="py-24 bg-silver-light relative" ref={sectionRef}>
      {/* Decorative patterns */}
      {/* <div className="absolute top-0 right-0 w-1/4 h-1/4 bg-silver/20 rounded-bl-full"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gold/5 rounded-tr-full"></div> */}

      <Container>
        <SectionTitle
          title="Client Testimonials"
          subtitle="Hear from our valued partners about their experience with Omsilver's craftsmanship"
          centered
        />

        <div className="grid md:grid-cols-3 gap-8 relative z-10">
          {TESTIMONIALS.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="slide-in"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow border-0 shadow overflow-hidden">
                <CardContent className="p-0 h-full">
                  <div className="bg-gold/10 p-6">
                    <div className="flex items-center gap-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
                      />
                      <div>
                        <h4 className="font-medium font-playfair text-lg">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-5 h-5 ${
                            i < testimonial.rating ? "text-gold" : "text-silver/30"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <blockquote className="text-muted-foreground">
                      <span className="text-3xl text-gold font-serif leading-none">"</span>
                      <span className="italic">{testimonial.content}</span>
                      <span className="text-3xl text-gold font-serif leading-none">"</span>
                    </blockquote>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default TestimonialsSection;
