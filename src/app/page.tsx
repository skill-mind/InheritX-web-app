import About from "@/components/about/About";
import Hero from "@/components/hero/Hero";
import Benefits from "@/components/benefits/Benefits";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="z-10">
        <Hero />
        <About />
        <Benefits />
      </div>
    </div>
  );
}
