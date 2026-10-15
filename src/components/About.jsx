import React from 'react';
import { User, MapPin, Briefcase, Sparkles, Code2 } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';
import { personalInfo } from '../data/portfolioData';

export default function About() {
  const bioParagraphs = personalInfo.bio.split('\n\n');

  return (
    <section
      className="py-28 bg-white dark:bg-black border-t border-neutral-200 dark:border-neutral-900 transition-colors duration-300 relative"
      id="about"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <RevealOnScroll className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-700 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-3">
              <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>About Me</span>
            </div>
            <h2 className="text-4xl font-bold mb-4 uppercase tracking-tighter text-neutral-900 dark:text-white">
              Background &amp; Approach
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed">
              Frontend &amp; Web Developer based in Ahmedabad with about 1.5 years of professional experience building responsive websites, WooCommerce stores, and custom WordPress plugins.
            </p>
          </div>
          <div className="h-0.5 w-12 bg-neutral-300 dark:bg-neutral-700 rounded-full hidden md:block self-center mb-4" />
        </RevealOnScroll>

        {/* 2-Column Full Width Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column (8 cols): Bio Card */}
          <div className="lg:col-span-8 flex flex-col">
            <RevealOnScroll delay={0.08} className="h-full">
              <div className="p-8 sm:p-10 rounded-2xl bg-neutral-50/70 dark:bg-[#0a0a0a] border border-neutral-200 dark:border-[#222] hover:border-neutral-300 dark:hover:border-neutral-700 shadow-sm transition-all duration-300 h-full flex flex-col justify-between">
                <div className="space-y-5 text-neutral-700 dark:text-neutral-300 text-base sm:text-lg leading-relaxed font-normal">
                  {bioParagraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>

                {/* Quick Fact Badges at the bottom */}
                <div className="pt-8 mt-8 border-t border-neutral-200 dark:border-neutral-800 flex flex-wrap gap-3 text-xs font-semibold">
                  <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-300 shadow-xs">
                    <Briefcase className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <span>Web Developer at Huptech Web</span>
                  </div>
                  <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-300 shadow-xs">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                    <span>1.5+ Years Professional Exp</span>
                  </div>
                  <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-300 shadow-xs">
                    <MapPin className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                    <span>Ahmedabad, India</span>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>

          {/* Right Column (4 cols): Highlights & Pillars */}
          <div className="lg:col-span-4 flex flex-col gap-4 justify-between">
            <RevealOnScroll delay={0.16} className="flex-1">
              <div className="p-6 sm:p-7 rounded-2xl bg-neutral-50/70 dark:bg-[#0a0a0a] border border-neutral-200 dark:border-[#222] hover:border-neutral-300 dark:hover:border-neutral-700 shadow-sm transition-all duration-300 h-full flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 shadow-xs">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">Current Role</span>
                    <h3 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white">Web Developer</h3>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Building custom WordPress themes, WooCommerce stores, CMS-driven sites with ACF and Sanity, and React-based frontends at Huptech Web.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.24} className="flex-1">
              <div className="p-6 sm:p-7 rounded-2xl bg-neutral-50/70 dark:bg-[#0a0a0a] border border-neutral-200 dark:border-[#222] hover:border-neutral-300 dark:hover:border-neutral-700 shadow-sm transition-all duration-300 h-full flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 shadow-xs">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">Core Specialty</span>
                    <h3 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white">Custom WordPress Plugins</h3>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Creating custom plugins that make website and content management easier for clients while keeping the code clean and maintainable.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.32} className="flex-1">
              <div className="p-6 sm:p-7 rounded-2xl bg-neutral-50/70 dark:bg-[#0a0a0a] border border-neutral-200 dark:border-[#222] hover:border-neutral-300 dark:hover:border-neutral-700 shadow-sm transition-all duration-300 h-full flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 shadow-xs">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">Location</span>
                    <h3 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white">Ahmedabad, India</h3>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Based in Nehru Nagar, Ahmedabad. Open for freelance projects and future full-time developer opportunities.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
