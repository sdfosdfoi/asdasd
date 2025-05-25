"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const data = [
  { name: "Янв", listings: 65, users: 42, revenue: 124000 },
  { name: "Фев", listings: 78, users: 55, revenue: 156000 },
  { name: "Мар", listings: 90, users: 68, revenue: 189000 },
  { name: "Апр", listings: 105, users: 82, revenue: 245000 },
  { name: "Май", listings: 125, users: 95, revenue: 312000 },
  { name: "Июн", listings: 145, users: 110, revenue: 378000 },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Аналитика</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Всего объявлений
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">145</div>
            <p className="text-xs text-muted-foreground">
              +12% с прошлого месяца
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Активных пользователей
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">110</div>
            <p className="text-xs text-muted-foreground">
              +15% с прошлого месяца
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Доход
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">378,000 ₽</div>
            <p className="text-xs text-muted-foreground">
              +21% с прошлого месяца
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Статистика за 6 месяцев</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="listings"
                  stroke="hsl(var(--chart-1))"
                  name="Объявления"
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="users"
                  stroke="hsl(var(--chart-2))"
                  name="Пользователи"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="revenue"
                  stroke="hsl(var(--chart-3))"
                  name="Доход"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}