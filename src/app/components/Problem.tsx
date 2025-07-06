import { GlowEffect } from "./ui/GlowEffect";
import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import TiltedCard from "./ui/TiltedCard";

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
      if (window.scrollY > 0) setHasScrolled(true);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Cím animáció: progress 0.05-0.25 között fade-in alulról, csak scrollra
  const titleY = useTransform(scrollYProgress, [0.05, 0.25], [80, 0]);
  const rawTitleOpacity = useTransform(scrollYProgress, [0.05, 0.25], [0, 1]);
  const titleOpacity = hasScrolled ? rawTitleOpacity : 0;

  // Kártyák: progress lépcsőzetesen, lentről fade-in
  const cardProgresses = [
    [0.18, 0.34],
    [0.22, 0.38],
    [0.26, 0.42],
    [0.30, 0.46],
  ];
  const cardTransforms = cardProgresses.map(([start, end]) => ({
    y: useTransform(scrollYProgress, [start, end], [80, 0]),
    opacity: useTransform(scrollYProgress, [start, end], [0, 1]),
  }));

  // --- Typewriter effekt a címhez ---
  const titleText = "Neked is ismerősek ezek a helyzetek?";
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
    <section ref={sectionRef} className="relative pt-40 pb-16 px-8 flex flex-col items-center bg-background">
      {/* Cím typewriter + kurzor effekt */}
      <h2
        ref={titleRef}
        className="text-center mb-10 flex items-center gap-3 justify-center"
        style={{ color: 'black', fontWeight: 600, textAlign: 'center', marginBottom: '2.5rem', fontSize: 'clamp(2rem, 4vw, 2.8rem)', lineHeight: 1.1, letterSpacing: '-0.03em' }}
      >
        {(typing || displayed.length > 0) && (
          <span className="text-3xl md:text-4xl lg:text-5xl text-primaryFrom">❓</span>
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
      <div className="w-full max-w-5xl mx-auto mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {/* 1. kártya */}
          <motion.div style={{ y: cardTransforms[0].y, opacity: cardTransforms[0].opacity }}>
            <TiltedCard
              imageSrc="/pic1.png"
              altText="Ügyfélszolgálatod túlterhelt a rendelésállapotokról, visszaküldésről, szállításról szóló kérdésekkel?"
              containerHeight="500px"
              containerWidth="100%"
              imageHeight="500px"
              imageWidth="500px"
              scaleOnHover={1.08}
              rotateAmplitude={12}
              showMobileWarning={false}
              showTooltip={false}
              displayOverlayContent={true}
              overlayContent={
                <div className="absolute left-4 right-4 bottom-4 mx-auto w-auto max-w-[90%] px-6 py-5 backdrop-blur-md bg-white/40 border border-white/30 rounded-xl shadow-lg text-center text-base md:text-lg text-gray-900 font-medium leading-snug" style={{boxShadow: '0 4px 24px 0 rgba(0,0,0,0.10)'}}>
                  Ügyfélszolgálatod túlterhelt a rendelésállapotokról, visszaküldésről, szállításról szóló kérdésekkel?
                </div>
              }
            />
          </motion.div>
          {/* 2. kártya */}
          <motion.div style={{ y: cardTransforms[1].y, opacity: cardTransforms[1].opacity }}>
            <TiltedCard
              imageSrc="/pic2.png"
              altText="Több csatornán kommunikálsz (Messenger, webchat, WhatsApp) – mégsem látjátok át egyben?"
              containerHeight="500px"
              containerWidth="100%"
              imageHeight="500px"
              imageWidth="500px"
              scaleOnHover={1.08}
              rotateAmplitude={12}
              showMobileWarning={false}
              showTooltip={false}
              displayOverlayContent={true}
              overlayContent={
                <div className="absolute left-4 right-4 bottom-4 mx-auto w-auto max-w-[90%] px-6 py-5 backdrop-blur-md bg-white/40 border border-white/30 rounded-xl shadow-lg text-center text-base md:text-lg text-gray-900 font-medium leading-snug" style={{boxShadow: '0 4px 24px 0 rgba(0,0,0,0.10)'}}>
                  Több csatornán kommunikálsz (Messenger, webchat, WhatsApp) – mégsem látjátok át egyben?
                </div>
              }
            />
          </motion.div>
          {/* 3. kártya */}
          <motion.div style={{ y: cardTransforms[2].y, opacity: cardTransforms[2].opacity }}>
            <TiltedCard
              imageSrc="/pic3.png"
              altText="Kimaradnak potenciális vásárlók, mert nincs azonnali válasz?"
              containerHeight="500px"
              containerWidth="100%"
              imageHeight="500px"
              imageWidth="500px"
              scaleOnHover={1.08}
              rotateAmplitude={12}
              showMobileWarning={false}
              showTooltip={false}
              displayOverlayContent={true}
              overlayContent={
                <div className="absolute left-4 right-4 bottom-4 mx-auto w-auto max-w-[90%] px-6 py-5 backdrop-blur-md bg-white/40 border border-white/30 rounded-xl shadow-lg text-center text-base md:text-lg text-gray-900 font-medium leading-snug" style={{boxShadow: '0 4px 24px 0 rgba(0,0,0,0.10)'}}>
                  Kimaradnak potenciális vásárlók, mert nincs azonnali válasz?
                </div>
              }
            />
          </motion.div>
          {/* 4. kártya */}
          <motion.div style={{ y: cardTransforms[3].y, opacity: cardTransforms[3].opacity }}>
            <TiltedCard
              imageSrc="/pic4.png"
              altText="Nincs idő follow-up üzenetekre vagy kosárelhagyók visszaszerzésére?"
              containerHeight="500px"
              containerWidth="100%"
              imageHeight="500px"
              imageWidth="500px"
              scaleOnHover={1.08}
              rotateAmplitude={12}
              showMobileWarning={false}
              showTooltip={false}
              displayOverlayContent={true}
              overlayContent={
                <div className="absolute left-4 right-4 bottom-4 mx-auto w-auto max-w-[90%] px-6 py-5 backdrop-blur-md bg-white/40 border border-white/30 rounded-xl shadow-lg text-center text-base md:text-lg text-gray-900 font-medium leading-snug" style={{boxShadow: '0 4px 24px 0 rgba(0,0,0,0.10)'}}>
                  Nincs idő follow-up üzenetekre vagy kosárelhagyók visszaszerzésére?
                </div>
              }
            />
          </motion.div>
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