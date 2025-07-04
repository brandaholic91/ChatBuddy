"use client";

export default function CTA() {
  return (
    <section className="relative py-section-y px-section-x flex flex-col items-center bg-background">
      <div className="w-full max-w-3xl mx-auto bg-foreground rounded-3xl shadow-card px-6 py-12 flex flex-col items-center text-center">
        <span className="text-4xl md:text-5xl mb-2">🚀</span>
        <h2 className="text-heading font-bold mb-4 bg-gradient-to-r from-primaryFrom to-primaryTo bg-clip-text text-transparent">
          Készen állsz automatizálni a legunalmasabb ügyfélszolgálati feladatokat?
        </h2>
        <div className="text-subtleText text-lg mb-8">
          Foglalj bemutatót most – és legyen a ChatBuddy a legmegbízhatóbb kollégád!
        </div>
        <button className="mt-2 px-8 py-5 rounded-2xl bg-gradient-to-r from-primaryFrom to-primaryTo text-white font-bold text-lg shadow-card hover:shadow-xl transition-all duration-200">
          👉 Foglalj bemutatót most – ingyenes próba!
        </button>
      </div>
    </section>
  );
} 