import { 
  CheckCircle, 
  LineChart, 
  ShieldCheck, 
  MessageSquare 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const benefits = [
  {
    icon: LineChart,
    title: "Большая аудитория",
    description: "Доступ к тысячам потенциальных покупателей спецтехники со всей России"
  },
  {
    icon: CheckCircle,
    title: "Быстрые продажи",
    description: "Удобные инструменты для создания эффективных объявлений и быстрого поиска покупателей"
  },
  {
    icon: ShieldCheck,
    title: "Безопасные сделки",
    description: "Проверенные пользователи и инструменты для безопасных сделок"
  },
  {
    icon: MessageSquare,
    title: "Удобное общение",
    description: "Встроенный чат для общения с покупателями напрямую через платформу"
  }
];

export function SellerBenefits() {
  return (
    <section className="py-12">
      <div className="container max-w-6xl mx-auto px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Почему стоит продавать с нами</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Наша платформа предоставляет все необходимые инструменты для быстрой и безопасной продажи вашей спецтехники и запчастей
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="mb-4 p-3 rounded-full bg-primary/10">
                <benefit.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button size="lg" asChild>
            <Link href="/add-listing">Разместить объявление</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}