"use client";

import Image from "next/image";
import About from "@/components/about/About";
import Hero from "@/components/hero/Hero";
import Benefits from "@/components/benefits/Benefits";
import { useEffect } from "react";

import "./site-transitions.css";

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.08 }
    );

    document
      .querySelectorAll(".reveal-on-scroll")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

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
          className="absolute right-0 top-0 z-0 w-full h-auto pointer-events-none select-none hidden md:block parallax-bg float-slow"
        />

        {/* Desktop - Benefit-Section Bacground Particles */}
        <Image
          src="/assets/images/benefit_tree_left.svg"
          alt="background vector"
          fill={false}
          width={400}
          height={400}
          className="absolute left-0 top-[65%] z-0 h-auto pointer-events-none select-none hidden md:block parallax-bg float-slow"
        />

        {/* Desktop -  Page-Bottom-Section Bacground Particles */}
        <Image
          src="/assets/images/small_tree_left.svg"
          alt="background vector"
          fill={false}
          width={200}
          height={200}
          className="absolute left-0 top-[95%] z-0 h-auto pointer-events-none select-none hidden md:block parallax-bg float-slow"
        />

        <Image
          src="/assets/images/small_tree_right.svg"
          alt="background vector"
          fill={false}
          width={200}
          height={200}
          className="absolute right-0 top-[95%] z-0 h-auto pointer-events-none select-none hidden md:block parallax-bg float-slow"
        />

        {/* Mobile - Hero Bacground Particles */}
        <Image
          src="/assets/images/mobile_hero_tree.svg"
          alt="background vector"
          fill={false}
          width={1920}
          height={400}
          className="absolute right-0 top-0 z-0 w-full h-auto pointer-events-none select-none block md:hidden parallax-bg float-slow"
        />

        {/* Mobile -  Page-Bottom-Section Bacground Particles */}
        <Image
          src="/assets/images/small_tree_left.svg"
          alt="background vector"
          fill={false}
          width={200}
          height={200}
          className="absolute left-0 top-[100%] z-[99999] h-auto pointer-events-none select-none block md:hidden parallax-bg float-slow"
        />

        <Image
          src="/assets/images/small_tree_right.svg"
          alt="background vector"
          fill={false}
          width={200}
          height={200}
          className="absolute right-0 top-[100%] z-0 h-auto pointer-events-none select-none block md:hidden parallax-bg float-slow"
        />
        <div className="reveal-on-scroll">
          <Hero />
        </div>

        <div className="reveal-on-scroll">
          <About />
        </div>

        <div className="reveal-on-scroll mb-10">
          <Benefits />
        </div>
      </div>
    </div>
  );
}
