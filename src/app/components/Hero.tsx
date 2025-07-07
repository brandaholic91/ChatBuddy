"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const words = ["Elégedettebb", "Boldogabb", "Hűségesebb"];

export default function Hero() {
  const [currentWord, setCurrentWord] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);
  const [showMessages, setShowMessages] = useState(false);
  // 3D tilt state a mockup képhez
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const imgRef = useRef<HTMLImageElement>(null);

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

  function handleTilt(e: React.MouseEvent<HTMLImageElement, MouseEvent>) {
    const rect = imgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 12; // max 12 fok
    const rotateX = -((y - centerY) / centerY) * 12;
    setTilt({ x: rotateX, y: rotateY });
  }
  function resetTilt() {
    setTilt({ x: 0, y: 0 });
  }

  return (
    <section
      className="relative w-full min-h-[32rem] px-1 sm:px-2 md:px-4 pt-2 sm:pt-4 md:pt-8 pb-8 sm:pb-12 md:pb-20 overflow-hidden"
    >
      {/* Tartalom középre igazítva */}
      <div className="relative z-10 max-w-[75rem] mx-auto w-full flex flex-col lg:flex-row items-center justify-center min-h-[32rem] py-6 sm:py-8 md:py-12 px-2 sm:px-4 md:px-8 gap-6 sm:gap-8 md:gap-12 lg:gap-16 pt-12 sm:pt-20 md:pt-32 lg:pt-40">
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
            Turbózd fel az ügyfélszolgálatod egy AI-kollégával, aki 24/7 válaszol minden vásárlói kérdésre. Csökkenő terhelés, növekvő bevétel, már az első naptól.
          </motion.p>
          {/* Gombok */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <button className="cta-animated w-full sm:w-auto button text-sm sm:text-base py-2 px-3 sm:py-3 sm:px-6 relative overflow-hidden">
              Ingyenes 20 perces bemutató foglalása 👉
            </button>
          </motion.div>
        </div>
        {/* Jobb oldal: új chat UI mockup helyett kép */}
        <motion.div
          className="flex-1 flex items-center justify-center w-full mt-8 lg:mt-0"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Image
            ref={imgRef}
            src="/chat.png"
            alt="Chat mockup"
            width={400}
            height={400}
            className="max-w-md w-full mx-auto cursor-pointer"
            style={{
              filter: 'drop-shadow(0 16px 64px rgba(56,189,248,0.45))',
              transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: 'transform 0.25s cubic-bezier(.22,1,.36,1)',
            }}
            onMouseMove={handleTilt}
            onMouseLeave={resetTilt}
          />
        </motion.div>
      </div>
    </section>
  );
} 