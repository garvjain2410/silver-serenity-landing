
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionTitleProps {
  title: string;
  subtitle?: string | ReactNode;
  description?: string;
  centered?: boolean;
  className?: string;
}

const SectionTitle = ({ title, subtitle, description, centered = false, className }: SectionTitleProps) => {
  return (
    <div className={cn(
      "mb-12",
      centered && "text-center",
      className
    )}>
      <h2 className={cn(
        "font-playfair text-3xl md:text-4xl lg:text-5xl font-bold mb-2",
        centered && "mx-auto"
      )}>
        {title}
      </h2>
      
      {centered && (
        <div className="flex items-center justify-center my-4">
          <div className="w-16 h-0.5 bg-primary"></div>
          <div className="w-2 h-2 rounded-full mx-2 bg-primary"></div>
          <div className="w-16 h-0.5 bg-primary"></div>
        </div>
      )}
      
      {subtitle && (
        <p className={cn(
          "text-primary-dark text-lg",
          centered ? "max-w-2xl mx-auto" : "md:max-w-3xl"
        )}>
          {subtitle}
        </p>
      )}
      
      {description && (
        <p className={cn(
          "text-gray-600 mt-2",
          centered ? "max-w-2xl mx-auto" : "md:max-w-3xl"
        )}>
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
