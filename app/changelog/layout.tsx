import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Changelog | Grow a Garden Cooking Recipes',
  description: 'Stay updated with the latest changes, improvements, and new features added to Garden Recipes. Track recipe updates and site enhancements.',
  keywords: [],
  openGraph: {
    title: 'Changelog | Grow a Garden Cooking Recipes',
    description: 'Stay updated with the latest changes, improvements, and new features added to Garden Recipes. Track recipe updates and site enhancements.',
    type: 'website',
  },
}

export default function ChangelogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}