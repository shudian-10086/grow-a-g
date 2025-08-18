import Link from 'next/link'
import { cn } from '@/lib/utils'
import { RarityBadge } from './RarityBadge'
import type { Ingredient } from '@/types/ingredient'

interface IngredientPillProps {
  ingredient: Ingredient
  quantity?: number
  className?: string
  clickable?: boolean
}

export function IngredientPill({ 
  ingredient, 
  quantity, 
  className, 
  clickable = true 
}: IngredientPillProps) {
  const content = (
    <div className={cn(
      'inline-flex items-center gap-2 px-3 py-2 rounded-lg border bg-card text-card-foreground',
      clickable && 'hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors',
      className
    )}>
      <span className="text-sm font-medium">
        {quantity && `${quantity}× `}{ingredient.name}
      </span>
      {ingredient.rarity && (
        <RarityBadge rarity={ingredient.rarity} className="text-xs" />
      )}
    </div>
  )

  if (clickable) {
    return (
      <Link href={`/ingredients#${ingredient.id}`}>
        {content}
      </Link>
    )
  }

  return content
}