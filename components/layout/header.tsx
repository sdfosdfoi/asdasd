"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon, Menu, X, Search, User, BellIcon } from "lucide-react";
import { 
  NavigationMenu, 
  NavigationMenuContent, 
  NavigationMenuItem, 
  NavigationMenuLink, 
  NavigationMenuList, 
  NavigationMenuTrigger, 
  navigationMenuTriggerStyle 
} from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Header() {
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    const userData = localStorage.getItem('user');
    setIsAuthenticated(authStatus === 'true');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleAuthClick = () => {
    router.push('/auth');
  };

  const handleAddListingClick = () => {
    if (isAuthenticated) {
      router.push('/add-listing');
    } else {
      router.push('/auth?redirect=/add-listing');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-bold text-xl">СпецТехМаркет</Link>
          
          <div className="hidden md:flex">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Каталог</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      <Link href="/katalog?category=spetstehnika" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">Спецтехника</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">Экскаваторы, погрузчики, бульдозеры и другая техника</p>
                      </Link>
                      <Link href="/katalog?category=zapchasti" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">Запчасти</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">Оригинальные и аналоговые запчасти для спецтехники</p>
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/katalog" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Объявления
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/blog" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Блог
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4 flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Поиск техники и запчастей" className="pl-8" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            <SunIcon className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonIcon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Переключить тему</span>
          </Button>
          
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <BellIcon className="h-5 w-5" />
          </Button>
          
          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => router.push('/profile')}>
                  Профиль
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  Выйти
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button 
              variant="outline" 
              size="sm" 
              className="hidden md:flex gap-2"
              onClick={handleAuthClick}
            >
              <User className="h-4 w-4" />
              <span>Войти</span>
            </Button>
          )}
          
          <Button 
            variant="default" 
            size="sm" 
            className="hidden md:flex"
            onClick={handleAddListingClick}
          >
            Подать объявление
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Меню</span>
          </Button>
        </div>
      </div>
      
      {/* Мобильное меню */}
      {mobileMenuOpen && (
        <div className="md:hidden py-4 px-4 space-y-4 border-t">
          <div className="relative w-full">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Поиск техники и запчастей" className="pl-8" />
          </div>
          
          <nav className="space-y-2">
            <Link href="/katalog?category=spetstehnika" className="flex w-full items-center py-2 text-sm font-medium">
              Спецтехника
            </Link>
            <Link href="/katalog?category=zapchasti" className="flex w-full items-center py-2 text-sm font-medium">
              Запчасти
            </Link>
            <Link href="/blog" className="flex w-full items-center py-2 text-sm font-medium">
              Блог
            </Link>
          </nav>
          
          <div className="pt-2 flex flex-col gap-2">
            {isAuthenticated ? (
              <>
                <Button variant="outline" className="justify-start" onClick={() => router.push('/profile')}>
                  <User className="mr-2 h-4 w-4" />
                  Профиль
                </Button>
                <Button variant="outline" className="justify-start" onClick={handleLogout}>
                  Выйти
                </Button>
              </>
            ) : (
              <Button variant="outline" className="justify-start" onClick={handleAuthClick}>
                <User className="mr-2 h-4 w-4" />
                Войти
              </Button>
            )}
            <Button variant="default" onClick={handleAddListingClick}>
              Подать объявление
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}