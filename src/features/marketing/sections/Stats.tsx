'use client';

import { useEffect, useRef } from 'react';
import { animate, useInView } from 'motion/react';

function Counter({ value, label, suffix = '' }: { value: number; label: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!inView || !ref.current) {
      return;
    }

    animate(0, value, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        if (ref.current) {
          ref.current.textContent = `${Math.floor(latest)}${suffix}`;
        }
      },
    });
  }, [inView, suffix, value]);

  return (
    <div className="hoverable flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-md transition-colors duration-500 hover:bg-white/[0.04]">
      <span ref={ref} className="mb-2 text-6xl font-heading tracking-tight text-white md:text-8xl">
        0{suffix}
      </span>
      <span className="font-mono text-xs uppercase tracking-widest text-muted">{label}</span>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-6 py-20">
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        <Counter value={10} label="Active Learners" suffix="K+" />
        <Counter value={50} label="Institution Pilots" suffix="+" />
        <Counter value={94} label="Success Rate" suffix="%" />
        <Counter value={24} label="AI Guidance" suffix="/7" />
      </div>
    </section>
  );
}
