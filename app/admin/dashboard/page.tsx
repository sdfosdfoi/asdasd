"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Overview } from "@/components/admin/overview";
import { RecentListings } from "@/components/admin/recent-listings";
import { TopSellers } from "@/components/admin/top-sellers";
import { 
  Users, FileText, AlertTriangle, 
  TrendingUp, DollarSign, ShoppingCart 
} from "lucide-react";

const stats = [
  {
    title: "Всего пользователей",
    value: "1,234",
    change: "+12.5%",
    icon: Users,
  },
  {
    title: "Активных объявлений",
    value: "845",
    change: "+25.2%",
    icon: FileText,
  },
  {
    title: "Жалоб",
    value: "23",
    change: "-5.4%",
    icon: AlertTriangle,
  },
  {
    title: "Продажи за месяц",
    value: "₽2.4M",
    change: "+8.7%",
    icon: DollarSign,
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-y-1">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className="p-2 bg-primary/10 rounded-full">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="mt-4">
                <p className={`text-sm ${
                  stat.change.startsWith("+") 
                    ? "text-green-600" 
                    : "text-red-600"
                }`}>
                  {stat.change} с прошлого месяца
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Обзор продаж</CardTitle>
          </CardHeader>
          <CardContent>
            <Overview />
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Топ продавцов</CardTitle>
          </CardHeader>
          <CardContent>
            <TopSellers />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Последние объявления</CardTitle>
        </CardHeader>
        <CardContent>
          <RecentListings />
        </CardContent>
      </Card>
    </div>
  );
}