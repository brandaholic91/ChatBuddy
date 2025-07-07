"use client";

import * as React from 'react';
import { motion } from 'framer-motion';

interface TestimonialCardProps {
  handleShuffle: () => void;
  testimonial: string;
  position: 'front' | 'middle' | 'back';
  id: number;
  author: string;
}

export function TestimonialCard ({ handleShuffle, testimonial, position, id, author }: TestimonialCardProps) {
  const dragRef = React.useRef(0);
  const isFront = position === "front";

  return (
    <motion.div
      style={{
        zIndex: position === "front" ? "2" : position === "middle" ? "1" : "0"
      }}
      animate={{
        rotate: position === "front" ? "-6deg" : position === "middle" ? "0deg" : "6deg",
        x: position === "front" ? "0%" : position === "middle" ? "33%" : "66%"
      }}
      drag={true}
      dragElastic={0.35}
      dragListener={isFront}
      dragConstraints={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }}
      onDragStart={(e) => {
        if ('clientX' in e) dragRef.current = e.clientX;
      }}
      onDragEnd={(e) => {
        if ('clientX' in e && dragRef.current - e.clientX > 150) {
          handleShuffle();
        }
        dragRef.current = 0;
      }}
      transition={{ duration: 0.35 }}
      className={`absolute left-0 top-0 grid h-[450px] w-[350px] select-none place-content-center space-y-6 rounded-2xl border-2 border-slate-700 bg-slate-800/20 p-6 shadow-xl backdrop-blur-md ${
        isFront ? "cursor-grab active:cursor-grabbing" : ""
      }`}
    >
      <div className="flex justify-center mb-2">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="0" y="40" fontSize="48" fontWeight="bold" fill="#f9fafb">“</text>
        </svg>
      </div>
      <span className="text-center text-lg italic" style={{ color: '#f9fafb' }}>
        &quot;{testimonial}&quot;
      </span>
      <span className="text-center text-sm font-medium" style={{ color: '#f9fafb' }}>
        {author}
      </span>
    </motion.div>
  );
};