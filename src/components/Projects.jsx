import React from 'react';
import { motion } from 'framer-motion';
import { projects, personalInfo } from '../data/portfolioData';
import { ExternalLink, Github, ArrowRight, Layers, Briefcase } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';
import SpotlightCard from './SpotlightCard';
import { useTheme } from '../context/ThemeContext';

export default function Projects() {
  const { isDark } = useTheme();

  return (
    <section className="py-28 px-6 max-w-7xl mx-auto transition-colors duration-300" id="projects">
      {/* Section Header with Gradient Accent */}
      <RevealOnScroll className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50/80 border border-blue-200/70 text-blue-700 dark:bg-transparent dark:border-0 dark:p-0 dark:text-neutral-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Layers className="w-4 h-4 text-blue-600 dark:text-white" />
            <span>Portfolio Work</span>
          </div>
          <h2 className="text-4xl font-bold mb-4 tracking-tight uppercase text-slate-950 dark:text-white">
            Featured{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 dark:from-white dark:via-neutral-300 dark:to-neutral-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-slate-600 dark:text-neutral-400 text-sm sm:text-base">
            A selection of personal projects built to practice frontend and e-commerce fundamentals.
          </p>
        </div>

        <motion.a
          whileHover={{ x: 4 }}
          href={personalInfo.socials.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-blue-600 hover:text-indigo-700 dark:text-white dark:hover:text-white text-sm font-bold underline underline-offset-8 decoration-1 decoration-blue-300 dark:decoration-neutral-700 hover:decoration-blue-600 dark:hover:decoration-white w-fit transition-colors"
        >
          <span>View All on GitHub</span>
          <ArrowRight className="w-4 h-4" />
        </motion.a>
      </RevealOnScroll>

      {/* Projects Grid with SpotlightCard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
        {projects.map((project, index) => (
          <SpotlightCard
            key={project.id}
            delay={index * 0.15}
            spotlightColor={isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(79, 70, 229, 0.08)"}
            className={`group bg-white/95 dark:bg-neutral-950 rounded-2xl border border-slate-200/90 dark:border-white/10 overflow-hidden hover:border-indigo-300 dark:hover:border-white/30 hover:-translate-y-1.5 transition-all duration-300 flex flex-col shadow-[0_4px_25px_rgba(0,0,0,0.04)] hover:shadow-xl hover:shadow-indigo-500/10 dark:hover:shadow-white/[0.04] ${!project.image ? 'lg:col-span-2' : ''}`}
          >
            {/* Image Preview Container — only render if project has an image */}
            {project.image && (
              <div className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-neutral-900">
                <img
                  src={project.image}
                  alt={`${project.title} Screenshot`}
                  className="w-full h-full object-cover grayscale-0 dark:grayscale dark:group-hover:grayscale-0 group-hover:scale-105 transition-transform duration-500 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 dark:from-neutral-950/70 via-transparent to-transparent opacity-40 dark:opacity-50 group-hover:opacity-10 transition-opacity duration-300" />

                {project.featured && (
                  <div className="absolute top-4 left-4 z-20">
                    <span className="bg-neutral-900 text-white dark:bg-white dark:text-black text-[11px] font-black px-3 py-1 rounded-lg uppercase tracking-wider shadow-md">
                      Featured
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* No-image header for Professional Work card */}
            {!project.image && (
              <div className="px-7 sm:px-8 pt-7 sm:pt-8 flex items-center gap-3">
                <div className="w-11 h-11 rounded-lg bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 flex items-center justify-center shrink-0 text-slate-700 dark:text-white">
                  <Briefcase className="w-5 h-5" />
                </div>
                <span className="bg-neutral-900 text-white dark:bg-white dark:text-black text-[11px] font-black px-3 py-1 rounded-lg uppercase tracking-wider shadow-md">
                  Client Work
                </span>
              </div>
            )}

            {/* Content Details */}
            <div className="p-7 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-neutral-200 transition-colors">
                  {project.title}
                </h3>
                <p className={`text-sm text-slate-600 dark:text-neutral-400 mb-6 leading-relaxed ${project.image ? 'line-clamp-3' : ''}`}>
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 bg-blue-50/70 hover:bg-blue-100/90 border border-blue-200/60 hover:border-blue-300/80 text-blue-700 font-semibold dark:bg-white/5 dark:border-white/10 dark:text-neutral-300 dark:hover:bg-white/15 dark:hover:border-white/20 text-[11px] rounded-lg uppercase tracking-wide transition-all duration-200 cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Links — only show if project has demoUrl */}
              {project.demoUrl && (
                <div className="flex items-center justify-between border-t border-slate-200/80 dark:border-white/10 pt-5">
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-indigo-700 dark:text-white dark:hover:text-neutral-300 transition-colors group/btn"
                  >
                    <ExternalLink className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
                    <span>Live Demo</span>
                  </motion.a>

                  <a
                    href={personalInfo.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
                    aria-label="View Source on GitHub"
                  >
                    <Github className="w-4 h-4" />
                    <span>Source Code</span>
                  </a>
                </div>
              )}
            </div>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}
