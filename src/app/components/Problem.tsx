import { GlowEffect } from "./ui/GlowEffect";
import { GlowingEffect } from "./ui/Glowing";
import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import TiltedCard from "./ui/TiltedCard";
import Image from "next/image";
import { useInView } from 'react-intersection-observer';

const problems = [
  {
    text: "Ügyfélszolgálatod túlterhelt a rendelésállapotokról, visszaküldésről, szállításról szóló kérdésekkel?",
  },
  {
    text: "Több csatornán kommunikálsz (Messenger, webchat, WhatsApp) – mégsem látjátok át egyben?",
  },
  {
    text: "Kimaradnak potenciális vásárlók, mert nincs azonnali válasz?",
  },
  {
    text: "Nincs idő follow-up üzenetekre vagy kosárelhagyók visszaszerzésére?",
  },
];

export default function Problem() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });

  // Scroll figyelése: történt-e már görgetés?
  const [hasScrolled, setHasScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 0 && !hasScrolled) setHasScrolled(true);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [hasScrolled]);

  // Cím animáció: progress 0.05-0.25 között fade-in alulról, csak scrollra
  const titleY = useTransform(scrollYProgress, [0.05, 0.25], [80, 0]);
  const rawTitleOpacity = useTransform(scrollYProgress, [0.05, 0.25], [0, 1]);
  const titleOpacity = hasScrolled ? rawTitleOpacity : 0;

  // Kártyák: progress lépcsőzetesen, lentről fade-in
  const cardProgress0 = [0.18, 0.34];
  const cardProgress1 = [0.22, 0.38];
  const cardProgress2 = [0.26, 0.42];
  const cardProgress3 = [0.30, 0.46];
  const cardTransform0 = {
    y: useTransform(scrollYProgress, cardProgress0, [80, 0]),
    opacity: useTransform(scrollYProgress, cardProgress0, [0, 1]),
  };
  const cardTransform1 = {
    y: useTransform(scrollYProgress, cardProgress1, [80, 0]),
    opacity: useTransform(scrollYProgress, cardProgress1, [0, 1]),
  };
  const cardTransform2 = {
    y: useTransform(scrollYProgress, cardProgress2, [80, 0]),
    opacity: useTransform(scrollYProgress, cardProgress2, [0, 1]),
  };
  const cardTransform3 = {
    y: useTransform(scrollYProgress, cardProgress3, [80, 0]),
    opacity: useTransform(scrollYProgress, cardProgress3, [0, 1]),
  };
  const cardTransforms = [cardTransform0, cardTransform1, cardTransform2, cardTransform3];

  // --- Typewriter effekt a címhez ---
  const titleText = "Neked is ismerősek ezek a helyzetek?";
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(false);
  const [typewriterStarted, setTypewriterStarted] = useState(false);
  const { ref: inViewRef, inView } = useInView({ threshold: 0.7, triggerOnce: true });

  useEffect(() => {
    if (hasScrolled && !typewriterStarted) {
      setTyping(true);
      setTypewriterStarted(true);
    }
  }, [hasScrolled, typewriterStarted]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (typing) {
      if (displayed.length < titleText.length) {
        const progress = displayed.length / titleText.length;
        const base = 25; // ms
        const max = 70; // ms
        const ease = base + (max - base) * Math.sin(progress * Math.PI); // easeOutIn
        timeout = setTimeout(() => {
          setDisplayed(titleText.slice(0, displayed.length + 1));
        }, ease);
      } else {
        setTyping(false);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, titleText]);

  // --- Cím kurzor villogás ---
  const [showCursor, setShowCursor] = useState(true);
  useEffect(() => {
    if (!typing && displayed.length > 0) {
      const interval = setInterval(() => setShowCursor((v) => !v), 500);
      return () => clearInterval(interval);
    } else {
      setShowCursor(true);
    }
  }, [typing, displayed.length]);

  return (
    <section ref={sectionRef} className="relative pt-15 pb-16 px-8 flex flex-col items-center bg-background">
      {/* Cím typewriter + kurzor effekt */}
      <div className="text-center mb-10 flex flex-col items-center justify-center">
        <motion.span
          initial={{ opacity: 0, y: 30 }}
          animate={hasScrolled ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: 0 }}
          className="text-3xl md:text-4xl lg:text-5xl text-primaryFrom mb-2"
        >
          ❓
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={hasScrolled ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="font-bold"
          style={{ color: 'black', fontWeight: 600, textAlign: 'center', marginBottom: '0.5rem', fontSize: 'clamp(2rem, 4vw, 2.8rem)', lineHeight: 1.1, letterSpacing: '-0.03em' }}
        >
          <span style={{ position: 'relative', display: 'inline-block', minHeight: '1.2em' }}>
            {displayed}
            {displayed.length > 0 && (
              <span style={{
                background: 'linear-gradient(90deg, #a78bfa, #38bdf8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block',
                marginLeft: 2,
                opacity: showCursor ? 1 : 0,
                transition: 'opacity 0.2s',
                filter: typing ? 'blur(2px)' : 'none',
              }}>
                |
              </span>
            )}
          </span>
        </motion.h2>
      </div>
      <div className="w-full max-w-[800px] mx-auto mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-0 gap-y-10 w-full justify-center items-center justify-items-center">
          {/* 1. kártya */}
          <div className="relative w-[370px] h-[500px] flex justify-center">
            <motion.div
              className="relative z-10 flex flex-col items-center justify-center h-full w-full"
              style={{ y: cardTransforms[0].y, opacity: cardTransforms[0].opacity }}
            >
              <GlowingEffect glow={true} spread={32} blur={12} borderWidth={18} proximity={300} inactiveZone={0} disabled={false} className="z-10" variant="default" />
              <div className="bg-white border-2 border-[#ececec] rounded-2xl shadow-2xl flex flex-col items-center justify-start w-full h-full p-6 box-border flex flex-col relative z-20">
                <Image
                  src="/pic1.png"
                  alt="Folyamatosan túl van terhelve az ügyfélszolgálatod a rendelésekkel, visszaküldésekkel és szállítási kérdésekkel kapcsolatos ismétlődő megkeresésektől?"
                  width={220}
                  height={220}
                  className="mb-10 block mx-auto rounded-[2rem] w-[220px] h-[220px] object-contain"
                />
                <div className="w-full text-center text-gray-800 text-base font-medium px-2">
                  Folyamatosan túl van terhelve az ügyfélszolgálatod a rendelésekkel, visszaküldésekkel és szállítási kérdésekkel kapcsolatos ismétlődő megkeresésektől?
                </div>
              </div>
            </motion.div>
          </div>
          {/* 2. kártya */}
          <div className="relative w-[370px] h-[500px] flex justify-center">
            <motion.div
              className="relative z-10 flex flex-col items-center justify-center h-full w-full"
              style={{ y: cardTransforms[1].y, opacity: cardTransforms[1].opacity }}
            >
              <GlowingEffect glow={true} spread={32} blur={12} borderWidth={18} proximity={300} inactiveZone={0} disabled={false} className="z-10" variant="default" />
              <div className="bg-white border-2 border-[#ececec] rounded-2xl shadow-2xl flex flex-col items-center justify-start w-full h-full p-6 box-border flex flex-col relative z-20">
                <Image
                  src="/pic2.png"
                  alt="Kihívást jelent számotokra, hogy átlássátok a különböző csatornákon – például Messengeren, webchatben vagy e-mailben – beérkező vásárlói kérdéseket egyetlen rendszerben?"
                  width={220}
                  height={220}
                  className="mb-10 block mx-auto rounded-[2rem] w-[220px] h-[220px] object-contain"
                />
                <div className="w-full text-center text-gray-800 text-base font-medium px-2">
                  Kihívást jelent számotokra, hogy átlássátok a különböző csatornákon – például Messengeren, webchatben vagy e-mailben – beérkező vásárlói kérdéseket egyetlen rendszerben?
                </div>
              </div>
            </motion.div>
          </div>
          {/* 3. kártya */}
          <div className="relative w-[370px] h-[500px] flex justify-center">
            <motion.div
              className="relative z-10 flex flex-col items-center justify-center h-full w-full"
              style={{ y: cardTransforms[2].y, opacity: cardTransforms[2].opacity }}
            >
              <GlowingEffect glow={true} spread={32} blur={12} borderWidth={18} proximity={300} inactiveZone={0} disabled={false} className="z-10" variant="default" />
              <div className="bg-white border-2 border-[#ececec] rounded-2xl shadow-2xl flex flex-col items-center justify-start w-full h-full p-6 box-border flex flex-col relative z-20">
                <Image
                  src="/pic3.png"
                  alt="Úgy érzed, hogy rengeteg potenciális vásárlót veszítetek el csak azért, mert nem tudtok időben reagálni a beérkező kérdésekre vagy érdeklődésekre?"
                  width={220}
                  height={220}
                  className="mb-10 block mx-auto rounded-[2rem] w-[220px] h-[220px] object-contain"
                />
                <div className="w-full text-center text-gray-800 text-base font-medium px-2">
                  Úgy érzed, hogy rengeteg potenciális vásárlót veszítetek el csak azért, mert nem tudtok időben reagálni a beérkező kérdésekre vagy érdeklődésekre?
                </div>
              </div>
            </motion.div>
          </div>
          {/* 4. kártya */}
          <div className="relative w-[370px] h-[500px] flex justify-center">
            <motion.div
              className="relative z-10 flex flex-col items-center justify-center h-full w-full"
              style={{ y: cardTransforms[3].y, opacity: cardTransforms[3].opacity }}
            >
              <GlowingEffect glow={true} spread={32} blur={12} borderWidth={18} proximity={300} inactiveZone={0} disabled={false} className="z-10" variant="default" />
              <div className="bg-white border-2 border-[#ececec] rounded-2xl shadow-2xl flex flex-col items-center justify-start w-full h-full p-6 box-border flex flex-col relative z-20">
                <Image
                  src="/pic4.png"
                  alt="Hiába tudnátok több vásárlót visszahozni a kosárelhagyásból, nincs elég idő vagy rendszer arra, hogy automatikus utánkövető üzeneteket küldjetek nekik?"
                  width={220}
                  height={220}
                  className="mb-10 block mx-auto rounded-[2rem] w-[220px] h-[220px] object-contain"
                />
                <div className="w-full text-center text-gray-800 text-base font-medium px-2">
                  Hiába tudnátok több vásárlót visszahozni a kosárelhagyásból, nincs elég idő vagy rendszer arra, hogy automatikus utánkövető üzeneteket küldjetek nekik?
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <div className="mt-32 w-full flex justify-center">

      </div>
    </section>
  );
}

// GlowCard komponens: pulzáló GlowEffect, hoverre erősebb fény és smooth zoom
function GlowCard({ children }: { children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      animate={{ scale: hovered ? 1.10 : 1 }}
      transition={{ scale: { type: "tween", duration: 0.18, ease: "easeInOut" } }}
      className={
        `relative shadow-xl p-0 flex flex-col items-center min-h-[340px] overflow-visible rounded-2xl transition-transform duration-300`
      }
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <GlowEffect
        colors={["#a78bfa", "#38bdf8", "#6366f1", "#a78bfa"]}
        mode={hovered ? "pulse" : "breathe"}
        blur={hovered ? "stronger" : "strong"}
        scale={1}
        duration={hovered ? 2.5 : 7}
        className="absolute inset-0 mx-auto my-auto z-0"
        style={{ opacity: hovered ? 0.6 : 0.33 }}
      />
      {children}
    </motion.div>
  );
} 