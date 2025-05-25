"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

const sellers = [
  {
    name: "Александр П.",
    avatar: "https://i.pravatar.cc/150?img=1",
    sales: 156,
    progress: 85,
    amount: "₽12.4M"
  },
  {
    name: "Михаил С.",
    avatar: "https://i.pravatar.cc/150?img=2",
    sales: 124,
    progress: 75,
    amount: "₽9.2M"
  },
  {
    name: "Елена К.",
    avatar: "https://i.pravatar.cc/150?img=3",
    sales: 98,
    progress: 65,
    amount: "₽7.8M"
  },
  // Добавьте больше продавцов по необходимости
];

export function TopSellers() {
  return (
    <div className="space-y-8">
      {sellers.map((seller, i) => (
        <div key={i} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={seller.avatar} />
            <AvatarFallback>{seller.name[0]}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1 flex-1">
            <p className="text-sm font-medium leading-none">{seller.name}</p>
            <div className="flex items-center text-sm text-muted-foreground">
              <span className="mr-2">{seller.sales} продаж</span>
              <span>{seller.amount}</span>
            </div>
            <Progress value={seller.progress} className="h-2" />
          </div>
        </div>
      ))}
    </div>
  );
}