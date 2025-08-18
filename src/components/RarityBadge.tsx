import { cn } from '@/lib/utils'
import type { Rarity } from '@/types/rarity'

interface RarityBadgeProps {
  rarity: Rarity
  className?: string
}

const rarityStyles: Record<Rarity, string> = {
  VeryCommon: 'bg-gray-100 text-gray-700 border-gray-200',
  Common: 'bg-green-100 text-green-700 border-green-200',
  Uncommon: 'bg-blue-100 text-blue-700 border-blue-200',
  Rare: 'bg-purple-100 text-purple-700 border-purple-200',
  Legendary: 'bg-orange-100 text-orange-700 border-orange-200',
  Mythical: 'bg-red-100 text-red-700 border-red-200',
  Divine: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  Prismatic: 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-200',
  Transcendent: 'bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 text-indigo-700 border-indigo-200'
}

export function RarityBadge({ rarity, className }: RarityBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-1 text-xs font-medium rounded-full border',
        rarityStyles[rarity],
        className
      )}
      data-rarity={rarity}
    >
      {rarity}
    </span>
  )
}