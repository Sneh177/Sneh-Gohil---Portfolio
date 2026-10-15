import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalInfo, navLinks } from '../data/portfolioData';
import { MessageSquare, Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme, isDark } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['about', 'experience', 'projects', 'services', 'skills', 'contact'];
      
      // If at top in Hero section, clear active section
      if (window.scrollY < 200) {
        setActiveSection('');
        return;
      }

      // If near bottom of the document, activate contact
      if (window.innerHeight + Math.round(window.scrollY) >= document.documentElement.scrollHeight - 80) {
        setActiveSection('contact');
        return;
      }

      // Check section bounding rects from bottom to top
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/85 dark:bg-black/80 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-black/50'
          : 'bg-white/50 dark:bg-black/50 backdrop-blur-md border-b border-slate-200/40 dark:border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="#home"
          className="flex items-center gap-2 group cursor-pointer focus:outline-none"
        >
          <span className="text-xl font-bold tracking-tight uppercase transition-colors text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:opacity-80">
            {personalInfo.name}
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => {
            const sectionTarget = link.href.replace('#', '');
            const isActive = activeSection === sectionTarget;
            return (
              <a
                key={link.label}
                href={link.href}
                className={`text-sm font-medium transition-all duration-200 relative py-1 ${
                  isActive
                    ? 'text-blue-600 dark:text-white font-bold'
                    : 'text-slate-600 hover:text-slate-950 dark:text-neutral-400 dark:hover:text-white'
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-white rounded-full transition-all"
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">

          {/* Theme Toggle Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="p-2.5 rounded-lg border border-slate-200/90 dark:border-white/10 bg-slate-100/80 dark:bg-white/5 hover:bg-slate-200/80 dark:hover:bg-white/10 text-slate-700 dark:text-neutral-300 transition-all focus:outline-none cursor-pointer flex items-center justify-center"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-800" />
            )}
          </motion.button>

          {/* WhatsApp Message CTA */}
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href={personalInfo.socials.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 bg-neutral-950 hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-200 dark:text-black text-sm font-bold rounded-lg transition-all duration-200 shadow-sm"
            aria-label="Message Me on WhatsApp"
          >
            <MessageSquare className="w-4 h-4 stroke-[2.5]" />
            <span className="hidden sm:inline">Message Me</span>
          </motion.a>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-950 dark:text-neutral-400 dark:hover:text-white rounded-lg focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 dark:bg-neutral-950/95 border-b border-slate-200/90 dark:border-neutral-800 backdrop-blur-xl px-6 py-6 transition-all duration-300"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => {
                const sectionTarget = link.href.replace('#', '');
                const isActive = activeSection === sectionTarget;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-base font-medium py-2.5 px-3 rounded-xl transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 font-bold dark:bg-white/10 dark:text-white'
                        : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100/80 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}

              {/* Mobile Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="mt-2 flex items-center justify-between py-2.5 px-3 rounded-xl border border-slate-200/90 dark:border-white/10 bg-slate-100/70 dark:bg-white/5 text-slate-800 dark:text-white text-base font-semibold transition-colors"
                aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              >
                <span>Appearance</span>
                <span className="flex items-center gap-2 text-xs uppercase tracking-wider font-bold">
                  {isDark ? (
                    <>
                      <Sun className="w-4 h-4 text-amber-400" />
                      <span>Light Mode</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-4 h-4 text-slate-800" />
                      <span>Dark Mode</span>
                    </>
                  )}
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
