
import { useEffect, useRef } from "react";
import Container from "./Container";
import SectionTitle from "./SectionTitle";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Sample product data
const PRODUCTS = [
  {
    id: 1,
    name: "Elegant Silver Necklace",
    image: "https://images.unsplash.com/photo-1635767798638-3665968aa33a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
    category: "Necklaces",
    price: "$22.50",
    minOrder: "25 units"
  },
  {
    id: 2,
    name: "Silver Drop Earrings",
    image: "https://images.unsplash.com/photo-1675881149220-d93fff208f60?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
    category: "Earrings",
    price: "$15.75",
    minOrder: "30 units"
  },
  {
    id: 3,
    name: "Sterling Silver Bracelet",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    category: "Bracelets",
    price: "$19.99",
    minOrder: "20 units"
  },
  {
    id: 4,
    name: "Silver Statement Ring",
    image: "https://images.unsplash.com/photo-1603974372039-adc49044b6bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    category: "Rings",
    price: "$12.25",
    minOrder: "40 units"
  },
];

const ProductsSection = () => {
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
    <section id="products" className="py-20" ref={sectionRef}>
      <Container>
        <SectionTitle
          title="Featured Products"
          subtitle="Explore our curated collection of premium wholesale silver jewelry pieces"
          centered
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map((product, index) => (
            <div
              key={product.id}
              className="slide-in"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute top-2 right-2 z-10 bg-silver-dark/80 text-white text-xs py-1 px-2 rounded">
                    {product.category}
                  </div>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover-shine transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <CardContent className="p-4 flex flex-col flex-grow">
                  <h3 className="font-playfair text-lg font-medium mb-2">{product.name}</h3>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-medium text-silver-dark">{product.price}</span>
                    <span className="text-xs text-muted-foreground">Min: {product.minOrder}</span>
                  </div>
                  <Button
                    variant="outline"
                    className="mt-auto border-silver hover:bg-silver/10"
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        <div className="text-center mt-10 slide-in" style={{ transitionDelay: "500ms" }}>
          <Button className="bg-silver-dark hover:bg-silver-dark/90 text-white">
            View Full Catalog
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default ProductsSection;
