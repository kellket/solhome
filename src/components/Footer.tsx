import Link from "next/link";
import Image from "next/image";

const footerLinks = [
  { href: "/#about", label: "О нас" },
  { href: "/#projects", label: "Проекты" },
  { href: "/contacts", label: "Контакты" },
  { href: "/#calculator", label: "Калькулятор" },
];

export default function Footer() {
  return (
    <footer className="bg-dark-bg text-white/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
          <div className="order-last md:order-first">
            <Image
              src="/sol_home_logo.svg"
              alt="Sol Home"
              width={140}
              height={49}
              className="h-11 w-auto brightness-200 mb-[4px] -ml-[18px]"
            />
            <p className="text-sm text-white/30 text-left">Политика конфиденциальности</p>
            <p className="text-xs text-white/30 mt-[12px] text-left">&copy; {new Date().getFullYear()} Sol Home. Все права защищены.</p>
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

          <div className="text-left">
            <h3 className="text-white text-sm font-normal tracking-wider uppercase mb-6">
              Контакты
            </h3>
            <div className="space-y-3 text-sm text-white/50 text-left">
              <a
                href="mailto:info.solhome@yandex.ru"
                className="block hover:text-gold transition-colors duration-300"
              >
                info.solhome@yandex.ru
              </a>
              <a
                href="tel:+79019018443"
                className="block hover:text-gold transition-colors duration-300"
              >
                +7 901 901 84 43
              </a>
              <p>Пн–Вс: 09:00–19:00</p>
              <p>г. Москва</p>
            </div>
          </div>
</div>
      </div>
    </footer>
  );
}
