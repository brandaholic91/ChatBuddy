'use client';

import { useState } from "react";

const faqs = [
  {
    q: "Valóban magyarul válaszol?",
    a: "Igen, ChatBuddy kifejezetten magyar webshopokra optimalizált, természetes hangzású AI-megoldás.",
  },
  {
    q: "Kompatibilis a Shoprenterrel?",
    a: "Igen, pár kattintással beillesztheted Shoprenter vagy WooCommerce webshopodba, semmilyen technikai tudás nem szükséges hozzá.",
  },
  {
    q: "Mi van, ha nem válik be?",
    a: "Nincs hűségidő, bármikor lemondhatod. Az első hónap teljesen ingyenes!",
  },
  {
    q: "Hol fut?",
    a: "Magyarországi, EU-s szervereken, GDPR-kompatibilisen.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="relative py-section-y px-section-x flex flex-col items-center bg-background">
      <h2 className="flex items-center gap-3 text-heading font-bold mb-12 text-center justify-center">
        <span className="text-3xl md:text-4xl lg:text-5xl text-primaryFrom">❓</span>
        <span className="bg-gradient-to-r from-accent to-primaryTo bg-clip-text text-transparent">Gyakori kérdések</span>
      </h2>
      <div className="flex flex-col gap-6 w-full max-w-2xl mb-12">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="rounded-card bg-foreground shadow-card px-6 py-5 md:py-6 md:px-8 transition-all"
          >
            <button
              className="w-full flex justify-between items-center text-lg md:text-xl font-semibold text-bodyText text-left focus:outline-none"
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
            >
              <span>{faq.q}</span>
              <span className={`ml-4 flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-primaryFrom to-primaryTo text-white text-2xl transition-transform duration-200 ${open === i ? 'rotate-45' : ''}`}>{open === i ? '−' : '+'}</span>
            </button>
            {open === i && (
              <div className="pt-4 text-subtleText text-base animate-fade-in">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
} 