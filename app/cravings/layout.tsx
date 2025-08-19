import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Recipe Cravings | Grow a Garden Cooking Recipes',
  description: 'Find recipes based on your cravings and mood. Search for comfort food, healthy options, sweet treats, and more from the Grow a Garden game.',
  keywords: [],
  openGraph: {
    title: 'Recipe Cravings | Grow a Garden Cooking Recipes',
    description: 'Find recipes based on your cravings and mood. Search for comfort food, healthy options, sweet treats, and more from the Grow a Garden game.',
    type: 'website',
  },
}

export default function CravingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}