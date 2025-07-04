const features = [
  "Teljes körű omnichannel AI chatbot",
  "Egyszerű integrációt Shoprenter vagy WooCommerce rendszeredhez",
  "Testre szabott chatbot személyiség és válaszadási logika",
  "Magyar nyelvű támogatás és dedikált onboarding",
];
const plans = [
  {
    name: "Alap csomag",
    price: "29 900 Ft/hó",
    limit: "max. 1000 interakció/hó",
    highlight: false,
  },
  {
    name: "Pro csomag",
    price: "59 900 Ft/hó",
    limit: "max. 5000 interakció/hó",
    highlight: true,
  },
  {
    name: "Full csomag",
    price: "Egyedi ajánlat",
    limit: "korlátlan interakció",
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <section className="relative py-20 px-4 flex flex-col items-center bg-transparent">
      <h2 className="text-2xl sm:text-4xl font-bold text-white mb-8 text-center drop-shadow-lg">
        Mit kapsz a ChatBuddy-val már az első hónapban?
      </h2>
      <ul className="mb-12 flex flex-col gap-3 max-w-xl w-full text-slate-200 text-lg">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-3">
            <span className="text-sky-300 text-xl">✔️</span>
            {f}
          </li>
        ))}
      </ul>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full mb-8">
        {plans.map((plan, i) => (
          <div
            key={i}
            className={`flex flex-col items-center p-8 rounded-2xl border shadow-xl backdrop-blur-lg min-h-[220px] transition-transform hover:scale-105 ${
              plan.highlight
                ? "bg-gradient-to-br from-sky-700/60 to-blue-900/40 border-sky-400/40"
                : "bg-white/10 dark:bg-slate-900/40 border-white/10"
            }`}
          >
            <div className="text-xl font-bold text-sky-200 mb-2">{plan.name}</div>
            <div className="text-3xl font-extrabold text-white mb-2">{plan.price}</div>
            <div className="text-slate-300 mb-2">{plan.limit}</div>
            {plan.highlight && (
              <div className="mt-2 px-3 py-1 rounded-full bg-sky-400/20 text-sky-200 text-xs font-semibold">
                Legnépszerűbb
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-6 px-6 py-4 rounded-2xl bg-gradient-to-r from-sky-700/60 to-blue-900/40 border border-sky-400/40 shadow-xl text-center text-lg text-white font-semibold max-w-2xl w-full">
        Foglalj bemutatót most, és az első hónapban ingyenesen kipróbálhatod a Pro csomagot!
      </div>
    </section>
  );
} 