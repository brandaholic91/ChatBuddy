const steps = [
  {
    icon: <svg width="48" height="48" fill="none" viewBox="0 0 48 48"><linearGradient id="linkGradient" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse"><stop stopColor="#a78bfa"/><stop offset="1" stopColor="#38bdf8"/></linearGradient><path d="M32 16a6 6 0 0 0-6-6h-4a6 6 0 0 0 0 12h4a6 6 0 0 0 6-6Zm-6 10h-4a6 6 0 0 0 0 12h4a6 6 0 0 0 0-12Z" stroke="url(#linkGradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/><path d="M20 24h8" stroke="url(#linkGradient)" strokeWidth="3" strokeLinecap="round"/></svg>,
    title: "Kapcsolódás",
    desc: "Webshophoz való csatlakozás 1 nap alatt (plugin vagy API)",
  },
  {
    icon: <svg width="48" height="48" fill="none" viewBox="0 0 48 48"><linearGradient id="brainGradient" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse"><stop stopColor="#a78bfa"/><stop offset="1" stopColor="#38bdf8"/></linearGradient><ellipse cx="24" cy="24" rx="14" ry="10" fill="url(#brainGradient)"/><ellipse cx="24" cy="24" rx="10" ry="7" fill="#fff" fillOpacity=".3"/></svg>,
    title: "Betanítás",
    desc: "Tudásbázis, GYIK, rendeléslogika beépítése",
  },
  {
    icon: <svg width="48" height="48" fill="none" viewBox="0 0 48 48"><linearGradient id="rocketGradient" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse"><stop stopColor="#a78bfa"/><stop offset="1" stopColor="#38bdf8"/></linearGradient><path d="M24 4l6 12h-4v8h-4v-8h-4l6-12Z" fill="url(#rocketGradient)"/><ellipse cx="24" cy="40" rx="4" ry="2" fill="#a78bfa"/></svg>,
    title: "Indítás & Automatikus Ügyintézés",
    desc: "A ChatBuddy önállóan dolgozik, figyel, ajánl, kommunikál",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative py-section-y px-section-x flex flex-col items-center bg-background">
      {/* Cím gradientdel és ikonnal */}
      <h2 className="flex items-center gap-3 text-heading font-bold mb-12 text-center justify-center">
        <span className="text-3xl md:text-4xl lg:text-5xl text-primaryFrom">🛠️</span>
        <span className="bg-gradient-to-r from-accent to-primaryTo bg-clip-text text-transparent">3 lépés a teljes automatizálásig</span>
      </h2>
      {/* Lépések kártyákban */}
      <div className="flex flex-col md:flex-row gap-8 max-w-5xl w-full justify-center items-stretch">
        {steps.map((step, i) => (
          <div
            key={i}
            className="flex-1 flex flex-col items-center bg-foreground p-8 rounded-card shadow-card min-h-[280px] relative transition-transform hover:-translate-y-1 hover:shadow-2xl"
          >
            <div className="mb-4">{step.icon}</div>
            <span className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-primaryFrom to-primaryTo text-white font-bold text-base md:text-lg shadow-md mb-2">{i + 1}</span>
            <h3 className="text-lg md:text-xl font-bold mb-2 text-center bg-gradient-to-r from-accent to-primaryTo bg-clip-text text-transparent">
              {step.title}
            </h3>
            <p className="text-subtleText text-base text-center">{step.desc}</p>
          </div>
        ))}
      </div>
      {/* Kiemelt alsó kártya linkkel */}
      <div className="mt-10 w-full flex justify-center">
        <div className="flex items-center gap-3 bg-foreground rounded-card px-6 py-4 shadow-card">
          <span className="text-xl text-primaryFrom">💬</span>
          <span className="text-base md:text-lg font-medium text-highlight">
            <a href="#" className="hover:underline">Élő demo:</a> Nézd meg, hogyan dolgozik a ChatBuddy a saját webshopodban!
          </span>
        </div>
      </div>
    </section>
  );
} 