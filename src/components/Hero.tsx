
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden bg-gradient-to-r from-white to-jewel-purple/10">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/80 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
          alt="Silver jewelry collection"
          className="w-full h-full object-cover object-center"
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-3xl">
          <div className={`transition-all duration-1000 delay-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Exquisite Silver Jewelry <br />
              <span className="text-silver-dark">Wholesale Collection</span>
            </h1>
          </div>
          
          <div className={`transition-all duration-1000 delay-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
              Discover our premium wholesale silver jewelry collection crafted with precision and elegance for retailers seeking distinction.
            </p>
          </div>
          
          <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <Button
              size="lg"
              className="bg-silver-dark hover:bg-silver-dark/90 text-white"
            >
              Explore Collection
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-silver-dark hover:bg-silver-dark/10"
            >
              Wholesale Inquiry
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-subtle">
        <div className="w-6 h-10 rounded-full border-2 border-silver-dark flex items-start justify-center p-1">
          <div className="w-1.5 h-3 bg-silver-dark rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
