'use client';

import { motion } from 'motion/react';
import { marketingAcademicCards } from '../marketing-content';

export default function Academics() {
  return (
    <section id="academics" className="relative mx-auto max-w-7xl px-6 py-32 scroll-mt-28">
      <div className="pointer-events-none absolute right-0 top-0 select-none text-right font-heading text-[12rem] leading-none text-white/[0.03] md:text-[20rem]">
        02
      </div>
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mt-20"
      >
        <h2 className="text-center text-5xl font-heading md:text-7xl">PLATFORM CAPABILITIES</h2>
      </motion.div>

      <div className="relative z-10 mt-16 grid gap-8 md:grid-cols-3">
        {marketingAcademicCards.map((card, index) => {
          const Icon = card.icon;

          return (
            <motion.div
              key={card.title}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="hoverable group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:bg-white/[0.04]"
            >
              <div className="mb-6 text-white opacity-50 transition-opacity group-hover:opacity-100">
                <Icon size={32} />
              </div>
              <h3 className="mb-4 text-3xl font-heading tracking-wide">{card.title}</h3>
              <p className="font-light leading-relaxed text-muted">{card.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
