import Link from 'next/link'
import { ChefHat, Timer, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { RarityBadge } from './RarityBadge'
import { bestVariantOf } from '@/lib/data'
import type { Recipe } from '@/types/recipe'

interface RecipeCardProps {
  recipe: Recipe
  className?: string
}

export function RecipeCard({ recipe, className }: RecipeCardProps) {
  const bestVariant = bestVariantOf(recipe)
  
  return (
    <Link href={`/recipes/${recipe.id}`}>
      <div className={cn(
        'group rounded-2xl border bg-card text-card-foreground p-6 hover:bg-accent/50 transition-colors',
        'hover:shadow-md hover:scale-[1.02] transition-all duration-200',
        className
      )}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <ChefHat className="h-5 w-5 text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              {recipe.category}
            </span>
          </div>
          {bestVariant && (
            <RarityBadge rarity={bestVariant.rarity} />
          )}
        </div>
        
        <h3 className="font-semibold text-lg mb-2 group-hover:text-accent-foreground transition-colors">
          {recipe.name}
        </h3>
        
        {recipe.description && (
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {recipe.description}
          </p>
        )}
        
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              <span>{recipe.variants.length} variant{recipe.variants.length > 1 ? 's' : ''}</span>
            </div>
            {bestVariant?.cookTimeMin && (
              <div className="flex items-center gap-1">
                <Timer className="h-3 w-3" />
                <span>{bestVariant.cookTimeMin} min</span>
              </div>
            )}
          </div>
          <div className="text-xs">
            {bestVariant?.ingredients.length || 0} ingredients
          </div>
        </div>
      </div>
    </Link>
  )
}