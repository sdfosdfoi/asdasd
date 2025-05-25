import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Star } from "lucide-react";

interface ReviewCardProps {
  author: {
    name: string;
    avatar?: string;
  };
  rating: number;
  date: string;
  text: string;
}

export function ReviewCard({ author, rating, date, text }: ReviewCardProps) {
  return (
    <Card>
      <CardHeader className="space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={author.avatar} />
            <AvatarFallback>{author.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{author.name}</div>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < rating ? "fill-primary text-primary" : "fill-muted text-muted"
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="ml-auto text-sm text-muted-foreground">{date}</div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{text}</p>
      </CardContent>
    </Card>
  );
}