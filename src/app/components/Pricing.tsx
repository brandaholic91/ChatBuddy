import { useState, useEffect, useRef } from "react";
import { useScroll, useTransform } from "framer-motion";
import { motion } from "framer-motion";

const features = [
  "Teljes körű omnichannel AI chatbot",
  "Egyszerű integrációt Shoprenter vagy WooCommerce rendszeredhez",
  "Testre szabott chatbot személyiség és válaszadási logika",
  "Magyar nyelvű támogatás és dedikált onboarding",
];
const plans = [
  {
    name: "Start",
    price: "35 000 Ft",
    setup: "Egyszeri beállítás: 170 ezer Ft",
    features: [
      "Webchat + rendeléskövetés",
      "GYIK automatikus válaszok",
      "24/7 AI ügyfélszolgálat",
      "Alapvető analytics",
      "Email támogatás",
    ],
    highlight: false,
  },
  {
    name: "Full",
    price: "180 000 Ft",
    setup: "Egyszeri beállítás: 690 ezer Ft",
    features: [
      "Minden Pro funkció",
      "WhatsApp integráció",
      "Kampány workflow",
      "CRM kapcsolat",
      "Dedikált account manager",
      "SLA garancia",
    ],
    highlight: true,
  },
];

export default function Pricing() {
  // --- Typewriter effekt a címhez ---
  const titleText = "Mennyibe kerül a megoldás?";
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

  // --- Alsó infók és CTA scroll fade-in ---
  const infoRef = useRef(null);
  const { scrollYProgress: infoScroll } = useScroll({ target: infoRef, offset: ["start 0.85", "end 0.5"] });
  const infoY = useTransform(infoScroll, [0, 1], [80, 0]);
  const infoOpacity = useTransform(infoScroll, [0, 1], [0, 1]);

  const ctaRef = useRef(null);
  const { scrollYProgress: ctaScroll } = useScroll({ target: ctaRef, offset: ["start 0.85", "end 0.5"] });
  const ctaY = useTransform(ctaScroll, [0, 1], [80, 0]);
  const ctaOpacity = useTransform(ctaScroll, [0, 1], [0, 1]);

  return (
    <section className="relative py-section-y px-section-x flex flex-col items-center">
      <h2
        ref={titleRef}
        className="flex items-center gap-3 font-bold mb-10 text-center justify-center text-[#f9fafb]"
        style={{ color: '#f9fafb', fontWeight: 600, textAlign: 'center', fontSize: 'clamp(2rem, 4vw, 2.8rem)', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 0 }}
      >
        {(typing || displayed.length > 0) && (
          <span className="text-3xl md:text-4xl lg:text-5xl text-primaryFrom">💰</span>
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl w-full mb-10 mt-10">
        {plans.map((plan, i) => (
          <motion.div
            key={i}
            ref={cardRefs[i]}
            style={{ y: cardsTransforms[i].y, opacity: cardsTransforms[i].opacity }}
            className={`flex flex-col items-center rounded-3xl p-12 min-h-[520px] relative transition-transform hover:-translate-y-1 hover:shadow-2xl backdrop-blur-2xl bg-[#020617]/90 border border-white/20 shadow-2xl ${plan.highlight ? '' : ''}`}
          >
            <div className={`text-xl font-bold mb-2 text-[#f9fafb] ${plan.highlight ? 'text-[#7c3aed]' : 'text-primaryFrom'}`}>{plan.name}</div>
            <div className="text-4xl font-extrabold text-[#f9fafb] mb-1">{plan.price}</div>
            <div className="text-[#f9fafb] mb-2">havonta</div>
            <div className="text-[#f9fafb] text-sm mb-4 font-medium">{plan.setup}</div>
            <ul className="flex flex-col gap-2 w-full mb-6">
              {plan.features.map((f, idx) => (
                <li key={idx} className="flex items-center gap-3 text-[#f9fafb] text-base">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-500 text-lg">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <button className="mt-auto w-full bg-[#f9fafb] text-black font-bold rounded-full py-3 px-6 transition-colors duration-200 shadow-lg hover:bg-gradient-to-br hover:from-[#6366f1] hover:to-[#38bdf8] hover:text-white">
              Válaszd ezt a csomagot
            </button>
          </motion.div>
        ))}
      </div>
      <div className="flex flex-col gap-4 w-full max-w-2xl mx-auto">
        <motion.div
          ref={infoRef}
          className="px-6 py-4 rounded-card bg-[#020617]/90 shadow-2xl backdrop-blur-2xl text-[#f9fafb] text-center text-base md:text-lg font-medium"
          style={{ y: infoY, opacity: infoOpacity }}
        >
          <span className="font-semibold">Nincs rejtett költség.</span> Nincs szerver. Nincs LLM API szükséglet.
        </motion.div>
        <motion.div
          ref={ctaRef}
          className="w-full flex justify-center mt-2"
          style={{ y: ctaY, opacity: ctaOpacity }}
        >
          <button
            className="cta-animated w-full sm:w-auto button text-sm sm:text-base py-2 px-3 sm:py-3 sm:px-6 relative overflow-hidden"
            style={{ fontWeight: 600 }}
          >
            Foglalj ingyenes bemutatót! 🎁
          </button>
        </motion.div>
      </div>
    </section>
  );
} 