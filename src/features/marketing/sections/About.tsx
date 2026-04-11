'use client';

import { motion } from 'motion/react';

export default function About() {
  const quote = 'LEARN WITH DIRECTION. GROW WITH PROOF.';

  return (
    <section id="about" className="relative mx-auto max-w-7xl overflow-hidden px-6 py-32 scroll-mt-28">
      <div className="pointer-events-none absolute left-0 top-0 select-none font-heading text-[12rem] leading-none text-white/[0.03] md:text-[20rem]">
        01
      </div>
      <div className="relative z-10 mt-20 grid items-center gap-16 md:grid-cols-2">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-5xl font-heading leading-[0.9] text-white md:text-7xl">{quote}</h2>
        </motion.div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="flex flex-col gap-6 text-lg font-light leading-relaxed text-muted"
        >
          <p>
            Yantra is built as an AI-native learning platform that begins with skill diagnosis and turns that insight
            into a clear personalized roadmap.
          </p>
          <p>
            Instead of disconnected lessons and endless tutorials, it keeps guidance, certification, and job-readiness
            inside one continuous system for focused growth.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
