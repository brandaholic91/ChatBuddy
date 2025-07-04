"use client";

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[80vh] px-4 py-16 text-center bg-transparent">
      {/* Glassmorphic háttér */}
      <div className="absolute inset-0 z-0 backdrop-blur-xl bg-white/5 dark:bg-black/20 rounded-3xl border border-white/10 shadow-2xl" aria-hidden="true" />
      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-white via-sky-300 to-blue-500 drop-shadow-lg mb-6">
          Automatizáld ügyfélszolgálatodat akár 60%-kal egy intelligens, magyarul beszélő AI-chatbottal!
        </h1>
        <p className="text-lg sm:text-2xl text-slate-200/90 mb-8 font-medium">
          ChatBuddy: Az első omnichannel chatbot, ami nem csak válaszol, hanem önállóan intézi a rendeléseket, visszaküldéseket és még kampányüzeneteket is küld.
        </p>
        <button className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 text-white font-semibold text-lg shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-200 backdrop-blur-md border border-white/20">
          Ingyenes 20 perces bemutató foglalása
        </button>
        {/* Illusztráció helye */}
        <div className="mt-12 w-full flex justify-center">
          <div className="w-64 h-40 bg-gradient-to-br from-sky-800/40 to-blue-900/30 rounded-2xl border border-white/10 flex items-center justify-center shadow-lg">
            <span className="text-slate-400 text-lg">[AI / Chatbot illusztráció helye]</span>
          </div>
        </div>
      </div>
    </section>
  );
} 