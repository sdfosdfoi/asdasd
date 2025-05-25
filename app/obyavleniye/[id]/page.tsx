"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FileText } from "lucide-react";

export default function ListingPage() {
  const params = useParams();
  const router = useRouter();

  return (
    <div className="container mx-auto py-8 min-h-[60vh] flex flex-col items-center justify-center text-center">
      <FileText className="h-12 w-12 text-muted-foreground mb-4" />
      <h1 className="text-2xl font-bold mb-4">Объявление не найдено</h1>
      <p className="text-muted-foreground mb-6">
        К сожалению, запрашиваемое объявление не существует или было удалено.
      </p>
      <div className="flex gap-4">
        <Button variant="outline" onClick={() => router.back()}>
          Назад
        </Button>
        <Button asChild>
          <Link href="/katalog">Вернуться в каталог</Link>
        </Button>
      </div>
    </div>
  );
}