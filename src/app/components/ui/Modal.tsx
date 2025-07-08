import React, { ReactNode } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ open, onClose, children }: ModalProps) {
  if (!open) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(2, 6, 23, 0.85)', // #020617 + átlátszóság
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background 0.3s',
      }}
      onClick={onClose}
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
          position: 'relative',
          fontFamily: "'TT Firs Neue', 'Inter', sans-serif",
          animation: 'modalIn 0.35s cubic-bezier(.4,2,.6,1)',
        }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
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
        {children}
        <style>{`
          @keyframes modalIn {
            0% { opacity: 0; transform: translateY(40px) scale(0.98); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
          }
        `}</style>
      </div>
    </div>
  );
} 