import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cooking Guides | Grow a Garden Cooking Recipes',
  description: 'Learn cooking tips, techniques, and strategies for the Grow a Garden game. Master recipes, understand rarities, and optimize your cooking skills.',
  keywords: [],
  openGraph: {
    title: 'Cooking Guides | Grow a Garden Cooking Recipes',
    description: 'Learn cooking tips, techniques, and strategies for the Grow a Garden game. Master recipes, understand rarities, and optimize your cooking skills.',
    type: 'website',
  },
}

export default function GuidesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}