"use client";

import { useState, useEffect, useRef } from "react";
import { useScroll } from "framer-motion";
import { motion } from "framer-motion";

export default function CTA() {
  // --- Typewriter effekt a címhez ---
  const titleText = "Készen állsz automatizálni a legunalmasabb ügyfélszolgálati feladatokat?";
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
    <section className="relative py-section-y px-section-x flex flex-col items-center pb-0 sm:pb-10">
      <div className="w-full max-w-3xl mx-auto bg-[#020617]/90 rounded-3xl shadow-card px-6 pt-0 pb-10 flex flex-col items-center text-center text-[#f9fafb]">
        <motion.h2
          className="font-bold mb-10 text-[#f9fafb]"
          style={{ color: '#f9fafb', fontWeight: 600, textAlign: 'center', fontSize: 'clamp(2rem, 4vw, 2.8rem)', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 0 }}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          Készen állsz hatékonyabbá tenni az ügyfélszolgálatod – akár már holnaptól?
        </motion.h2>
        <motion.div
          className="text-lg mb-8 mt-10 text-[#f9fafb]"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          Foglalj ingyenes bemutatót most – és legyen ChatBuddy a legmegbízhatóbb kollégád!
        </motion.div>
        <motion.div
          className="w-full flex justify-center mt-2"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.45 }}
        >
          <button
            className="cta-animated w-full sm:w-auto button text-sm sm:text-base py-2 px-3 sm:py-3 sm:px-6 relative overflow-hidden"
            style={{ fontWeight: 600 }}
          >
            Megnézem, mit tud ChatBuddy 👉
          </button>
        </motion.div>
      </div>
    </section>
  );
} 