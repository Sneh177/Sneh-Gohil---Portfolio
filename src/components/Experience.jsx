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
      className="py-28 bg-black border-t border-neutral-900 relative transition-colors duration-300"
      id="experience"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <RevealOnScroll className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-3">
              <Briefcase className="w-4 h-4 text-blue-400" />
              <span>Career Path</span>
            </div>
            <h2 className="text-4xl font-bold mb-4 uppercase tracking-tighter text-white">
              Work{' '}Experience

            </h2>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              My professional journey building custom websites, WordPress themes, custom plugins, and responsive frontend applications.
            </p>
          </div>
          <div className="h-1 w-12 bg-white rounded-full hidden md:block self-center mb-4" />
        </RevealOnScroll>

        {/* Timeline Container spanning full width */}
        <div ref={containerRef} className="relative">
          {/* Background static track line */}
          <div className="absolute left-[7px] top-4 bottom-6 w-[2px] bg-neutral-800 rounded-full" />

          {/* Scroll-driven filled line that smoothly grows as you scroll */}
          <motion.div
            style={{ scaleY: shouldReduceMotion ? 1 : scaleY }}
            className="absolute left-[7px] top-4 bottom-6 w-[2px] bg-gradient-to-b from-blue-500 via-indigo-400 to-white origin-top rounded-full shadow-[0_0_12px_rgba(59,130,246,0.5)]"
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
                {/* Timeline Node Dot */}
                <motion.div
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className={`absolute left-0 top-7 w-4 h-4 rounded-full border-4 border-black ring-2 transition-all duration-300 group-hover:scale-125 z-10 ${exp.current
                    ? 'bg-white ring-white/60 shadow-[0_0_12px_rgba(255,255,255,0.6)]'
                    : 'bg-neutral-600 ring-neutral-700'
                    }`}
                />

                {/* Experience Content Card spanning full max-w-7xl width */}
                <div className="p-7 sm:p-9 rounded-2xl bg-[#0a0a0a] border border-[#222] hover:border-neutral-700 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  {/* Role Header */}
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-5 border-b border-neutral-800">
                    <div>
                      <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-neutral-200 transition-colors">
                        {exp.role}
                      </h3>
                      <p className="text-blue-400 font-semibold mt-1 text-sm sm:text-base">
                        {exp.company}
                      </p>
                    </div>

                    <span
                      className={`inline-flex items-center px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest h-fit shrink-0 transition-colors ${exp.current
                        ? 'bg-white text-black shadow-md'
                        : 'bg-neutral-900 border border-neutral-800 text-neutral-300'
                        }`}
                    >
                      {exp.period}
                    </span>
                  </div>

                  {/* Bullet Points in 2-column grid on desktop for balanced measure */}
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3.5 text-neutral-300 font-normal pt-5">
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
