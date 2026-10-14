import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';
import { Download, ArrowUpRight, Briefcase } from 'lucide-react';

const rotatingTitles = [
  'Frontend Developer',
  'WordPress Developer',
  'WooCommerce Developer',
  'Custom Plugin Developer',
];

export default function Hero() {
  const [imgSrc, setImgSrc] = useState(personalInfo.avatar);
  const [titleIndex, setTitleIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;

    const timer = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % rotatingTitles.length);
    }, 2600);

    return () => clearInterval(timer);
  }, [shouldReduceMotion]);

  return (
    <section className="pt-36 pb-20 px-6 min-h-[90vh] flex items-center relative overflow-hidden transition-colors duration-300" id="home">
      {/* Background ambient radial glow */}
      <motion.div
        animate={
          shouldReduceMotion
            ? { scale: 1, opacity: 0.06 }
            : {
                scale: [1, 1.12, 1],
                opacity: [0.04, 0.08, 0.04],
              }
        }
        transition={
          shouldReduceMotion
            ? undefined
            : {
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }
        }
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-blue-400 to-indigo-500 dark:from-white dark:to-white rounded-full blur-[140px] pointer-events-none -z-10"
      />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Column: Text & CTA */}
        <div className="order-2 lg:order-1 flex flex-col justify-center">
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50/90 dark:bg-neutral-900 border border-emerald-200/90 dark:border-neutral-800 text-emerald-900 dark:text-neutral-300 text-xs font-semibold w-fit mb-6 tracking-wide shadow-sm shadow-emerald-500/10 backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.7)]" />
            <span>Open for Freelance &amp; Full-Time Opportunities</span>
          </motion.div>

          {/* Heading with rich designer gradient */}
          <motion.h1
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.08] mb-4 tracking-tight text-slate-950 dark:text-white"
          >
            Frontend &amp; Web{' '}
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 dark:from-white dark:via-neutral-200 dark:to-neutral-400 bg-clip-text text-transparent font-medium">
              Developer
            </span>
          </motion.h1>

          {/* Rotating specialization title - Reserved height and min-width prevent layout shift */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2.5 mb-6 h-9 overflow-hidden"
          >
            <span className="text-xs uppercase tracking-wider font-semibold text-slate-400 dark:text-neutral-500 shrink-0">
              Specializing as:
            </span>
            <div className="relative inline-flex items-center h-full min-w-[210px] sm:min-w-[260px]">
              {shouldReduceMotion ? (
                <span className="px-3 py-1 rounded-md bg-blue-50 dark:bg-white/10 text-blue-700 dark:text-white border border-blue-200/80 dark:border-white/15 text-xs sm:text-sm font-bold tracking-wide">
                  {rotatingTitles[0]}
                </span>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.span
                    key={rotatingTitles[titleIndex]}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="px-3 py-1 rounded-md bg-blue-50 dark:bg-white/10 text-blue-700 dark:text-white border border-blue-200/80 dark:border-white/15 text-xs sm:text-sm font-bold tracking-wide shadow-sm inline-block"
                  >
                    {rotatingTitles[titleIndex]}
                  </motion.span>
                </AnimatePresence>
              )}
            </div>
          </motion.div>

          {/* Bio text */}
          <motion.p
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg text-slate-600 dark:text-neutral-400 max-w-xl mb-10 leading-relaxed font-normal"
          >
            {personalInfo.tagline}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4"
          >
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              href="#projects"
              className="px-7 py-3.5 bg-slate-950 text-white hover:bg-slate-800 shadow-lg shadow-slate-950/20 dark:bg-white dark:text-black dark:hover:bg-neutral-200 dark:shadow-white/10 font-bold text-sm rounded-lg transition-colors flex items-center gap-2"
            >
              <Briefcase className="w-4 h-4 stroke-[2.5]" />
              <span>View My Work</span>
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              href="#contact"
              className="px-7 py-3.5 bg-white hover:bg-slate-50 text-slate-900 border border-slate-200/90 shadow-sm dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-white dark:border-neutral-700 font-bold text-sm rounded-lg transition-colors flex items-center gap-2"
            >
              <span>Hire Me for a Project</span>
              <ArrowUpRight className="w-4 h-4 text-slate-500 dark:text-neutral-400" />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 bg-transparent hover:bg-slate-100 text-slate-700 border border-slate-200/90 shadow-sm dark:bg-transparent dark:hover:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-700 font-bold text-sm rounded-lg transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4 stroke-[2.5]" />
              <span>Download CV</span>
            </motion.a>
          </motion.div>

          {/* Quick Metrics */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-3 gap-6 pt-12 mt-12 border-t border-slate-200/80 dark:border-neutral-800/80 max-w-lg"
          >
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-slate-950 dark:text-white tracking-tight">1.5+</div>
              <div className="text-xs text-slate-500 dark:text-neutral-500 uppercase tracking-wider font-semibold mt-1">Years Experience</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-slate-950 dark:text-white tracking-tight">100%</div>
              <div className="text-xs text-slate-500 dark:text-neutral-500 uppercase tracking-wider font-semibold mt-1">Responsive UI</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-slate-950 dark:text-white tracking-tight">Ahmedabad</div>
              <div className="text-xs text-slate-500 dark:text-neutral-500 uppercase tracking-wider font-semibold mt-1">Gujarat, India</div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Morphing Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="order-1 lg:order-2 relative flex justify-center items-center"
        >
          <div className="relative w-72 h-72 sm:w-96 sm:h-96 lg:w-[420px] lg:h-[420px]">
            {/* Ambient Backlight Glow */}
            <div className="absolute inset-0 profile-shape bg-gradient-to-tr from-blue-500/35 via-indigo-400/30 to-purple-500/35 dark:from-white/20 dark:to-white/10 blur-3xl -z-10 scale-110" />

            {/* Morphing container */}
            <div className="relative z-10 w-full h-full profile-shape overflow-hidden border-4 border-white/95 dark:border-white/20 shadow-[0_20px_50px_rgba(79,70,229,0.18)] dark:shadow-[0_0_60px_rgba(255,255,255,0.08)] transition-all duration-500 hover:scale-105 hover:border-slate-100 dark:hover:border-white/40 bg-white dark:bg-neutral-950">
              <img
                src={imgSrc}
                alt="Portrait of Sneh Gohil, Frontend and Web Developer"
                className="w-full h-full object-cover object-center grayscale-0 dark:grayscale dark:hover:grayscale-0 transition-all duration-700"
                onError={() => setImgSrc(personalInfo.avatarFallback)}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
