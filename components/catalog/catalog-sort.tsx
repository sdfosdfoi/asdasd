"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function CatalogSort() {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">Сортировать по:</span>
      <Select defaultValue="newest">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Выберите сортировку" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">Сначала новые</SelectItem>
          <SelectItem value="oldest">Сначала старые</SelectItem>
          <SelectItem value="price-asc">Цена по возрастанию</SelectItem>
          <SelectItem value="price-desc">Цена по убыванию</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}