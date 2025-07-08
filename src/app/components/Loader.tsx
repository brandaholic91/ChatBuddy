import React, { useEffect, useState } from "react";

interface LoaderProps {
  fadeOut?: boolean;
}

export default function Loader({ fadeOut }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    let start = Date.now();
    let raf: number;
    const animate = () => {
      const elapsed = Date.now() - start;
      const percent = Math.min(100, (elapsed / 2000) * 100);
      setProgress(percent);
      if (percent < 100) {
        raf = requestAnimationFrame(animate);
      }
    };
    animate();
    // Bubble fade-in trigger (no delay)
    setTimeout(() => setShowBubble(true), 0);
    return () => {
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      background: "#020617",
      color: "#fff",
      opacity: fadeOut ? 0 : 1,
      transition: 'opacity 0.8s',
    }}>
      <div style={{ position: 'relative', marginBottom: 40 }}>
        <img src="/ChatBuddy-logo-fej.png" alt="Logo" style={{ width: 160, display: 'block' }} />
        <div style={{
          position: 'absolute',
          left: '70%',
          top: -82,
          transform: 'translateX(-50%)',
          background: '#fff',
          color: '#020617',
          padding: '10px 22px',
          borderRadius: 20,
          fontFamily: "'TT Firs Neue', 'Inter', sans-serif",
          fontSize: 18,
          fontWeight: 500,
          boxShadow: '0 2px 12px #0002',
          zIndex: 2,
          minWidth: 180,
          textAlign: 'center',
          border: '2px solid #a78bfa',
          opacity: showBubble ? 1 : 0,
          transition: 'opacity 2s',
        }}>
          Szia, miben segíthetek?
          <span style={{
            content: "",
            position: 'absolute',
            left: '50%',
            bottom: -14,
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderLeft: '12px solid transparent',
            borderRight: '12px solid transparent',
            borderTop: '14px solid #fff',
            filter: 'drop-shadow(0 2px 2px #a78bfa33)'
          }} />
        </div>
      </div>
      <div style={{
        width: 240,
        height: 10,
        background: "#1e293b",
        borderRadius: 8,
        overflow: "hidden",
        boxShadow: "0 2px 8px #0002",
        marginBottom: 16
      }}>
        <div style={{
          width: `${progress}%`,
          height: "100%",
          background: "linear-gradient(90deg, #38bdf8 0%, #a78bfa 100%)",
          transition: "width 0.1s linear"
        }} />
      </div>
      <span style={{ fontSize: 18, letterSpacing: 1, opacity: 0.7, fontFamily: "'TT Firs Neue', 'Inter', sans-serif" }}>Betöltés...</span>
    </div>
  );
} 