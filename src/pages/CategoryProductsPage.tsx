import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import SectionTitle from "@/components/SectionTitle";
import { useCart } from '@/contexts/CartContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { fetchProductsData, Product } from '@/data/productsData';
import { Helmet } from "react-helmet";

const CategoryProductsPage = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategoryProducts = async () => {
      try {
        const products = await fetchProductsData();
        const categoryProducts = products.filter(
          product => product.category.toLowerCase() === category?.toLowerCase()
        );
        if (categoryProducts.length > 0) {
          setFilteredProducts(categoryProducts);
        } else {
          toast.error("Category not found!");
          navigate('/products', { replace: true });
        }
      } catch (error) {
        console.error('Error fetching category products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCategoryProducts();
  }, [category, navigate]);

  // Handle add to cart
  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  // Create WhatsApp link
  const createWhatsAppLink = (product: Product) => {
    const message = encodeURIComponent(
      `Hello, I'm interested in ordering *${product.name}* (SKU: ${product.sku}). Please provide more information.`
    );
    return `https://wa.me/918291692365?text=${message}`;
  };
  
  // Get category display name with proper capitalization
  const categoryDisplayName = category ? category.charAt(0).toUpperCase() + category.slice(1) : '';

  // Helper function to get the primary image from a product
  const getPrimaryImage = (product: Product) => {
    return Array.isArray(product.image) ? product.image[0] : product.image;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen w-full">
      <Helmet>
        <title>{categoryDisplayName} Collection - Silver Serenity</title>
      </Helmet>
      <Header />
      <main className="pt-24 pb-16 bg-gradient-to-b from-white to-silver-light/30">
        <Container>
          <div className="flex items-center mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate('/products')}
              className="flex items-center gap-1 text-primary mr-4"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Collections
            </Button>
          </div>
          
          <SectionTitle
            title={`${categoryDisplayName} Collection`}
            subtitle={`Explore our premium silver ${categoryDisplayName.toLowerCase()} collection, handcrafted by skilled artisans`}
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden flex flex-col border-0 shadow-md hover:shadow-lg transition-all duration-300">
                <Link to={`/products/${product.id}`} className="relative h-60 overflow-hidden">
                  <img
                    src={getPrimaryImage(product)}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 bg-white/80 text-primary text-xs py-1 px-3 rounded-full">
                    {product.sku || 'SKU N/A'}
                  </div>
                </Link>
                <CardContent className="p-5 flex flex-col flex-grow">
                  <Link to={`/products/${product.id}`}>
                    <h3 className="font-playfair text-lg font-bold mb-2 hover:text-primary transition-colors">{product.name}</h3>
                  </Link>
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{product.seoDescription || product.description}</p>
                  <div className="text-xs text-muted-foreground mb-4">
                    <span className="inline-block mr-4">Min: {product.minOrder}</span>
                    <span className="inline-block">{product.purity || '92.5% Silver'}</span>
                  </div>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-silver/20">
                    <span className="font-medium text-lg">₹{product.price.toLocaleString()}</span>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleAddToCart(product)}
                        className="flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" />
                        Add
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="border-primary text-primary hover:bg-primary hover:text-white"
                      >
                        <a 
                          href={createWhatsAppLink(product)} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-1"
                        >
                          <ExternalLink className="w-3 h-3" />
                          Order
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryProductsPage;
