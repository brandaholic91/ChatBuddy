import { useState, useEffect, useRef } from "react";
import { useScroll, useTransform } from "framer-motion";
import { motion } from "framer-motion";

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
  // --- Typewriter effekt a címhez ---
  const titleText = "Ügyfeleink mondták";
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

  // --- Kártyák scroll fade-in alulról ---
  const cardRefs = [useRef(null), useRef(null)];
  const cardsProgress = cardRefs.map(ref => useScroll({ target: ref, offset: ["start 0.8", "end 0.5"] }));
  const cardsTransforms = cardsProgress.map(({ scrollYProgress }) => ({
    y: useTransform(scrollYProgress, [0, 1], [80, 0]),
    opacity: useTransform(scrollYProgress, [0, 1], [0, 1]),
  }));

  return (
    <section className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] py-section-y">
      <div className="max-w-4xl w-full mx-auto flex flex-col items-center px-section-x pt-20 pb-10">
        <h2
          ref={titleRef}
          className="flex items-center gap-3 font-bold mb-10 text-center justify-center text-[#f9fafb]"
          style={{ fontWeight: 600, textAlign: 'center', fontSize: 'clamp(2rem, 4vw, 2.8rem)', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 0, color: '#f9fafb' }}
        >
          {(typing || displayed.length > 0) && (
            <span className="text-3xl md:text-4xl lg:text-5xl text-primaryFrom">💬</span>
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
        <div className="flex flex-col md:flex-row gap-8 w-full justify-center items-stretch mt-10">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              ref={cardRefs[i]}
              style={{ y: cardsTransforms[i].y, opacity: cardsTransforms[i].opacity }}
              className="flex-1 flex flex-col items-center rounded-3xl p-8 min-h-[220px] relative transition-transform hover:-translate-y-1 hover:shadow-2xl backdrop-blur-2xl bg-[#020617]/90 border border-white/20 shadow-2xl"
            >
              <span className="text-5xl text-[#f9fafb] mb-4 select-none">"</span>
              <p className="text-lg md:text-xl text-[#f9fafb] font-medium text-center mb-6 leading-relaxed">{t.quote}</p>
              <div className="text-[#f9fafb] font-semibold text-base mb-1">{t.name}</div>
              <div className="text-[#f9fafb] text-sm">{t.title}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 