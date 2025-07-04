"use client";

import { useEffect, useState } from "react";

const words = ["Elégedettebb", "Boldogabb", "Hűségesebb"];

export default function Hero() {
  const [currentWord, setCurrentWord] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (typing) {
      if (displayed.length < words[currentWord].length) {
        timeout = setTimeout(() => {
          setDisplayed(words[currentWord].slice(0, displayed.length + 1));
        }, 80);
      } else {
        setTyping(false);
      }
    } else {
      timeout = setTimeout(() => {
        setTyping(true);
        setDisplayed("");
        setCurrentWord((prev) => (prev + 1) % words.length);
      }, 2000);
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, currentWord]);

  return (
    <section
      className="relative min-h-[70vh] w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden p-0 m-0 border-0 bg-background"
      style={{ position: 'relative', left: '50%', right: '50%', marginLeft: '-50vw', marginRight: '-50vw' }}
    >
      {/* Tartalom középre igazítva */}
      <div className="relative z-10 max-w-[1200px] mx-auto w-full flex flex-col lg:flex-row items-center justify-center min-h-[70vh] py-section-y px-section-x gap-16 lg:gap-8">
        {/* Bal oldal: szöveg */}
        <div className="flex-1 flex flex-col items-start justify-center max-w-2xl px-0 gap-10 w-full">
          {/* 3 soros főcím typewriter effekttel */}
          <h1 className="w-full break-words text-[clamp(2rem,5vw,4rem)] font-bold leading-tight text-bodyText">
            <span className="inline-block min-h-[1.2em]">
              {displayed}
              {typing ? (
                <span style={{
                  background: 'linear-gradient(90deg, #a78bfa, #38bdf8)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block',
                }}>
                  |
                </span>
              ) : (
                <span className="typewriter-cursor" style={{
                  background: 'linear-gradient(90deg, #a78bfa, #38bdf8)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block',
                }}>
                  |
                </span>
              )}
            </span>
            <br />
            vásárlókat
            <br />
            szeretnél?
          </h1>
          {/* Alcím */}
          <p className="w-full text-lg text-subtleText leading-relaxed">
            Turbózd fel ügyfélszolgálatodat egy AI-kollégával, aki 24/7 válaszol minden vásárlói kérdésre. Csökkenő terhelés, növekvő bevétel, már az első naptól.
          </p>
          {/* Gombok */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button className="w-full sm:w-auto button">
              Ingyenes 20 perces bemutató foglalása →
            </button>
          </div>
        </div>
        {/* Jobb oldal: chat UI mockup */}
        <div className="flex-1 flex items-center justify-center w-full mt-8 lg:mt-0">
          <div className="w-full max-w-xs sm:max-w-sm md:w-[320px] aspect-[370/420] rounded-card shadow-card border border-divider bg-foreground p-0 overflow-hidden">
            {/* Fejléc */}
            <div className="flex items-center gap-3 px-4 py-4 bg-background border-b border-divider">
              <span className="w-8 h-8 rounded-full bg-gradient-to-r from-primaryFrom to-primaryTo flex items-center justify-center text-white text-sm font-bold">🤖</span>
              <div className="flex flex-col ml-2">
                <span className="text-sm font-semibold text-bodyText">AI Ügyfélszolgálat</span>
                <span className="text-xs text-green-500 font-medium">Online</span>
              </div>
            </div>
            {/* Üzenetek */}
            <div className="flex flex-col gap-3 px-4 py-6 bg-background min-h-[180px]">
              <div className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-full bg-badgeBg flex items-center justify-center text-subtleText text-sm font-medium">👤</span>
                <div className="bg-foreground text-bodyText px-4 py-3 rounded-xl text-sm max-w-[220px] border border-divider shadow-sm">
                  Szia! Miben segíthetek?
                </div>
              </div>
              <div className="flex items-start gap-3 justify-end">
                <div className="bg-gradient-to-r from-primaryFrom to-primaryTo text-white px-4 py-3 rounded-xl text-sm max-w-[220px] ml-auto shadow-sm">
                  Kérdésem lenne a szolgáltatásokról
                </div>
                <span className="w-7 h-7 rounded-full bg-badgeBg flex items-center justify-center text-subtleText text-sm font-medium">👤</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-full bg-badgeBg flex items-center justify-center text-subtleText text-sm font-medium">🤖</span>
                <div className="bg-foreground text-bodyText px-4 py-3 rounded-xl text-sm max-w-[220px] border border-divider shadow-sm">
                  Természetesen! Szívesen válaszolok minden kérdésére.
                </div>
              </div>
            </div>
            {/* Input */}
            <div className="flex items-center gap-3 px-4 py-4 bg-background border-t border-divider">
              <input
                className="flex-1 rounded-lg bg-foreground text-bodyText px-4 py-3 text-sm border border-divider focus:outline-none focus:ring-2 focus:ring-highlight focus:border-transparent transition-all"
                placeholder="Írj üzenetet..."
                disabled
              />
              <button className="w-10 h-10 rounded-full bg-gradient-to-r from-primaryFrom to-primaryTo hover:shadow-xl flex items-center justify-center text-white text-lg transition-all duration-200 hover:-translate-y-0.5">
                ➤
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 