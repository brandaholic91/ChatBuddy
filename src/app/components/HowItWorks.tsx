const steps = [
  {
    icon: "🔌",
    title: "1. lépés: Egyszerű integráció",
    desc: "Pár kattintással integráljuk webshopodhoz (Shoprenter, WooCommerce kompatibilis), IT szakember bevonása nélkül.",
  },
  {
    icon: "🧠",
    title: "2. lépés: Tanítás & testreszabás",
    desc: "A chatbot megtanulja a GYIK válaszokat, rendelési folyamatokat, és testre szabjuk marketing kampányaidhoz.",
  },
  {
    icon: "🤖",
    title: "3. lépés: Automatikus ügyintézés",
    desc: "ChatBuddy önállóan dolgozik helyetted, napi akár több száz ügyfélkérdésben segít, így csapatod valóban fontos feladatokra koncentrálhat.",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative py-20 px-4 flex flex-col items-center font-[Inter,sans-serif]">
      <h2 className="text-2xl sm:text-4xl font-bold text-[#0f172a] mb-12 text-center drop-shadow-lg">
        Így működik a ChatBuddy 3 egyszerű lépésben:
      </h2>
      <div className="flex flex-col md:flex-row gap-x-8 gap-y-12 max-w-5xl w-full justify-center items-stretch">
        {steps.map((step, i) => (
          <div
            key={i}
            className="flex-1 flex flex-col items-center p-6 md:p-8 rounded-[0.75rem] border border-[#e2e8f0] shadow-lg min-h-[220px] relative"
            style={{boxShadow:'0 2px 8px rgba(0,0,0,0.06)'}}
          >
            <span className="text-4xl mb-4 select-none text-[#3b82f6]">{step.icon}</span>
            <h3 className="text-xl font-semibold text-[#3b82f6] mb-2 text-center">{step.title}</h3>
            <p className="text-[#0f172a] text-base text-center">{step.desc}</p>
            {i < steps.length - 1 && (
              <span className="hidden md:block absolute right-[-32px] top-1/2 -translate-y-1/2 text-4xl text-[#3b82f6]/30">→</span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
} 