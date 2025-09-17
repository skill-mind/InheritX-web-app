"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

// 404 animation: fade-in, floating holographic lock, particles, and a neural network line effect
export default function NotFoundPage() {
  const [show, setShow] = useState(false);
  const [particleCount, setParticleCount] = useState(16);

  useEffect(() => {
    setShow(true);
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 640) setParticleCount(6);
      else if (w < 1024) setParticleCount(10);
      else setParticleCount(16);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#050608] overflow-hidden px-4 py-16">
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(-45deg, rgba(15,23,42,0.98), rgba(2,6,23,0.98), rgba(15,23,42,0.98), rgba(2,6,23,0.98))",
          backgroundSize: "400% 400%",
          animation: "gradientShift 3s ease infinite",
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {Array.from({ length: particleCount }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float404 ${3 + Math.random() * 4}s linear infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Main 404 content */}
      <div
        className={`relative z-10 bg-gradient-to-br from-slate-900/60 via-slate-800/40 to-slate-900/60 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-8 sm:p-12 w-[min(96%,600px)] mx-4 shadow-2xl transition-all duration-700 flex flex-col items-center ${show ? "animate-fadein" : "opacity-0"}`}
        style={{
          boxShadow:
            "0 0 60px rgba(6,182,212,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
        }}
      >
        {/* Holographic lock icon with floating animation */}
        <div className="mb-8 flex flex-col items-center">
          <div className="relative w-24 h-24 mb-4">
            <div className="absolute inset-0 rounded-full border-2 border-cyan-500/30 animate-spin404" />
            <div className="absolute inset-4 rounded-full bg-cyan-400/10 flex items-center justify-center animate-float404">
              <svg
                className="w-12 h-12 text-cyan-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M6 10v-4a6 6 0 1 1 12 0v4h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h1zm2 0h8v-4a4 4 0 1 0-8 0v4z" />
              </svg>
            </div>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-cyan-400 mb-2 tracking-tight">404</h1>
          <p className="text-lg sm:text-xl text-[#FCFFFF] font-semibold mb-2">Page Not Found</p>
          <p className="text-[#92A5A8] text-sm sm:text-base mb-2 text-center max-w-[400px]">
            Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.<br />
            If you think this is a mistake, please <Link href="/contact" className="text-cyan-400 underline">contact support</Link>.
          </p>
        </div>

        {/* Neural network lines */}
        <div className="flex justify-between items-center h-8 w-full mb-6">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-0.5 flex-1 mx-1 rounded-full bg-slate-700 relative overflow-hidden"
            >
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-1000 ease-out"
                style={{ width: show ? "100%" : "0%", animationDelay: `${i * 100}ms` }}
              />
            </div>
          ))}
        </div>

        {/* Go Home Button */}
        <Link
          href="/"
          className="group cursor-pointer bg-[#33C5E0] hover:bg-cyan-300 space-x-4 text-[#161E22] text-[14px] font-medium px-8 py-4 rounded-b-[24px] rounded-t-[8px] transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-cyan-400/25 flex items-center"
        >
          <span>Go Home</span>
          <Image src="/assets/icons/arrowup.svg" alt="arrow up icon" width={12} height={12} />
        </Link>
      </div>

      <style jsx>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes float404 {
          0%,100% { transform: translateY(0px) translateX(0px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) translateX(10px); opacity: 0; }
        }
        @keyframes spin404 {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes fadein {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadein { animation: fadein 1.2s cubic-bezier(0.2,0.9,0.3,1) forwards; }
        .animate-float404 { animation: float404 3s ease-in-out infinite; }
        .animate-spin404 { animation: spin404 2.5s linear infinite; }
      `}</style>
    </div>
  );
}
