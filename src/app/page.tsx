import Hero from "./components/Hero";
import Problem from "./components/Problem";
import Solution from "./components/Solution";
import HowItWorks from "./components/HowItWorks";
import Testimonials from "./components/Testimonials";
import Pricing from "./components/Pricing";
import FAQ from "./components/FAQ";

export default function Home() {
  return (
    <main className="flex flex-col items-center w-full min-h-screen bg-transparent">
      <Hero />
      <Problem />
      <Solution />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <FAQ />
    </main>
  );
}
