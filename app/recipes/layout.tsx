import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'All Recipes List | Grow a Garden Cooking Recipes',
  description: 'Browse all available recipes from the Grow a Garden game. Find cooking recipes with ingredients, rarities, and detailed preparation instructions.',
  keywords: [],
  openGraph: {
    title: 'All Recipes List | Grow a Garden Cooking Recipes',
    description: 'Browse all available recipes from the Grow a Garden game. Find cooking recipes with ingredients, rarities, and detailed preparation instructions.',
    type: 'website',
  },
}

export default function RecipesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}