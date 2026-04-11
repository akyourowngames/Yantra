'use client';

import { motion } from 'motion/react';
import { marketingTickerItems } from '../marketing-content';

export default function Ticker() {
  return (
    <div className="relative z-10 flex w-full overflow-hidden whitespace-nowrap border-y border-white/10 bg-white/5 py-4 backdrop-blur-sm">
      <motion.div
        className="flex items-center gap-8 font-mono text-xs tracking-widest text-white/50 md:text-sm"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ repeat: Infinity, ease: 'linear', duration: 30 }}
      >
        {[...Array(2)].map((_, index) => (
          <div key={index} className="flex items-center gap-8">
            {marketingTickerItems.map((item) => (
              <div key={`${index}-${item}`} className="flex items-center gap-8">
                <span>{item}</span>
                <div className="h-1.5 w-1.5 rounded-full bg-white/30" />
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
