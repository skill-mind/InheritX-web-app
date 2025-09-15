"use client";

import React, { useEffect, useState } from "react";

interface UnlockTransitionProps {
  visible?: boolean;
  duration?: number;
  onComplete?: () => void;
}

const UnlockTransition: React.FC<UnlockTransitionProps> = ({
  visible = true,
  duration = 2500,
  onComplete,
}) => {
  const [phase, setPhase] = useState<"scanning" | "unlocking" | "complete">(
    "scanning"
  );
  const [particleCount, setParticleCount] = useState<number>(20);

  // Respect users who prefer reduced motion: shorten/skip animation and complete quickly
  useEffect(() => {
    if (!visible) return;
    try {
      const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
      if (mq?.matches) {
        setPhase("complete");
        const t = setTimeout(() => onComplete?.(), 120);
        return () => clearTimeout(t);
      }
    } catch (e) {
      console.error(e);
    }
  }, [visible, onComplete]);

  // Prevent scrolling while overlay is visible
  useEffect(() => {
    if (!visible) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev || "";
    };
  }, [visible]);

  useEffect(() => {
    if (!visible) return;

    // Scanning phase
    const scanTimer = setTimeout(() => setPhase("unlocking"), 800);

    // Unlocking phase
    const unlockTimer = setTimeout(() => setPhase("complete"), 1500);

    // Complete
    const completeTimer = setTimeout(() => {
      onComplete?.();
    }, duration);

    return () => {
      clearTimeout(scanTimer);
      clearTimeout(unlockTimer);
      clearTimeout(completeTimer);
    };
  }, [visible, duration, onComplete]);

  // Adjust particle count based on screen width for performance & mobile layout
  useEffect(() => {
    if (!visible) return;
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 640) setParticleCount(8);
      else if (w < 1024) setParticleCount(14);
      else setParticleCount(20);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className="fixed top-0 left-0 w-full h-screen inset-0 z-[9999999] flex items-center justify-center overflow-hidden"
      role="status"
      aria-live="polite"
    >
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 transition-all duration-1000"
        style={{
          backgroundImage:
            phase === "complete"
              ? "radial-gradient(ellipse at center, rgba(6,182,212,0.15) 0%, rgba(0,0,0,0.95) 70%)"
              : "linear-gradient(-45deg, rgba(15,23,42,0.98), rgba(2,6,23,0.98), rgba(15,23,42,0.98), rgba(2,6,23,0.98))",
          backgroundSize: phase === "complete" ? "cover" : "400% 400%",
          backgroundRepeat: "no-repeat",
          animation:
            phase !== "complete" ? "gradientShift 3s ease infinite" : "none",
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: particleCount }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s linear infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div
        className="relative bg-gradient-to-br from-slate-900/60 via-slate-800/40 to-slate-900/60 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-6 sm:p-10 w-[min(92%,860px)] mx-4 shadow-2xl transition-all duration-700"
        style={{
          boxShadow:
            phase === "complete"
              ? "0 0 60px rgba(6,182,212,0.4), inset 0 1px 0 rgba(255,255,255,0.1)"
              : "0 25px 50px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
        }}
      >
        {/* Lock mechanism */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 mb-6">
            {/* Outer ring with scanning effect */}
            <div className="absolute inset-0 rounded-full border-2 border-cyan-500/30">
              <div
                className="absolute inset-0 rounded-full border-2 border-transparent transition-all duration-1000"
                style={{
                  borderTopColor:
                    phase === "scanning" ? "#06b6d4" : "transparent",
                  transform: `rotate(${
                    phase === "scanning" ? "360deg" : "0deg"
                  })`,
                  animation:
                    phase === "scanning" ? "spin 2s linear infinite" : "none",
                }}
              />
            </div>

            {/* Inner holographic circle */}
            <div
              className="absolute inset-4 rounded-full transition-all duration-1000 flex items-center justify-center"
              style={{
                background:
                  phase === "complete"
                    ? "radial-gradient(circle, rgba(6,182,212,0.2) 0%, rgba(6,182,212,0.05) 70%, transparent 100%)"
                    : "radial-gradient(circle, rgba(71,85,105,0.3) 0%, rgba(71,85,105,0.1) 70%, transparent 100%)",
                boxShadow:
                  phase === "complete"
                    ? "inset 0 0 30px rgba(6,182,212,0.3)"
                    : "inset 0 0 20px rgba(71,85,105,0.2)",
              }}
            >
              {/* Lock icon that transforms */}
              <div className="relative">
                {phase === "scanning" && (
                  <svg
                    className="w-12 h-12 text-slate-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 10v-4a6 6 0 1 1 12 0v4h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h1zm2 0h8v-4a4 4 0 1 0-8 0v4z" />
                  </svg>
                )}

                {phase === "unlocking" && (
                  <svg
                    className="w-12 h-12 text-yellow-400 animate-pulse"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 10h2V6a4 4 0 1 1 8 0v1h2V6a6 6 0 1 0-12 0v4zm-1 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2H5z" />
                  </svg>
                )}

                {phase === "complete" && (
                  <div className="relative">
                    <svg
                      className="w-12 h-12 text-cyan-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="absolute inset-0 rounded-full bg-cyan-400/20 animate-ping" />
                  </div>
                )}
              </div>
            </div>

            {/* Scanning lines */}
            {phase === "scanning" && (
              <>
                <div
                  className="absolute top-0 left-1/2 w-0.5 h-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent opacity-60 animate-pulse"
                  style={{ transform: "translateX(-50%)" }}
                />
                <div
                  className="absolute left-0 top-1/2 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60 animate-pulse"
                  style={{
                    transform: "translateY(-50%)",
                    animationDelay: "0.5s",
                  }}
                />
              </>
            )}

            {/* Energy burst effect */}
            {phase === "complete" && (
              <div className="absolute inset-0 rounded-full border-2 border-cyan-400/60 animate-ping" />
            )}
          </div>

          {/* Status text */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-2 transition-all duration-500">
              {phase === "scanning" && "Scanning..."}
              {phase === "unlocking" && "Unlocking"}
              {phase === "complete" && "Access Granted"}
            </h3>

            <p className="text-slate-400 text-sm transition-all duration-500">
              {phase === "scanning" && "Verifying security credentials"}
              {phase === "unlocking" && "Decrypting secure channels"}
              {phase === "complete" && "Welcome to your secure dashboard"}
            </p>
          </div>
        </div>

        {/* Progress visualization */}
        <div className="space-y-4">
          {/* Neural network lines */}
          <div className="flex justify-between items-center h-8">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-0.5 flex-1 mx-1 rounded-full bg-slate-700 relative overflow-hidden"
              >
                <div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-1000 ease-out"
                  style={{
                    width:
                      phase === "scanning"
                        ? "30%"
                        : phase === "unlocking"
                        ? "70%"
                        : "100%",
                    animationDelay: `${i * 100}ms`,
                  }}
                />
              </div>
            ))}
          </div>

          {/* Status indicators */}
          <div className="flex justify-between text-xs">
            <span
              className={`transition-colors duration-300 ${
                phase !== "scanning" ? "text-cyan-400" : "text-slate-500"
              }`}
            >
              ● Authentication
            </span>
            <span
              className={`transition-colors duration-300 ${
                phase === "complete" ? "text-cyan-400" : "text-slate-500"
              }`}
            >
              ● Encryption
            </span>
            <span
              className={`transition-colors duration-300 ${
                phase === "complete" ? "text-cyan-400" : "text-slate-500"
              }`}
            >
              ● Secure Tunnel
            </span>
          </div>
        </div>

        {/* Holographic border effect */}
        <div className="absolute inset-0 rounded-3xl pointer-events-none">
          <div
            className="absolute inset-0 rounded-3xl transition-opacity duration-1000"
            style={{
              background:
                "linear-gradient(45deg, transparent 30%, rgba(6,182,212,0.1) 50%, transparent 70%)",
              opacity: phase === "complete" ? 1 : 0,
              animation:
                phase === "complete"
                  ? "shimmer 2s ease-in-out infinite"
                  : "none",
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(10px);
            opacity: 0;
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default UnlockTransition;
