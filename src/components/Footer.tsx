import Link from "next/link";
import Image from "next/image";

const footerLinks = [
  { href: "/#about", label: "О нас" },
  { href: "/services", label: "Услуги" },
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
              alt="Sol Home — ремонт квартир в Москве"
              width={140}
              height={49}
              className="h-11 w-auto brightness-200 mb-[4px] -ml-[18px]"
            />
            <Link href="/privacy" className="text-sm text-white/30 text-left hover:text-gold transition-colors duration-300 block">Политика конфиденциальности</Link>
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
            <address className="not-italic space-y-3 text-sm text-white/50 text-left">
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
            </address>
            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://t.me/solhome_ru"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-gold transition-colors duration-300"
                aria-label="Telegram"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.03-1.99 1.27-5.62 3.72-.53.36-1.01.54-1.44.53-.47-.01-1.38-.27-2.06-.49-.83-.27-1.49-.42-1.43-.88.03-.24.37-.49 1.02-.74 3.99-1.74 6.65-2.89 7.99-3.45 3.8-1.6 4.59-1.88 5.1-1.89.11 0 .37.03.53.17.14.12.18.28.2.45-.01.06.01.24 0 .38z"/>
                </svg>
              </a>
              <a
                href="https://max.ru/id250551557109_biz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-gold transition-colors duration-300"
                aria-label="Max"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 2.17.7 4.18 1.88 5.82L2.5 21.5l3.68-1.38A9.94 9.94 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>
                </svg>
              </a>
              <a
                href="https://vk.com/solhome"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-gold transition-colors duration-300"
                aria-label="ВКонтакте"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.678.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.204.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.49-.085.744-.576.744z"/>
                </svg>
              </a>
            </div>
          </div>
</div>
      </div>
    </footer>
  );
}
