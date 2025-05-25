import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Truck, Cog, Wrench, Gauge 
} from "lucide-react";

const categories = [
  {
    title: "Спецтехника",
    description: "Экскаваторы, погрузчики, самосвалы и другая строительная техника",
    icon: Truck,
    href: "/katalog?category=spetstehnika",
    count: 1245
  },
  {
    title: "Запчасти",
    description: "Новые и б/у запчасти для всех видов спецтехники",
    icon: Cog,
    href: "/katalog?category=zapchasti",
    count: 3578
  },
  {
    title: "Навесное оборудование",
    description: "Ковши, гидромолоты, вилы и другое навесное оборудование",
    icon: Wrench,
    href: "/katalog?category=attachments",
    count: 876
  },
  {
    title: "Шины и колеса",
    description: "Шины и колеса для всех видов строительной техники",
    icon: Gauge,
    href: "/katalog?category=tires",
    count: 645
  }
];

export function CategorySection() {
  return (
    <section className="py-12">
      <div className="container max-w-6xl mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Категории техники</h2>
          <Link href="/katalog" className="text-primary hover:underline mt-2 md:mt-0">
            Смотреть все категории
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link href={category.href} key={index}>
              <Card className="h-full transition-all hover:shadow-md">
                <CardContent className="pt-6 px-6">
                  <div className="flex flex-col h-full">
                    <div className="mb-4 p-2 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <category.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 flex items-center">
                      {category.title}
                      <span className="ml-2 text-sm text-muted-foreground font-normal">
                        {category.count}
                      </span>
                    </h3>
                    <p className="text-muted-foreground text-sm">{category.description}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}