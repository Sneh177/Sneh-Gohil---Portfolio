import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';
import { experiences } from '../data/portfolioData';
import { Briefcase } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

export default function Experience() {
  const containerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // Measure scroll progress specifically through the timeline container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 65%', 'end 75%'],
  });

  // Smooth spring physics so the line fill glides organically
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <section
      className="py-28 bg-white dark:bg-black border-t border-neutral-200 dark:border-neutral-900 relative transition-colors duration-300"
      id="experience"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <RevealOnScroll className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-700 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-3">
              <Briefcase className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Career Path</span>
            </div>
            <h2 className="text-4xl font-bold mb-4 uppercase tracking-tighter text-neutral-900 dark:text-white">
              Work Experience
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed">
              My professional journey building custom websites, WordPress themes, custom plugins, and responsive frontend applications.
            </p>
          </div>
          <div className="h-0.5 w-12 bg-neutral-300 dark:bg-neutral-700 rounded-full hidden md:block self-center mb-4" />
        </RevealOnScroll>

        {/* Timeline Container spanning full width */}
        <div ref={containerRef} className="relative">
          {/* Background static track line */}
          <div className="absolute left-[7px] top-4 bottom-6 w-[2px] bg-neutral-200 dark:bg-neutral-800 rounded-full" />

          {/* Scroll-driven filled line that smoothly grows as you scroll */}
          <motion.div
            style={{ scaleY: shouldReduceMotion ? 1 : scaleY }}
            className="absolute left-[7px] top-4 bottom-6 w-[2px] bg-gradient-to-b from-blue-500 via-indigo-500 to-blue-600 dark:to-white origin-top rounded-full shadow-[0_0_12px_rgba(59,130,246,0.5)]"
          />

          <div className="space-y-10">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -15, y: shouldReduceMotion ? 0 : 10 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: shouldReduceMotion ? 0.2 : 0.35,
                  delay: shouldReduceMotion ? 0 : index * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative pl-8 md:pl-12 group"
              >
                {/* Timeline Node Dot - with crisp contrast in both themes */}
                <motion.div
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className={`absolute left-0 top-7 w-4 h-4 rounded-full transition-all duration-300 group-hover:scale-125 z-10 ${
                    exp.current
                      ? 'bg-blue-600 ring-4 ring-blue-100 dark:bg-white dark:ring-white/40 shadow-sm'
                      : 'bg-neutral-400 ring-4 ring-neutral-100 dark:bg-neutral-600 dark:ring-neutral-800'
                  }`}
                />

                {/* Experience Content Card */}
                <div className="p-7 sm:p-9 rounded-2xl bg-neutral-50/70 dark:bg-[#0a0a0a] border border-neutral-200 dark:border-[#222] hover:border-neutral-300 dark:hover:border-neutral-700 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                  {/* Role Header */}
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-5 border-b border-neutral-200 dark:border-neutral-800">
                    <div>
                      <h3 className="text-2xl font-bold text-neutral-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-neutral-200 transition-colors">
                        {exp.role}
                      </h3>
                      <p className="text-blue-600 dark:text-blue-400 font-semibold mt-1 text-sm sm:text-base">
                        {exp.company}
                      </p>
                    </div>

                    <span
                      className={`inline-flex items-center px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest h-fit shrink-0 transition-colors ${
                        exp.current
                          ? 'bg-neutral-900 text-white dark:bg-white dark:text-black shadow-sm'
                          : 'bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 shadow-xs'
                      }`}
                    >
                      {exp.period}
                    </span>
                  </div>

                  {/* Bullet Points in 2-column grid on desktop for balanced measure */}
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3.5 text-neutral-700 dark:text-neutral-300 font-normal pt-5">
                    {exp.description.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm leading-relaxed">
                        <span className="mt-2 w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0 group-hover:scale-125 transition-transform" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
