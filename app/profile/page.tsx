"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Settings, MessageSquare, Package, Star, BarChart3, Users, FileText } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("listings");

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const user = localStorage.getItem('user');

    if (!isAuthenticated) {
      router.push('/auth?redirect=/profile');
      return;
    }

    if (user) {
      setUserData(JSON.parse(user));
    }
  }, [router]);

  if (!userData) {
    return null;
  }

  const isAdmin = userData.role === 'admin';

  return (
    <div className="container max-w-5xl py-12">
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-start gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={userData.avatar} />
              <AvatarFallback>{userData.name[0]}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-2xl">{userData.name}</CardTitle>
                    {isAdmin && <Badge>Администратор</Badge>}
                  </div>
                  <p className="text-muted-foreground mt-1">{userData.email}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="font-medium">4.8</span>
                    <span className="text-muted-foreground">
                      (12 отзывов)
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    На сайте с марта 2024
                  </p>
                </div>
                
                <Button variant="outline" size="sm" onClick={() => router.push("/profile/settings")}>
                  <Settings className="h-4 w-4 mr-2" />
                  Настройки
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full">
              <TabsTrigger value="listings" className="flex-1">
                <Package className="h-4 w-4 mr-2" />
                Мои объявления
              </TabsTrigger>
              <TabsTrigger value="messages" className="flex-1">
                <MessageSquare className="h-4 w-4 mr-2" />
                Сообщения
              </TabsTrigger>
              {isAdmin && (
                <>
                  <TabsTrigger value="analytics" className="flex-1">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Статистика
                  </TabsTrigger>
                  <TabsTrigger value="users" className="flex-1">
                    <Users className="h-4 w-4 mr-2" />
                    Пользователи
                  </TabsTrigger>
                  <TabsTrigger value="moderation" className="flex-1">
                    <FileText className="h-4 w-4 mr-2" />
                    Модерация
                  </TabsTrigger>
                </>
              )}
            </TabsList>

            <TabsContent value="listings" className="mt-6">
              <div className="text-center text-muted-foreground py-12">
                У вас пока нет объявлений
              </div>
            </TabsContent>

            <TabsContent value="messages" className="mt-6">
              <div className="text-center text-muted-foreground py-12">
                У вас пока нет сообщений
              </div>
            </TabsContent>

            {isAdmin && (
              <>
                <TabsContent value="analytics" className="mt-6">
                  <Button onClick={() => router.push('/admin/analytics')}>
                    Открыть аналитику
                  </Button>
                </TabsContent>

                <TabsContent value="users" className="mt-6">
                  <Button onClick={() => router.push('/admin/users')}>
                    Управление пользователями
                  </Button>
                </TabsContent>

                <TabsContent value="moderation" className="mt-6">
                  <Button onClick={() => router.push('/admin/references')}>
                    Управление справочниками
                  </Button>
                </TabsContent>
              </>
            )}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}