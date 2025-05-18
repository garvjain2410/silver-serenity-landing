
import { lazy, Suspense, useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import SectionTitle from "@/components/SectionTitle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { productsData, Product } from '@/data/productsData';
import { useCart } from '@/contexts/CartContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Plus } from 'lucide-react';
import { toast } from 'sonner';

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const categoryParam = searchParams.get('category');
  const { addToCart } = useCart();
  
  // Get unique categories
  const categories = ['All', ...Array.from(new Set(productsData.map(product => product.category)))];
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'All');

  // Filter products by category
  const filteredProducts = selectedCategory === 'All' 
    ? productsData 
    : productsData.filter(product => product.category === selectedCategory);

  // Update URL when category changes
  useEffect(() => {
    if (selectedCategory !== 'All') {
      navigate(`/products?category=${selectedCategory}`, { replace: true });
    } else {
      navigate('/products', { replace: true });
    }
  }, [selectedCategory, navigate]);

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  // Handle add to cart
  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen w-full">
      <Header />
      <main className="pt-24 pb-16">
        <Container>
          <SectionTitle
            title="Our Products"
            subtitle="Browse our complete collection of premium silver jewelry"
            centered
          />
          
          <Tabs 
            defaultValue={selectedCategory} 
            onValueChange={handleCategoryChange}
            className="w-full max-w-4xl mx-auto my-8"
          >
            <TabsList className="flex flex-wrap justify-center mb-8">
              {categories.map(category => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  className="px-4 py-2 m-1 text-sm"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
            
            <TabsContent value={selectedCategory} className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="overflow-hidden flex flex-col border-0 shadow-md hover:shadow-lg transition-all duration-300">
                    <div className="relative h-60 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-5 flex flex-col flex-grow">
                      <h3 className="font-playfair text-lg font-bold mb-2">{product.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{product.description}</p>
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-silver/20">
                        <span className="font-medium text-lg">₹{product.price.toLocaleString()}</span>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleAddToCart(product)}
                          className="flex items-center gap-2 border-gold text-gold hover:bg-gold hover:text-charcoal"
                        >
                          <Plus className="w-4 h-4" />
                          Add to Cart
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-lg text-muted-foreground">No products found in this category.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default ProductsPage;
