'use client';

import Link from 'next/link';
import { useChatWidgetActions } from '@/src/features/chat/ChatWidget';
import { yantraCtaPrompts } from '@/src/features/chat/yantra-chat';

export default function Footer() {
  const { openChat } = useChatWidgetActions();

  return (
    <footer className="relative mt-32 overflow-hidden border-t border-white/10 px-6 py-12">
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="font-heading text-3xl tracking-widest">
          YANTRA<span className="text-white/50">.</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6 font-mono text-xs uppercase tracking-widest text-muted">
          <a href="#about" data-no-route-loader="true" className="hoverable transition-colors hover:text-white">
            Platform
          </a>
          <button
            type="button"
            className="hoverable transition-colors hover:text-white"
            onClick={() => openChat({ message: yantraCtaPrompts.demo })}
          >
            Demo
          </button>
          <Link href="/dashboard" className="hoverable transition-colors hover:text-white">
            Dashboard
          </Link>
        </div>
        <div className="font-mono text-xs uppercase tracking-widest text-white/50">
          &copy; {new Date().getFullYear()} Yantra. AI-native learning, built for outcomes.
        </div>
      </div>
    </footer>
  );
}
