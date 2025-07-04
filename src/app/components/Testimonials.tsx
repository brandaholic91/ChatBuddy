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
    <section className="relative py-20 px-4 flex flex-col items-center font-[Inter,sans-serif]">
      <h2 className="text-2xl sm:text-4xl font-bold text-[#0f172a] mb-12 text-center drop-shadow-lg">
        Ügyfeleink mondták:
      </h2>
      <div className="flex flex-col md:flex-row gap-x-8 gap-y-12 max-w-4xl w-full justify-center items-stretch">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="flex-1 flex flex-col items-center p-6 md:p-8 rounded-[0.75rem] border border-[#e2e8f0] shadow-lg min-h-[180px] relative"
            style={{boxShadow:'0 2px 8px rgba(0,0,0,0.06)'}}
          >
            <span className="text-5xl text-[#3b82f6] mb-4 select-none">"</span>
            <p className="text-lg text-[#0f172a] font-medium text-center mb-6">{t.quote}</p>
            <div className="text-[#3b82f6] font-semibold text-base mb-1">{t.name}</div>
            <div className="text-[#64748b] text-sm">{t.title}</div>
          </div>
        ))}
      </div>
    </section>
  );
} 