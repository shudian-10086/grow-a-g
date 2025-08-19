import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'All Ingredients | Grow a Garden Cooking Recipes',
  description: 'Explore all ingredients available in the Grow a Garden game. Learn about rarities, types, and which recipes use each ingredient.',
  keywords: [],
  openGraph: {
    title: 'All Ingredients | Grow a Garden Cooking Recipes',
    description: 'Explore all ingredients available in the Grow a Garden game. Learn about rarities, types, and which recipes use each ingredient.',
    type: 'website',
  },
}

export default function IngredientsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}