import type { Metadata, Viewport } from 'next';
import { Bricolage_Grotesque, Geist, Geist_Mono } from 'next/font/google';
import { KEYWORDS, SITE } from '@/lib/data';
import './globals.css';

const display = Bricolage_Grotesque({ subsets: ['latin'], axes: ['opsz'], variable: '--font-display', display: 'swap' });
const body = Geist({ subsets: ['latin'], variable: '--font-body', display: 'swap' });
const mono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.title, template: `%s | ${SITE.name}, AI Engineer` },
  description: SITE.description,
  applicationName: `${SITE.name} – AI Engineer`,
  keywords: KEYWORDS,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  alternates: { canonical: '/' },
  category: 'technology',
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    type: 'profile',
    url: '/',
    siteName: `${SITE.name} – AI Engineer`,
    title: SITE.title,
    description: SITE.description,
    locale: 'en_IN',
    firstName: 'Anshu',
    lastName: 'Prajapati',
    username: 'anshuu-prajapati',
  },
  twitter: {
    card: 'summary_large_image',
    creator: SITE.twitter,
    site: SITE.twitter,
    title: SITE.title,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  // Paste your Google Search Console token here once the domain is verified:
  // verification: { google: 'YOUR_TOKEN' },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#EEF0F5' },
    { media: '(prefers-color-scheme: dark)', color: '#0D1120' },
  ],
};

// Runs before paint so a saved light/dark choice never flashes the wrong theme.
const boot = `(function(){try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t;}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
