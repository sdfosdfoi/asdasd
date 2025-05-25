"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const listings = [
  {
    id: "1",
    title: "Экскаватор Caterpillar 320",
    price: "₽7,500,000",
    status: "На модерации",
    seller: {
      name: "Александр П.",
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    createdAt: "2 часа назад"
  },
  {
    id: "2",
    title: "Фронтальный погрузчик Liebherr",
    price: "₽4,800,000",
    status: "Активно",
    seller: {
      name: "Михаил С.",
      avatar: "https://i.pravatar.cc/150?img=2"
    },
    createdAt: "5 часов назад"
  },
  // Добавьте больше объявлений по необходимости
];

export function RecentListings() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Объявление</TableHead>
          <TableHead>Продавец</TableHead>
          <TableHead>Статус</TableHead>
          <TableHead>Цена</TableHead>
          <TableHead>Дата</TableHead>
          <TableHead className="text-right">Действия</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {listings.map((listing) => (
          <TableRow key={listing.id}>
            <TableCell className="font-medium">{listing.title}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={listing.seller.avatar} />
                  <AvatarFallback>{listing.seller.name[0]}</AvatarFallback>
                </Avatar>
                {listing.seller.name}
              </div>
            </TableCell>
            <TableCell>{listing.status}</TableCell>
            <TableCell>{listing.price}</TableCell>
            <TableCell>{listing.createdAt}</TableCell>
            <TableCell className="text-right">
              <Button variant="outline" size="sm">
                Подробнее
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}