
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Container from "./Container";
import SectionTitle from "./SectionTitle";
import { Card, CardContent } from "@/components/ui/card";
import { productsData } from "@/data/productsData";

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

  // Get unique categories for showcase
  const featuredProducts = productsData.slice(0, 4);

  return (
    <section id="products" className="py-24 bg-white relative" ref={sectionRef}>
      <Container>
        <SectionTitle
          title="Featured Collections"
          subtitle="Explore our curated collection of premium silver jewelry pieces, handcrafted by our artisans"
          centered
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product, index) => (
            <div
              key={product.id}
              className="slide-in"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <Link to={`/products/category/${product.category.toLowerCase()}`} className="block h-full">
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
                      <span 
                        className="text-sm text-gold hover:text-gold/80 font-medium flex items-center gap-1 transition-colors"
                      >
                        View More
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14"/>
                          <path d="M12 5l7 7-7 7"/>
                        </svg>
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-6 py-3 font-medium rounded-md border-2 border-gold text-gold hover:bg-gold hover:text-charcoal transition-all duration-300"
          >
            View Full Catalog
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"/>
              <path d="M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default ProductsSection;
