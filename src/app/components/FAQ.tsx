'use client';

import { useState, useEffect, useRef } from "react";
import { useScroll } from "framer-motion";
import { FaqAccordion } from "../components/ui/faq-chat-accordion";
import Magnet from "./ui/Magnet";
import Image from "next/image";

const faqs = [
  {
    q: "Valóban magyarul válaszol a ChatBuddy?",
    a: "Igen, természetes, hibátlan magyarsággal kommunikál, webshopokra optimalizált AI technológiával.",
  },
  {
    q: "Bonyolult integrálni a Shoprenter webshopunkkal?",
    a: "Nem, pár kattintással, programozói tudás nélkül integrálható Shoprenter vagy WooCommerce áruházadba.",
  },
  {
    q: "Milyen csatornákon tud segíteni a ChatBuddy?",
    a: "Webchat, Messenger, WhatsApp és Instagram DM – mindenhol ott van, ahol a vásárlóid.",
  },
  {
    q: "Tényleg képes rendelési ügyeket intézni?",
    a: "Igen, lekérdezi a rendelés állapotát, kezeli a visszaküldéseket és segít az ajánlatkérésben is.",
  },
  {
    q: "Mennyi idő alatt lesz éles a rendszer?",
    a: "Általában 3-4 hét alatt már élesben használhatod, de akár 1 nap alatt is integrálható egy pilot teszthez.",
  },
  {
    q: "Mi történik, ha a chatbot nem tud válaszolni?",
    a: "Automatikusan élő ügyfélszolgálati kollégához irányítja a vásárlót, így nincs negatív élmény.",
  },
  {
    q: "Hogyan garantáljátok a GDPR-megfelelést?",
    a: "Az összes adatot EU-s szervereken tároljuk, szigorú GDPR-kompatibilis biztonsági előírások mellett.",
  },
  {
    q: "Hogyan mérhető a ChatBuddy eredményessége?",
    a: "Beépített analitikánk pontosan megmutatja, mennyi ügyfélinterakció zajlik, és hogyan javulnak a KPI-k.",
  },
  {
    q: "Mi a teendő, ha bővülni szeretnénk több csatornára?",
    a: "Egyszerűen válthatsz magasabb csomagra, vagy kérhetsz egyedi megoldást – könnyen skálázható a szolgáltatás.",
  },
  {
    q: "Van-e egyszeri beállítási díj?",
    a: "Igen, egyszeri setup díj van (170 000–690 000 Ft között), csomagtól függően. Ez tartalmazza az integrációt és testreszabást.",
  },
  {
    q: "Milyen típusú webshopoknak ideális a ChatBuddy?",
    a: "Elsősorban napi 30–500 rendelést kezelő webshopoknak, amelyek több kommunikációs csatornán működnek, és túlterhelt ügyfélszolgálattal rendelkeznek.",
  },
  {
    q: "Hogyan segít a ChatBuddy növelni a bevételt?",
    a: "Proaktív üzenetekkel, személyre szabott ajánlatokkal és azonnali válaszokkal segít kosárelhagyás csökkentésében és az upsellben.",
  },
  {
    q: "Mi történik, ha technikai probléma adódik?",
    a: "Dedikált magyar nyelvű supportot nyújtunk, gyors reagálással, és SLA-garanciával a folyamatos működésre.",
  },
  {
    q: "Kell-e saját szervert üzemeltetnünk a chatbothoz?",
    a: "Nem, mindent mi biztosítunk felhő-alapú infrastruktúrán, neked nem kell semmilyen technikai infrastruktúrával foglalkoznod.",
  },
  {
    q: "Mennyire biztonságos az adatok kezelése?",
    a: "Teljesen biztonságos, titkosított kommunikációt és adatvédelmi auditokat alkalmazunk a legmagasabb GDPR szabvány szerint.",
  },
  {
    q: "Hogyan működik a próbaidőszak?",
    a: "Az ingyenes, 20 perces bemutató után igényelhetsz egy hónapos próbaidőszakot a Pro csomagra, így meggyőződhetsz a működéséről.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  // --- Typewriter effekt a címhez ---
  const titleText = "Gyakori kérdések";
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
    <>
      <section className="relative py-section-y px-section-x flex flex-col items-center">
        <div className="flex flex-col items-center mb-2">
          {(typing || displayed.length > 0) && (
            <span className="text-3xl md:text-4xl lg:text-5xl text-primaryFrom mb-2">❓</span>
          )}
          <h2
            ref={titleRef}
            className="font-bold text-center text-[#f9fafb]"
            style={{
              color: '#f9fafb',
              fontWeight: 600,
              textAlign: 'center',
              fontSize: 'clamp(2rem, 4vw, 2.8rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              marginBottom: 40,
            }}
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
        <FaqAccordion data={[
          { id: 1, question: "Valóban magyarul válaszol a ChatBuddy?", answer: "Igen, természetes, hibátlan magyarsággal kommunikál, webshopokra optimalizált AI technológiával." },
          { id: 2, question: "Bonyolult integrálni a Shoprenter webshopunkkal?", answer: "Nem, pár kattintással, programozói tudás nélkül integrálható a Shoprenter vagy WooCommerce áruházadba." },
          { id: 3, question: "Milyen csatornákon tud segíteni a ChatBuddy?", answer: "Webchat, Messenger, WhatsApp és Instagram DM – mindenhol ott van, ahol a vásárlóid." },
          { id: 4, question: "Tényleg képes rendelési ügyeket intézni?", answer: "Igen, lekérdezi a rendelés állapotát, kezeli a visszaküldéseket és segít a vásárlóknak az ajánlatkérésben is." },
          { id: 5, question: "Mennyi idő alatt lesz éles a rendszer?", answer: "Általában 3-4 hét alatt már élesben használhatod, de akár 1 nap alatt is integrálható egy pilot teszthez." },
          { id: 6, question: "Mi történik, ha a chatbot nem tud válaszolni?", answer: "Ilyenkor automatikusan élő ügyfélszolgálati kollégához irányítja a vásárlót, így nincs negatív élmény." },
          { id: 7, question: "Hogyan garantáljátok a GDPR-megfelelést?", answer: "Az összes adatot EU-s szervereken tároljuk, szigorú GDPR-kompatibilis biztonsági előírások mellett." },
          { id: 8, question: "Hogyan mérhető a ChatBuddy eredményessége?", answer: "Beépített analitikánk pontosan megmutatja, mennyi ügyfélinterakció zajlik, és hogyan javulnak a KPI-k." },
          { id: 9, question: "Mi a teendő, ha bővülni szeretnénk több csatornára?", answer: "Egyszerűen válthatsz magasabb csomagra, vagy kérhetsz egyedi megoldást – könnyen skálázható a szolgáltatás." },
          { id: 10, question: "Van-e egyszeri beállítási díj?", answer: "Igen, egyszeri setup díj van (170 000–690 000 Ft között), csomagtól függően. Ez tartalmazza az integrációt és testreszabást." },
          { id: 11, question: "Milyen típusú webshopoknak ideális a ChatBuddy?", answer: "Elsősorban napi 30–500 rendelést kezelő webshopoknak, amelyek több kommunikációs csatornán működnek, és túlterhelt ügyfélszolgálattal rendelkeznek." },
          { id: 12, question: "Hogyan segít a ChatBuddy növelni a bevételt?", answer: "Proaktív üzenetekkel, személyre szabott ajánlatokkal és azonnali válaszokkal segít kosárelhagyás csökkentésében és az upsellben." },
          { id: 13, question: "Mi történik, ha technikai probléma adódik?", answer: "Dedikált magyar nyelvű supportot nyújtunk, gyors reagálással, és SLA-garanciával a folyamatos működésre." },
          { id: 14, question: "Kell-e saját szervert üzemeltetnünk a chatbothoz?", answer: "Nem, mindent mi biztosítunk felhő-alapú infrastruktúrán, neked nem kell semmilyen technikai infrastruktúrával foglalkoznod." },
          { id: 15, question: "Mennyire biztonságos az adatok kezelése?", answer: "Teljesen biztonságos, titkosított kommunikációt és adatvédelmi auditokat alkalmazunk a legmagasabb GDPR szabvány szerint." },
          { id: 16, question: "Mi a különbség a ti chatbototok és egy FAQ-bot között?", answer: "A ChatBuddy önálló ügyintézést végez: rendelést ellenőriz, visszaküldést indít, ajánlatokat generál, tehát jóval többet nyújt egy FAQ-botnál." },
          { id: 17, question: "Mennyire kell technikai tudás a chatbot kezeléséhez?", answer: "Semmilyen programozási tudás nem szükséges, marketingesek vagy ügyfélszolgálatosok könnyedén kezelhetik." },
          { id: 18, question: "Miért érdemes pilot projektet indítani?", answer: "Így kockázatmentesen, valós adatokkal mérheted meg, hogyan teljesít a chatbot a te webshopod esetében." },
          { id: 19, question: "Mennyire terheli a ChatBuddy a webshopot?", answer: "Nem okoz semmilyen terhelést, felhő-alapú működése révén nem lassítja a weboldaladat, sőt csökkenti a csapatod terhelését." },
          { id: 20, question: "Hogyan működik a próbaidőszak?", answer: "Az ingyenes, 20 perces bemutató után igényelhetsz egy hónapos próbaidőszakot a Pro csomagra, így meggyőződhetsz a működéséről." },
        ]} timestamp="Válaszolt legutóbb: pár másodperce" />
      </section>
      <div className="w-full flex justify-center">
        <Magnet padding={80} magnetStrength={10}>
          <Image
            src="/spaceship.png"
            alt="Spaceship"
            width={384}
            height={384}
            className="w-96 h-96 object-contain animate-float rotate-[20deg]"
            style={{ animation: 'float 3s ease-in-out infinite' }}
          />
        </Magnet>
      </div>
    </>
  );
} 