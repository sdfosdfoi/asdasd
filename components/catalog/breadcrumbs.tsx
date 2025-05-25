"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  title: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav 
      className={cn("flex text-sm", className)}
      aria-label="Навигационная цепочка"
    >
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li key={item.href} className="flex items-center">
              {index > 0 && (
                <ChevronRight 
                  className="mx-1.5 h-4 w-4 text-muted-foreground flex-shrink-0" 
                  aria-hidden="true" 
                />
              )}
              
              {isLast ? (
                <span className="font-medium text-foreground" aria-current="page">
                  {item.title}
                </span>
              ) : (
                <Link 
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.title}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}