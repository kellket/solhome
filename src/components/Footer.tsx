import Link from "next/link";
import Image from "next/image";

const footerLinks = [
  { href: "/about", label: "О компании" },
  { href: "/calculator", label: "Калькулятор" },
  { href: "/projects", label: "Проекты" },
  { href: "/contacts", label: "Контакты" },
];

export default function Footer() {
  return (
    <footer className="bg-dark-bg text-white/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
          <div>
            <Image
              src="/sol_home_logo.svg"
              alt="Sol Home"
              width={140}
              height={49}
              className="h-11 w-auto brightness-200 mb-6"
            />
            <p className="text-sm leading-relaxed text-white/50 max-w-xs">
              Профессиональный ремонт квартир под ключ. Фиксированная цена,
              гарантия качества, поэтапная оплата.
            </p>
          </div>

          <div>
            <h3 className="text-white text-sm font-normal tracking-wider uppercase mb-6">
              Навигация
            </h3>
            <nav className="space-y-3">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-white/50 hover:text-gold transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="text-white text-sm font-normal tracking-wider uppercase mb-6">
              Контакты
            </h3>
            <div className="space-y-3 text-sm text-white/50">
              <a
                href="tel:+7XXXXXXXXXX"
                className="block hover:text-gold transition-colors duration-300"
              >
                +7 (XXX) XXX-XX-XX
              </a>
              <a
                href="mailto:info@solhome.ru"
                className="block hover:text-gold transition-colors duration-300"
              >
                info@solhome.ru
              </a>
              <p>г. Город, ул. Улица, д. XX</p>
              <p>Пн–Пт: 09:00–19:00</p>
            </div>
          </div>
        </div>

        

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/30">
          <p>&copy; {new Date().getFullYear()} Sol Home. Все права защищены.</p>
          <p>Политика конфиденциальности</p>
        </div>
      </div>
    </footer>
  );
}
