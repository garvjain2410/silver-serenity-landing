
import { useState, useEffect } from "react";

const Loader = () => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) return 100;
        return prevProgress + 10;
      });
    }, 100);
    
    return () => clearTimeout(timer);
  }, [progress]);
  
  return (
    <div className="fixed inset-0 bg-white z-[9999] flex flex-col items-center justify-center">
      <div className="mb-8">
        <span className="font-playfair text-3xl font-bold tracking-tight">
          Om<span className="text-primary">silver</span>
        </span>
      </div>
      
      <div className="w-64 h-1 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gold transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <div className="mt-4 text-sm text-gray-500">
        Loading exquisite craftsmanship...
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 right-1/4 w-16 h-16 rounded-full bg-silver/10 animate-float"></div>
      <div className="absolute bottom-1/3 left-1/3 w-24 h-24 rounded-full bg-gold/10 animate-float" style={{ animationDelay: '1.2s' }}></div>
    </div>
  );
};

export default Loader;
