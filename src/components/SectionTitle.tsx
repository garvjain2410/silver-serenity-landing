
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionTitleProps {
  title: string;
  subtitle?: string | ReactNode;
  centered?: boolean;
  className?: string;
}

const SectionTitle = ({ title, subtitle, centered = false, className }: SectionTitleProps) => {
  return (
    <div className={cn(
      "mb-12",
      centered && "text-center",
      className
    )}>
      <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted-foreground text-lg md:max-w-3xl">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
