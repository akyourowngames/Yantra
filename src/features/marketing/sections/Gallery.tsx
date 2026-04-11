'use client';

import { motion } from 'motion/react';
import { marketingCampusHighlights } from '../marketing-content';

export default function Gallery() {
  return (
    <section id="campus-life" className="relative mx-auto max-w-7xl px-6 py-32 scroll-mt-28">
      <div className="pointer-events-none absolute left-0 top-0 select-none font-heading text-[7rem] leading-none text-white/[0.03] sm:text-[10rem] md:text-[14rem] xl:text-[18rem]">
        03
      </div>
      <motion.div
        className="relative z-10 mb-14 mt-16 max-w-4xl md:mb-16 md:mt-20"
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="text-4xl font-heading tracking-[0.06em] text-white sm:text-5xl md:text-7xl">
          WHO YANTRA SERVES
        </h2>
      </motion.div>

      <div className="relative z-10 grid items-stretch gap-4 md:grid-cols-2 xl:grid-cols-3">
        {marketingCampusHighlights.map((column, columnIndex) => (
          <div key={`audience-column-${columnIndex}`} className="flex h-full flex-col gap-4 self-stretch">
            {column.map((item, itemIndex) => {
              const Icon = item.icon;

              return (
                <motion.article
                  key={item.title}
                  initial={{ y: 24, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    duration: 0.65,
                    delay: columnIndex * 0.1 + itemIndex * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`hoverable group relative flex min-h-[16rem] flex-1 flex-col justify-between overflow-hidden rounded-[1.6rem] border border-white/8 bg-[linear-gradient(145deg,rgba(16,16,16,0.96),rgba(5,5,5,0.98))] p-7 shadow-[0_24px_80px_rgba(0,0,0,0.34)] transition-all duration-300 hover:-translate-y-1 hover:border-white/14 sm:p-8 ${item.heightClassName}`}
                >
                  <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.015)_34%,transparent_62%)] opacity-80" />
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/16 to-transparent" />

                  <div className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/88 transition-colors duration-300 group-hover:border-white/16 group-hover:bg-white/[0.05]">
                    <Icon size={20} strokeWidth={1.7} />
                  </div>

                  <div className="relative z-10 mt-10">
                    <span className="font-mono text-[10px] uppercase tracking-[0.26em] text-white/34">{item.tag}</span>
                    <h3 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-white sm:text-[1.7rem]">
                      {item.title}
                    </h3>
                    <p className="mt-4 max-w-[24rem] text-sm leading-7 text-white/46 sm:text-[0.95rem]">
                      {item.desc}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}
