import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Services from './components/Services';
import Skills from './components/Skills';
import AIWorkflow from './components/AIWorkflow';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import FloatingBackToTop from './components/FloatingBackToTop';
import { ThemeProvider } from './context/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black relative">
        {/* Subtle bespoke tactile dot grid */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.18] [background-image:radial-gradient(#52525b_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_35%,#000_70%,transparent_100%)] z-0" />

        <ScrollProgress />
        <Navbar />
        <main className="relative z-10">
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Services />
          <Skills />
          <AIWorkflow />
          <Contact />
        </main>
        <Footer />
        <FloatingBackToTop />
      </div>
    </ThemeProvider>
  );
}
