import Image from "next/image";
import About from "@/components/about/About";
import Hero from "@/components/hero/Hero";
import Benefits from "@/components/benefits/Benefits";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="z-10">
        {/* Desktop - Hero Bacground Particles */}
        <Image
          src="/assets/images/tree.svg"
          alt="background vector"
          fill={false}
          width={1920}
          height={400}
          className="absolute right-0 top-0 z-0 w-full h-auto pointer-events-none select-none hidden md:block"
        />

        {/* Desktop - Benefit-Section Bacground Particles */}
        <Image
          src="/assets/images/benefit_tree_left.svg"
          alt="background vector"
          fill={false}
          width={400}
          height={400}
          className="absolute left-0 top-[65%] z-0 h-auto pointer-events-none select-none hidden md:block"
        />

        {/* Desktop -  Page-Bottom-Section Bacground Particles */}
        <Image
          src="/assets/images/small_tree_left.svg"
          alt="background vector"
          fill={false}
          width={200}
          height={200}
          className="absolute left-0 top-[95%] z-0 h-auto pointer-events-none select-none hidden md:block"
        />

        <Image
          src="/assets/images/small_tree_right.svg"
          alt="background vector"
          fill={false}
          width={200}
          height={200}
          className="absolute right-0 top-[95%] z-0 h-auto pointer-events-none select-none hidden md:block"
        />
        <Hero />
        <About />
        <Benefits />
      </div>
    </div>
  );
}
