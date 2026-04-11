'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { ChatProvider } from '@/src/features/chat/ChatWidget';
import { useScrollThreshold } from '@/src/features/motion/useScrollThreshold';
import { marketingNavLinks } from './marketing-content';
import GlobalSidebar from '@/src/features/navigation/GlobalSidebar';

const Ticker = dynamic(() => import('./sections/Ticker'));
const About = dynamic(() => import('./sections/About'));
const Stats = dynamic(() => import('./sections/Stats'));
const Academics = dynamic(() => import('./sections/Academics'));
const Gallery = dynamic(() => import('./sections/Gallery'));
const Contact = dynamic(() => import('./sections/Contact'));
const Footer = dynamic(() => import('./sections/Footer'));

function FluidBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden bg-[#040404]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_28%),radial-gradient(circle_at_80%_18%,rgba(255,255,255,0.06),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_24%,transparent_78%,rgba(255,255,255,0.04))]" />

      <div className="absolute inset-0 opacity-85">
        <div className="absolute left-[-8%] top-[-6%] h-[34rem] w-[34rem] rounded-full bg-white/[0.07] blur-[120px] animate-blob will-change-transform" />
        <div className="absolute right-[-12%] top-[18%] h-[38rem] w-[38rem] rounded-full bg-white/[0.055] blur-[150px] animate-blob animation-delay-2000 will-change-transform" />
        <div className="absolute bottom-[-24%] left-[16%] h-[40rem] w-[42rem] rounded-full bg-white/[0.05] blur-[155px] animate-blob animation-delay-4000 will-change-transform" />
      </div>

      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '120px 120px',
          maskImage: 'radial-gradient(circle at center, black 42%, transparent 86%)',
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-screen"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=%220 0 160 160%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.92%22 numOctaves=%222%22/%3E%3C/filter%3E%3Crect width=%22160%22 height=%22160%22 filter=%22url(%23noise)%22 opacity=%220.95%22/%3E%3C/svg%3E")',
        }}
      />
    </div>
  );
}

function Nav() {
  const scrolled = useScrollThreshold(50);

  return (
    <>
      <motion.nav
        className={`fixed top-0 z-50 w-full transition-all duration-500 ${
          scrolled ? 'border-b border-white/10 bg-black/80 backdrop-blur-xl' : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <Link href="/" className="font-heading text-3xl tracking-widest hoverable">
            YANTRA<span className="text-white/50">.</span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {marketingNavLinks.map((link) =>
              link.href.startsWith('#') ? (
                <a
                  key={link.label}
                  href={link.href}
                  data-no-route-loader="true"
                  className="hoverable text-xs font-bold uppercase tracking-widest text-muted transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="hoverable text-xs font-bold uppercase tracking-widest text-muted transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ),
            )}

            <Link
              href="/editor"
              className="hoverable text-xs font-bold uppercase tracking-widest text-muted transition-colors hover:text-white"
            >
              Editor
            </Link>

            <Link
              href="/dashboard"
              className="hoverable rounded-full bg-white px-6 py-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-black transition-transform duration-300 hover:scale-[0.98]"
            >
              Dashboard
            </Link>
          </div>

          <GlobalSidebar disableDesktop={true} />
        </div>
      </motion.nav>
    </>
  );
}

function Hero() {
  const title = 'YANTRA';

  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 pb-28 pt-28 sm:min-h-screen sm:pb-32 sm:pt-32">
      <div className="z-10 mx-auto flex w-full max-w-5xl flex-col items-center text-center">
        <motion.div
          className="mb-12 rounded-full border border-white/10 bg-white/5 px-6 py-2 text-center font-mono text-xs uppercase tracking-[0.2em] text-muted backdrop-blur-md md:mb-16 md:text-sm"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          AI-native learning OS - Personalized paths
        </motion.div>

        <h1 className="flex flex-wrap justify-center text-[5.5rem] leading-none font-heading tracking-normal sm:text-8xl md:text-[12rem]">
          {title.split('').map((char, index) => (
            <motion.span
              key={`${char}-${index}`}
              initial={{ y: '0.35em' }}
              animate={{ y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </h1>

        <motion.p
          className="mt-12 max-w-3xl text-lg font-light tracking-wide text-muted md:mt-16 md:text-2xl"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Yantra helps learners understand where they are, what to learn next, and how to turn that progress into
          real-world career outcomes.
        </motion.p>

        <motion.div
          className="mt-16 flex w-full flex-col items-center gap-4 md:mt-20"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            href="/dashboard"
            className="hoverable w-full rounded-full bg-white px-10 py-5 text-center text-sm font-bold uppercase tracking-widest text-black transition-transform duration-300 hover:scale-105 sm:w-auto"
          >
            Open Dashboard
          </Link>
          <Link
            href="/editor"
            className="hoverable inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#7C3AED] bg-transparent px-6 py-2.5 text-center font-mono text-[11px] uppercase tracking-[0.22em] text-[#7C3AED] transition-colors duration-200 ease-in-out hover:bg-[#7C3AED] hover:text-white sm:w-auto"
          >
            Open Code Editor <ArrowRight size={14} />
          </Link>
        </motion.div>

        <motion.p
          className="mt-6 text-center text-sm text-white/42"
          initial={{ y: 16 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.96, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          Institutions and hiring partners can still use the access form below.
        </motion.p>

        <motion.div
          className="absolute bottom-[calc(env(safe-area-inset-bottom)+1.5rem)] flex flex-col items-center gap-4 sm:bottom-8"
          initial={{ y: 10 }}
          animate={{ y: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          <div className="h-12 w-[1px] bg-gradient-to-b from-white/50 to-transparent" />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">Scroll</span>
        </motion.div>
      </div>
    </section>
  );
}

export default function MarketingLandingPage() {
  return (
    <ChatProvider>
      <div className="min-h-[100svh] bg-transparent text-white selection:bg-white selection:text-black sm:min-h-screen">
        <FluidBackground />
        <Nav />
        <main>
          <Hero />
          <Ticker />
          <About />
          <Stats />
          <Academics />
          <Gallery />
          <Contact />
        </main>
        <Footer />
      </div>
    </ChatProvider>
  );
}
