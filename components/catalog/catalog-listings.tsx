"use client";

import Link from "next/link";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CatalogListings() {
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center text-center p-8 bg-background rounded-lg border mt-6">
      <FileText className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium mb-2">По вашему запросу ничего не найдено</h3>
      <p className="text-muted-foreground mb-4">
        Попробуйте изменить параметры поиска или поискать в ближайших городах
      </p>
      <div className="flex flex-col gap-2">
        <Button variant="outline" onClick={() => window.location.reload()}>
          Сбросить фильтры
        </Button>
        <Button asChild>
          <Link href="/add-listing">Разместить объявление</Link>
        </Button>
      </div>
    </div>
  );
}