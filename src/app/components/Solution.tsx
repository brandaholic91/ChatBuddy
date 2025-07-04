const left = [
  { icon: "🤖", text: "Valós idejű rendelésállapot-lekérdezés" },
  { icon: "🔄", text: "Automatikus visszaküldési folyamat indítása" },
  { icon: "🎯", text: "Személyre szabott ajánlatok generálása" },
  { icon: "📢", text: "Kampányüzenetek és follow-up üzenetek küldése" },
];
const right = [
  { icon: "🌐", text: "Webchat, Messenger, WhatsApp egyetlen felületen" },
  { icon: "⚡", text: "Gyors bevezetés és integráció Shoprenter vagy WooCommerce webshopokba, informatikus nélkül" },
  { icon: "🛡️", text: "GDPR-kompatibilis, magyarországi szervereken futó megoldás" },
];

export default function Solution() {
  return (
    <section className="relative py-20 px-4 flex flex-col items-center bg-transparent">
      <h2 className="text-2xl sm:text-4xl font-bold text-white mb-12 text-center drop-shadow-lg">
        Miért a ChatBuddy?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
        <div className="flex flex-col gap-6 p-8 rounded-2xl bg-white/10 dark:bg-slate-900/40 backdrop-blur-lg border border-white/10 shadow-xl">
          <h3 className="text-xl font-semibold text-sky-200 mb-2">Egyetlen magyar chatbot, amely képes önálló ügyintézésre:</h3>
          <ul className="flex flex-col gap-3">
            {left.map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-slate-200 text-lg">
                <span className="text-2xl select-none">{item.icon}</span>
                {item.text}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-6 p-8 rounded-2xl bg-white/10 dark:bg-slate-900/40 backdrop-blur-lg border border-white/10 shadow-xl">
          <h3 className="text-xl font-semibold text-sky-200 mb-2">Integrált, többcsatornás megoldás:</h3>
          <ul className="flex flex-col gap-3">
            {right.map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-slate-200 text-lg">
                <span className="text-2xl select-none">{item.icon}</span>
                {item.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
} 