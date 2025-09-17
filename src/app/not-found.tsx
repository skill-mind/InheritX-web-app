// "use client";

// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import Image from "next/image";

// // 404 animation: fade-in, floating holographic lock, particles, and a neural network line effect
// export default function NotFoundPage() {
//   const [show, setShow] = useState(false);
//   const [particleCount, setParticleCount] = useState(16);
//   const [particles, setParticles] = useState<Array<{
//     left: string;
//     top: string;
//     animation: string;
//     animationDelay: string;
//   }>>([]);

//   useEffect(() => {
//     setShow(true);
//     const handleResize = () => {
//       const w = window.innerWidth;
//       let count = 16;
//       if (w < 640) count = 6;
//       else if (w < 1024) count = 10;
//       else count = 16;
//       setParticleCount(count);
//       // Generate random values for each particle
//       setParticles(
//         Array.from({ length: count }).map(() => ({
//           left: `${Math.random() * 100}%`,
//           top: `${Math.random() * 100}%`,
//           animation: `float404 ${3 + Math.random() * 4}s linear infinite`,
//           animationDelay: `${Math.random() * 2}s`,
//         }))
//       );
//     };
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return (
//     <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#050608] overflow-hidden px-4 py-16">
//       {/* Animated gradient background */}
//       <div
//         className="absolute inset-0 z-0"
//         style={{
//           background:
//             "linear-gradient(-45deg, rgba(15,23,42,0.98), rgba(2,6,23,0.98), rgba(15,23,42,0.98), rgba(2,6,23,0.98))",
//           backgroundSize: "400% 400%",
//           animation: "gradientShift 3s ease infinite",
//         }}
//       />

//       {/* Floating particles */}
//       <div className="absolute inset-0 pointer-events-none z-0">
//         {particles.map((p, i) => (
//           <div
//             key={i}
//             className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-20"
//             style={{
//               left: p.left,
//               top: p.top,
//               animation: p.animation,
//               animationDelay: p.animationDelay,
//             }}
//           />
//         ))}
//       </div>

//       {/* Main 404 content */}
//       <div
//         className={`relative z-10 bg-gradient-to-br from-slate-900/60 via-slate-800/40 to-slate-900/60 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-8 sm:p-12 w-[min(96%,600px)] mx-4 shadow-2xl transition-all duration-700 flex flex-col items-center ${show ? "animate-fadein" : "opacity-0"}`}
//         style={{
//           boxShadow:
//             "0 0 60px rgba(6,182,212,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
//         }}
//       >
//         {/* Holographic lock icon with floating animation */}
//         <div className="mb-8 flex flex-col items-center">
//           <div className="relative w-24 h-24 mb-4">
//             <div className="absolute inset-0 rounded-full border-2 border-cyan-500/30 animate-spin404" />
//             <div className="absolute inset-4 rounded-full bg-cyan-400/10 flex items-center justify-center animate-float404">
//               <svg
//                 className="w-12 h-12 text-cyan-400"
//                 fill="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path d="M6 10v-4a6 6 0 1 1 12 0v4h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h1zm2 0h8v-4a4 4 0 1 0-8 0v4z" />
//               </svg>
//             </div>
//           </div>
//           <h1 className="text-5xl sm:text-6xl font-bold text-cyan-400 mb-2 tracking-tight">404</h1>
//           <p className="text-lg sm:text-xl text-[#FCFFFF] font-semibold mb-2">Page Not Found</p>
//           <p className="text-[#92A5A8] text-sm sm:text-base mb-2 text-center max-w-[400px]">
//             Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.<br />
//             If you think this is a mistake, please <Link href="/contact" className="text-cyan-400 underline">contact support</Link>.
//           </p>
//         </div>

//         {/* Neural network lines */}
//         <div className="flex justify-between items-center h-8 w-full mb-6">
//           {[...Array(5)].map((_, i) => (
//             <div
//               key={i}
//               className="h-0.5 flex-1 mx-1 rounded-full bg-slate-700 relative overflow-hidden"
//             >
//               <div
//                 className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-1000 ease-out"
//                 style={{ width: show ? "100%" : "0%", animationDelay: `${i * 100}ms` }}
//               />
//             </div>
//           ))}
//         </div>

//         {/* Go Home Button */}
//         <Link
//           href="/"
//           className="group cursor-pointer bg-[#33C5E0] hover:bg-cyan-300 space-x-4 text-[#161E22] text-[14px] font-medium px-8 py-4 rounded-b-[24px] rounded-t-[8px] transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-cyan-400/25 flex items-center"
//         >
//           <span>Go Home</span>
//           <Image src="/assets/icons/arrowup.svg" alt="arrow up icon" width={12} height={12} />
//         </Link>
//       </div>

//       <style jsx>{`
//         @keyframes gradientShift {
//           0% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//           100% { background-position: 0% 50%; }
//         }
//         @keyframes float404 {
//           0%,100% { transform: translateY(0px) translateX(0px); opacity: 0; }
//           10% { opacity: 1; }
//           90% { opacity: 1; }
//           100% { transform: translateY(-100vh) translateX(10px); opacity: 0; }
//         }
//         @keyframes spin404 {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }
//         @keyframes fadein {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }
//         .animate-fadein { animation: fadein 1.2s cubic-bezier(0.2,0.9,0.3,1) forwards; }
//         .animate-float404 { animation: float404 3s ease-in-out infinite; }
//         .animate-spin404 { animation: spin404 2.5s linear infinite; }
//       `}</style>
//     </div>
//   );
// }

"use client";

import React, { useState, useEffect, useRef } from 'react';

// Types for particles and network nodes
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

interface NetworkNode {
  id: number;
  x: number;
  y: number;
  delay: number;
}

const InheritX404 = () => {
  const [glitchActive, setGlitchActive] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [networkNodes, setNetworkNodes] = useState<NetworkNode[]>([]);
  const vaultRef = useRef(null);
  const particlesRef = useRef(null);
  const networkRef = useRef(null);

  // Create glitch effect on mount
  useEffect(() => {
    const glitchTimer = setTimeout(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 1000);
    }, 1500);
    return () => clearTimeout(glitchTimer);
  }, []);

  // Generate floating particles client-side only
  useEffect(() => {
    const particleCount = 20;
    const generatedParticles: Particle[] = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 2,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 15,
    }));
    setParticles(generatedParticles);
  }, []);

  // Generate network nodes client-side only
  useEffect(() => {
    const nodeCount = 12;
    const generatedNodes: NetworkNode[] = Array.from({ length: nodeCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
    }));
    setNetworkNodes(generatedNodes);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 relative overflow-hidden flex items-center justify-center">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent transform -skew-y-12 animate-pulse" />
        <div 
          className="absolute inset-0 bg-grid-pattern opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'gridMove 20s linear infinite'
          }}
        />
      </div>

      {/* Neural Network Background */}
      <div ref={networkRef} className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="w-full h-full">
          {/* Network connections */}
          {networkNodes.map((node, i) => 
            networkNodes.slice(i + 1).map((otherNode, j) => (
              <line
                key={`line-${i}-${j}`}
                x1={`${node.x}%`}
                y1={`${node.y}%`}
                x2={`${otherNode.x}%`}
                y2={`${otherNode.y}%`}
                stroke="url(#networkGradient)"
                strokeWidth="1"
                opacity="0.3"
                className="animate-pulse"
                style={{
                  animationDelay: `${node.delay}s`,
                  animationDuration: '4s'
                }}
              />
            ))
          )}
          {/* Network nodes */}
          {networkNodes.map((node) => (
            <circle
              key={node.id}
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r="3"
              fill="url(#nodeGradient)"
              className="animate-ping"
              style={{
                animationDelay: `${node.delay}s`,
                animationDuration: '3s'
              }}
            />
          ))}
          {/* SVG Gradients */}
          <defs>
            <linearGradient id="networkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
              <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
            <radialGradient id="nodeGradient">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#3b82f6" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* Floating Particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-60"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animation: `float ${particle.duration}s infinite linear`,
              animationDelay: `${particle.delay}s`,
              filter: 'blur(1px)',
            }}
          />
        ))}
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        
        {/* Central Vault Animation */}
        <div ref={vaultRef} className="mb-12 relative">
          <div className="relative inline-block">
            {/* Outer rotating ring */}
            <div className="absolute inset-0 w-48 h-48 mx-auto">
              <div 
                className="w-full h-full rounded-full border-4 border-cyan-500/30"
                style={{
                  animation: 'rotate 20s linear infinite',
                  background: 'conic-gradient(from 0deg, transparent, rgba(6, 182, 212, 0.3), transparent)'
                }}
              />
            </div>
            
            {/* Middle pulsing ring */}
            <div className="absolute inset-4 w-40 h-40 mx-auto">
              <div className="w-full h-full rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 animate-pulse border border-cyan-400/50" />
            </div>
            
            {/* Central vault */}
            <div className="relative w-32 h-32 mx-auto bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-cyan-400/30 shadow-2xl backdrop-blur-sm">
              {/* Vault face */}
              <div className="absolute inset-2 bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl border border-cyan-500/20">
                {/* Lock mechanism */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div 
                    className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 animate-spin shadow-lg shadow-cyan-500/50"
                    style={{ animationDuration: '3s' }}
                  >
                    <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-1 h-3 bg-slate-900 rounded-full" />
                  </div>
                </div>
                
                {/* Vault details */}
                <div className="absolute top-2 left-2 w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
                <div className="absolute top-2 right-2 w-2 h-2 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
                <div className="absolute bottom-2 left-2 w-2 h-2 bg-indigo-400 rounded-full animate-ping" style={{ animationDelay: '2s' }} />
                <div className="absolute bottom-2 right-2 w-2 h-2 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '3s' }} />
              </div>
              
              {/* Holographic overlay */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent animate-pulse" />
            </div>
            
            {/* Scanning lines effect */}
            <div className="absolute inset-0 overflow-hidden rounded-2xl">
              <div 
                className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60"
                style={{
                  animation: 'scanline 3s ease-in-out infinite',
                  top: '0%'
                }}
              />
            </div>
          </div>
        </div>

        {/* 404 Text with Glitch Effect */}
        <div className="mb-8">
          <h1 
            className={`text-8xl md:text-9xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent relative ${glitchActive ? 'animate-glitch' : ''}`}
            style={{ fontFamily: 'monospace' }}
          >
            404
            {glitchActive && (
              <>
                <span className="absolute top-0 left-0 text-red-500 opacity-70 animate-glitch-1">404</span>
                <span className="absolute top-0 left-0 text-blue-500 opacity-70 animate-glitch-2">404</span>
              </>
            )}
          </h1>
          <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-cyan-500 to-transparent animate-pulse mt-4" />
        </div>

        {/* Error Message */}
        <div className="mb-12 space-y-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-white">
            Access <span className="text-cyan-400">Denied</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-lg mx-auto leading-relaxed">
            The digital vault you&apos;re looking for has been secured or moved to a different blockchain node. 
            Let&apos;s get you back to safety.
          </p>
        </div>

        {/* Interactive Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          {/* Go Home Button */}
          <button 
            className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25 focus:outline-none focus:ring-4 focus:ring-cyan-500/50"
            onClick={() => window.location.href = '/'}
          >
            {/* Button background animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Button content */}
            <div className="relative flex items-center gap-3 cursor-pointer">
              <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Return Home</span>
            </div>
            
            {/* Shine effect */}
            <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </button>

          {/* Contact Support Link */}
          <button 
            className="group relative px-8 py-4 bg-slate-800/50 backdrop-blur-sm text-gray-300 font-semibold rounded-xl border border-cyan-500/30 overflow-hidden transition-all duration-300 hover:scale-105 hover:text-white hover:border-cyan-400/60 hover:shadow-lg hover:shadow-cyan-500/10 focus:outline-none focus:ring-4 focus:ring-cyan-500/30"
            onClick={() => window.location.href = '/contact'}
          >
            {/* Button background animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Button content */}
            <div className="relative flex items-center gap-3 cursor-pointer">
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 11-9.75 9.75A9.75 9.75 0 0112 2.25z" />
              </svg>
              <span>Contact Support</span>
            </div>
          </button>
        </div>

        {/* Status Indicator */}
        <div className="mt-12 flex items-center justify-center gap-3 text-sm text-gray-400">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span>Blockchain Network: <span className="text-green-400">Operational</span></span>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) rotate(0deg); 
            opacity: 0.3;
          }
          25% { 
            transform: translateY(-100vh) translateX(50px) rotate(90deg); 
            opacity: 0.8;
          }
          50% { 
            transform: translateY(-200vh) translateX(-30px) rotate(180deg); 
            opacity: 0.6;
          }
          75% { 
            transform: translateY(-300vh) translateX(70px) rotate(270deg); 
            opacity: 0.4;
          }
        }
        
        @keyframes scanline {
          0% { top: 0%; opacity: 1; }
          50% { top: 50%; opacity: 0.8; }
          100% { top: 100%; opacity: 0; }
        }
        
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        @keyframes glitch {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
        }
        
        @keyframes glitch-1 {
          0%, 100% { transform: translate(0); clip-path: inset(0 0 0 0); }
          20% { transform: translate(-2px, 2px); clip-path: inset(0 0 85% 0); }
          40% { transform: translate(-2px, -2px); clip-path: inset(80% 0 15% 0); }
          60% { transform: translate(2px, 2px); clip-path: inset(15% 0 80% 0); }
          80% { transform: translate(2px, -2px); clip-path: inset(85% 0 0 0); }
        }
        
        @keyframes glitch-2 {
          0%, 100% { transform: translate(0); clip-path: inset(0 0 0 0); }
          20% { transform: translate(2px, -2px); clip-path: inset(85% 0 0 0); }
          40% { transform: translate(2px, 2px); clip-path: inset(15% 0 80% 0); }
          60% { transform: translate(-2px, -2px); clip-path: inset(80% 0 15% 0); }
          80% { transform: translate(-2px, 2px); clip-path: inset(0 0 85% 0); }
        }
        
        .animate-glitch { animation: glitch 0.3s infinite; }
        .animate-glitch-1 { animation: glitch-1 0.3s infinite; }
        .animate-glitch-2 { animation: glitch-2 0.3s infinite; }
      `}</style>
    </div>
  );
};

export default InheritX404;