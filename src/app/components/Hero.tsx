"use client";

import { useEffect, useState } from "react";
import Aurora from "./Aurora";
import { motion } from "framer-motion";

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
      className="relative w-full min-h-[32rem] py-20 px-8 overflow-hidden"
    >
      {/* Tartalom középre igazítva */}
      <div className="relative z-10 max-w-[75rem] mx-auto w-full flex flex-col lg:flex-row items-center justify-center min-h-[32rem] py-12 px-8 gap-12 lg:gap-16 pt-24 sm:pt-32 md:pt-40 lg:pt-80">
        {/* Bal oldal: szöveg */}
        <div className="flex-1 flex flex-col items-start justify-center max-w-[40rem] px-0 gap-8 w-full">
          {/* 3 soros főcím typewriter effekttel */}
          <motion.h1
            className="w-full break-words text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-bodyText"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
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
          </motion.h1>
          {/* Alcím */}
          <motion.p
            className="w-full text-base sm:text-lg md:text-xl text-subtleText leading-relaxed"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Turbózd fel ügyfélszolgálatod egy AI-kollégával, aki 24/7 válaszol minden vásárlói kérdésre. Csökkenő terhelés, növekvő bevétel, már az első naptól.
          </motion.p>
          {/* Gombok */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <button className="cta-animated w-full sm:w-auto button text-sm sm:text-base py-2 px-3 sm:py-3 sm:px-6 relative overflow-hidden">
              Ingyenes 20 perces bemutató foglalása →
            </button>
          </motion.div>
        </div>
        {/* Jobb oldal: chat UI mockup */}
        <motion.div
          className="flex-1 flex items-center justify-center w-full mt-8 lg:mt-0"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
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
        </motion.div>
      </div>
    </section>
  );
} 