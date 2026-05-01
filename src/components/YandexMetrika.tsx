"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const METRIKA_ID = 108999852;

declare global {
  interface Window {
    ym: (id: number, action: string, params?: Record<string, unknown>) => void;
  }
}

export default function YandexMetrika() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const script = document.createElement("script");
    script.innerHTML = `
      (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
      m[i].l=1*new Date();
      for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
      k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
      (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

      ym(${METRIKA_ID}, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true
      });
    `;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (typeof window.ym !== "undefined") {
      window.ym(METRIKA_ID, "hit", { url: pathname + (searchParams?.toString() || "") });
    }
  }, [pathname, searchParams]);

  return (
    <noscript>
      <div>
        <img
          src={`https://mc.yandex.ru/watch/${METRIKA_ID}`}
          style={{ position: "absolute", left: "-9999px" }}
          alt=""
        />
      </div>
    </noscript>
  );
}
