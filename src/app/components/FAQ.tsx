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
    <section className="relative py-20 px-4 flex flex-col items-center font-[Inter,sans-serif]">
      <h2 className="text-2xl sm:text-4xl font-bold text-[#0f172a] mb-12 text-center drop-shadow-lg">
        Gyakori kérdések:
      </h2>
      <div className="flex flex-col gap-y-8 max-w-2xl w-full mb-12">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="rounded-[0.75rem] border border-[#e2e8f0] shadow-lg p-6 md:p-8 overflow-hidden"
            style={{boxShadow:'0 2px 8px rgba(0,0,0,0.06)'}}
          >
            <button
              className="w-full flex justify-between items-center px-0 py-5 text-lg text-[#3b82f6] font-semibold focus:outline-none"
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
            >
              <span>{faq.q}</span>
              <span className={`ml-4 transition-transform ${open === i ? "rotate-90" : "rotate-0"}`}>▶</span>
            </button>
            {open === i && (
              <div className="pt-4 text-[#0f172a] text-base animate-fade-in">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
      <button className="px-8 py-5 rounded-[0.75rem] bg-[#3b82f6] hover:bg-[#2563eb] text-white font-semibold text-lg shadow-lg border border-[#3b82f6] transition-all duration-200">
        Ne vesztegess több időt manuális ügyintézésre! Foglald le ingyenes, 20 perces bemutatónkat, és kezdd el felszabadítani ügyfélszolgálatodat még ma!
      </button>
    </section>
  );
} 