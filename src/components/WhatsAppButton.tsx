"use client";

export default function WhatsAppButton() {
  return (
    <a
      href="https://max.ru/id250551557109_biz"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Написать в Max"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-transform duration-200 hover:scale-110 hover:shadow-xl bg-gradient-to-br from-[#7B68EE] via-[#4F7FFF] to-[#00D4FF]"
    >
      <svg viewBox="0 0 24 24" fill="white" className="w-8 h-8">
        <path d="M12 2C6.48 2 2 6.48 2 12c0 2.17.7 4.18 1.88 5.82L2.5 21.5l3.68-1.38A9.94 9.94 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>
      </svg>
    </a>
  );
}
