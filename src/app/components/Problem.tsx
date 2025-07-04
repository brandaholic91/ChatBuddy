const problems = [
  {
    icon: "💬",
    text: "Ügyfélszolgálatod napi szinten túlterhelt egyszerű, ismétlődő kérdésekkel?",
  },
  {
    icon: "📱",
    text: "Több csatornán kommunikáltok (Messenger, WhatsApp, webchat), de ezek kezelése káoszos?",
  },
  {
    icon: "⏳",
    text: "A manuális ügyintézés (rendelések, visszaküldések, ajánlatküldés) pontatlan és időigényes?",
  },
  {
    icon: "💸",
    text: "Potenciális bevételt veszítesz, mert nincs idő kosárelhagyók és kampányok utánkövetésére?",
  },
];

export default function Problem() {
  return (
    <section className="relative py-20 px-4 flex flex-col items-center bg-transparent">
      <h2 className="text-2xl sm:text-4xl font-bold text-white mb-12 text-center drop-shadow-lg">
        Felismersz ezek közül valamit?
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl w-full">
        {problems.map((p, i) => (
          <div
            key={i}
            className="relative flex flex-col items-center justify-center p-8 rounded-2xl bg-white/10 dark:bg-slate-900/40 backdrop-blur-lg border border-white/10 shadow-xl min-h-[180px] transition-transform hover:scale-105"
          >
            <span className="text-4xl mb-4 select-none">{p.icon}</span>
            <span className="text-lg text-slate-200 font-medium text-center">
              {p.text}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
} 