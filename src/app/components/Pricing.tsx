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
    <section className="relative py-20 px-4 flex flex-col items-center font-[Inter,sans-serif]">
      <h2 className="text-2xl sm:text-4xl font-bold text-[#0f172a] mb-8 text-center drop-shadow-lg">
        Mit kapsz a ChatBuddy-val már az első hónapban?
      </h2>
      <ul className="mb-12 flex flex-col gap-3 max-w-xl w-full text-[#0f172a] text-lg">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-3">
            <span className="text-[#3b82f6] text-xl">✔️</span>
            {f}
          </li>
        ))}
      </ul>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12 max-w-5xl w-full mb-8">
        {plans.map((plan, i) => (
          <div
            key={i}
            className={`flex flex-col items-center p-6 md:p-8 rounded-[0.75rem] border shadow-lg min-h-[220px] transition-transform hover:scale-105 font-[Inter,sans-serif] ${
              plan.highlight
                ? "border-[#3b82f6]/40"
                : "border-[#e2e8f0]"
            }`}
            style={{boxShadow:'0 2px 8px rgba(0,0,0,0.06)'}}
          >
            <div className="text-xl font-bold text-[#3b82f6] mb-2">{plan.name}</div>
            <div className="text-3xl font-extrabold text-[#0f172a] mb-2">{plan.price}</div>
            <div className="text-[#64748b] mb-2">{plan.limit}</div>
            {plan.highlight && (
              <div className="mt-2 px-3 py-1 rounded-full text-[#3b82f6] text-xs font-semibold border border-[#3b82f6]/40">
                Legnépszerűbb
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-6 px-6 py-4 md:px-8 md:py-6 rounded-[0.75rem] border border-[#3b82f6]/20 shadow-lg text-center text-lg text-[#0f172a] font-semibold max-w-2xl w-full" style={{boxShadow:'0 2px 8px rgba(0,0,0,0.06)'}}>
        Foglalj bemutatót most, és az első hónapban ingyenesen kipróbálhatod a Pro csomagot!
      </div>
    </section>
  );
} 