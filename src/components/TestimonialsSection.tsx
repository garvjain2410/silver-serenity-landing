
import { useEffect, useRef } from "react";
import Container from "./Container";
import SectionTitle from "./SectionTitle";
import { Card, CardContent } from "@/components/ui/card";

// Sample testimonial data
const TESTIMONIALS = [
  {
    id: 1,
    name: "Emma Johnson",
    company: "Elegance Boutique",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
    content: "SilverElite has transformed our jewelry selection. Their wholesale pieces offer exceptional quality that our customers immediately recognize and appreciate. The compliments we receive daily speak volumes about the craftsmanship.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    company: "Azure Accessories",
    image: "https://randomuser.me/api/portraits/men/51.jpg",
    content: "Working with SilverElite has been a game-changer for our business. The designs are unique, the quality is outstanding, and their customer service is beyond compare. Our silver collection has become our bestseller.",
    rating: 5,
  },
  {
    id: 3,
    name: "Sophia Martinez",
    company: "Luxe & Co.",
    image: "https://randomuser.me/api/portraits/women/23.jpg",
    content: "I've been sourcing wholesale jewelry for over a decade, and SilverElite stands out for their attention to detail and reliability. The pieces maintain their luster beautifully, which keeps our customers coming back for more.",
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
    <section id="testimonials" className="py-20 bg-silver-light" ref={sectionRef}>
      <Container>
        <SectionTitle
          title="Client Testimonials"
          subtitle="Hear from our valued wholesale partners about their experience with SilverElite"
          centered
        />

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="slide-in"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6 h-full flex flex-col">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-medium">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                      </div>
                    </div>
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-5 h-5 ${
                            i < testimonial.rating ? "text-yellow-400" : "text-gray-300"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <blockquote className="italic text-muted-foreground">
                      "{testimonial.content}"
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
