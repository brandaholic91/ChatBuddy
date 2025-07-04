const problems = [
  {
    text: "Ügyfélszolgálatod túlterhelt a rendelésállapotokról, visszaküldésről, szállításról szóló kérdésekkel?",
  },
  {
    text: "Több csatornán kommunikálsz (Messenger, webchat, WhatsApp) – mégsem látjátok át egyben?",
  },
  {
    text: "Kimaradnak potenciális vásárlók, mert nincs azonnali válasz?",
  },
  {
    text: "Nincs idő follow-up üzenetekre vagy kosárelhagyók visszaszerzésére?",
  },
];

export default function Problem() {
  return (
    <section className="relative py-section-y px-section-x flex flex-col items-center bg-background">
      {/* Cím ikon + gradient szöveg */}
      <h2 className="flex items-center gap-3 text-heading font-bold mb-12 text-center justify-center">
        <span className="text-3xl md:text-4xl lg:text-5xl text-primaryFrom">🪄</span>
        <span className="bg-gradient-to-r from-primaryFrom to-accent bg-clip-text text-transparent">Ismerős helyzetek?</span>
      </h2>
      <div className="flex flex-col gap-6 w-full max-w-2xl">
        {problems.map((p, i) => (
          <div
            key={i}
            className="flex items-center gap-4 bg-foreground rounded-card shadow-card px-6 py-5 md:py-6 md:px-8 min-h-[64px] md:min-h-[72px] transition-transform hover:-translate-y-0.5 hover:shadow-2xl"
          >
            <span className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-primaryFrom to-accent text-white font-bold text-base md:text-lg shadow-md">
              {i + 1}
            </span>
            <span className="text-base md:text-lg text-bodyText font-medium leading-snug">
              {p.text}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-10 w-full flex justify-center">
        <a href="#" className="block text-center text-base md:text-lg font-medium bg-foreground rounded-card px-6 py-4 shadow-card text-highlight hover:text-accent transition-colors">
          → Egy ilyen rendszer naponta órákat, havonta százezreket spórolhat meg neked.
        </a>
      </div>
    </section>
  );
} 