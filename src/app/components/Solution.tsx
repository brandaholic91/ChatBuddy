import { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const solutions = [
  "Magyarul beszélő, ügyeket önállóan kezelő AI-bot (nem csak FAQ)",
  "Rendelésállapot, visszaküldés, ajánlatadás, kampányüzenet? Megoldja.",
  "Web, Messenger, WhatsApp – egy helyen kezelve",
  "Shoprenter, WooCommerce integráció 1 nap alatt",
  "GDPR-kompatibilis, EU-s adattárolás, SLA-garanciával",
];

export default function Solution() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });

  // Cím animáció: progress 0.05-0.18 között fade-in alulról
  const titleY = useTransform(scrollYProgress, [0.05, 0.18], [80, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0.05, 0.18], [0, 1]);

  // Bal oldali kép: progress 0.12-0.32 között balról fade-in
  const leftX = useTransform(scrollYProgress, [0.12, 0.32], [-200, 0]);
  const leftOpacity = useTransform(scrollYProgress, [0.12, 0.32], [0, 1]);

  // Kártyák: progress lépcsőzetesen, jobbról fade-in
  const cardProgresses = [
    [0.18, 0.34],
    [0.22, 0.38],
    [0.26, 0.42],
    [0.30, 0.46],
    [0.34, 0.50],
  ];
  const cardTransforms = cardProgresses.map(([start, end]) => ({
    x: useTransform(scrollYProgress, [start, end], [200, 0]),
    opacity: useTransform(scrollYProgress, [start, end], [0, 1]),
  }));

  // --- Typewriter effekt a címhez ---
  const titleText = "Miért pont ChatBuddy?";
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(false);
  const titleRef = useRef(null);
  const { scrollYProgress: titleScroll } = useScroll({ target: titleRef, offset: ["start 0.9", "end 0.5"] });
  useEffect(() => {
    const unsubscribe = titleScroll.on("change", (v) => {
      if (v >= 0.1 && !typing && displayed.length === 0) {
        setTyping(true);
      }
    });
    return () => unsubscribe();
  }, [typing, displayed.length, titleScroll]);
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (typing) {
      if (displayed.length < titleText.length) {
        // gyorsabb easeOutIn
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
  }, [displayed, typing]);
  // --- Cím kurzor villogás ---
  const [showCursor, setShowCursor] = useState(true);
  useEffect(() => {
    if (!typing) {
      const interval = setInterval(() => setShowCursor((v) => !v), 500);
      return () => clearInterval(interval);
    } else {
      setShowCursor(true);
    }
  }, [typing]);

  return (
    <section ref={sectionRef} className="relative py-section-y px-section-x flex flex-col items-center bg-background">
      {/* Cím typewriter + kurzor effekt */}
      <h2
        ref={titleRef}
        className="text-center flex items-center gap-3 justify-center mb-10"
        style={{ color: 'black', fontWeight: 600, textAlign: 'center', fontSize: 'clamp(2rem, 4vw, 2.8rem)', lineHeight: 1.1, letterSpacing: '-0.03em' }}
      >
        {(typing || displayed.length > 0) && (
          <span className="text-3xl md:text-4xl lg:text-5xl text-primaryFrom">🤖</span>
        )}
        <span style={{ position: 'relative', display: 'inline-block', minHeight: '1.2em' }}>
          {displayed}
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
        </span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl w-full items-center mt-10">
        {/* Bal oldal: illusztráció animációval */}
        <motion.div
          style={{ x: leftX, opacity: leftOpacity }}
          className="flex justify-center items-center"
        >
          <div className="w-full max-w-[480px] aspect-[1.2/1] rounded-3xl bg-gradient-to-br from-[#f3c6ff] via-[#b6e0fe] to-primaryFrom shadow-card flex items-center justify-center overflow-hidden">
            {/* Itt lehetne kép vagy SVG, most csak placeholder */}
            <span className="text-[2.5rem] md:text-[4rem] lg:text-[5rem] opacity-60">🤖</span>
          </div>
        </motion.div>
        {/* Jobb oldal: checklist kártyák animációval, glassmorphic stílussal */}
        <div className="flex flex-col gap-4 w-full max-w-xl mx-auto">
            {solutions.map((text, i) => (
            <motion.div
              key={i}
              style={{ x: cardTransforms[i].x, opacity: cardTransforms[i].opacity }}
            >
              <div
                className="flex items-center gap-4 rounded-3xl p-6 md:py-6 md:px-8 min-h-[64px] md:min-h-[72px] backdrop-blur-xl bg-[#f9fafb]/60 border border-white/40 shadow-xl"
                style={{boxShadow: '0 8px 32px 0 rgba(0,0,0,0.12)'}}
              >
                <span className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-green-100 text-green-500 text-xl md:text-2xl shadow-sm">
                  ✓
                </span>
                <span className="text-base md:text-lg text-bodyText font-medium leading-snug">
                  {text}
                </span>
              </div>
            </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
} 