import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link'
import { DataBadge } from '@/components/DataBadge'
import { ResponsiveNav } from '@/components/ResponsiveNav'
import { StructuredData } from '@/components/StructuredData'
import { Leaf } from 'lucide-react'
import localFont from 'next/font/local';

const inter = localFont({
  src: '../public/fonts/inter.var.woff2',
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Grow a Garden Cooking Recipes List',
  description: 'As part of the Grow a Garden cooking event, we\'ve compiled the recipes for every food item we\'ve discovered so far.',
  keywords: [],
  authors: [{ name: 'Garden Recipes Team' }],
  creator: 'Garden Recipes',
  publisher: 'Garden Recipes',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NODE_ENV === 'production' ? 'https://g-a-g.netlify.app/' : 'https://g-a-g.netlify.app/'),
  openGraph: {
    title: 'Grow a Garden Cooking Recipes List',
    description: 'As part of the Grow a Garden cooking event, we\'ve compiled the recipes for every food item we\'ve discovered so far.',
    url: '/',
    siteName: 'Grow a Garden Cooking Recipes',
    images: [
      {
        url: '/gag-img.webp',
        width: 1200,
        height: 630,
        alt: 'Garden Recipes - Cooking Guide for Grow a Garden Game',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: 'https://g-a-g.netlify.app/',
    title: 'Grow a Garden Cooking Recipes List',
    description: 'As part of the Grow a Garden cooking event, we\'ve compiled the recipes for every food item we\'ve discovered so far.',
    images: ['/gag-img.webp'],
    creator: '@gardenrecipes',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  verification: {
    // Add verification codes here when you have them:
    // google: 'google-site-verification-code',
    // yandex: 'yandex-verification-code',
    // yahoo: 'yahoo-site-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <StructuredData />
        <link rel="canonical" href="https://g-a-g.netlify.app/"/>
      </head>
      <body className={inter.className}>
        <div className="min-h-screen bg-background">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <header className="flex items-center justify-between gap-4 pb-6 border-b">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                  <Leaf className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-xl">Grow a Garden Cooking Recipes</span>
              </Link>
              
              <div className="flex items-center gap-4">
                <ResponsiveNav />
                <DataBadge />
              </div>
            </header>
            
            <main className="py-8">
              {children}
            </main>
            
            <footer className="py-8 text-center text-xs text-muted-foreground border-t space-y-4">
              <div className="flex items-center justify-center gap-6 flex-wrap">
                <Link href="/privacy-policy" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms-of-service" className="hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
                <Link href="/changelog" className="hover:text-foreground transition-colors">
                  Changelog
                </Link>
              </div>
              <div className="space-y-1">
                <p>&copy; 2025 Grow a Garden Cooking Recipes</p>
              </div>
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
