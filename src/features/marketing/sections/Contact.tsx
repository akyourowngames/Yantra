'use client';

import dynamic from 'next/dynamic';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useChatWidgetActions } from '@/src/features/chat/ChatWidget';
import { yantraCtaPrompts } from '@/src/features/chat/yantra-chat';
import { marketingAccessDetails } from '../marketing-content';

const AccessRequestForm = dynamic(
  () => import('@/src/features/access/AccessRequestForm').then((module) => module.AccessRequestForm),
  {
    loading: () => (
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md">
        <div className="h-6 w-32 animate-pulse rounded bg-white/10" />
        <div className="mt-6 space-y-4">
          <div className="h-12 animate-pulse rounded bg-white/8" />
          <div className="h-12 animate-pulse rounded bg-white/8" />
          <div className="h-28 animate-pulse rounded bg-white/8" />
          <div className="h-12 w-40 animate-pulse rounded-full bg-white/12" />
        </div>
      </div>
    ),
  },
);

export default function Contact() {
  const { openChat } = useChatWidgetActions();

  return (
    <section id="contact" className="relative mx-auto max-w-7xl border-t border-white/10 px-6 py-32 scroll-mt-28">
      <div className="pointer-events-none absolute right-0 top-0 select-none text-right font-heading text-[12rem] leading-none text-white/[0.03] md:text-[20rem]">
        04
      </div>
      <div className="relative z-10 mt-20 grid gap-16 md:grid-cols-2">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="mb-8 text-5xl font-heading md:text-7xl">ACCESS & PARTNERSHIPS</h2>
          <div className="space-y-6 font-mono text-sm text-muted">
            <p className="flex items-start gap-4 break-words md:items-center">
              <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
              {marketingAccessDetails.primary}
            </p>
            <p className="flex items-start gap-4 break-words md:items-center">
              <span className="h-2 w-2 rounded-full bg-white animate-pulse" style={{ animationDelay: '0.2s' }} />
              {marketingAccessDetails.audience}
            </p>
            <p className="flex items-start gap-4 break-words md:items-center">
              <span className="h-2 w-2 rounded-full bg-white animate-pulse" style={{ animationDelay: '0.4s' }} />
              {marketingAccessDetails.status}
            </p>
          </div>

          <button
            type="button"
            className="hoverable mt-10 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/78 transition-colors hover:bg-white/[0.08]"
            onClick={() => openChat({ message: yantraCtaPrompts.requestAccess })}
          >
            Ask Yantra First <ArrowRight size={14} />
          </button>
        </motion.div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="flex flex-col gap-8"
        >
          <AccessRequestForm className="flex flex-col gap-8" />
        </motion.div>
      </div>
    </section>
  );
}
