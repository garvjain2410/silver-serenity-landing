
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import SectionTitle from "@/components/SectionTitle";
import { productsData, Product } from '@/data/productsData';
import { useCart } from '@/contexts/CartContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus } from 'lucide-react';
import { toast } from 'sonner';

const CategoryProductsPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  // Filter products by category
  const filteredProducts = productsData.filter(
    product => product.category.toLowerCase() === category?.toLowerCase()
  );
  
  // Redirect if category doesn't exist
  useEffect(() => {
    if (filteredProducts.length === 0) {
      navigate('/products', { replace: true });
      toast.error("Category not found!");
    }
  }, [filteredProducts, navigate]);
  
  // Handle add to cart
  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };
  
  // Get category display name with proper capitalization
  const categoryDisplayName = category ? category.charAt(0).toUpperCase() + category.slice(1) : '';

  return (
    <div className="min-h-screen w-full">
      <Header />
      <main className="pt-24 pb-16">
        <Container>
          <div className="flex items-center mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate('/products')}
              className="flex items-center gap-1 text-primary mr-4"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to All Products
            </Button>
          </div>
          
          <SectionTitle
            title={`${categoryDisplayName} Collection`}
            subtitle={`Explore our premium silver ${categoryDisplayName.toLowerCase()} collection`}
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
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
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryProductsPage;
