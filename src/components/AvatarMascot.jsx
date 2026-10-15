import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * AvatarMascot — "Mochi", the Crazy Cute Interactive Form Companion
 * A super adorable, squishy, expressive chibi character that reacts to contact form interactions:
 * - 'idle': Soft squishy floating, cute natural blinking, happy little wiggles
 * - 'name': Perked up ears, curious head tilt, sparkling wide eyes
 * - 'invalidEmail': Crazy cute angry pout! Ears droop back, angry manga steam puffs,
 *                   slanted grumpy eyes, puffed red cheeks & head tantrum shake
 * - 'validEmail': Joyful crescent eyes (^ ^), wide happy smile, sparkle stars & bouncy nod
 * - 'message': Focused eyes looking down attentively, taking notes
 * - 'submitting': Concentrating, anticipatory heart/sparkle pulse
 * - 'success': Starry eyes (★ ★), celebratory bouncy dance & confetti glow
 */
function MoodSvgIcon({ mood }) {
  if (mood === 'invalidEmail') {
    return (
      <svg viewBox="0 0 20 20" className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" fill="currentColor">
        <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 5zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" clipRule="evenodd" />
      </svg>
    );
  }

  if (mood === 'validEmail') {
    return (
      <svg viewBox="0 0 20 20" className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5z" clipRule="evenodd" />
      </svg>
    );
  }

  if (mood === 'name') {
    return (
      <svg viewBox="0 0 20 20" className="w-4 h-4 text-amber-500 shrink-0" fill="currentColor">
        <path d="M10 2a.75.75 0 0 1 .697.472l1.523 3.826 3.826 1.523a.75.75 0 0 1 0 1.358l-3.826 1.523-1.523 3.826a.75.75 0 0 1-1.394 0l-1.523-3.826-3.826-1.523a.75.75 0 0 1 0-1.358l3.826-1.523 1.523-3.826A.75.75 0 0 1 10 2z" />
      </svg>
    );
  }

  if (mood === 'message') {
    return (
      <svg viewBox="0 0 20 20" className="w-4 h-4 text-indigo-500 dark:text-indigo-400 shrink-0" fill="currentColor">
        <path d="m2.695 14.762-1.262 3.155a.5.5 0 0 0 .65.65l3.155-1.262a4 4 0 0 0 1.343-.886L17.5 5.5a2.121 2.121 0 0 0-3-3L3.58 13.419a4 4 0 0 0-.885 1.343z" />
      </svg>
    );
  }

  if (mood === 'submitting') {
    return (
      <svg viewBox="0 0 20 20" className="w-4 h-4 text-blue-500 animate-bounce shrink-0" fill="currentColor">
        <path d="M3.105 3.105a1.5 1.5 0 0 1 2.121 0L17.5 15.379a1.5 1.5 0 0 1-1.06 2.561H4.5a1.5 1.5 0 0 1-1.5-1.5V4.166a1.5 1.5 0 0 1 .105-1.06z" />
      </svg>
    );
  }

  if (mood === 'success') {
    return (
      <svg viewBox="0 0 20 20" className="w-4 h-4 text-amber-500 shrink-0" fill="currentColor">
        <path fillRule="evenodd" d="M10 1a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 1zm0 15a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 16zm9-6a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 19 10zm-15 0a.75.75 0 0 1-.75.75H1.75a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 4 10zM15.657 4.343a.75.75 0 0 1 0 1.061l-1.06 1.06a.75.75 0 1 1-1.061-1.06l1.06-1.061a.75.75 0 0 1 1.061 0zm-9.192 9.193a.75.75 0 0 1 0 1.06l-1.061 1.061a.75.75 0 0 1-1.06-1.06l1.06-1.061a.75.75 0 0 1 1.061 0zm9.192 1.06a.75.75 0 0 1-1.06 0l-1.061-1.06a.75.75 0 0 1 1.06-1.061l1.061 1.06a.75.75 0 0 1 0 1.061zm-9.192-9.192a.75.75 0 0 1-1.06 0l-1.061-1.06a.75.75 0 1 1 1.06-1.061l1.061 1.06a.75.75 0 0 1 0 1.061zM10 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" clipRule="evenodd" />
      </svg>
    );
  }

  // Default / idle
  return (
    <svg viewBox="0 0 20 20" className="w-4 h-4 text-cyan-500 dark:text-cyan-400 shrink-0" fill="currentColor">
      <path d="M10 2a8 8 0 1 0 8 8 8 8 0 0 0-8-8zm0 14a6 6 0 1 1 6-6 6 6 0 0 1-6 6zm1-9a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-1 3a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1z" />
    </svg>
  );
}

