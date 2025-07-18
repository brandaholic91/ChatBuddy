import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const steps = [
  {
    emoji: "🔵",
    number: 1,
    title: "Kapcsolódás",
    desc: "Webshopodhoz illesztjük 1 nap alatt – fejlesztő nélkül\nShoprenter, WooCommerce vagy egyedi rendszer? A csatlakozás egyszerű, biztonságos és nem igényel IT-tudást a részedről.",
  },
  {
    emoji: "🟣",
    number: 2,
    title: "Betanítás",
    desc: "Megtanítjuk a chatbotot a te szabályaid szerint\nGYIK, rendeléslogika, visszaküldési folyamatok, kampányok – minden működésedet megtanulja és testreszabottan alkalmazza.",
  },
  {
    emoji: "🔺",
    number: 3,
    title: "Indítás & Automatizálás",
    desc: "ChatBuddy innentől önállóan dolgozik helyetted\nVálaszol, rendelést kezel, ajánlatot küld, és közben automatikusan riportol – 24/7-ben, hiba nélkül.",
  },
];

export default function HowItWorks() {
  const cardRef0 = useRef(null);
  const cardRef1 = useRef(null);
  const cardRef2 = useRef(null);
  const cardRefs = [cardRef0, cardRef1, cardRef2];
  // Minden kártyához külön progress
  const cardProgress0 = useScroll({ target: cardRef0, offset: ["start 0.8", "end 0.5"] });
  const cardProgress1 = useScroll({ target: cardRef1, offset: ["start 0.8", "end 0.5"] });
  const cardProgress2 = useScroll({ target: cardRef2, offset: ["start 0.8", "end 0.5"] });
  const cardsProgress = [cardProgress0, cardProgress1, cardProgress2];
  const cardRange0 = [0, 0.25];
  const cardRange1 = [0.25, 0.5];
  const cardRange2 = [0.5, 0.75];
  const cardRanges = [cardRange0, cardRange1, cardRange2];
  const cardTransform0 = {
    x: useTransform(cardProgress0.scrollYProgress, cardRange0, [-120, 0]),
    opacity: useTransform(cardProgress0.scrollYProgress, cardRange0, [0, 1]),
  };
  const cardTransform1 = {
    x: useTransform(cardProgress1.scrollYProgress, cardRange1, [-120, 0]),
    opacity: useTransform(cardProgress1.scrollYProgress, cardRange1, [0, 1]),
  };
  const cardTransform2 = {
    x: useTransform(cardProgress2.scrollYProgress, cardRange2, [-120, 0]),
    opacity: useTransform(cardProgress2.scrollYProgress, cardRange2, [0, 1]),
  };
  const cardsTransforms = [cardTransform0, cardTransform1, cardTransform2];

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
        className="text-center flex flex-col items-center justify-center mb-10"
        style={{ color: 'black', fontWeight: 600, textAlign: 'center', fontSize: 'clamp(2rem, 4vw, 2.8rem)', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 0 }}
      >
        {(typing || displayed.length > 0) && (
          <span className="text-3xl md:text-4xl lg:text-5xl text-primaryFrom mb-2">🛠️</span>
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
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-[1020px] justify-center items-center mt-10">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            ref={cardRefs[i]}
            style={{ x: cardsTransforms[i].x, opacity: cardsTransforms[i].opacity }}
            className="flex flex-col items-center rounded-3xl p-8 min-h-[320px] w-full md:w-[340px] md:h-[380px] relative transition-transform hover:-translate-y-1 hover:shadow-2xl bg-[#f9fafb] border-2 border-[#ececec] shadow-2xl"
          >
            <div className="flex flex-col items-center mb-4">
              <span className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-[#a78bfa] to-[#38bdf8] text-white font-bold text-2xl md:text-3xl shadow-lg mb-2">
                {step.number}
              </span>
            </div>
            <h3 className="text-lg md:text-xl font-bold mb-2 text-center">
              {step.emoji} {step.title}
            </h3>
            <p className="text-subtleText text-base text-center whitespace-pre-line">
              {(() => {
                // Sentences to bold and break after
                const boldSentences = [
                  "Webshopodhoz illesztjük 1 nap alatt – fejlesztő nélkül\n",
                  "Megtanítjuk a chatbotot a te szabályaid szerint\n",
                  "ChatBuddy innentől önállóan dolgozik helyetted\n",
                ];
                const found = boldSentences.find(s => step.desc.startsWith(s));
                if (found) {
                  const rest = step.desc.slice(found.length).trimStart();
                  return <>
                    <strong>{found}</strong><br />{rest}
                  </>;
                }
                // Fallback: previous logic
                const re = /([.!?])([ \n]|$)/;
                const idx = step.desc.search(re);
                if (idx !== -1) {
                  const endIdx = idx + 1;
                  const first = step.desc.slice(0, endIdx);
                  const rest = step.desc.slice(endIdx).trimStart();
                  return <>
                    <strong>{first}</strong>{rest ? ' ' + rest.replace(/"/g, "&quot;") : ''}
                  </>;
                } else {
                  return <strong>{step.desc}</strong>;
                }
              })()}
            </p>
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
          Kérem az ingyenes demót  👉
        </button>
      </motion.div>
    </section>
  );
} 