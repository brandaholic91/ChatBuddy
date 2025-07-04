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
    <section className="relative py-20 px-4 flex flex-col items-center font-[Inter,sans-serif]">
      <h2 className="text-2xl sm:text-4xl font-bold text-[#0f172a] mb-12 text-center drop-shadow-lg">
        Felismersz ezek közül valamit?
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12 max-w-4xl w-full">
        {problems.map((p, i) => (
          <div
            key={i}
            className="relative flex flex-col items-center justify-center p-6 md:p-8 rounded-[0.75rem] border border-[#e2e8f0] shadow-lg min-h-[180px] transition-transform hover:scale-105"
            style={{boxShadow:'0 2px 8px rgba(0,0,0,0.06)'}}
          >
            <span className="text-4xl mb-4 select-none text-[#3b82f6]">{p.icon}</span>
            <span className="text-lg text-[#0f172a] font-medium text-center">
              {p.text}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
} 