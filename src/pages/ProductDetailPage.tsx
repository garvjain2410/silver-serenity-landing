
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import { productsData, Product } from '@/data/productsData';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Plus, SendHorizontal } from 'lucide-react';
import { toast } from 'sonner';

const ProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    // Find product by ID
    const parsedId = parseInt(productId || '0');
    const foundProduct = productsData.find(p => p.id === parsedId);

    if (foundProduct) {
      setProduct(foundProduct);
      setActiveImageIndex(0);
      // Get related products from the same category
      const related = productsData
        .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
        .slice(0, 3);
      setRelatedProducts(related);
    } else {
      toast.error("Product not found!");
      navigate('/products', { replace: true });
    }
  }, [productId, navigate]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      toast.success(`${product.name} added to inquiry list!`);
    }
  };

  const createWhatsAppLink = () => {
    if (!product) return '';
    const phoneNumber = process.env.VITE_WHATSAPP_NUMBER || '918291692365';
    const message = encodeURIComponent(
      `Hello, I'm interested in ordering *${product.name}* (SKU: ${product.sku || 'N/A'}). Please provide more information.`
    );
    return `https://wa.me/${phoneNumber}?text=${message}`;
  };

  // Handle product images
  const getProductImages = () => {
    if (!product) return [];
    return Array.isArray(product.image) ? product.image : [product.image];
  };

  const productImages = getProductImages();

  if (!product) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Product Images */}
            <div className="lg:col-span-1 space-y-4">
              <div className="sticky top-24">
                <div className="overflow-hidden rounded-lg border border-silver shadow-xl bg-white">
                  <img
                    src={productImages[activeImageIndex]}
                    alt={product.name}
                    className="w-full h-auto object-cover aspect-square"
                  />
                </div>
                
                {/* Thumbnail navigation */}
                {productImages.length > 1 && (
                  <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                    {productImages.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImageIndex(index)}
                        className={`w-16 h-16 border rounded-md overflow-hidden flex-shrink-0 ${
                          activeImageIndex === index ? 'border-2 border-primary' : 'border-silver'
                        }`}
                      >
                        <img 
                          src={image} 
                          alt={`${product.name} - View ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Product Details */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <div className="inline-block px-3 py-1 text-xs bg-primary text-white rounded-full mb-3">
                  {product.category}
                </div>
                <h1 className="text-3xl font-playfair font-bold mb-2">{product.name}</h1>
                <p className="text-lg font-medium mb-2">₹{product.price.toLocaleString()}</p>
                <p className="text-muted-foreground mb-6">{product.seoDescription || product.description}</p>
              </div>

              <Tabs defaultValue="specifications" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="specifications">Specifications</TabsTrigger>
                  <TabsTrigger value="description">Description</TabsTrigger>
                </TabsList>
                <TabsContent value="specifications" className="mt-4">
                  {/* Product Specs Table */}
                  <div className="overflow-x-auto border border-silver rounded-lg">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead colSpan={2} className="text-center bg-gray-50">
                            Product Specifications
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium bg-gray-50">SKU</TableCell>
                          <TableCell>{product.sku || 'N/A'}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium bg-gray-50">Category</TableCell>
                          <TableCell>{product.category}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium bg-gray-50">Silver Purity</TableCell>
                          <TableCell>{product.purity || 'N/A'}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium bg-gray-50">Stone Type</TableCell>
                          <TableCell>{product.stoneType || 'None'}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium bg-gray-50">Features</TableCell>
                          <TableCell>
                            <ul className="list-disc pl-4">
                              {product.features?.map((feature, index) => (
                                <li key={index}>{feature}</li>
                              )) || 'N/A'}
                            </ul>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium bg-gray-50">Available Sizes</TableCell>
                          <TableCell>{product.availableSizes || 'N/A'}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium bg-gray-50">Making Charges</TableCell>
                          <TableCell>₹{product.makingCharges?.toLocaleString() || 'N/A'}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium bg-gray-50">Wastage</TableCell>
                          <TableCell>{product.wastage || 'N/A'}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium bg-gray-50">Weight Range</TableCell>
                          <TableCell>{product.weightRange || 'N/A'}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium bg-gray-50">Minimum Order</TableCell>
                          <TableCell>{product.minOrder}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
                <TabsContent value="description" className="mt-4">
                  <div className="border border-silver rounded-lg p-4">
                    <p className="mb-4">{product.seoDescription || product.description}</p>
                    {product.features && (
                      <div>
                        <h3 className="font-medium mb-2">Key Features:</h3>
                        <ul className="list-disc pl-6 space-y-1">
                          {product.features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mt-8">
                <Button 
                  onClick={handleAddToCart}
                  className="flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add to Inquiry
                </Button>
                <Button
                  variant="outline"
                  asChild
                >
                  <a 
                    href={createWhatsAppLink()} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <SendHorizontal className="w-4 h-4" />
                    Inquire via WhatsApp
                  </a>
                </Button>
              </div>

              {/* Related Products */}
              {relatedProducts.length > 0 && (
                <div className="mt-12">
                  <h2 className="text-xl font-playfair font-bold mb-4">Related Products</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {relatedProducts.map(relatedProduct => (
                      <Link 
                        key={relatedProduct.id} 
                        to={`/products/${relatedProduct.id}`}
                        className="block border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                      >
                        <img 
                          src={Array.isArray(relatedProduct.image) ? relatedProduct.image[0] : relatedProduct.image}
                          alt={relatedProduct.name}
                          className="w-full h-32 object-cover"
                        />
                        <div className="p-3">
                          <h3 className="font-medium truncate">{relatedProduct.name}</h3>
                          <p className="text-sm text-muted-foreground">₹{relatedProduct.price.toLocaleString()}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
