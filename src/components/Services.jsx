import React from 'react';
import {
  Code,
  Globe,
  ShoppingBag,
  Layers,
  Zap,
  Briefcase,
  ArrowRight,
  Plug,
} from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';
import SpotlightCard from './SpotlightCard';

export default function Services() {
  const serviceList = [
    {
      title: 'Custom WordPress Websites & Themes',
      description:
        'Tailored WordPress themes, custom templates, and dynamic features designed for reliability and clean client administration.',
      icon: <Globe className="w-5 h-5 text-blue-500" />,
      glowColor: 'rgba(59, 130, 246, 0.2)',
      tag: 'WordPress & PHP',
    },
    {
      title: 'Custom WordPress Plugins',
      description:
        'Custom WordPress plugins for easier site and content management, extending functionality cleanly and reliably.',
      icon: <Plug className="w-5 h-5 text-indigo-500" />,
      glowColor: 'rgba(99, 102, 241, 0.2)',
      tag: 'WordPress Plugins',
    },
    {
      title: 'WooCommerce Online Stores',
      description:
        'E-commerce setup, product catalogs, shopping cart workflows, and checkout optimization to help businesses sell online.',
      icon: <ShoppingBag className="w-5 h-5 text-purple-500" />,
      glowColor: 'rgba(168, 85, 247, 0.2)',
      tag: 'E-Commerce',
    },
    {
      title: 'Responsive Frontend Development',
      description:
        'Clean, accessible, and responsive user interfaces built with HTML, CSS, JavaScript, and modern React components.',
      icon: <Code className="w-5 h-5 text-emerald-500" />,
      glowColor: 'rgba(16, 185, 129, 0.2)',
      tag: 'React & Modern Web',
    },
    {
      title: 'CMS-Driven Sites with ACF or Sanity',
      description:
        'Structured content architectures using Advanced Custom Fields (ACF) or Sanity Headless CMS for intuitive editing.',
      icon: <Layers className="w-5 h-5 text-amber-500" />,
      glowColor: 'rgba(245, 158, 11, 0.2)',
      tag: 'ACF & Sanity',
    },
    {
      title: 'Fixes, Updates & Performance Improvements',
      description:
        'Troubleshooting bugs, upgrading plugins, enhancing mobile responsiveness, and optimizing load times for existing sites.',
      icon: <Zap className="w-5 h-5 text-cyan-500" />,
      glowColor: 'rgba(6, 182, 212, 0.2)',
      tag: 'Maintenance & Speed',
    },
  ];

  return (
    <section
      className="py-28 bg-white dark:bg-black border-t border-neutral-200 dark:border-neutral-900 transition-colors duration-300"
      id="services"
    >
      <div className="max-w-7xl mx-auto px-6">
        <RevealOnScroll className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400 font-semibold mb-2">
              <Briefcase className="w-4 h-4 text-neutral-900 dark:text-white" />
              <span>Services & Offerings</span>
            </div>
            <h2 className="text-4xl font-bold mb-4 uppercase tracking-tighter text-neutral-900 dark:text-white">
              What I Can Build For You
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed">
              From custom WordPress themes and WooCommerce storefronts to responsive React frontends and headless CMS builds, here is how I can help your team or business.
            </p>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-neutral-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <span>Discuss a Project</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </RevealOnScroll>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceList.map((service, index) => (
            <SpotlightCard
              key={service.title}
              delay={index * 0.05}
              spotlightColor={service.glowColor}
              className={`bg-neutral-50 dark:bg-[#0a0a0a] border border-neutral-200 dark:border-[#222] hover:border-neutral-400 dark:hover:border-neutral-600 p-7 rounded-2xl flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 dark:hover:shadow-white/[0.04] hover:-translate-y-1.5 ${
                index === 3 ? 'lg:col-span-1' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-11 h-11 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center shrink-0 shadow-sm">
                    {service.icon}
                  </div>
                  <span className="text-[11px] font-mono uppercase font-semibold text-neutral-600 dark:text-neutral-400 px-2.5 py-1 rounded-md bg-neutral-200/50 hover:bg-neutral-200/80 dark:bg-neutral-900 dark:hover:bg-neutral-800 border border-neutral-300/40 dark:border-neutral-800 transition-colors cursor-default">
                    {service.tag}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white mb-2 leading-snug">
                  {service.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-200/80 dark:border-neutral-800/80 flex items-center text-xs font-semibold text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-950 dark:group-hover:text-white">
                <a
                  href="#contact"
                  className="hover:underline flex items-center gap-1.5 transition-colors"
                >
                  Request this service &rarr;
                </a>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
