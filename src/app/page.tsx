"use client";

import Aurora from "./components/Aurora";
import Hero from "./components/Hero";
import Problem from "./components/Problem";
import Solution from "./components/Solution";
import HowItWorks from "./components/HowItWorks";
import Testimonials from "./components/Testimonials";
import Pricing from "./components/Pricing";
import FAQ from "./components/FAQ";
import CTA from "./components/CTA";

export default function Home() {
  return (
    <>
      <div style={{ position: "relative", zIndex: 1 }}>
        <div className="relative">
          <div className="absolute top-0 left-0 w-full h-[30rem] sm:h-[35rem] md:h-[40rem] lg:h-[45rem] z-0 pointer-events-none">
            <Aurora colorStops={["#22d3ee", "#38bdf8", "#a78bfa", "#22d3ee"]} blend={1.0} amplitude={1.0} speed={0.4} />
          </div>
          <Hero />
        </div>
        <Problem />
        <main className="flex flex-col items-center w-full min-h-screen bg-transparent px-4 md:px-12 xl:px-32 2xl:px-64 py-12 md:py-20">
          <div className="w-full max-w-7xl flex flex-col gap-24 md:gap-32 xl:gap-40">
            <Solution />
            <HowItWorks />
            <Testimonials />
            <Pricing />
            <FAQ />
            <CTA />
          </div>
        </main>
      </div>
    </>
  );
}
