"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ChevronRight,
  Menu,
  Home,
  Users,
  FileText,
  Settings,
  AlertTriangle,
  BarChart3,
  Package,
  MessageSquare,
  Bell,
  LogOut,
  BookOpen
} from "lucide-react";

interface NavItem {
  title: string;
  href: string;
  icon: any;
}

const navItems: NavItem[] = [
  { title: "Главная", href: "/admin", icon: Home },
  { title: "Пользователи", href: "/admin/users", icon: Users },
  { title: "Объявления", href: "/admin/listings", icon: FileText },
  { title: "Справочники", href: "/admin/references", icon: BookOpen },
  { title: "Жалобы", href: "/admin/reports", icon: AlertTriangle },
  { title: "Статистика", href: "/admin/analytics", icon: BarChart3 },
  { title: "Категории", href: "/admin/categories", icon: Package },
  { title: "Сообщения", href: "/admin/messages", icon: MessageSquare },
  { title: "Уведомления", href: "/admin/notifications", icon: Bell },
  { title: "Настройки", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className={cn(
          "bg-muted/40 border-r flex flex-col transition-all duration-300",
          isCollapsed ? "w-16" : "w-64"
        )}
      >
        <div className="h-16 border-b flex items-center justify-between px-4">
          {!isCollapsed && (
            <Link href="/" className="font-bold">
              СпецТехМаркет
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>

        <ScrollArea className="flex-1 py-4">
          <nav className="grid gap-1 px-2">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted hover:text-foreground",
                  pathname === item.href && "bg-muted text-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {!isCollapsed && <span>{item.title}</span>}
              </Link>
            ))}
          </nav>
        </ScrollArea>

        <div className="h-16 border-t flex items-center px-2">
          <Link
            href="/"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted hover:text-foreground w-full"
            )}
          >
            <LogOut className="h-4 w-4" />
            {!isCollapsed && <span>Выйти</span>}
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1">
        <div className="h-16 border-b flex items-center px-6">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Home className="h-4 w-4" />
            <ChevronRight className="h-4 w-4" />
            <span>Админ-панель</span>
          </div>
        </div>

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}