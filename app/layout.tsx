import type { Metadata } from 'next';
import '../src/styles/globals.css';
import { ExperienceProvider } from '@/src/features/motion/ExperienceProvider';

export const metadata: Metadata = {
  title: {
    default: 'Yantra Code Editor',
    template: '%s | Yantra',
  },
  description:
    'Code. Run. Share. Instantly. Yantra is a blazing-fast in-browser code editor with Monaco editing, live previews, and remixable share links.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased selection:bg-white selection:text-black">
        <ExperienceProvider>{children}</ExperienceProvider>
      </body>
    </html>
  );
}
