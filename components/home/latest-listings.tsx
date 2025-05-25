import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

export function LatestListings() {
  return (
    <section className="py-12 bg-muted/30">
      <div className="container max-w-6xl mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Новые объявления</h2>
          <Link href="/katalog" className="text-primary hover:underline mt-2 md:mt-0">
            Смотреть все объявления
          </Link>
        </div>
        
        <div className="min-h-[300px] flex flex-col items-center justify-center text-center p-8 bg-background rounded-lg border">
          <FileText className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Объявлений пока нет</h3>
          <p className="text-muted-foreground mb-4">
            Будьте первым, кто разместит объявление на нашей площадке
          </p>
          <Button asChild>
            <Link href="/add-listing">Разместить объявление</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}