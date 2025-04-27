
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Milestone } from "lucide-react";

interface TimelineCardProps {
  title: string;
  year: string;
  description: string;
  className?: string;
  isActive?: boolean;
  onClick?: () => void;
}

const TimelineCard = ({
  title,
  year,
  description,
  className,
  isActive = false,
  onClick,
}: TimelineCardProps) => {
  return (
    <div className={cn("relative", className)} onClick={onClick}>
      <div className="absolute left-0 h-full w-px bg-silver/20" />
      <div
        className={cn(
          "absolute -left-3 top-6 rounded-full p-2 transition-all duration-300",
          isActive ? "bg-gold" : "bg-silver/40"
        )}
      >
        <Milestone className={cn("h-5 w-5", isActive ? "text-charcoal" : "text-white")} />
      </div>
      <Card className={cn(
        "ml-10 transition-all duration-300 border-0 shadow-lg",
        isActive 
          ? "bg-gradient-to-r from-gold/20 to-silver/10 border-l-4 border-l-gold" 
          : "bg-charcoal-light/20 hover:bg-charcoal-light/30"
      )}>
        <CardHeader className="pb-2">
          <h3 className="font-playfair text-2xl font-bold text-white">{title}</h3>
          <p className="text-sm text-silver">{year}</p>
        </CardHeader>
        <CardContent>
          <p className={cn("text-silver-light", isActive ? "font-medium" : "")}>{description}</p>
          
          {isActive && (
            <div className="mt-4 pt-4 border-t border-silver/10">
              <div className="flex items-center gap-3 text-sm text-silver-light">
                <div className="w-2 h-2 rounded-full bg-gold"></div>
                <span>Traditional craftsmanship meets modern design</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TimelineCard;
