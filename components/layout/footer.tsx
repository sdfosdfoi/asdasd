import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-12 py-8">
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">О компании</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:underline">О нас</Link></li>
              <li><Link href="/contacts" className="hover:underline">Контакты</Link></li>
              <li><Link href="/feedback" className="hover:underline">Обратная связь</Link></li>
              <li><Link href="/vacancies" className="hover:underline">Вакансии</Link></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Каталог</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/katalog?category=spetstehnika" className="hover:underline">Спецтехника</Link></li>
              <li><Link href="/katalog?category=zapchasti" className="hover:underline">Запчасти</Link></li>
              <li><Link href="/katalog?category=attachments" className="hover:underline">Навесное оборудование</Link></li>
              <li><Link href="/katalog?category=tires" className="hover:underline">Шины и колеса</Link></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Информация</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/help" className="hover:underline">Помощь</Link></li>
              <li><Link href="/terms" className="hover:underline">Правила сервиса</Link></li>
              <li><Link href="/privacy" className="hover:underline">Политика конфиденциальности</Link></li>
              <li><Link href="/blog" className="hover:underline">Блог</Link></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Контакты</h4>
            <ul className="space-y-2 text-sm">
              <li>Телефон: <a href="tel:+78001234567" className="hover:underline">8 (800) 123-45-67</a></li>
              <li>Email: <a href="mailto:info@spectechmarket.ru" className="hover:underline">info@spectechmarket.ru</a></li>
              <li>Адрес: г. Москва, ул. Примерная, д. 123</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t py-6 md:flex md:items-center md:justify-between">
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              &copy; 2025 СпецТехМаркет. Все права защищены.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}