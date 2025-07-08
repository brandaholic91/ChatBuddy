import { useEffect, useState } from "react";

export default function ScrollTooltip() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // 3 másodperc késleltetés betöltés után
    const timer = setTimeout(() => {
      setShowTooltip(true);
      setTimeout(() => setVisible(true), 10);
    }, 3000);

    const handleScroll = () => {
      if (typeof window === "undefined" || typeof document === "undefined") return;
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      if (scrollPercent >= 20) {
        setShowTooltip(false);
        setVisible(false);
        window.removeEventListener("scroll", handleScroll);
      }
    };
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", handleScroll);
      }
      clearTimeout(timer);
    };
  }, []);

  if (!showTooltip) return null;

  return (
    <div
      className="tooltip"
      style={{
        position: "fixed",
        right: 40,
        bottom: 78,
        width: 250,
        height: 50,
        boxSizing: "border-box",
        padding: "12px 8px",
        background: "black",
        color: "white",
        fontSize: 16,
        borderRadius: 8,
        zIndex: 1000,
        textAlign: "center",
        opacity: visible ? 1 : 0,
        transition: "opacity 1s",
      }}
    >
      Szia!👋 Miben segíthetek?
    </div>
  );
} 