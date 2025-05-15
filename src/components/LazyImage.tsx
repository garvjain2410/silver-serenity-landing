
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  placeholderSrc?: string;
}

const LazyImage = ({
  src,
  alt,
  className,
  width,
  height,
  placeholderSrc = "/placeholder.svg",
}: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [inView, setInView] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { 
        rootMargin: "200px" // Start loading image 200px before it comes into view
      }
    );
    
    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div 
      className={cn(
        "relative overflow-hidden",
        className
      )}
      style={{ width, height }}
      ref={imgRef}
    >
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <img 
            src={placeholderSrc} 
            alt="Loading" 
            className="w-12 h-12 opacity-30"
          />
        </div>
      )}
      {inView && (
        <img
          src={src}
          alt={alt}
          onLoad={handleImageLoad}
          className={cn(
            "transition-opacity duration-300",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          loading="lazy"
        />
      )}
    </div>
  );
};

export default LazyImage;
