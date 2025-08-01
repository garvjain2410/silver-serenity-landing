import React, { useEffect, useState } from 'react';
import { fetchProductsData, Product } from '@/data/productsData';
import { Link } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import SectionTitle from "@/components/SectionTitle";
import { Card, CardContent } from '@/components/ui/card';
import { Helmet } from "react-helmet";

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProductsData();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const categories = Array.from(
    new Set(products.map(product => product.category))
  ).map(category => {
    const categoryProducts = products.filter(p => p.category === category);
    const productCount = categoryProducts.length;
    const firstProductImage = Array.isArray(categoryProducts[0].image)
      ? categoryProducts[0].image[0]
      : categoryProducts[0].image;

    return {
      name: category,
      productCount,
      image: firstProductImage,
    };
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen w-full">
      <Helmet>
        <title>Our Collections - Silver Serenity</title>
      </Helmet>
      <Header />
      <main className="pt-24 pb-16 bg-gradient-to-b from-white to-silver-light">
        <Container>
          <SectionTitle
            title="Our Collections"
            subtitle="Explore our premium silver jewelry collections crafted with precision and elegance"
            centered
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {categories.map((category) => (
              <Link 
                key={category.name}
                to={`/products/category/${category.name.toLowerCase()}`}
                className="block transform transition-all duration-300 hover:scale-105"
              >
                <Card className="overflow-hidden h-full border-0 shadow-lg hover:shadow-xl">
                  <div className="relative h-64 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 flex items-end">
                      <div className="p-6 text-white w-full">
                        <h3 className="text-2xl font-playfair font-bold">{category.name} Collection</h3>
                        <p className="text-silver-light mt-2">{category.productCount} products</p>
                      </div>
                    </div>
                    <img
                      src={category.image}
                      alt={`${category.name} Collection`}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                  </div>
                  <CardContent className="p-5 flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">View Collection</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <path d="M5 12h14"/>
                      <path d="M12 5l7 7-7 7"/>
                    </svg>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default ProductsPage;
