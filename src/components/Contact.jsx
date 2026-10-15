import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';
import { Mail, MessageSquare, MapPin, Send, CheckCircle2, AlertCircle, Loader2, Sparkles } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';
import AvatarMascot from './AvatarMascot';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [focusedField, setFocusedField] = useState(null);

  // Email format validation helper
  const isValidEmail = (val) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val.trim());
  };

  const hasEmailInput = formData.email.trim().length > 0;
  const isEmailValid = isValidEmail(formData.email);
  const isEmailInvalid = hasEmailInput && !isEmailValid;

  // Determine Mascot Mood & Dialogue
  let mascotMood = 'idle';
  let mascotText = "Hi! I'm Sneh. Fill out the form below to say hello!";

  if (status === 'success') {
    mascotMood = 'success';
    mascotText = 'Message sent! Thank you, Sneh will get back to you shortly.';
  } else if (status === 'loading') {
    mascotMood = 'submitting';
    mascotText = 'Delivering your message to Sneh...';
  } else if (status === 'error') {
    mascotMood = 'invalidEmail';
    mascotText = feedbackMessage || 'Could not send message. Please check the details and try again.';
  } else if (focusedField === 'email' || (hasEmailInput && !focusedField)) {
    if (isEmailInvalid) {
      mascotMood = 'invalidEmail';
      if (!formData.email.includes('@')) {
        mascotText = "Missing '@' symbol in your email address!";
      } else if (!formData.email.split('@')[1] || !formData.email.split('@')[1].includes('.')) {
        mascotText = "Please include a valid domain (e.g. .com or .io)!";
      } else {
        mascotText = "Please enter a valid email address format!";
      }
    } else if (isEmailValid) {
      mascotMood = 'validEmail';
      mascotText = 'Email verified and ready to send!';
    } else {
      mascotMood = 'name';
      mascotText = 'Enter your email so Sneh can reply to you.';
    }
  } else if (focusedField === 'name') {
    if (formData.name.trim().length > 1) {
      mascotMood = 'validEmail';
      mascotText = `Nice to meet you, ${formData.name.trim().split(' ')[0]}!`;
    } else {
      mascotMood = 'name';
      mascotText = "What's your name? Enter it here.";
    }
  } else if (focusedField === 'message') {
    if (formData.message.trim().length > 10) {
      mascotMood = 'validEmail';
      mascotText = 'Tell me all the details about your project!';
    } else {
      mascotMood = 'message';
      mascotText = 'What would you like to build or discuss?';
    }
  } else if (isEmailInvalid) {
    mascotMood = 'invalidEmail';
    mascotText = 'Email address looks incomplete or invalid!';
  } else if (isEmailValid && formData.name.trim().length > 0) {
    mascotMood = 'validEmail';
    mascotText = 'Form looks ready! Click send when done.';
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setFeedbackMessage('Please fill in all required fields (Name, Email, Message).');
      return;
    }

    if (!isValidEmail(formData.email)) {
      setStatus('error');
      setFeedbackMessage('Please provide a valid email address so I can get back to you.');
      return;
    }

    setStatus('loading');
    setFeedbackMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        setFeedbackMessage(data.message || 'Thank you for reaching out! Your message has been sent directly to Sneh.');
        setFormData({
          name: '',
          email: '',
          message: '',
        });
      } else {
        setStatus('error');
        setFeedbackMessage(data.error || 'Failed to send message. Please try again.');
      }
    } catch {
      setStatus('error');
      setFeedbackMessage(`Could not connect to the server. Please check your connection or email directly at ${personalInfo.email}.`);
    }
  };

  return (
    <section
      className="py-32 bg-white dark:bg-black border-t border-slate-200/80 dark:border-neutral-900 transition-colors duration-300 relative"
      id="contact"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <RevealOnScroll className="max-w-2xl mb-16">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400 font-semibold mb-2">
            <Mail className="w-4 h-4 text-neutral-900 dark:text-white" />
            <span>Get In Touch</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold uppercase tracking-tighter text-slate-950 dark:text-white mb-4">
            Open to freelance projects and full-time opportunities.
          </h2>
          <p className="text-slate-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed">
            Have a website or app in mind? Let's talk.
          </p>
        </RevealOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Contact Info & Availability */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Status Card */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-[#0a0a0a] border border-slate-200/90 dark:border-[#222] shadow-sm">
              <div className="flex items-center gap-2.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Available for New Projects</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                Let's discuss your next project
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400 leading-relaxed">
                Whether you need a performant React web application, custom frontend design, or WordPress development,
                I am ready to help turn your ideas into reality.
              </p>
            </div>

            {/* Direct Channel Tiles */}
            <div className="space-y-3.5">
              {/* Email Tile */}
              <a
                href={`mailto:${personalInfo.email}`}
                className="group flex items-center gap-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-[#0a0a0a] dark:hover:bg-neutral-900 border border-slate-200/80 dark:border-[#222] dark:hover:border-neutral-700 transition-all duration-200"
              >
                <div className="w-11 h-11 rounded-lg bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 flex items-center justify-center shrink-0 text-slate-800 dark:text-white group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="block text-[11px] font-semibold text-slate-500 dark:text-neutral-400 uppercase tracking-wider">
                    Direct Email
                  </span>
                  <span className="block text-sm font-bold text-slate-900 dark:text-white truncate">
                    {personalInfo.email}
                  </span>
                </div>
              </a>

              {/* WhatsApp Tile */}
              <a
                href={personalInfo.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-[#0a0a0a] dark:hover:bg-neutral-900 border border-slate-200/80 dark:border-[#222] dark:hover:border-neutral-700 transition-all duration-200"
              >
                <div className="w-11 h-11 rounded-lg bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 flex items-center justify-center shrink-0 text-slate-800 dark:text-white group-hover:scale-105 transition-transform">
                  <MessageSquare className="w-5 h-5 text-emerald-500" />
                </div>
                <div className="min-w-0">
                  <span className="block text-[11px] font-semibold text-slate-500 dark:text-neutral-400 uppercase tracking-wider">
                    WhatsApp / Phone
                  </span>
                  <span className="block text-sm font-bold text-slate-900 dark:text-white truncate">
                    {personalInfo.phone}
                  </span>
                </div>
              </a>

              {/* LinkedIn Tile */}
              <a
                href={personalInfo.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-[#0a0a0a] dark:hover:bg-neutral-900 border border-slate-200/80 dark:border-[#222] dark:hover:border-neutral-700 transition-all duration-200"
              >
                <div className="w-11 h-11 rounded-lg bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 flex items-center justify-center shrink-0 text-slate-800 dark:text-white group-hover:scale-105 transition-transform">
                  <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#0A66C2]">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <span className="block text-[11px] font-semibold text-slate-500 dark:text-neutral-400 uppercase tracking-wider">
                    LinkedIn
                  </span>
                  <span className="block text-sm font-bold text-slate-900 dark:text-white truncate">
                    linkedin.com/in/sneh-gohil-8791a4311
                  </span>
                </div>
              </a>

              {/* GitHub Tile */}
              <a
                href={personalInfo.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-[#0a0a0a] dark:hover:bg-neutral-900 border border-slate-200/80 dark:border-[#222] dark:hover:border-neutral-700 transition-all duration-200"
              >
                <div className="w-11 h-11 rounded-lg bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 flex items-center justify-center shrink-0 text-slate-800 dark:text-white group-hover:scale-105 transition-transform">
                  <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-slate-900 dark:text-white">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <span className="block text-[11px] font-semibold text-slate-500 dark:text-neutral-400 uppercase tracking-wider">
                    GitHub
                  </span>
                  <span className="block text-sm font-bold text-slate-900 dark:text-white truncate">
                    github.com/Sneh177
                  </span>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-7 sm:p-9 rounded-2xl bg-white dark:bg-[#0a0a0a] border border-slate-200/90 dark:border-[#222] shadow-[0_4px_25px_rgba(0,0,0,0.03)] dark:shadow-none">
              {/* Interactive Avatar Mascot */}
              <AvatarMascot mood={mascotMood} speechText={mascotText} />

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-neutral-300 mb-2"
                    >
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="e.g. John Doe"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-neutral-900/90 border border-slate-200 dark:border-neutral-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-neutral-500 text-sm focus:outline-none focus:border-slate-900 dark:focus:border-white transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-neutral-300 mb-2"
                    >
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="e.g. john@example.com"
                      className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-neutral-900/90 border text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-neutral-500 text-sm focus:outline-none transition-all ${
                        isEmailInvalid
                          ? 'border-rose-500 focus:border-rose-500 ring-2 ring-rose-500/20'
                          : isEmailValid
                          ? 'border-emerald-500 focus:border-emerald-500 ring-1 ring-emerald-500/20'
                          : 'border-slate-200 dark:border-neutral-800 focus:border-slate-900 dark:focus:border-white'
                      }`}
                    />
                    {isEmailInvalid && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1.5 text-[11px] font-semibold text-rose-500 flex items-center gap-1"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>Please enter a valid email address (e.g. name@domain.com)</span>
                      </motion.p>
                    )}
                    {isEmailValid && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1.5 text-[11px] font-semibold text-emerald-500 flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        <span>Valid email address</span>
                      </motion.p>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-neutral-300 mb-2"
                  >
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Tell me about your project, timeline, or requirements..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-neutral-900/90 border border-slate-200 dark:border-neutral-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-neutral-500 text-sm focus:outline-none focus:border-slate-900 dark:focus:border-white transition-colors resize-none leading-relaxed"
                  />
                </div>

                {/* Feedback Alerts */}
                <AnimatePresence mode="wait">
                  {status === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold">Message sent successfully!</p>
                        <p className="mt-0.5 text-xs leading-relaxed opacity-90">{feedbackMessage}</p>
                      </div>
                    </motion.div>
                  )}

                  {status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 text-rose-800 dark:text-rose-300 text-xs sm:text-sm flex items-start gap-3"
                    >
                      <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold">Could not send message</p>
                        <p className="mt-0.5 text-xs leading-relaxed opacity-90">{feedbackMessage}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: status === 'loading' ? 1 : 1.01 }}
                  whileTap={{ scale: status === 'loading' ? 1 : 0.99 }}
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-4 px-6 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-200 dark:text-black font-bold text-sm transition-all duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
