const features = [
  "Teljes körű omnichannel AI chatbot",
  "Egyszerű integrációt Shoprenter vagy WooCommerce rendszeredhez",
  "Testre szabott chatbot személyiség és válaszadási logika",
  "Magyar nyelvű támogatás és dedikált onboarding",
];
const plans = [
  {
    name: "Start",
    price: "35 000 Ft",
    setup: "Egyszeri beállítás: 170 ezer Ft",
    features: [
      "Webchat + rendeléskövetés",
      "GYIK automatikus válaszok",
      "24/7 AI ügyfélszolgálat",
      "Alapvető analytics",
      "Email támogatás",
    ],
    highlight: false,
  },
  {
    name: "Full",
    price: "180 000 Ft",
    setup: "Egyszeri beállítás: 690 ezer Ft",
    features: [
      "Minden Pro funkció",
      "WhatsApp integráció",
      "Kampány workflow",
      "CRM kapcsolat",
      "Dedikált account manager",
      "SLA garancia",
    ],
    highlight: true,
  },
];

export default function Pricing() {
  return (
    <section className="relative py-section-y px-section-x flex flex-col items-center bg-background">
      <h2 className="flex items-center gap-3 text-heading font-bold mb-12 text-center justify-center">
        <span className="text-3xl md:text-4xl lg:text-5xl text-primaryFrom">💰</span>
        <span className="bg-gradient-to-r from-accent to-primaryTo bg-clip-text text-transparent">Mit kapsz, mennyiért?</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl w-full mb-10">
        {plans.map((plan, i) => (
          <div
            key={i}
            className={`flex flex-col items-center bg-foreground p-10 rounded-card shadow-card min-h-[420px] relative transition-transform hover:-translate-y-1 hover:shadow-2xl ${plan.highlight ? '' : ''}`}
          >
            <div className={`text-xl font-bold mb-2 ${plan.highlight ? 'text-[#7c3aed]' : 'text-primaryFrom'}`}>{plan.name}</div>
            <div className="text-4xl font-extrabold text-bodyText mb-1">{plan.price}</div>
            <div className="text-subtleText mb-2">havonta</div>
            <div className="text-subtleText text-sm mb-4 font-medium">{plan.setup}</div>
            <ul className="flex flex-col gap-2 w-full mb-6">
              {plan.features.map((f, idx) => (
                <li key={idx} className="flex items-center gap-3 text-bodyText text-base">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-500 text-lg">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <button className="mt-auto w-full button">
              Válaszd ezt a csomagot
            </button>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-4 w-full max-w-2xl mx-auto">
        <div className="px-6 py-4 rounded-card bg-foreground shadow-card text-center text-base md:text-lg font-medium text-primaryFrom">
          <span className="font-semibold">Nincs rejtett költség.</span> Nincs szerver. Nincs LLM API szükséglet.
        </div>
        <div className="px-6 py-4 rounded-card bg-gradient-to-r from-primaryFrom to-primaryTo shadow-card text-center text-base md:text-lg font-semibold text-white">
          <span className="font-bold">Foglalj bemutatót – 1 hónap ingyenes Pro próba! 🎁</span>
        </div>
      </div>
    </section>
  );
} 