export default function AvatarMascot({ mood = 'idle', speechText = '' }) {
  // Automated natural blinking
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    if (mood === 'invalidEmail' || mood === 'validEmail' || mood === 'success') {
      return;
    }

    const triggerBlink = () => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 140);
    };

    const interval = setInterval(() => {
      triggerBlink();
    }, 2800 + Math.random() * 2200);

    return () => clearInterval(interval);
  }, [mood]);

  const isAngry = mood === 'invalidEmail';
  const isValid = mood === 'validEmail';
  const isHappy = mood === 'success' || isValid;

  // Dynamic emotional background aura
  const auraGlow = isAngry
    ? 'rgba(244, 63, 94, 0.3)' // Cute rose-red angry flush
    : isValid
    ? 'rgba(16, 185, 129, 0.28)' // Emerald green success pulse
    : mood === 'success'
    ? 'rgba(250, 204, 21, 0.35)' // Golden celebratory glow
    : 'rgba(168, 85, 247, 0.18)'; // Soft pastel purple/violet glow

  // Head squash & stretch physics
  const headMotion = {
    idle: {
      y: [0, -3.5, 0],
      rotate: [0, 1, -1, 0],
      transition: { repeat: Infinity, duration: 3.2, ease: 'easeInOut' },
    },
    name: {
      y: -3,
      rotate: -7,
      transition: { type: 'spring', stiffness: 340, damping: 18 },
    },
    invalidEmail: {
      y: [0, -1, 1, -1, 0],
      x: [-3, 3, -4, 4, -2, 2, 0],
      rotate: [-1, 2, -2, 2, -1, 0],
      transition: { duration: 0.42, ease: 'easeInOut' },
    },
    validEmail: {
      y: [-2, -8, 0],
      rotate: [0, 2, 0],
      transition: { duration: 0.45, ease: 'easeOut' },
    },
    message: {
      y: 2,
      rotate: 4,
      transition: { type: 'spring', stiffness: 300, damping: 20 },
    },
    submitting: {
      scale: [1, 1.05, 0.98, 1],
      transition: { repeat: Infinity, duration: 1.1, ease: 'easeInOut' },
    },
    success: {
      y: [-3, -11, -2, -7, 0],
      rotate: [-4, 4, -3, 3, 0],
      transition: { duration: 0.75, ease: 'easeOut' },
    },
  };

  return (
    <div className="flex items-center gap-3.5 sm:gap-4 mb-6 p-3 sm:p-4 rounded-2xl bg-slate-50/90 dark:bg-neutral-900/70 border border-slate-200/90 dark:border-neutral-800 shadow-sm transition-all">
      {/* Mascot Character Wrapper */}
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 flex items-center justify-center">
        {/* Soft Ambient Glow Halo */}
        <motion.div
          animate={{
            boxShadow: `0 0 26px 8px ${auraGlow}`,
            scale: isAngry ? [1, 1.12, 1] : 1,
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-2 rounded-full pointer-events-none"
        />

        {/* --- PROCEDURAL CHIBI SVG --- */}
        <motion.svg
          viewBox="0 0 120 120"
          className="w-full h-full relative z-10 drop-shadow-md select-none overflow-visible"
          variants={headMotion}
          animate={mood}
        >
          <defs>
            {/* Chibi Body Gradient */}
            <linearGradient id="chibi-skin" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" className="dark:stop-color-neutral-100" />
              <stop offset="65%" stopColor="#f1f5f9" className="dark:stop-color-neutral-200" />
              <stop offset="100%" stopColor="#e2e8f0" className="dark:stop-color-neutral-300" />
            </linearGradient>

            {/* Ear Inner Pink Gradient */}
            <linearGradient id="chibi-ear-pink" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fca5a5" />
              <stop offset="100%" stopColor="#f43f5e" />
            </linearGradient>

            {/* Glowing Glossy Iris Gradient */}
            <linearGradient id="chibi-eye-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="50%" stopColor="#1e1b4b" />
              <stop offset="100%" stopColor="#312e81" />
            </linearGradient>

            {/* Angry Eye Gradient */}
            <linearGradient id="chibi-angry-eye" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#991b1b" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
          </defs>

          {/* --- ANIMAL EARS (With Wiggle & Droop Physics) --- */}
          {/* Left Bear Ear */}
          <motion.g
            animate={{
              rotate: isAngry ? -22 : mood === 'name' ? 8 : 0,
              y: isAngry ? 5 : 0,
            }}
            style={{ originX: '34px', originY: '38px' }}
            transition={{ type: 'spring', stiffness: 350, damping: 20 }}
          >
            <circle
              cx="34"
              cy="34"
              r="15"
              fill="url(#chibi-skin)"
              stroke="#cbd5e1"
              strokeWidth="2.5"
              className="dark:stroke-neutral-400"
            />
            <circle cx="34" cy="34" r="9" fill="url(#chibi-ear-pink)" opacity="0.8" />
          </motion.g>

          {/* Right Bear Ear */}
          <motion.g
            animate={{
              rotate: isAngry ? 22 : mood === 'name' ? -12 : 0,
              y: isAngry ? 5 : 0,
            }}
            style={{ originX: '86px', originY: '38px' }}
            transition={{ type: 'spring', stiffness: 350, damping: 20 }}
          >
            <circle
              cx="86"
              cy="34"
              r="15"
              fill="url(#chibi-skin)"
              stroke="#cbd5e1"
              strokeWidth="2.5"
              className="dark:stroke-neutral-400"
            />
            <circle cx="86" cy="34" r="9" fill="url(#chibi-ear-pink)" opacity="0.8" />
          </motion.g>

          {/* Cute Sprout / Little Star Antenna on Top */}
          <motion.g
            animate={{
              rotate: isHappy ? [-8, 8, -8] : [0, 3, -3, 0],
              y: isAngry ? 2 : 0,
            }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            style={{ originX: '60px', originY: '24px' }}
          >
            <path
              d="M 60 26 Q 58 17 62 14"
              fill="none"
              stroke="#10b981"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle
              cx="62"
              cy="13"
              r="4"
              fill={isAngry ? '#ef4444' : isValid ? '#10b981' : '#f59e0b'}
              stroke="#ffffff"
              strokeWidth="1.5"
            />
          </motion.g>

          {/* --- MAIN SQUISHY CHIBI HEAD --- */}
          <motion.ellipse
            cx="60"
            cy="68"
            rx="46"
            ry="40"
            fill="url(#chibi-skin)"
            stroke={isAngry ? '#f87171' : isValid ? '#34d399' : '#cbd5e1'}
            strokeWidth="3"
            className="dark:stroke-neutral-400"
            animate={{
              scaleX: isAngry ? 1.05 : 1,
              scaleY: isAngry ? 0.96 : 1,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          />

          {/* Little Cute Belly/Paws peek at bottom */}
          <ellipse cx="44" cy="103" rx="8" ry="4" fill="#cbd5e1" opacity="0.6" />
          <ellipse cx="76" cy="103" rx="8" ry="4" fill="#cbd5e1" opacity="0.6" />

          {/* --- ROSY BLUSH CHEEKS --- */}
          {/* Left Cheek */}
          <motion.ellipse
            cx="27"
            cy="75"
            rx="8"
            ry="5.5"
            fill={isAngry ? '#ef4444' : '#fb7185'}
            animate={{
              opacity: isAngry ? 0.85 : isHappy ? 0.75 : 0.45,
              scale: isAngry ? 1.25 : 1,
            }}
            transition={{ duration: 0.25 }}
          />
          {/* Right Cheek */}
          <motion.ellipse
            cx="93"
            cy="75"
            rx="8"
            ry="5.5"
            fill={isAngry ? '#ef4444' : '#fb7185'}
            animate={{
              opacity: isAngry ? 0.85 : isHappy ? 0.75 : 0.45,
              scale: isAngry ? 1.25 : 1,
            }}
            transition={{ duration: 0.25 }}
          />

          {/* --- ANGRY STEAM PUFFS & MANGA ANGER MARK (💢) --- */}
          <AnimatePresence>
            {isAngry && (
              <motion.g
                initial={{ opacity: 0, scale: 0.4, y: 5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.4 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              >
                {/* Manga Anger Cross Mark on top right */}
                <g transform="translate(86, 42)">
                  <path
                    d="M -5 -5 C -2 -2, 2 -2, 5 -5 M -5 5 C -2 2, 2 2, 5 5 M -5 -5 C -2 -2, -2 2, -5 5 M 5 -5 C 2 -2, 2 2, 5 5"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </g>

                {/* Left Cute Steam Cloud */}
                <motion.g
                  animate={{ y: [-1, -4, -1], opacity: [0.7, 1, 0.7] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                >
                  <circle cx="16" cy="46" r="3.5" fill="#f87171" opacity="0.6" />
                  <circle cx="12" cy="42" r="2.5" fill="#f87171" opacity="0.5" />
                </motion.g>

                {/* Right Cute Steam Cloud */}
                <motion.g
                  animate={{ y: [-1, -4, -1], opacity: [0.7, 1, 0.7] }}
                  transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                >
                  <circle cx="104" cy="46" r="3.5" fill="#f87171" opacity="0.6" />
                  <circle cx="108" cy="42" r="2.5" fill="#f87171" opacity="0.5" />
                </motion.g>
              </motion.g>
            )}
          </AnimatePresence>

          {/* --- SPARKLE STARS (WHEN HAPPY/CELEBRATING) --- */}
          <AnimatePresence>
            {isHappy && (
              <motion.g
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Little 4-point sparkle stars */}
                <path
                  d="M 18 36 Q 22 36 22 32 Q 22 36 26 36 Q 22 36 22 40 Q 22 36 18 36 Z"
                  fill="#facc15"
                />
                <path
                  d="M 98 32 Q 101 32 101 29 Q 101 32 104 32 Q 101 32 101 35 Q 101 32 98 32 Z"
                  fill="#facc15"
                />
              </motion.g>
            )}
          </AnimatePresence>

          {/* --- EYEBROWS (CUTE CHIBI EXPRESSIONS) --- */}
          {/* Left Eyebrow */}
          <motion.line
            x1="34"
            y1={isAngry ? '49' : mood === 'name' ? '44' : '48'}
            x2="50"
            y2={isAngry ? '54' : mood === 'name' ? '47' : '48'}
            stroke={isAngry ? '#dc2626' : '#64748b'}
            strokeWidth={isAngry ? '3.5' : '2'}
            strokeLinecap="round"
            animate={{
              y1: isAngry ? 49 : mood === 'name' ? 44 : 48,
              y2: isAngry ? 55 : mood === 'name' ? 47 : 48,
              stroke: isAngry ? '#dc2626' : '#94a3b8',
            }}
            transition={{ type: 'spring', stiffness: 350, damping: 22 }}
          />

          {/* Right Eyebrow */}
          <motion.line
            x1="70"
            y1={isAngry ? '54' : '48'}
            x2="86"
            y2={isAngry ? '49' : '48'}
            stroke={isAngry ? '#dc2626' : '#64748b'}
            strokeWidth={isAngry ? '3.5' : '2'}
            strokeLinecap="round"
            animate={{
              y1: isAngry ? 55 : 48,
              y2: isAngry ? 49 : 48,
              stroke: isAngry ? '#dc2626' : '#94a3b8',
            }}
            transition={{ type: 'spring', stiffness: 350, damping: 22 }}
          />

          {/* --- THE EYES: 3 CUTE EXPRESSION MODES --- */}

          {/* 1. ANGRY POUT EYES (> < or intense sharp anime glare) */}
          {isAngry && (
            <motion.g
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.18 }}
            >
              {/* Left Eye: Sharply angled grumpy slant */}
              <ellipse
                cx="42"
                cy="61"
                rx="10"
                ry="13"
                transform="rotate(24 42 61)"
                fill="url(#chibi-angry-eye)"
              />
              <circle cx="44" cy="58" r="4" fill="#ffffff" />
              <circle cx="39" cy="65" r="2" fill="#ffffff" />

              {/* Right Eye: Sharply angled grumpy slant */}
              <ellipse
                cx="78"
                cy="61"
                rx="10"
                ry="13"
                transform="rotate(-24 78 61)"
                fill="url(#chibi-angry-eye)"
              />
              <circle cx="76" cy="58" r="4" fill="#ffffff" />
              <circle cx="81" cy="65" r="2" fill="#ffffff" />
            </motion.g>
          )}

          {/* 2. HAPPY / VALID EYES: Cheerful curved crescents (^ ^) */}
          {isHappy && (
            <motion.g
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.18 }}
            >
              {/* Left Happy Crescent */}
              <path
                d="M 33 63 Q 42 50 51 63"
                fill="none"
                stroke="#059669"
                strokeWidth="4.5"
                strokeLinecap="round"
              />
              {/* Right Happy Crescent */}
              <path
                d="M 69 63 Q 78 50 87 63"
                fill="none"
                stroke="#059669"
                strokeWidth="4.5"
                strokeLinecap="round"
              />
            </motion.g>
          )}

          {/* 3. NORMAL / BLINKING / CURIOUS EYES: Big sparkling anime eyes */}
          {!isAngry && !isHappy && (
            <motion.g
              animate={{
                scaleY: isBlinking ? 0.08 : 1,
                y: mood === 'message' ? 4 : 0,
              }}
              style={{ originY: '62px' }}
              transition={{ duration: 0.1 }}
            >
              {/* Left Eye Base */}
              <ellipse cx="42" cy="62" rx="10.5" ry="14" fill="url(#chibi-eye-grad)" />
              {/* Left Catchlights (Anime Highlights) */}
              <circle cx="40" cy="56" r="4.2" fill="#ffffff" />
              <circle cx="45" cy="67" r="2.2" fill="#ffffff" />
              <circle cx="43" cy="63" r="1.2" fill="#60a5fa" opacity="0.6" />

              {/* Right Eye Base */}
              <ellipse cx="78" cy="62" rx="10.5" ry="14" fill="url(#chibi-eye-grad)" />
              {/* Right Catchlights (Anime Highlights) */}
              <circle cx="76" cy="56" r="4.2" fill="#ffffff" />
              <circle cx="81" cy="67" r="2.2" fill="#ffffff" />
              <circle cx="79" cy="63" r="1.2" fill="#60a5fa" opacity="0.6" />
            </motion.g>
          )}

          {/* --- CUTE CHIBI MOUTH --- */}
          <motion.g
            animate={{ y: mood === 'message' ? 3 : 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            {isAngry ? (
              /* Grumpy Pouty Mouth: cute inverted cat frown (⌒) */
              <path
                d="M 53 79 Q 60 72 67 79"
                fill="none"
                stroke="#dc2626"
                strokeWidth="3"
                strokeLinecap="round"
              />
            ) : isHappy ? (
              /* Joyful Open Smile: cute open anime mouth with tongue */
              <g>
                <path
                  d="M 52 72 Q 60 84 68 72 Z"
                  fill="#f43f5e"
                  stroke="#e11d48"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path d="M 55 77 Q 60 80 65 77" fill="#fb7185" />
              </g>
            ) : mood === 'name' ? (
              /* Curious 'o' cute mouth */
              <ellipse cx="60" cy="76" rx="3.5" ry="4" fill="#0f172a" />
            ) : (
              /* Cute tiny cat 'w' smile */
              <path
                d="M 54 75 Q 57 78 60 75 Q 63 78 66 75"
                fill="none"
                stroke="#475569"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </motion.g>
        </motion.svg>
      </div>

      {/* --- SPEECH BUBBLE & COMPANION DIALOGUE --- */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-neutral-400 flex items-center gap-1">
            <span>Sneh</span>
            <span className="text-[9px] font-semibold text-slate-400 dark:text-neutral-500">
              · Assistant
            </span>
          </span>
          <span
            className={`w-2 h-2 rounded-full ${
              isAngry
                ? 'bg-rose-500 animate-ping'
                : isValid
                ? 'bg-emerald-500 animate-pulse'
                : 'bg-indigo-500 animate-pulse'
            }`}
          />
        </div>

        {/* Speech Bubble Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={speechText}
            initial={{ opacity: 0, y: 4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.16 }}
            className={`inline-flex items-center gap-2 max-w-full px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold shadow-sm border ${
              isAngry
                ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-900/60 font-bold'
                : isValid
                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900/60 font-bold'
                : 'bg-white dark:bg-neutral-800 text-slate-800 dark:text-neutral-100 border-slate-200 dark:border-neutral-700'
            }`}
          >
            <MoodSvgIcon mood={mood} />
            <p className="truncate sm:whitespace-normal leading-snug">{speechText}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
