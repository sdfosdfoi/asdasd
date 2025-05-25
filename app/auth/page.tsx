"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

type UserType = 'individual' | 'entityBY' | 'entityRF';

interface RegisterData {
  type: UserType;
  name: string;
  companyName?: string;
  taxId?: string; // УНП или ИНН
  email: string;
  password: string;
  avatar: string | null;
}

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState<RegisterData>({ 
    type: 'individual',
    name: "",
    email: "", 
    password: "",
    avatar: null 
  });
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/profile';

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (loginData.email === "admin@example.com" && loginData.password === "admin") {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user', JSON.stringify({
          name: "Администратор",
          email: loginData.email,
          role: "admin",
          avatar: "https://i.pravatar.cc/150?img=3"
        }));
        toast.success("Успешная авторизация");
        router.push('/admin');
        return;
      }

      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify({
        name: "Александр Петров",
        email: loginData.email,
        role: "user",
        avatar: "https://i.pravatar.cc/150?img=3"
      }));
      
      toast.success("Успешная авторизация");
      router.push(redirectTo);
    } catch (error) {
      toast.error("Ошибка при авторизации");
    } finally {
      setIsLoading(false);
    }
  };

  const validateTaxId = (type: UserType, taxId: string) => {
    if (type === 'entityBY' && taxId.length !== 9) {
      return "УНП должен содержать 9 цифр";
    }
    if (type === 'entityRF' && taxId.length !== 10) {
      return "ИНН должен содержать 10 цифр";
    }
    if (!/^\d+$/.test(taxId)) {
      return "Идентификатор должен содержать только цифры";
    }
    return null;
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (registerData.type !== 'individual' && registerData.taxId) {
        const taxIdError = validateTaxId(registerData.type, registerData.taxId);
        if (taxIdError) {
          toast.error(taxIdError);
          return;
        }
      }

      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify({
        ...registerData,
        role: "user",
        avatar: registerData.avatar || "https://i.pravatar.cc/150?img=3"
      }));
      
      toast.success("Регистрация успешна");
      router.push(redirectTo);
    } catch (error) {
      toast.error("Ошибка при регистрации");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setRegisterData(prev => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Добро пожаловать</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Вход</TabsTrigger>
              <TabsTrigger value="register">Регистрация</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="mail@example.com" 
                    value={loginData.email}
                    onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Пароль</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    value={loginData.password}
                    onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                    required 
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Вход..." : "Войти"}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label>Тип пользователя</Label>
                  <RadioGroup
                    value={registerData.type}
                    onValueChange={(value: UserType) => {
                      setRegisterData(prev => ({
                        ...prev,
                        type: value,
                        companyName: undefined,
                        taxId: undefined
                      }));
                    }}
                    className="flex flex-col space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="individual" id="individual" />
                      <Label htmlFor="individual">Физическое лицо</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="entityBY" id="entityBY" />
                      <Label htmlFor="entityBY">Юридическое лицо РБ</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="entityRF" id="entityRF" />
                      <Label htmlFor="entityRF">Юридическое лицо РФ</Label>
                    </div>
                  </RadioGroup>
                </div>

                {registerData.type !== 'individual' && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Наименование организации</Label>
                      <Input 
                        id="companyName"
                        value={registerData.companyName || ''}
                        onChange={(e) => setRegisterData(prev => ({ ...prev, companyName: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="taxId">
                        {registerData.type === 'entityBY' ? 'УНП (9 цифр)' : 'ИНН (10 цифр)'}
                      </Label>
                      <Input 
                        id="taxId"
                        value={registerData.taxId || ''}
                        onChange={(e) => setRegisterData(prev => ({ ...prev, taxId: e.target.value }))}
                        maxLength={registerData.type === 'entityBY' ? 9 : 10}
                        required
                      />
                    </div>
                  </>
                )}

                <div className="space-y-2">
                  <Label htmlFor="name">
                    {registerData.type === 'individual' ? 'Имя' : 'Контактное лицо'}
                  </Label>
                  <Input 
                    id="name"
                    value={registerData.name}
                    onChange={(e) => setRegisterData(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="avatar">Фото профиля</Label>
                  <Input 
                    id="avatar" 
                    type="file" 
                    accept="image/*"
                    onChange={handleAvatarChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reg-email">Email</Label>
                  <Input 
                    id="reg-email" 
                    type="email" 
                    placeholder="mail@example.com" 
                    value={registerData.email}
                    onChange={(e) => setRegisterData(prev => ({ ...prev, email: e.target.value }))}
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reg-password">Пароль</Label>
                  <Input 
                    id="reg-password" 
                    type="password" 
                    value={registerData.password}
                    onChange={(e) => setRegisterData(prev => ({ ...prev, password: e.target.value }))}
                    required 
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Регистрация..." : "Зарегистрироваться"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}