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
    <section className="relative py-section-y px-section-x flex flex-col items-center bg-background">
      <h2 className="flex items-center gap-3 text-heading font-bold mb-12 text-center justify-center">
        <span className="text-3xl md:text-4xl lg:text-5xl text-primaryFrom">💬</span>
        <span className="bg-gradient-to-r from-accent to-primaryTo bg-clip-text text-transparent">Ügyfeleink mondták</span>
      </h2>
      <div className="flex flex-col md:flex-row gap-8 max-w-4xl w-full justify-center items-stretch">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="flex-1 flex flex-col items-center bg-foreground p-8 rounded-card shadow-card min-h-[220px] relative transition-transform hover:-translate-y-1 hover:shadow-2xl"
          >
            <span className="text-5xl text-primaryFrom mb-4 select-none">"</span>
            <p className="text-lg md:text-xl text-bodyText font-medium text-center mb-6 leading-relaxed">{t.quote}</p>
            <div className="text-accent font-semibold text-base mb-1">{t.name}</div>
            <div className="text-subtleText text-sm">{t.title}</div>
          </div>
        ))}
      </div>
    </section>
  );
} 