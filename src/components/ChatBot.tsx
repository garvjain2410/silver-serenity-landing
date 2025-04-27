
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MessageSquare, X, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: number;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hello! I'm Silvia, your jewelry assistant. How can I help you today? Whether you have questions about our products, wholesale opportunities, or anything else, I'm here to assist!",
      sender: 'bot',
      timestamp: new Date(),
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const messageEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!message.trim()) return;
    
    const userMessage: Message = {
      id: messages.length + 1,
      content: message.trim(),
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages([...messages, userMessage]);
    setMessage('');
    setIsTyping(true);
    
    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(message.trim().toLowerCase());
      const botMessage: Message = {
        id: messages.length + 2,
        content: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1500); // Random delay to simulate typing
  };

  const generateBotResponse = (query: string): string => {
    if (query.includes('hi') || query.includes('hello') || query.includes('hey')) {
      return "Hello there! How can I help you with our silver jewelry collection today?";
    } else if (query.includes('pricing') || query.includes('price') || query.includes('cost')) {
      return "Our wholesale prices vary based on quantity and product line. We offer competitive pricing with volume discounts. Please fill out our inquiry form, and our team will provide a detailed price list suited to your business needs.";
    } else if (query.includes('minimum') || query.includes('order') || query.includes('quantity')) {
      return "Our minimum order is typically 20-40 pieces depending on the collection. For new wholesalers, we offer starter packages that allow you to test different product lines with lower minimum orders.";
    } else if (query.includes('delivery') || query.includes('shipping') || query.includes('shipment')) {
      return "We ship worldwide using trusted carriers like DHL and FedEx. Domestic orders typically arrive in 3-5 business days, while international shipments take 7-10 business days. Orders over $1000 qualify for free shipping.";
    } else if (query.includes('custom') || query.includes('customize') || query.includes('personalize')) {
      return "Yes, we offer customization services for bulk orders, including custom designs, packaging, and branding. Our design team can work with you to create exclusive pieces for your store.";
    } else if (query.includes('catalog') || query.includes('brochure') || query.includes('collection')) {
      return "I'd be happy to share our latest catalog! Please provide your email through our contact form, and we'll send you our complete product catalog along with our wholesale terms.";
    } else if (query.includes('discount') || query.includes('sale') || query.includes('promotion')) {
      return "We offer tiered discount structures based on order volume. First-time wholesalers receive a 10% welcome discount. Seasonal promotions are also available throughout the year.";
    } else if (query.includes('material') || query.includes('quality') || query.includes('sterling')) {
      return "All our jewelry is crafted from premium 925 Sterling Silver, with select pieces featuring gold plating options. We provide certificates of authenticity for all our products, ensuring the highest quality standards.";
    } else if (query.includes('return') || query.includes('exchange') || query.includes('warranty')) {
      return "We offer a 30-day return policy for defective items. Each piece comes with a 1-year warranty against manufacturing defects. Please refer to our wholesale terms for detailed information on our quality guarantee.";
    } else if (query.includes('contact') || query.includes('speak') || query.includes('representative')) {
      return "Our wholesale team would be delighted to speak with you! Please fill out the contact form with your details, and a dedicated account manager will reach out within 24 hours.";
    } else if (query.includes('thank')) {
      return "You're welcome! If you have any other questions, feel free to ask. I'm here to help you with all your silver jewelry wholesale needs!";
    } else {
      return "Thank you for your message. To better assist you, would you like to know about our wholesale programs, product collections, or custom design services? You can also fill out our inquiry form for personalized assistance.";
    }
  };

  return (
    <>
      {/* Chat Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-silver-dark hover:bg-silver-dark/90 text-white p-4 rounded-full shadow-lg z-50 h-16 w-16 flex items-center justify-center"
        aria-label="Open chat"
      >
        <MessageSquare size={24} />
      </Button>

      {/* Chat Window */}
      <div
        className={cn(
          "fixed bottom-0 right-0 z-50 w-full md:w-[400px] transition-all duration-300 ease-in-out",
          isOpen
            ? "translate-y-0 opacity-100"
            : "translate-y-full opacity-0 pointer-events-none"
        )}
      >
        <Card className="mx-4 mb-4 overflow-hidden rounded-t-lg shadow-xl border-silver">
          {/* Chat Header */}
          <div className="bg-silver-dark p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-lg font-playfair font-bold text-white">S</span>
              </div>
              <div>
                <h3 className="text-white font-medium">Silvia</h3>
                <p className="text-xs text-white/70">Jewelry Assistant</p>
              </div>
            </div>
            <Button
              variant="ghost"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/10 p-2 h-auto"
              aria-label="Close chat"
            >
              <X size={20} />
            </Button>
          </div>

          {/* Chat Messages */}
          <div className="p-4 h-[400px] overflow-y-auto bg-white">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex",
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[80%] rounded-lg p-3",
                      msg.sender === "user"
                        ? "bg-silver-dark text-white rounded-tr-none"
                        : "bg-silver-light text-gray-800 rounded-tl-none"
                    )}
                  >
                    <p>{msg.content}</p>
                    <p className="text-xs opacity-70 text-right mt-1">
                      {msg.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-silver-light text-gray-800 rounded-lg rounded-tl-none p-3 max-w-[80%]">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '600ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messageEndRef}></div>
            </div>
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 bg-white">
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow"
              />
              <Button
                type="submit"
                disabled={!message.trim()}
                className="bg-silver-dark hover:bg-silver-dark/90 text-white"
              >
                <Send size={18} />
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
};

export default ChatBot;
