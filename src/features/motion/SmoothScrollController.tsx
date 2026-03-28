'use client';

import Lenis from 'lenis';
import { useEffect, useRef } from 'react';

type SmoothScrollControllerProps = {
  reducedMotion: boolean;
  isOverlayActive: boolean;
};

const smoothEase = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

export default function SmoothScrollController({
  reducedMotion,
  isOverlayActive,
}: SmoothScrollControllerProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (reducedMotion) {
      lenisRef.current?.destroy();
      lenisRef.current = null;
      return;
    }

    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.05,
      easing: smoothEase,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.92,
      touchMultiplier: 1.05,
      anchors: true,
      stopInertiaOnNavigate: true,
      prevent: (node) => node instanceof HTMLElement && Boolean(node.closest('[data-lenis-prevent]')),
    });

    lenisRef.current = lenis;

    if (isOverlayActive) {
      lenis.stop();
    }

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [isOverlayActive, reducedMotion]);

  useEffect(() => {
    if (!lenisRef.current) {
      return;
    }

    if (isOverlayActive) {
      lenisRef.current.stop();
      return;
    }

    lenisRef.current.start();
  }, [isOverlayActive]);

  return null;
}
