import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import {
  FaRocket,
  FaTrophy,
  FaGlobe,
  FaUsers,
  FaCalendarAlt,
  FaStar,
  FaAward,
  FaLightbulb,
  FaBrain,
  FaCode,
  FaBriefcase,
  FaGraduationCap,
  FaChartLine,
  FaCertificate,
  FaMedal,
  FaUserGraduate,
  FaBolt,
  FaSuitcase,
  FaTimes,
  FaBars,
} from "react-icons/fa";

// Custom styles for responsive design
const responsiveStyles = `
  @media (max-width: 768px) {
    .hero-title {
      font-size: 2rem !important;
      line-height: 1.1 !important;
      margin-bottom: 1rem !important;
    }
    
    .hero-subtitle {
      font-size: 1rem !important;
      line-height: 1.4 !important;
      margin-bottom: 1.5rem !important;
    }
    
    .hero-box {
      padding: 1.5rem 1rem !important;
      margin: 0.5rem !important;
      border-radius: 1.5rem !important;
    }
    
    .stats-grid {
      grid-template-columns: 1fr !important;
      gap: 1.5rem !important;
    }
    
    .feature-grid {
      grid-template-columns: 1fr !important;
      gap: 1rem !important;
    }
    
    .footer-grid {
      grid-template-columns: 1fr !important;
      gap: 1.5rem !important;
    }
    
    .marquee-container {
      padding: 0.25rem 0 !important;
      top: 0.5rem !important;
    }
    
    .marquee-item {
      font-size: 0.75rem !important;
      padding: 0.25rem 0.5rem !important;
      margin-right: 0.75rem !important;
    }
    
    .cta-button {
      width: 100% !important;
      max-width: 280px !important;
      padding: 0.75rem 1rem !important;
      font-size: 0.875rem !important;
    }
    
    .social-proof {
      flex-direction: column !important;
      gap: 0.75rem !important;
      align-items: center !important;
    }
    
    .footer-section {
      text-align: center !important;
    }
    
    .info-cards {
      flex-direction: column !important;
      gap: 1rem !important;
      width: 100% !important;
    }
    
    .info-card {
      width: 100% !important;
      justify-content: center !important;
      padding: 0.75rem 1rem !important;
    }
    
    .mobile-menu {
      transform: translateX(-100%) !important;
    }
    
    .mobile-menu.active {
      transform: translateX(0) !important;
    }
  }
  
  @media (max-width: 640px) {
    .hero-title {
      font-size: 1.75rem !important;
      line-height: 1.1 !important;
    }
    
    .hero-subtitle {
      font-size: 0.875rem !important;
      line-height: 1.3 !important;
    }
    
    .stats-container {
      padding: 1.5rem 0.75rem !important;
    }
    
    .feature-card {
      padding: 1.25rem !important;
    }
    
    .footer-container {
      padding: 1.5rem 0.75rem !important;
    }
    
    .marquee-item {
      font-size: 0.7rem !important;
      padding: 0.2rem 0.4rem !important;
    }
  }
  
  @media (max-width: 480px) {
    .hero-title {
      font-size: 1.5rem !important;
      line-height: 1.1 !important;
      margin-bottom: 0.75rem !important;
    }
    
    .hero-subtitle {
      font-size: 0.8rem !important;
      line-height: 1.3 !important;
    }
    
    .hero-box {
      padding: 1rem 0.75rem !important;
      margin: 0.25rem !important;
    }
    
    .marquee-item {
      font-size: 0.65rem !important;
      padding: 0.15rem 0.35rem !important;
      margin-right: 0.5rem !important;
    }
    
    .impact-badges {
      flex-direction: column !important;
      align-items: center !important;
      gap: 0.75rem !important;
    }
    
    .impact-badge {
      width: 100% !important;
      max-width: 180px !important;
      justify-content: center !important;
      padding: 0.5rem 0.75rem !important;
      font-size: 0.75rem !important;
    }
    
    .cta-button {
      max-width: 240px !important;
      padding: 0.625rem 0.875rem !important;
      font-size: 0.8rem !important;
    }
    
    .social-proof span {
      font-size: 0.75rem !important;
      padding: 0.375rem 0.625rem !important;
    }
  }
  
  @media (max-width: 380px) {
    .hero-title {
      font-size: 1.375rem !important;
    }
    
    .hero-subtitle {
      font-size: 0.75rem !important;
    }
    
    .marquee-item {
      font-size: 0.6rem !important;
      padding: 0.125rem 0.25rem !important;
    }
    
    .cta-button {
      max-width: 200px !important;
      font-size: 0.75rem !important;
    }
  }
  
  @media (min-width: 769px) and (max-width: 1024px) {
    .hero-title {
      font-size: 2.75rem !important;
      line-height: 1.2 !important;
    }
    
    .hero-subtitle {
      font-size: 1.25rem !important;
    }
    
    .hero-box {
      padding: 2rem 1.5rem !important;
    }
    
    .stats-grid {
      grid-template-columns: repeat(2, 1fr) !important;
      gap: 2rem !important;
    }
    
    .feature-grid {
      grid-template-columns: repeat(2, 1fr) !important;
      gap: 1.5rem !important;
    }
    
    .footer-grid {
      grid-template-columns: repeat(2, 1fr) !important;
      gap: 2rem !important;
    }
    
    .marquee-item {
      font-size: 0.875rem !important;
    }
  }
  
  @media (min-width: 1025px) and (max-width: 1280px) {
    .hero-title {
      font-size: 3.5rem !important;
    }
    
    .hero-subtitle {
      font-size: 1.5rem !important;
    }
    
    .stats-grid {
      grid-template-columns: repeat(3, 1fr) !important;
    }
    
    .feature-grid {
      grid-template-columns: repeat(3, 1fr) !important;
    }
    
    .footer-grid {
      grid-template-columns: repeat(3, 1fr) !important;
    }
  }
  
  @media (min-width: 1281px) {
    .hero-title {
      font-size: 4rem !important;
    }
    
    .hero-subtitle {
      font-size: 1.75rem !important;
    }
    
    .stats-grid {
      grid-template-columns: repeat(3, 1fr) !important;
    }
    
    .feature-grid {
      grid-template-columns: repeat(3, 1fr) !important;
    }
    
    .footer-grid {
      grid-template-columns: repeat(3, 1fr) !important;
    }
  }
  
  /* Futuristic hero section animations */
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
  }
  
  @keyframes glow {
    0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.5); }
    50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.8); }
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.8; }
  }
  
  @keyframes slide {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  
  @keyframes dataStream {
    0% { transform: translateY(-100vh); opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { transform: translateY(100vh); opacity: 0; }
  }
  
  .floating-element {
    animation: float 6s ease-in-out infinite;
  }
  
  .glowing-element {
    animation: glow 2s ease-in-out infinite;
  }
  
  .pulsing-element {
    animation: pulse 3s ease-in-out infinite;
  }
  
  .sliding-element {
    animation: slide 8s linear infinite;
  }
  
  .data-stream {
    animation: dataStream 8s linear infinite;
  }
  
  /* Mobile menu styles */
  .mobile-menu {
    position: fixed;
    top: 0;
    left: 0;
    width: 80%;
    max-width: 300px;
    height: 100vh;
    background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
    z-index: 9999;
    transition: transform 0.3s ease-in-out;
    box-shadow: 2px 0 20px rgba(0, 0, 0, 0.3);
  }
  
  .mobile-menu-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9998;
  }
  
  /* Smooth scroll behavior */
  html {
    scroll-behavior: smooth;
  }
  
  /* CTA button hover effects */
  .cta-glow:hover {
    box-shadow: 0 0 30px rgba(59, 130, 246, 0.8),
                0 0 60px rgba(59, 130, 246, 0.4),
                0 0 90px rgba(59, 130, 246, 0.2);
  }
  
  /* Improved advertisement section visibility */
  @media (max-width: 768px) {
    .hero-section {
      padding: 1rem 0 !important;
      margin: 0.5rem 0 !important;
      border-radius: 1.5rem !important;
    }
    
    .hero-content {
      padding: 0.5rem !important;
    }
  }
  
  @media (max-width: 480px) {
    .hero-section {
      padding: 0.75rem 0 !important;
      margin: 0.25rem 0 !important;
      border-radius: 1rem !important;
    }
  }
`;

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [timeLeft, setTimeLeft] = React.useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  React.useEffect(() => {
    // Inject responsive styles
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = responsiveStyles;
    document.head.appendChild(styleSheet);
    
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  React.useEffect(() => {
    const targetDate = new Date("February 7, 2026 00:00:00").getTime();
    
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };
    
    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-[#0F1E66] text-white relative overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0">
        {/* Animated Background Orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

        {/* Digital Network Lines */}
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="rgba(59, 130, 246, 0.1)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Floating Digital Particles */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-emerald-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.3, 1, 1.3], rotate: [360, 180, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-20 w-64 h-64 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [0, -40, 0], x: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 rounded-full blur-2xl"
        />

        {/* Light Streaks */}
        <motion.div
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 h-px w-32 bg-gradient-to-r from-transparent via-blue-400 to-transparent"
        />
        <motion.div
          animate={{ x: ["100%", "-100%"] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute top-3/4 h-px w-48 bg-gradient-to-r from-transparent via-emerald-400 to-transparent"
        />
      </div>

      {/* Futuristic Background with Tech Patterns */}
      <div className="absolute inset-0">
        {/* Abstract Tech Pattern */}
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-[#0F1E66]/20"
        />

        {/* Digital Network Lines */}
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="rgba(59, 130, 246, 0.1)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Floating Digital Particles */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-emerald-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.3, 1, 1.3], rotate: [360, 180, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-20 w-64 h-64 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [0, -40, 0], x: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 rounded-full blur-2xl"
        />

        {/* Light Streaks */}
        <motion.div
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 h-px w-32 bg-gradient-to-r from-transparent via-blue-400 to-transparent"
        />
        <motion.div
          animate={{ x: ["100%", "-100%"] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute top-3/4 h-px w-48 bg-gradient-to-r from-transparent via-emerald-400 to-transparent"
        />
      </div>

      <main className="w-full px-1 pt-1 space-y-20 relative z-10">
        {/* Jaw-Dropping Futuristic Hero Section */}
        <section className="relative h-[91.5vh] bg-[#0F1E66] overflow-hidden">
          {/* Cinematic Background Layers */}
          <div className=" absolute inset-0">
            {/* Deep Space Background */}
            <div className="absolute inset-0 bg-[#0F1E66]/50"></div>
            
            {/* Animated Tech Grid */}
            <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="techGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M 60 0 L 0 0 0 60" fill="none" stroke="url(#gridGradient)" strokeWidth="0.5"/>
                  <circle cx="30" cy="30" r="2" fill="url(#gridGradient)" opacity="0.8"/>
                </pattern>
                <linearGradient id="gridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6"/>
                  <stop offset="50%" stopColor="#8b5cf6"/>
                  <stop offset="100%" stopColor="#06b6d4"/>
                </linearGradient>
              </defs>
              <rect width="100%" height="100%" fill="url(#techGrid)"/>
            </svg>

            {/* Floating Data Streams */}
            <motion.div
              animate={{ y: [-100, 100], opacity: [0, 1, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute left-10 w-1 h-32 bg-gradient-to-b from-blue-400 to-transparent"
            />
            <motion.div
              animate={{ y: [-100, 100], opacity: [0, 1, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear", delay: 2 }}
              className="absolute left-1/4 w-1 h-40 bg-gradient-to-b from-purple-400 to-transparent"
            />
            <motion.div
              animate={{ y: [-100, 100], opacity: [0, 1, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear", delay: 4 }}
              className="absolute right-1/4 w-1 h-36 bg-gradient-to-b from-cyan-400 to-transparent"
            />
            <motion.div
              animate={{ y: [-100, 100], opacity: [0, 1, 0] }}
              transition={{ duration: 9, repeat: Infinity, ease: "linear", delay: 6 }}
              className="absolute right-10 w-1 h-44 bg-gradient-to-b from-blue-400 to-transparent"
            />

            {/* Holographic Panels */}
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-20 left-20 w-64 h-64 border border-blue-400/30 rounded-2xl floating-element"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-2xl backdrop-blur-sm"></div>
              <div className="absolute inset-4 border border-cyan-400/20 rounded-xl"></div>
            </motion.div>

            <motion.div
              animate={{ rotate: [360, 0] }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-20 right-20 w-48 h-48 border border-purple-400/30 rounded-2xl floating-element"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-cyan-400/10 rounded-2xl backdrop-blur-sm"></div>
              <div className="absolute inset-4 border border-blue-400/20 rounded-xl"></div>
            </motion.div>

            {/* Floating Code Elements */}
            <motion.div
              animate={{ x: [-50, 50], y: [-30, 30] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/3 left-1/4 text-blue-400 font-mono text-sm opacity-60 floating-element"
            >
              {"<innovation/>"}
            </motion.div>
            <motion.div
              animate={{ x: [50, -50], y: [30, -30] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 right-1/4 text-purple-400 font-mono text-sm opacity-60 floating-element"
            >
              {"{globalImpact}"}
            </motion.div>
            <motion.div
              animate={{ x: [-30, 30], y: [20, -20] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-1/3 left-1/2 text-cyan-400 font-mono text-sm opacity-60 floating-element"
            >
              {"future.build()"}
            </motion.div>

            {/* Neon Light Beams */}
            <motion.div
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-blue-400 to-transparent pulsing-element"
            />
            <motion.div
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-purple-400 to-transparent pulsing-element"
            />
            <motion.div
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-cyan-400 to-transparent pulsing-element"
            />

            {/* Energy Particles */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  x: [Math.random() * 100 - 50, Math.random() * 100 - 50],
                  y: [Math.random() * 100 - 50, Math.random() * 100 - 50],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 2
                }}
                className="absolute w-1 h-1 bg-blue-400 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
              />
            ))}
          </div>

          {/* Hero Content */}
          <div className="relative z-20 flex items-center justify-center min-h-screen px-4">
            <div className="text-center max-w-6xl mx-auto">
              {/* Motivational Quote */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="mb-4"
              >
                <p className="-mt-25 text-lg md:text-xl text-blue-300 font-light tracking-wide italic">
                  "Where Ideas Become Global Impact"
                </p>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.8 }}
                className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 hero-title"
              >
                <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-2xl">
                  International
                </span>
                <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-2xl">
                  Ideathon 2026
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.2 }}
                className="text-xl md:text-2xl lg:text-3xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed hero-subtitle"
              >
                Join the world's brightest minds in a 
                <span className="text-blue-400 font-bold"> futuristic tech arena</span> where 
                <span className="text-purple-400 font-bold"> innovation meets opportunity</span>
              </motion.p>

              {/* Event Details */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.6 }}
                className="flex flex-wrap justify-center gap-6 mb-10"
              >
                <div className="flex items-center gap-3 px-6 py-3 bg-blue-500/20 border border-blue-400/30 rounded-full backdrop-blur-sm">
                  <FaCalendarAlt className="text-blue-400 text-2xl" />
                  <span className="text-blue-300 font-semibold">February 7, 2026</span>
                </div>
                <div className="flex items-center gap-3 px-6 py-3 bg-purple-500/20 border border-purple-400/30 rounded-full backdrop-blur-sm">
                  <FaGlobe className="text-purple-400 text-2xl" />
                  <span className="text-purple-300 font-semibold">Global Event</span>
                </div>
                <div className="flex items-center gap-3 px-6 py-3 bg-cyan-500/20 border border-cyan-400/30 rounded-full backdrop-blur-sm">
                  <FaUsers className="text-cyan-400 text-2xl" />
                  <span className="text-cyan-300 font-semibold">10,000+ Innovators</span>
                </div>
              </motion.div>

              {/* Countdown Timer */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 1.8 }}
                className="mb-10"
              >
                <div className="flex justify-center gap-4 md:gap-8">
                  <div className="text-center">
                    <div className="text-3xl md:text-5xl font-black text-blue-600 font-bold">
                      {String(timeLeft.days).padStart(2, '0')}
                    </div>
                    <div className="text-sm md:text-base text-slate-600 font-medium">Days</div>
                  </div>
                  <div className="text-2xl md:text-3xl font-black text-slate-400">:</div>
                  <div className="text-center">
                    <div className="text-3xl md:text-5xl font-black text-purple-600 font-bold">
                      {String(timeLeft.hours).padStart(2, '0')}
                    </div>
                    <div className="text-sm md:text-base text-slate-600 font-medium">Hours</div>
                  </div>
                  <div className="text-2xl md:text-3xl font-black text-slate-400">:</div>
                  <div className="text-center">
                    <div className="text-3xl md:text-5xl font-black text-cyan-600 font-bold">
                      {String(timeLeft.minutes).padStart(2, '0')}
                    </div>
                    <div className="text-sm md:text-base text-slate-600 font-medium">Minutes</div>
                  </div>
                  <div className="text-2xl md:text-3xl font-black text-slate-400">:</div>
                  <div className="text-center">
                    <div className="text-3xl md:text-5xl font-black text-orange-600 font-bold">
                      {String(timeLeft.seconds).padStart(2, '0')}
                    </div>
                    <div className="text-sm md:text-base text-slate-600 font-medium">Seconds</div>
                  </div>
                </div>
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 2 }}
                className="mb-10"
              >
                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 50px rgba(59, 130, 246, 0.8)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="relative px-12 py-6 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 text-white font-bold text-xl rounded-full shadow-2xl glowing-element cta-button"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <FaRocket className="text-yellow-400" />
                    Register Now & Transform Future
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-cyan-600/30 rounded-full blur-xl"></div>
                </motion.button>
              </motion.div>

              {/* Social Proof */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 2.4 }}
                className="flex flex-wrap justify-center gap-4 text-slate-400"
              >
                <span className="flex items-center gap-2 text-lg">
                  <FaUserGraduate className="text-yellow-400" />
                  Campus Ambassador
                </span>
                <span className="flex items-center gap-2 text-lg">
                  <FaCertificate className="text-blue-400" />
                  Global Recognition
                </span>
                <span className="flex items-center gap-2 text-lg">
                  <FaLightbulb className="text-purple-400" />
                  Career Opportunities
                </span>
              </motion.div>
            </div>
          </div>

          {/* Bottom Motivational Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 3 }}
            className="absolute bottom-8 left-0 right-0 text-center"
          >
            <p className="-mb-6 text-cyan-400 text-xl font-semibold tracking-widest sliding-element">
              THE FUTURE IS BUILT HERE
            </p>
          </motion.div>
        </section>

        {/* Feature Cards Section - Universal Background */}
        <section className="bg-[#0F1E66] relative overflow-hidden">
          {/* Background Effects for Consistency */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
            <div className="absolute top-0 left-0 w-96 h-96 bg-international/20 rounded-full blur-3xl float-animation"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-global/20 rounded-full blur-3xl float-animation delay-1000"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 py-20 space-y-16 relative z-10">
          <div className="text-center space-y-6">
            <motion.h2
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold text-white"
            >
              Comprehensive Career Development Platform
            </motion.h2>
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl text-textMuted max-w-3xl mx-auto"
            >
              <span className="text-international font-semibold">Empower</span> students with 
              <span className="text-global font-semibold"> comprehensive tools</span> and 
              <span className="text-innovation font-semibold"> expert resources</span> to 
              <span className="text-secondary font-semibold"> accelerate</span> their coding journey and 
              <span className="text-success font-semibold"> secure</span> their dream careers
            </motion.p>
          </div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-10 overflow-x-auto"
          >
            {/* Contest & Practice Platform Card */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              whileHover={{ y: -12, scale: 1.03 }}
              className="group relative rounded-3xl border border-international/30 glass-effect p-10 hover:border-international/50 transition-all duration-500 hover:shadow-2xl hover:neon-glow min-h-[400px]"
            >
              <motion.div
                animate={{ opacity: [0, 0.1, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 bg-gradient-to-br from-international/20 to-transparent rounded-3xl"
              />
              <div className="relative">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-international/30 to-global/30 text-international mb-8 border border-international/50 shadow-lg neon-glow"
                >
                  <FaTrophy className="text-3xl" />
                </motion.div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4 gradient-text-international">
                  Contest & Practice Platform
                </h3>
                <p className="text-textMuted text-base mb-6 leading-relaxed">
                  Track upcoming coding contests and practice on the best
                  platform for competitive programming.
                </p>
                <div className="flex flex-wrap gap-3">
                  <motion.a
                    href="https://leetcode.com"
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-accent/30 to-accentAlt/30 text-white hover:from-accent/40 hover:to-accentAlt/40 font-semibold transition-all duration-300 border border-accent/50 hover:border-accent/70 shadow-md hover:shadow-lg hover:neon-glow"
                  >
                    Practice
                    <motion.div
                      animate={{ x: [0, 3, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <FaTrophy className="text-lg" />
                    </motion.div>
                  </motion.a>
                  <motion.a
                    href="https://contest-board.vercel.app"
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-accent/50 text-white hover:border-accent/70 hover:bg-accent/20 font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:neon-glow"
                  >
                    Contests
                  </motion.a>
                </div>
              </div>
            </motion.div>

            {/* Resume Tools Card */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              whileHover={{ y: -12, scale: 1.03 }}
              className="group relative rounded-3xl border border-global/30 glass-effect p-10 hover:border-global/50 transition-all duration-500 hover:shadow-2xl hover:neon-glow-purple min-h-[400px]"
            >
              <motion.div
                animate={{ opacity: [0, 0.1, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute inset-0 bg-gradient-to-br from-global/20 to-transparent rounded-3xl"
              />
              <div className="relative">
                <motion.div
                  animate={{ rotate: [0, -5, 5, 0] }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                  className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-global/30 to-secondary/30 text-global mb-8 border border-global/50 shadow-lg neon-glow-purple"
                >
                  <FaBriefcase className="text-3xl" />
                </motion.div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4 gradient-text-alt">
                  Resume Tools
                </h3>
                <p className="text-textMuted text-base mb-6 leading-relaxed">
                  Create professional resumes and optimize them for your dream
                  job applications.
                </p>
                <div className="flex flex-wrap gap-3">
                  <motion.a
                    href="https://resumegenieai.vercel.app"
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-secondary/30 to-warning/30 text-white hover:from-secondary/40 hover:to-warning/40 font-semibold transition-all duration-300 border border-secondary/50 hover:border-secondary/70 shadow-md hover:shadow-lg hover:neon-glow-pink"
                  >
                    Builder
                  </motion.a>
                  <motion.a
                    href="https://resumegenie-ai.vercel.app"
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-secondary/50 text-white hover:border-secondary/70 hover:bg-secondary/20 font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:neon-glow-pink"
                  >
                    Optimizer
                  </motion.a>
                </div>
              </div>
            </motion.div>

            {/* Code Intelligence Card */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.8 }}
              whileHover={{ y: -12, scale: 1.03 }}
              className="group relative rounded-3xl border border-innovation/30 glass-effect p-10 hover:border-innovation/50 transition-all duration-500 hover:shadow-2xl hover:neon-glow-cyan min-h-[400px]"
            >
              <motion.div
                animate={{ opacity: [0, 0.1, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute inset-0 bg-gradient-to-br from-innovation/20 to-transparent rounded-3xl"
              />
              <div className="relative">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                  className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-innovation/30 to-international/30 text-innovation mb-8 border border-innovation/50 shadow-lg neon-glow-cyan"
                >
                  <FaCode className="text-3xl" />
                </motion.div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4 gradient-text-international">
                  Code Intelligence
                </h3>
                <p className="text-textMuted text-base mb-6 leading-relaxed">
                  Analyze code patterns, identify mistakes, and discover similar
                  practice problems.
                </p>
                <div className="flex flex-wrap gap-3">
                  <motion.a
                    href="https://code-analyser-beta.vercel.app"
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-primary/30 to-accent/30 text-white hover:from-primary/40 hover:to-accent/40 font-semibold transition-all duration-300 border border-primary/50 hover:border-primary/70 shadow-md hover:shadow-lg hover:neon-glow-cyan"
                  >
                    Analyser
                  </motion.a>
                  <motion.a
                    href="https://similar-question-search.vercel.app"
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-primary/50 text-white hover:border-primary/70 hover:bg-primary/20 font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:neon-glow-cyan"
                  >
                    Similar Qs
                  </motion.a>
                </div>
              </div>
            </motion.div>

            {/* Study Resources Card */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              whileHover={{ y: -12, scale: 1.03 }}
              className="group relative rounded-3xl border border-success/30 glass-effect p-10 hover:border-success/50 transition-all duration-500 hover:shadow-2xl hover:neon-glow min-h-[400px]"
            >
              <motion.div
                animate={{ opacity: [0, 0.1, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.5,
                }}
                className="absolute inset-0 bg-gradient-to-br from-success/20 to-transparent rounded-3xl"
              />
              <div className="relative">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-success/30 to-innovation/30 text-success mb-8 border border-success/50 shadow-lg neon-glow"
                >
                  <FaGraduationCap className="text-3xl" />
                </motion.div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4 gradient-text-international">
                  Study Resources
                </h3>
                <p className="text-textMuted text-base mb-6 leading-relaxed">
                  Access comprehensive notes, PYQs, and company-specific
                  preparation materials.
                </p>
                <div className="flex flex-wrap gap-3">
                  <motion.a
                    href="https://companywise-sheet.vercel.app"
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-success/50 text-white hover:border-success/70 hover:bg-success/20 font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:neon-glow"
                  >
                    Company Sheets
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
          </div>
        </section>

        {/* Why This Platform Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="bg-[#0F1E66] relative overflow-hidden space-y-16 py-16"
        >
          {/* Background Effects for Consistency */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
            <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-innovation/20 rounded-full blur-2xl float-animation"></div>
            <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-success/20 rounded-full blur-2xl float-animation delay-1000"></div>
          </div>
          
          <div className="text-center space-y-8 relative z-10">
            <motion.h2
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 2, duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold text-white mb-8"
            >
              Why Choose CareerPrep Ai?
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 2.5, duration: 0.6 }}
                className="text-center space-y-4 p-6 rounded-2xl border border-international/30 glass-effect hover:border-international/50 transition-all duration-500 hover:shadow-2xl hover:neon-glow"
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-international/30 to-global/30 text-international mb-4 border border-international/50 shadow-lg neon-glow"
                >
                  <FaLightbulb className="text-2xl" />
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Innovative Learning
                </h3>
                <p className="text-textMuted">
                  AI-powered personalized learning paths adapted to your skill
                  level and career goals
                </p>
              </motion.div>

              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 2.7, duration: 0.6 }}
                className="text-center space-y-4 p-6 rounded-2xl border border-primary/30 glass-effect hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:neon-glow-cyan"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/30 to-innovation/30 text-primary mb-4 border border-primary/50 shadow-lg neon-glow-cyan"
                >
                  <FaBrain className="text-2xl" />
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Smart Analytics
                </h3>
                <p className="text-textMuted">
                  Track progress, identify strengths, and get personalized
                  recommendations
                </p>
              </motion.div>

              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 2.9, duration: 0.6 }}
                className="text-center space-y-4 p-6 rounded-2xl border border-secondary/30 glass-effect hover:border-secondary/50 transition-all duration-500 hover:shadow-2xl hover:neon-glow-purple"
              >
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary/30 to-warning/30 text-secondary mb-4 border border-secondary/50 shadow-lg neon-glow-purple"
                >
                  <FaChartLine className="text-2xl" />
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Career Guidance
                </h3>
                <p className="text-textMuted">
                  Expert mentorship and industry connections for your dream job
                </p>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 3.2, duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-international/20 via-global/20 to-primary/20 rounded-2xl blur-xl"></div>
              <div className="relative p-8 rounded-2xl border border-international/30 glass-effect">
                <p className="text-2xl text-white leading-relaxed font-medium">
                  <span className="block mb-4">Join thousands of students who have already</span>
                  <span className="block text-3xl font-bold gradient-text-international mb-4">
                    transformed their careers
                  </span>
                  <span className="text-xl">with our</span>
                  <span className="block text-2xl font-bold gradient-text-alt mx-2">
                    comprehensive platform
                  </span>
                </p>
                <p className="text-lg text-textMuted mt-6 leading-relaxed">
                  From beginners to experienced developers, we provide the tools and guidance you need to succeed in your tech journey.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Stats & Achievements Section - Enhanced Impact */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5, duration: 1 }}
          className="space-y-16 py-16"
        >
          <div className="text-center space-y-8">
            <motion.h2
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 3.8, duration: 0.8 }}
              className="text-4xl md:text-5xl mt-[-60px] font-bold text-white mb-8"
            >
              Trusted by Students & Educators
            </motion.h2>

            {/* Enhanced Stats Container with Impact */}
            <div className="relative max-w-4xl mx-auto stats-container">
              {/* Background Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-international/20 via-global/20 to-primary/20 rounded-3xl blur-xl"></div>
              
              <div className="relative glass-effect rounded-3xl border border-international/30 shadow-2xl p-6 md:p-8 lg:p-12">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 stats-grid">
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 4.2, duration: 0.6 }}
                    className="text-center group"
                  >
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-international/30 to-global/30 text-international mb-4 border border-international/50 shadow-lg neon-glow"
                    >
                      <FaUsers className="text-2xl" />
                    </motion.div>
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="text-3xl md:text-4xl font-bold text-white mb-2 gradient-text-international"
                    >
                      10,000+
                    </motion.div>
                    <p className="text-textMuted font-medium">Active Students</p>
                    <p className="text-sm text-textMuted/70 mt-1">Learning & Growing</p>
                  </motion.div>

                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 4.4, duration: 0.6 }}
                    className="text-center group"
                  >
                    <motion.div
                      animate={{ rotate: [0, -360] }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-success/30 to-primary/30 text-success mb-4 border border-success/50 shadow-lg neon-glow-cyan"
                    >
                      <FaGraduationCap className="text-2xl" />
                    </motion.div>
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                      className="text-3xl md:text-4xl font-bold text-white mb-2 gradient-text-international"
                    >
                      500+
                    </motion.div>
                    <p className="text-textMuted font-medium">Educational Institutions</p>
                    <p className="text-sm text-textMuted/70 mt-1">Partner Schools</p>
                  </motion.div>

                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 4.6, duration: 0.6 }}
                    className="text-center group"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary/30 to-warning/30 text-secondary mb-4 border border-secondary/50 shadow-lg neon-glow-purple"
                    >
                      <FaAward className="text-2xl" />
                    </motion.div>
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                      className="text-3xl md:text-4xl font-bold text-white mb-2 gradient-text-alt"
                    >
                      95%
                    </motion.div>
                    <p className="text-textMuted font-medium">Success Rate</p>
                    <p className="text-sm text-textMuted/70 mt-1">Career Placements</p>
                  </motion.div>
                </div>

                {/* Enhanced Call to Action */}
                <motion.div 
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 5.2, duration: 0.8 }}
                  className="mt-12 text-center"
                >
                  <div className="glass-effect rounded-2xl p-8 border border-international/30">
                    <motion.p 
                      animate={{ opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="text-xl text-white leading-relaxed font-medium"
                    >
                      Join the{" "}
                      <span className="text-blue-700 font-bold bg-gradient-to-r from-blue-700 to-emerald-700 bg-clip-text text-transparent">
                        revolution in career development
                      </span>
                      . Start your journey today and become part of our{" "}
                      <span className="text-emerald-700 font-bold bg-gradient-to-r from-emerald-700 to-cyan-700 bg-clip-text text-transparent">
                        success story
                      </span>
                      .
                    </motion.p>
                    
                    {/* Additional Impact Statement */}
                    <motion.div
                      initial={{ scale: 0.95 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }}
                      className="mt-6 flex flex-wrap justify-center gap-3 impact-badges"
                    >
                      <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold border border-blue-200 flex items-center gap-2 impact-badge">
                        <FaBolt className="text-sm" /> Fast Track Career
                      </span>
                      <span className="px-4 py-2 bg-cyan-100 text-cyan-700 rounded-full text-sm font-semibold border border-cyan-200 flex items-center gap-2 impact-badge">
                        <FaSuitcase className="text-sm" /> Job Ready Skills
                      </span>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Footer - International Ideathon Theme */}
        <footer className="relative border-t border-international/30 glass-effect">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12 footer-container mb-0">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8 footer-grid">
              <div className="space-y-4 footer-section">
                <h3 className="text-lg font-bold text-white mb-4">Platform</h3>
                <div className="space-y-2 text-textMuted">
                  <p className="flex items-center gap-2">
                    <span className="text-international">●</span>
                    <a
                      href="https://leetcode.com"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-international transition-colors"
                    >
                      Practice Platform
                    </a>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-international">●</span>
                    <a
                      href="https://contest-board.vercel.app"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-international transition-colors"
                    >
                      Contest Board
                    </a>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-international">●</span>
                    <a
                      href="https://code-analyser-beta.vercel.app"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-international transition-colors"
                    >
                      Code Analyser
                    </a>
                  </p>
                </div>
              </div>

              <div className="space-y-4 footer-section">
                <h3 className="text-lg font-bold text-white mb-4">Resources</h3>
                <div className="space-y-2 text-textMuted">
                  <p className="flex items-center gap-2">
                    <span className="text-secondary">●</span>
                    <a
                      href="https://companywise-sheet.vercel.app"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-secondary transition-colors"
                    >
                      Company Sheets
                    </a>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-secondary">●</span>
                    <a
                      href="https://resumegenieai.vercel.app"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-secondary transition-colors"
                    >
                      Resume Builder
                    </a>
                  </p>
                </div>
              </div>

              <div className="space-y-4 footer-section">
                <h3 className="text-lg font-bold text-white mb-4">Legal</h3>
                <div className="space-y-2 text-textMuted">
                  <p className="flex items-center gap-2">
                    <span className="text-secondary">●</span>
                    <a
                      href="/privacy"
                      className="hover:text-secondary transition-colors"
                    >
                      Privacy Policy
                    </a>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-secondary">●</span>
                    <a
                      href="/terms"
                      className="hover:text-secondary transition-colors"
                    >
                      Terms of Service
                    </a>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-secondary">●</span>
                    <a
                      href="/contact"
                      className="hover:text-secondary transition-colors"
                    >
                      Contact Us
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Company Section - Bottom Center */}
            <div className="text-center mt-6 md:mt-8 pt-6 md:pt-8 border-t border-international/30">
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white mb-4">Company</h3>
                <div className="space-y-2 text-textMuted">
                  <p className="text-sm">
                    {" "}
                    2026 CareerPrep Ai. All rights reserved.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Accent Line - Modern Theme */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-international via-global to-primary"></div>
          </div>
        </footer>
      </main>
    </div>
  );
}
