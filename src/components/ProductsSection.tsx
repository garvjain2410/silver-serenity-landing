
import { useEffect, useRef } from "react";
import Container from "./Container";
import SectionTitle from "./SectionTitle";
import { Card, CardContent } from "@/components/ui/card";

// Sample product data with silver jewelleryitems
const PRODUCTS = [
  {
    id: 1,
    name: "Traditional Silver Murtis",
    image: "https://i.postimg.cc/8cjtjjq8/murti.png",
    category: "Murti",
    description: "Intricately designed traditional necklace featuring handcrafted patterns",
    minOrder: "20 units"
  },
  {
    id: 2,
    name: "Silver Payal",
    image: "https://i.postimg.cc/G2ZqTcrH/payal.png",
    category: "Payal",
    description: "Elegant drop earrings that add sophistication to any outfit",
    minOrder: "30 units"
  },
  {
    id: 3,
    name: "Sterling Silver Bracelet",
    image: "https://i.postimg.cc/Ls8yrCN6/IMG-0937.png",
    category: "Bracelets",
    description: "Fine sterling silver bracelet with timeless design",
    minOrder: "15 units"
  },
  {
    id: 4,
    name: "Silver Statement Ring",
    image: "https://img.freepik.com/premium-photo/silver-ring-black-background-macro-picture_10069-97.jpg",
    category: "Rings",
    description: "Bold statement ring perfect for special occasions",
    minOrder: "25 units"
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
    <section id="products" className="py-24 bg-white relative" ref={sectionRef}>
      {/* Decorative elements */}
      {/* <div className="absolute top-0 left-0 w-64 h-64 bg-silver-light rounded-full opacity-50 -translate-y-1/2 -translate-x-1/2"></div> */}
      
      <Container>
        <SectionTitle
          title="Featured Collections"
          subtitle="Explore our curated collection of premium silver jewellerypieces, handcrafted by our artisans"
          centered
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PRODUCTS.map((product, index) => (
            <div
              key={product.id}
              className="slide-in"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <Card className="overflow-hidden group h-full flex flex-col border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                <div className="relative h-72 overflow-hidden">
                  <div className="absolute top-3 right-3 z-10 bg-silver-dark/90 text-white text-xs py-1 px-3 rounded-full">
                    {product.category}
                  </div>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 text-white w-full">
                      <p className="text-sm truncate mb-1">{product.description}</p>
                      <span className="text-xs font-medium bg-gold text-charcoal px-2 py-1 rounded-full">
                        Min: {product.minOrder}
                      </span>
                    </div>
                  </div>
                </div>
                <CardContent className="p-5 flex flex-col flex-grow">
                  <h3 className="font-playfair text-lg font-bold mb-2">{product.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                  <div className="mt-4 pt-3 border-t border-silver/20 flex justify-between items-center">
                    <span className="text-xs text-silver-dark">Minimum: {product.minOrder}</span>
                    <a 
                      href="#contact" 
                      className="text-sm text-gold hover:text-gold/80 font-medium flex items-center gap-1 transition-colors"
                    >
                      Inquire
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 7l5 5 5-5"/>
                        <path d="M7 13l5 5 5-5"/>
                      </svg>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 font-medium rounded-md border-2 border-gold text-gold hover:bg-gold hover:text-charcoal transition-all duration-300"
          >
            Request Full Catalog
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"/>
              <path d="M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </Container>
    </section>
  );
};

export default ProductsSection;
