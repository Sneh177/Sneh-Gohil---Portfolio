import React from 'react';
import { Sparkles, Layers, Bug, Compass, Zap, CheckCircle2 } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';
import SpotlightCard from './SpotlightCard';

export default function AIWorkflow() {
  const workflowPoints = [
    {
      title: 'Rapid Prototyping',
      description: 'Rapid prototyping of UI layouts and components',
      icon: <Layers className="w-5 h-5 text-indigo-500" />,
      glowColor: 'rgba(99, 102, 241, 0.2)',
    },
    {
      title: 'Debugging & Troubleshooting',
      description: 'Debugging and troubleshooting errors',
      icon: <Bug className="w-5 h-5 text-rose-500" />,
      glowColor: 'rgba(244, 63, 94, 0.2)',
    },
    {
      title: 'Code Comprehension',
      description: 'Understanding unfamiliar codebases',
      icon: <Compass className="w-5 h-5 text-cyan-500" />,
      glowColor: 'rgba(6, 182, 212, 0.2)',
    },
    {
      title: 'Task Automation',
      description: 'Automating repetitive tasks',
      icon: <Zap className="w-5 h-5 text-amber-500" />,
      glowColor: 'rgba(245, 158, 11, 0.2)',
    },
  ];

  return (
    <section
      className="py-24 bg-white dark:bg-black border-t border-neutral-200 dark:border-neutral-900 transition-colors duration-300"
      id="ai-workflow"
    >
      <div className="max-w-7xl mx-auto px-6">
        <RevealOnScroll className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400 font-semibold mb-2">
            <Sparkles className="w-4 h-4 text-neutral-900 dark:text-white" />
            <span>Modern Engineering Workflow</span>
          </div>
          <h2 className="text-4xl font-bold mb-4 uppercase tracking-tighter text-neutral-900 dark:text-white">
            How I work with AI
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed">
            I use AI tools as a development accelerator, not a replacement for understanding the code. They help me with:
          </p>
        </RevealOnScroll>

        {/* Workflow Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {workflowPoints.map((point, index) => (
            <SpotlightCard
              key={point.title}
              delay={index * 0.05}
              spotlightColor={point.glowColor}
              className="bg-neutral-50 dark:bg-[#0a0a0a] border border-neutral-200 dark:border-[#222] hover:border-neutral-400 dark:hover:border-neutral-600 p-6 rounded-2xl flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center shrink-0 mb-4 shadow-sm">
                  {point.icon}
                </div>
                <h3 className="font-bold text-sm text-neutral-900 dark:text-white mb-1.5">
                  {point.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {point.description}
                </p>
              </div>
            </SpotlightCard>
          ))}
        </div>

        {/* Closing Responsibility Callout */}
        <RevealOnScroll delay={0.2}>
          <div className="p-4 sm:p-5 rounded-2xl bg-neutral-50 dark:bg-[#0a0a0a] border border-neutral-200 dark:border-neutral-800/80 flex items-center gap-3.5 max-w-2xl">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <p className="text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-200">
              I review, test, and take responsibility for everything that ships.
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
