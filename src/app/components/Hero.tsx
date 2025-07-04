"use client";

export default function Hero() {
  return (
    <section
      className="relative min-h-[70vh] w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden p-0 m-0 border-0"
      style={{ position: 'relative', left: '50%', right: '50%', marginLeft: '-50vw', marginRight: '-50vw' }}
    >
      {/* Gradient háttér a teljes szélességben */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 w-screen h-full z-0"
        style={{
          background: "linear-gradient(120deg, #f97316 0%, #ec4899 50%, #8b5cf6 100%)",
          opacity: 0.18,
          filter: "blur(80px)",
        }}
      />
      {/* Tartalom középre igazítva */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center justify-center min-h-[70vh] py-10 sm:py-14 md:py-24 gap-16 lg:gap-2xl">
        {/* Bal oldal: szöveg */}
        <div className="flex-1 flex flex-col items-start justify-center max-w-3xl md:max-w-xl px-4 md:px-0 gap-8 sm:gap-12 w-full">
          <h1 className="headline w-full break-words">
            Fáradt az ügyfélszolgálatod?
          </h1>
          <p className="subheadline w-full">
            Turbózd fel egy AI-kollégával, aki sosem alszik. 24/7 válasz minden csatornán. Csökkenő terhelés, növekvő bevétel, már az első pillanattól.
          </p>
          <button className="button w-full sm:w-auto">
            Ingyenes 20 perces bemutató foglalása →
          </button>
        </div>
        {/* Jobb oldal: chat UI mockup */}
        <div className="flex-1 flex items-center justify-center w-full mt-8 lg:mt-0">
          <div className="w-full max-w-xs sm:max-w-sm md:w-[300px] aspect-[370/420] rounded-[0.75rem] shadow-lg border border-[#3b82f6]/30 bg-white p-0 overflow-hidden">
            {/* Fejléc */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[#f8fafc] border-b border-[#3b82f6]/20">
              <span className="w-7 h-7 rounded-full bg-slate-300/60 flex items-center justify-center text-slate-700 text-lg font-bold">🧑‍💼</span>
              <div className="flex flex-col ml-2">
                <span className="text-sm font-semibold text-[#0f172a]">Ügyfélszolgálat</span>
                <span className="text-xs text-green-500">Online</span>
              </div>
            </div>
            {/* Üzenetek */}
            <div className="flex flex-col gap-3 px-4 py-6 bg-[#f8fafc] min-h-[180px]">
              <div className="flex items-start gap-2">
                <span className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-slate-700 text-base font-bold">👤</span>
                <div className="bg-white text-[#0f172a] px-4 py-2 rounded-xl text-sm max-w-[220px] border border-[#e2e8f0]">Szia! Miben segíthetek?</div>
              </div>
              <div className="flex items-start gap-2 justify-end">
                <div className="bg-[#f1f5f9] text-[#0f172a] px-4 py-2 rounded-xl text-sm max-w-[220px] ml-auto border border-[#3b82f6]/40">Kérdésem lenne a szolgáltatásokról</div>
                <span className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-slate-700 text-base font-bold">👤</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-slate-700 text-base font-bold">👤</span>
                <div className="bg-white text-[#0f172a] px-4 py-2 rounded-xl text-sm max-w-[220px] border border-[#e2e8f0]">Természetesen! Szívesen válaszolok minden kérdésére.</div>
              </div>
            </div>
            {/* Input */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[#f8fafc] border-t border-[#3b82f6]/20">
              <input
                className="flex-1 rounded-lg bg-white text-[#0f172a] px-3 py-2 text-sm border border-[#3b82f6]/20 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
                placeholder="Írj üzenetet..."
                disabled
              />
              <button className="w-9 h-9 rounded-full bg-[#3b82f6] hover:bg-[#2563eb] flex items-center justify-center text-white text-lg shadow-md">
                ➤
              </button>
            </div>
          </div>
        </div>
        {/* Háttér díszítés törölve */}
      </div>
    </section>
  );
} 