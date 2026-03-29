'use client';

import Link from 'next/link';
import { X } from 'lucide-react';
import { motion } from 'motion/react';

type YantraMobileMenuLink = {
  label: string;
  href: string;
};

type YantraMobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  links: readonly YantraMobileMenuLink[];
  docsHref: string;
  profileHref: string;
  onOpenChat: () => void;
};

export default function YantraMobileMenu({
  isOpen,
  onClose,
  links,
  docsHref,
  profileHref,
  onOpenChat,
}: YantraMobileMenuProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <motion.div
      data-lenis-prevent
      className="fixed inset-0 z-[70] flex flex-col overflow-y-auto bg-black/92 p-6 backdrop-blur-2xl md:hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex justify-end">
        <button type="button" className="p-2 text-white hoverable" onClick={onClose} aria-label="Close menu">
          <X size={24} />
        </button>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-6">
        {links.map((link, index) => (
          <motion.a
            key={link.label}
            href={link.href}
            data-no-route-loader="true"
            className="font-display text-5xl font-medium tracking-tight text-white hoverable"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            onClick={onClose}
          >
            {link.label}
          </motion.a>
        ))}

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }}>
          <Link
            href={docsHref}
            className="rounded-full border border-white/12 bg-white/[0.04] px-7 py-3 font-mono text-[11px] uppercase tracking-[0.24em] text-white hoverable"
            onClick={onClose}
          >
            Docs
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32 }}>
          <Link
            href={profileHref}
            className="rounded-full border border-white/12 bg-white/[0.04] px-7 py-3 font-mono text-[11px] uppercase tracking-[0.24em] text-white hoverable"
            onClick={onClose}
          >
            Student Profile
          </Link>
        </motion.div>

        <motion.button
          type="button"
          className="mt-6 rounded-full bg-white px-7 py-3 font-mono text-[11px] uppercase tracking-[0.24em] text-black hoverable"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.36 }}
          onClick={() => {
            onClose();
            onOpenChat();
          }}
        >
          Open Yantra AI
        </motion.button>
      </div>
    </motion.div>
  );
}
