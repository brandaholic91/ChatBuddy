import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const steps = [
  {
    icon: <svg width="48" height="48" fill="none" viewBox="0 0 48 48"><linearGradient id="linkGradient" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse"><stop stopColor="#a78bfa"/><stop offset="1" stopColor="#38bdf8"/></linearGradient><path d="M32 16a6 6 0 0 0-6-6h-4a6 6 0 0 0 0 12h4a6 6 0 0 0 6-6Zm-6 10h-4a6 6 0 0 0 0 12h4a6 6 0 0 0 0-12Z" stroke="url(#linkGradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/><path d="M20 24h8" stroke="url(#linkGradient)" strokeWidth="3" strokeLinecap="round"/></svg>,
    title: "Kapcsolódás",
    desc: "Webshophoz való csatlakozás 1 nap alatt (plugin vagy API)",
  },
  {
    icon: <svg width="48" height="48" fill="none" viewBox="0 0 48 48"><linearGradient id="brainGradient" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse"><stop stopColor="#a78bfa"/><stop offset="1" stopColor="#38bdf8"/></linearGradient><ellipse cx="24" cy="24" rx="14" ry="10" fill="url(#brainGradient)"/><ellipse cx="24" cy="24" rx="10" ry="7" fill="#fff" fillOpacity=".3"/></svg>,
    title: "Betanítás",
    desc: "Tudásbázis, GYIK, rendeléslogika beépítése",
  },
  {
    icon: <svg width="48" height="48" fill="none" viewBox="0 0 48 48"><linearGradient id="rocketGradient" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse"><stop stopColor="#a78bfa"/><stop offset="1" stopColor="#38bdf8"/></linearGradient><path d="M24 4l6 12h-4v8h-4v-8h-4l6-12Z" fill="url(#rocketGradient)"/><ellipse cx="24" cy="40" rx="4" ry="2" fill="#a78bfa"/></svg>,
    title: "Indítás & Automatikus Ügyintézés",
    desc: "A ChatBuddy önállóan dolgozik, figyel, ajánl, kommunikál",
  },
];

export default function HowItWorks() {
  const cardRefs = [useRef(null), useRef(null), useRef(null)];
  // Minden kártyához külön progress
  const cardsProgress = cardRefs.map(ref => useScroll({ target: ref, offset: ["start 0.8", "end 0.5"] }));
  const cardRanges = [
    [0, 0.33],
    [0.33, 0.66],
    [0.66, 1],
  ];
  const cardsTransforms = cardsProgress.map(({ scrollYProgress }, i) => ({
    x: useTransform(scrollYProgress, cardRanges[i], [-120, 0]),
    opacity: useTransform(scrollYProgress, cardRanges[i], [0, 1]),
  }));

  // --- Typewriter effekt a címhez ---
  const titleText = "3 lépés a teljes automatizálásig";
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
  // --- Alsó CTA gomb scroll fade-in ---
  const ctaRef = useRef(null);
  const { scrollYProgress: ctaScroll } = useScroll({ target: ctaRef, offset: ["start 0.85", "end 0.5"] });
  const ctaY = useTransform(ctaScroll, [0, 1], [80, 0]);
  const ctaOpacity = useTransform(ctaScroll, [0, 1], [0, 1]);
  return (
    <section className="relative py-section-y px-section-x flex flex-col items-center bg-background pb-30">
      {/* Cím csak typewriter + kurzor effekt, ikon csak scroll>=10% */}
      <h2
        ref={titleRef}
        className="text-center flex items-center gap-3 justify-center mb-10"
        style={{ color: 'black', fontWeight: 600, textAlign: 'center', fontSize: 'clamp(2rem, 4vw, 2.8rem)', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 0 }}
      >
        {(typing || displayed.length > 0) && (
          <span className="text-3xl md:text-4xl lg:text-5xl text-primaryFrom">🛠️</span>
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
      {/* Lépések kártyákban */}
      <div className="flex flex-col md:flex-row gap-8 max-w-5xl w-full justify-center items-stretch mt-10">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            ref={cardRefs[i]}
            style={{ x: cardsTransforms[i].x, opacity: cardsTransforms[i].opacity }}
            className="flex-1 flex flex-col items-center rounded-3xl p-8 min-h-[280px] relative transition-transform hover:-translate-y-1 hover:shadow-2xl backdrop-blur-xl bg-[#f9fafb]/60 border border-white/40 shadow-xl"
          >
            <div className="mb-4">{step.icon}</div>
            <span className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-primaryFrom to-primaryTo text-white font-bold text-base md:text-lg shadow-md mb-2">{i + 1}</span>
            <h3 className="text-lg md:text-xl font-bold mb-2 text-center bg-gradient-to-r from-accent to-primaryTo bg-clip-text text-transparent">
              {step.title}
            </h3>
            <p className="text-subtleText text-base text-center">{step.desc}</p>
          </motion.div>
        ))}
      </div>
      {/* Kiemelt alsó kártya linkkel helyett CTA gombbal */}
      <motion.div
        ref={ctaRef}
        className="mt-10 w-full flex justify-center"
        style={{ y: ctaY, opacity: ctaOpacity }}
      >
        <button
          className="cta-animated w-full sm:w-auto button text-sm sm:text-base py-2 px-3 sm:py-3 sm:px-6 relative overflow-hidden"
          style={{ fontWeight: 600 }}
        >
          Ingyenes élő demo a saját webshopodon →
        </button>
      </motion.div>
    </section>
  );
} 