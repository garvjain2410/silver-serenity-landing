
import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart, Plus, Minus, X, SendHorizontal } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal, itemCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  
  const createWhatsAppInquiryLink = () => {
    if (cartItems.length === 0) return '';
    
    let message = "Hello, I'm interested in the following products:\n\n";
    
    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name} (SKU: ${item.sku || 'N/A'})\n`;
      message += `   Quantity: ${item.quantity}\n`;
      message += `   Price: ₹${item.price.toLocaleString()}\n\n`;
    });
    
    message += `Total: ₹${cartTotal.toLocaleString()}\n\n`;
    message += "Please provide more information about these items. Thank you!";
    
    const phoneNumber = process.env.VITE_WHATSAPP_NUMBER || '918291692365';
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  };
  
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="relative p-2">
          <ShoppingCart className="h-6 w-6" />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-gold text-charcoal text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader className="mb-4">
          <SheetTitle className="font-playfair text-2xl">Product Inquiry</SheetTitle>
        </SheetHeader>
        
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-grow py-12">
            <ShoppingCart className="h-16 w-16 text-silver-dark mb-4" />
            <p className="text-lg font-medium">Your inquiry list is empty</p>
            <p className="text-sm text-muted-foreground mt-2">Add some beautiful silver pieces to your list!</p>
            <Button 
              className="mt-6"
              onClick={() => setIsOpen(false)}
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-grow overflow-auto">
              {cartItems.map(item => (
                <div key={item.id} className="py-4 first:pt-0">
                  <div className="flex items-start gap-3">
                    <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                      <img 
                        src={Array.isArray(item.image) ? item.image[0] : item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{item.category}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border rounded-md">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 rounded-r-none"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 rounded-l-none"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <span className="font-semibold">₹{(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <Separator className="mt-4" />
                </div>
              ))}
            </div>
            
            <div className="py-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">₹{cartTotal.toLocaleString()}</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="font-semibold">Total</span>
                <span className="font-bold text-lg">₹{cartTotal.toLocaleString()}</span>
              </div>
              
              <div className="flex flex-col gap-2 pt-2">
                <Button 
                  className="w-full bg-gold text-charcoal hover:bg-gold/90 flex items-center gap-2"
                  asChild
                >
                  <a href={createWhatsAppInquiryLink()} target="_blank" rel="noopener noreferrer">
                    <SendHorizontal className="h-4 w-4" />
                    Send Inquiry via WhatsApp
                  </a>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={clearCart}
                >
                  Clear List
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
