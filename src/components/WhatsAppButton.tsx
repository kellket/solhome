"use client";

export default function WhatsAppButton() {
  return (
    <a
      href="https://max.ru/id250551557109_biz"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Написать в Max"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-transform duration-200 hover:scale-110 hover:shadow-xl"
      style={{ backgroundColor: "#0077FF" }}
    >
      <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 14.5h-1.75l-1.75-3.5-1.75 3.5H8.5l2.5-5-2.5-5h1.75l1.75 3.5 1.75-3.5h1.75l-2.5 5 2.5 5z"/>
      </svg>
    </a>
  );
}
