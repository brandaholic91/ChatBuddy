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
    <section className="relative py-20 px-4 flex flex-col items-center bg-transparent">
      <h2 className="text-2xl sm:text-4xl font-bold text-white mb-12 text-center drop-shadow-lg">
        Így működik a ChatBuddy 3 egyszerű lépésben:
      </h2>
      <div className="flex flex-col md:flex-row gap-8 max-w-5xl w-full justify-center items-stretch">
        {steps.map((step, i) => (
          <div
            key={i}
            className="flex-1 flex flex-col items-center p-8 rounded-2xl bg-white/10 dark:bg-slate-900/40 backdrop-blur-lg border border-white/10 shadow-xl min-h-[220px] relative"
          >
            <span className="text-4xl mb-4 select-none">{step.icon}</span>
            <h3 className="text-xl font-semibold text-sky-200 mb-2 text-center">{step.title}</h3>
            <p className="text-slate-200 text-base text-center">{step.desc}</p>
            {i < steps.length - 1 && (
              <span className="hidden md:block absolute right-[-32px] top-1/2 -translate-y-1/2 text-4xl text-sky-400/40">→</span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
} 