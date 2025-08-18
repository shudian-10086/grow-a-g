import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link'
import { DataBadge } from '@/components/DataBadge'
import { Leaf, ChefHat, Heart, BookOpen, History } from 'lucide-react'

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Garden Recipes - Grow a Garden Cooking Guide',
  description: 'Discover recipes and ingredients from your garden game. Find what you can cook with your ingredients.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <div className="min-h-screen bg-background">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <header className="flex items-center justify-between gap-4 pb-6 border-b">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                  <Leaf className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-xl">Garden Recipes</span>
              </Link>
              
              <nav className="flex items-center gap-6">
                <Link href="/recipes" className="flex items-center gap-1 text-sm hover:text-foreground transition-colors">
                  <ChefHat className="h-4 w-4" />
                  Recipes
                </Link>
                <Link href="/ingredients" className="flex items-center gap-1 text-sm hover:text-foreground transition-colors">
                  <Leaf className="h-4 w-4" />
                  Ingredients
                </Link>
                <Link href="/cravings" className="flex items-center gap-1 text-sm hover:text-foreground transition-colors">
                  <Heart className="h-4 w-4" />
                  Cravings
                </Link>
                <Link href="/guides" className="flex items-center gap-1 text-sm hover:text-foreground transition-colors">
                  <BookOpen className="h-4 w-4" />
                  Guides
                </Link>
                <Link href="/changelog" className="flex items-center gap-1 text-sm hover:text-foreground transition-colors">
                  <History className="h-4 w-4" />
                  Changelog
                </Link>
              </nav>
              
              <DataBadge />
            </header>
            
            <main className="py-8">
              {children}
            </main>
            
            <footer className="py-8 text-center text-xs text-muted-foreground border-t">
              <p>MVP • Placeholder data structure ready for content injection</p>
              <p className="mt-1">Built with Next.js, TypeScript, Tailwind CSS & shadcn/ui</p>
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
