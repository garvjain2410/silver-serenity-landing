
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
      <div 
        className="absolute inset-0 z-0" 
        style={{ 
          transform: `translateY(${scrollPosition * 0.2}px)` 
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 to-charcoal/20 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
          alt="Premium silver jewelry collection by Omsilver"
          className="w-full h-full object-cover object-center"
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-3xl">
          <div className="mb-2 inline-block py-1 px-3 bg-gold/20 text-gold rounded-full">
            <span className="text-sm font-medium">Since 1985</span>
          </div>

          <div className={`transition-all duration-1000 delay-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-white">
              Exquisite Silver Jewelry <br />
              <span className="text-silver">Craftsmanship</span>
            </h1>
          </div>
          
          <div className={`transition-all duration-1000 delay-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <p className="text-lg md:text-xl text-silver/90 mb-8 max-w-2xl">
              Discover our premium silver jewelry collection crafted with precision and elegance by three generations of artisans from Mumbai.
            </p>
          </div>
          
          <div className={`transition-all duration-1000 delay-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <a 
              href="#products"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-gold text-charcoal font-medium rounded-md hover:bg-gold/90 transition-all duration-300 overflow-hidden relative"
            >
              <span className="relative z-10">Explore Collection</span>
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              <div className="absolute inset-0 h-full w-full bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-subtle">
        <a href="#about" className="block">
          <div className="w-6 h-10 rounded-full border-2 border-silver flex items-start justify-center p-1">
            <div className="w-1.5 h-3 bg-silver rounded-full"></div>
          </div>
        </a>
      </div>

      {/* Floating elements for visual interest */}
      <div className="absolute top-1/4 right-[10%] w-16 h-16 rounded-full bg-gold/10 animate-float" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute bottom-1/3 left-[15%] w-24 h-24 rounded-full bg-silver/10 animate-float" style={{ animationDelay: '1.2s' }}></div>
      <div className="absolute top-1/3 right-[25%] w-12 h-12 rounded-full bg-silver/5 animate-float" style={{ animationDelay: '0.8s' }}></div>
    </section>
  );
};

export default Hero;
