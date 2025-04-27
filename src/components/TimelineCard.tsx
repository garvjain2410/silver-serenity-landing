
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Milestone } from "lucide-react";

interface TimelineCardProps {
  title: string;
  year: string;
  description: string;
  className?: string;
  isActive?: boolean;
  onClick?: () => void;  // Added onClick prop
}

const TimelineCard = ({
  title,
  year,
  description,
  className,
  isActive = false,
  onClick,  // Added onClick to the props
}: TimelineCardProps) => {
  return (
    <div className={cn("relative", className)} onClick={onClick}>  // Added onClick handler here
      <div className="absolute left-0 h-full w-px bg-silver/20" />
      <div
        className={cn(
          "absolute -left-2 top-6 rounded-full p-1 transition-colors duration-200",
          isActive ? "bg-jewel-purple" : "bg-silver"
        )}
      >
        <Milestone className="h-4 w-4 text-white" />
      </div>
      <Card className={cn(
        "ml-6 transition-all duration-300",
        isActive ? "bg-jewel-purple/10 border-jewel-purple/20" : "hover:border-silver"
      )}>
        <CardHeader className="pb-2">
          <h3 className="font-playfair text-xl font-bold">{title}</h3>
          <p className="text-sm text-muted-foreground">{year}</p>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TimelineCard;
