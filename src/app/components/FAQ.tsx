'use client';

import { useState } from "react";

const faqs = [
  {
    q: "Valóban tud magyarul válaszolni?",
    a: "Igen, ChatBuddy kifejezetten magyar webshopokra optimalizált, természetes hangzású AI-megoldás.",
  },
  {
    q: "Bonyolult az integráció?",
    a: "Nem, pár kattintással beillesztheted webshopodba, semmilyen technikai tudás nem szükséges hozzá.",
  },
  {
    q: "GDPR kompatibilis a rendszeretek?",
    a: "Teljes mértékben. Magyarországi szervereken futunk, és teljes dokumentációt biztosítunk.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="relative py-20 px-4 flex flex-col items-center bg-transparent">
      <h2 className="text-2xl sm:text-4xl font-bold text-white mb-12 text-center drop-shadow-lg">
        Gyakori kérdések:
      </h2>
      <div className="flex flex-col gap-6 max-w-2xl w-full mb-12">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="rounded-2xl bg-white/10 dark:bg-slate-900/40 backdrop-blur-lg border border-white/10 shadow-xl overflow-hidden"
          >
            <button
              className="w-full flex justify-between items-center px-6 py-5 text-lg text-sky-200 font-semibold focus:outline-none"
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
            >
              <span>{faq.q}</span>
              <span className={`ml-4 transition-transform ${open === i ? "rotate-90" : "rotate-0"}`}>▶</span>
            </button>
            {open === i && (
              <div className="px-6 pb-5 text-slate-200 text-base animate-fade-in">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
      <button className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 text-white font-semibold text-lg shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-200 backdrop-blur-md border border-white/20">
        Ne vesztegess több időt manuális ügyintézésre! Foglald le ingyenes, 20 perces bemutatónkat, és kezdd el felszabadítani ügyfélszolgálatodat még ma!
      </button>
    </section>
  );
} 