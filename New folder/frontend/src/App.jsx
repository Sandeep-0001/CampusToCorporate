import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0F1E66] text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 -z-10">
        {/* Larger, more prominent glowing orbs */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-international/40 rounded-full blur-3xl float-animation pulse-glow"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-global/40 rounded-full blur-3xl float-animation delay-1000 pulse-glow"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-innovation/30 rounded-full blur-2xl float-animation"></div>
        
        {/* Additional smaller orbs for more visual interest */}
        <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-secondary/20 rounded-full blur-2xl float-animation delay-500"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[250px] h-[250px] bg-success/20 rounded-full blur-2xl float-animation delay-1500"></div>
        
        {/* Enhanced grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        
        {/* Additional gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-international/10 via-transparent to-global/10"></div>
      </div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}
