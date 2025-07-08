import { useState, useEffect, useRef } from "react";
import { useScroll, useTransform } from "framer-motion";
import { motion } from "framer-motion";
import Modal from "./ui/Modal";
import ROICalculatorAccordion from "./ROICalculatorAccordion";

const features = [
  "Teljes körű omnichannel AI chatbot",
  "Egyszerű integrációt Shoprenter vagy WooCommerce rendszeredhez",
  "Testre szabott chatbot személyiség és válaszadási logika",
  "Magyar nyelvű támogatás és dedikált onboarding",
];
const plans = [
  {
    name: "AI Start",
    icon: "🟢",
    price: "35 000 Ft / hó",
    setup: "Egyszeri beállítás: 170 000 Ft",
    description: "Ideális kisebb webshopoknak, akik napi 30–100 rendelést kezelnek, és el akarják kezdeni az automatizálást.",
    features: [
      "Webchat + rendeléskövetés",
      "GYIK automatizálása",
      "24/7 AI ügyfélszolgálat",
      "Alap riportok",
      "Email support",
    ],
    recommendation: "Ajánlott: ha most váltanál először AI-ra",
    highlight: false,
  },
  {
    name: "AI Growth",
    icon: "🔵",
    price: "89 000 Ft / hó",
    setup: "Egyszeri beállítás: 390 000 Ft",
    description: "Komolyabb webshopoknak, akik már több csatornán kommunikálnak, és ügyfélszolgálati tehercsökkentést, plusz bevételt várnak.",
    features: [
      "Minden Start funkció",
      "Messenger integráció",
      "Follow-up és upsell üzenetek",
      "Szegmentált ajánlatlogika",
      "Bővített riportok",
      "Prioritásos támogatás",
    ],
    recommendation: "Ajánlott: ha napi 100–300 rendelést kezelsz",
    highlight: false,
  },
  {
    name: "AI Mastery",
    icon: "🟣",
    price: "180 000 Ft / hó",
    setup: "Egyszeri beállítás: 690 000 Ft",
    description: "Komplex, növekedésorientált webshopoknak, akik már omnichannel jelenlétet és automatizált kampánylogikát akarnak.",
    features: [
      "Minden Pro funkció",
      "WhatsApp integráció",
      "Teljes kampány workflow automatizálás",
      "CRM integráció",
      "Dedikált account manager",
      "SLA garancia",
      "Havi stratégiai riport + finomhangolás",
    ],
    recommendation: "Ajánlott: ha szeretnél teljesen AI-alapú ügykezelést és marketing automatizálást",
    highlight: false,
  },
];

