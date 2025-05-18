
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
  const uniqueCategories = Array.from(
    new Set(productsData.map(product => product.category))
  ).map(category => {
    const categoryProducts = productsData.filter(p => p.category === category);
    // Extract the primary image, handling both string and array types
    const productImage = categoryProducts[0].image;
    const primaryImage = Array.isArray(productImage) ? productImage[0] : productImage;
    
    return {
      name: category,
      image: primaryImage, // Now this is guaranteed to be a string
      productCount: categoryProducts.length
    };
  }).slice(0, 4);

  return (
    <section id="products" className="py-24 bg-white relative" ref={sectionRef}>
      <Container>
        <SectionTitle
          title="Featured Collections"
          subtitle="Explore our curated collection of premium silver jewelry pieces, handcrafted by our artisans"
          centered
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {uniqueCategories.map((category, index) => (
            <div
              key={category.name}
              className="slide-in"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <Link to={`/products/category/${category.name.toLowerCase()}`} className="block h-full">
                <Card className="overflow-hidden group h-full flex flex-col border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                  <div className="relative h-60 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 flex items-end">
                      <div className="p-4 text-white w-full">
                        <h3 className="text-xl font-playfair font-bold">{category.name}</h3>
                        <p className="text-sm text-silver-light mt-1">{category.productCount} products</p>
                      </div>
                    </div>
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <CardContent className="p-5 flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">View Collection</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <path d="M5 12h14"/>
                      <path d="M12 5l7 7-7 7"/>
                    </svg>
                  </CardContent>
                </Card>
              </Link>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-6 py-3 font-medium rounded-md border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
          >
            View All Collections
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
