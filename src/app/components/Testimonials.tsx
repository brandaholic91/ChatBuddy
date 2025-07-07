import { useState, useEffect, useRef } from "react";
import { useScroll, useTransform } from "framer-motion";
import { motion } from "framer-motion";
import { TestimonialCard } from "./ui/testimonial-cards";

const testimonials = [
  {
    testimonial:
      "A ChatBuddy bevezetése után megszűntek a hétvégi túlórák az ügyfélszolgálaton. Most már a legnagyobb leterheltségben is simán kiszolgálunk mindenkit.",
    author: "Farkas Dóra\noperatív vezető, BabyPlanet.hu",
    id: 1,
  },
  {
    testimonial:
      "Nálunk a kosárelhagyási arány 12%-kal csökkent az első hónapban. A rendszer automatikusan utánkövet – és működik!",
    author: "Tóth Anita\nmarketing menedzser, Beautis.hu",
    id: 2,
  },
  {
    testimonial:
      "A kampányüzenetek időzítése teljesen automatizált lett, és még az ajánlatokat is személyre szabja. Mióta bevezettük, nem kell külön kampányokra embereket delegálnunk.",
    author: "Varga Norbert\ntulajdonos, SneakerForce.hu",
    id: 3,
  },
];

export default function Testimonials() {
  const [order, setOrder] = useState([0, 1, 2]);
  const handleShuffle = () => {
    setOrder(([first, ...rest]) => [...rest, first]);
  };
  const positions: ('front' | 'middle' | 'back')[] = ["front", "middle", "back"];

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

  return (
    <section className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] py-section-y">
      <div className="max-w-4xl w-full mx-auto flex flex-col items-center px-section-x pt-20 pb-10">
        <div className="flex flex-col items-center mb-2">
          <span className="text-3xl md:text-4xl lg:text-5xl text-primaryFrom mb-2">💬</span>
          <h2
            ref={titleRef}
            className="font-bold text-center text-[#f9fafb]"
            style={{ fontWeight: 600, textAlign: 'center', fontSize: 'clamp(2rem, 4vw, 2.8rem)', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 0, color: '#f9fafb' }}
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
        <div className="relative h-[450px] w-[350px] mx-auto mt-10 -ml-[-220px]">
          {order.map((idx, i) => (
            <div
              key={testimonials[idx].id}
              className="absolute left-0 top-0"
            >
              <TestimonialCard
                handleShuffle={handleShuffle}
                testimonial={testimonials[idx].testimonial}
                author={testimonials[idx].author}
                id={testimonials[idx].id}
                position={positions[i]}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 