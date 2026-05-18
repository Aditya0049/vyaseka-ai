import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './providers';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export const metadata: Metadata = {
  title: 'Vyaseka AI – Turn Speech Into Usable Intelligence',
  description: 'AI-powered transcription, captions, summaries, and multilingual voice workflows.',
  metadataBase: new URL('https://vyaseka.ai'),
  openGraph: {
    title: 'Vyaseka AI – Voice Intelligence Platform',
    description: 'Turn any audio or video into searchable, editable, multilingual text with AI.',
    url: 'https://vyaseka.ai',
    siteName: 'Vyaseka AI',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head><meta name="theme-color" content="#050508" /></head>
      <body className="font-inter antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
