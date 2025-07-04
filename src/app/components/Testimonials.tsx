const testimonials = [
  {
    quote:
      "Az ügyfélszolgálati terhelésünk 55%-kal csökkent, és a vásárlói elégedettségünk is rekordmagas!",
    name: "Kiss Petra",
    title: "CX vezető, StyleWebshop",
  },
  {
    quote:
      "Soha nem gondoltam, hogy chatbot képes lehet önállóan kezelni visszaküldéseket vagy ajánlatokat küldeni. ChatBuddy bebizonyította az ellenkezőjét!",
    name: "Horváth Zsolt",
    title: "ügyvezető, OkosKert.hu",
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-20 px-4 flex flex-col items-center bg-transparent">
      <h2 className="text-2xl sm:text-4xl font-bold text-white mb-12 text-center drop-shadow-lg">
        Ügyfeleink mondták:
      </h2>
      <div className="flex flex-col md:flex-row gap-8 max-w-4xl w-full justify-center items-stretch">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="flex-1 flex flex-col items-center p-8 rounded-2xl bg-white/10 dark:bg-slate-900/40 backdrop-blur-lg border border-white/10 shadow-xl min-h-[180px] relative"
          >
            <span className="text-5xl text-sky-300 mb-4 select-none">"</span>
            <p className="text-lg text-slate-200 font-medium text-center mb-6">{t.quote}</p>
            <div className="text-sky-200 font-semibold text-base mb-1">{t.name}</div>
            <div className="text-slate-400 text-sm">{t.title}</div>
          </div>
        ))}
      </div>
    </section>
  );
} 