const solutions = [
  "Magyarul beszélő, ügyeket önállóan kezelő AI-bot (nem csak FAQ)",
  "Rendelésállapot, visszaküldés, ajánlatadás, kampányüzenet? Megoldja.",
  "Web, Messenger, WhatsApp – egy helyen kezelve",
  "Shoprenter, WooCommerce integráció 1 nap alatt",
  "GDPR-kompatibilis, EU-s adattárolás, SLA-garanciával",
];

export default function Solution() {
  return (
    <section className="relative py-section-y px-section-x flex flex-col items-center bg-background">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl w-full items-center">
        {/* Bal oldal: illusztráció vagy gradient box helyettesítő */}
        <div className="flex justify-center items-center">
          <div className="w-full max-w-[480px] aspect-[1.2/1] rounded-3xl bg-gradient-to-br from-[#f3c6ff] via-[#b6e0fe] to-primaryFrom shadow-card flex items-center justify-center overflow-hidden">
            {/* Itt lehetne kép vagy SVG, most csak placeholder */}
            <span className="text-[2.5rem] md:text-[4rem] lg:text-[5rem] opacity-60">🤖</span>
          </div>
        </div>
        {/* Jobb oldal: checklist kártyákban */}
        <div className="flex flex-col gap-6 w-full max-w-xl mx-auto">
          <h2 className="flex items-center gap-3 text-heading font-bold mb-6 text-center md:text-left justify-center md:justify-start">
            <span className="text-3xl md:text-4xl lg:text-5xl text-primaryFrom">🧬</span>
            <span className="bg-gradient-to-r from-accent to-primaryTo bg-clip-text text-transparent">Miért pont a ChatBuddy?</span>
          </h2>
          <div className="flex flex-col gap-4">
            {solutions.map((text, i) => (
              <div key={i} className="flex items-center gap-4 bg-foreground rounded-card shadow-card px-6 py-5 md:py-6 md:px-8 min-h-[64px] md:min-h-[72px]">
                <span className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-green-100 text-green-500 text-xl md:text-2xl shadow-sm">
                  ✓
                </span>
                <span className="text-base md:text-lg text-bodyText font-medium leading-snug">
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 