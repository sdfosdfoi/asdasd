"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft } from "lucide-react";

export default function ProfileSettingsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    // Имитация сохранения
    setTimeout(() => {
      setIsLoading(false);
      router.push("/profile");
    }, 1000);
  };

  return (
    <div className="container max-w-2xl py-12">
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => router.push("/profile")}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Назад к профилю
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Настройки профиля</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src="https://i.pravatar.cc/150?img=3" />
                <AvatarFallback>АП</AvatarFallback>
              </Avatar>
              <Button type="button" variant="outline">
                Изменить фото
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Имя</Label>
              <Input id="name" defaultValue="Александр Петров" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="alex@example.com" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Телефон</Label>
              <Input id="phone" type="tel" defaultValue="+7 (999) 123-45-67" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="current-password">Текущий пароль</Label>
              <Input id="current-password" type="password" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-password">Новый пароль</Label>
              <Input id="new-password" type="password" />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Сохранение..." : "Сохранить изменения"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}