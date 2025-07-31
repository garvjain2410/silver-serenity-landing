import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "./Container";
import SectionTitle from "./SectionTitle";
import { fetchProductsData } from "@/data/productsData";

const ProductsSection = () => {
  const [categories, setCategories] = useState<{ name: string; image: string; productCount: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const products = await fetchProductsData();
        const uniqueCategories = Array.from(new Set(products.map(product => product.category)))
          .map(category => {
            const categoryProducts = products.filter(p => p.category === category);
            const productImage = categoryProducts[0].image;
            const primaryImage = Array.isArray(productImage) ? productImage[0] : productImage;

            return {
              name: category,
              image: primaryImage,
              productCount: categoryProducts.length,
            };
          })
          .slice(0, 4); // Limit to 4 categories
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section id="products" className="py-24 bg-white">
      <Container>
        <SectionTitle
          title="Featured Collections"
          subtitle="Explore our curated collection of premium silver jewelry pieces, handcrafted by our artisans"
          centered
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/products/category/${category.name.toLowerCase()}`}
              className="block group"
            >
              <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/50 flex items-end p-4">
                  <div className="text-white">
                    <h3 className="text-lg font-bold">{category.name}</h3>
                    <p className="text-sm">{category.productCount} products</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-16">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-6 py-3 font-medium rounded-md border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
          >
            View All Collections
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default ProductsSection;