export default function Pricing() {
  // --- Typewriter effekt a címhez ---
  const titleText = "Találd meg a számodra legjobb megoldást!";
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
  const cardRef0 = useRef(null);
  const cardRef1 = useRef(null);
  const cardRef2 = useRef(null);
  const cardRefs = [cardRef0, cardRef1, cardRef2];
  const cardProgress0 = useScroll({ target: cardRef0, offset: ["start 0.8", "end 0.5"] });
  const cardProgress1 = useScroll({ target: cardRef1, offset: ["start 0.8", "end 0.5"] });
  const cardProgress2 = useScroll({ target: cardRef2, offset: ["start 0.8", "end 0.5"] });
  const cardsProgress = [cardProgress0, cardProgress1, cardProgress2];
  const cardTransform0 = {
    y: useTransform(cardProgress0.scrollYProgress, [0, 1], [80, 0]),
    opacity: useTransform(cardProgress0.scrollYProgress, [0, 1], [0, 1]),
  };
  const cardTransform1 = {
    y: useTransform(cardProgress1.scrollYProgress, [0, 1], [80, 0]),
    opacity: useTransform(cardProgress1.scrollYProgress, [0, 1], [0, 1]),
  };
  const cardTransform2 = {
    y: useTransform(cardProgress2.scrollYProgress, [0, 1], [80, 0]),
    opacity: useTransform(cardProgress2.scrollYProgress, [0, 1], [0, 1]),
  };
  const cardsTransforms = [cardTransform0, cardTransform1, cardTransform2];

  // --- Alsó infók és CTA scroll fade-in ---
  const infoRef = useRef(null);
  const ctaRef = useRef(null);

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="relative py-section-y px-section-x flex flex-col items-center">
      <div className="flex flex-col items-center mb-2">
        {(typing || displayed.length > 0) && (
          <span className="text-3xl md:text-4xl lg:text-5xl text-primaryFrom mb-2">💰</span>
        )}
        <h2
          ref={titleRef}
          className="font-bold text-center text-[#f9fafb]"
          style={{ color: '#f9fafb', fontWeight: 600, textAlign: 'center', fontSize: 'clamp(2rem, 4vw, 2.8rem)', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 0 }}
        >
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
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl w-full mb-10 mt-10">
        {plans.map((plan, i) => (
          <motion.div
            key={i}
            ref={cardRefs[i]}
            style={{ y: cardsTransforms[i]?.y, opacity: cardsTransforms[i]?.opacity }}
            className={`flex flex-col items-center rounded-3xl p-12 min-h-[540px] relative transition-transform hover:-translate-y-1 hover:shadow-[0_0_32px_0_rgba(255,255,255,0.25)] backdrop-blur-2xl bg-[#020617]/90 border border-white/20 shadow-2xl`}
          >
            <span className="text-4xl mb-2">{plan.icon}</span>
            <div className="text-xl font-bold mb-1 text-[#f9fafb]">{plan.name}</div>
            <div className="text-3xl font-extrabold text-[#f9fafb] mb-1">{plan.price}</div>
            <div className="text-[#f9fafb] mb-2">{plan.setup}</div>
            <div className="text-[#f9fafb] text-sm mb-4 font-medium text-center">{plan.description}</div>
            <ul className="flex flex-col gap-2 w-full mb-4">
              {plan.features.map((f, idx) => (
                <li key={idx} className="flex items-center gap-3 text-[#f9fafb] text-base">
                  <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-500 text-lg">✓</span>
                  <span className="block leading-snug">{f}</span>
                </li>
              ))}
            </ul>
            <div className="text-xs text-[#a78bfa] font-semibold mb-4 mt-6 text-left w-full">🔘 {plan.recommendation}</div>
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
        >
          <span className="font-semibold">Nincs rejtett költség.</span> Nincs tárhelygond. Nincs külön AI-költség.
        </motion.div>
        <motion.div
          ref={ctaRef}
          className="w-full flex justify-center mt-2 relative"
        >
          {modalOpen && (
            <div
              style={{
                position: 'absolute',
                bottom: '110%',
                left: '50%',
                zIndex: 20,
                transform: 'translateX(-50%)',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  background: '#fff',
                  borderRadius: 24,
                  boxShadow: '0 8px 40px #02061733',
                  minWidth: 320,
                  maxWidth: 420,
                  width: '90vw',
                  padding: '2.5rem 2rem 2rem 2rem',
                  fontFamily: "'TT Firs Neue', 'Inter', sans-serif",
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 20,
                  color: '#020617',
                  fontWeight: 600,
                  animation: 'modalIn 0.35s cubic-bezier(.4,2,.6,1)',
                  position: 'relative',
                }}
              >
                <button
                  onClick={() => setModalOpen(false)}
                  style={{
                    position: 'absolute',
                    top: 18,
                    right: 18,
                    background: 'none',
                    border: 'none',
                    fontSize: 26,
                    color: '#a78bfa',
                    cursor: 'pointer',
                    fontWeight: 700,
                    lineHeight: 1,
                    padding: 0,
                    transition: 'color 0.2s',
                  }}
                  aria-label="Bezárás"
                >
                  ×
                </button>
                <div style={{ width: '100%' }}>
                  <ROICalculatorAccordion />
                </div>
                <style>{`
                  @keyframes modalIn {
                    0% { opacity: 0; transform: translateY(40px) scale(0.98); }
                    100% { opacity: 1; transform: translateY(0) scale(1); }
                  }
                `}</style>
              </div>
            </div>
          )}
          <button
            className="cta-animated w-full max-w-xs sm:max-w-none sm:w-auto button text-sm sm:text-base py-2 px-3 sm:py-3 sm:px-6 relative overflow-hidden mx-auto"
            style={{ fontWeight: 600 }}
            onClick={() => setModalOpen((v) => !v)}
          >
            Számold ki, mennyit spórolna neked ChatBuddy 
          </button>
        </motion.div>
      </div>
    </section>
  );
} 
