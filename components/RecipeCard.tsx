import Link from 'next/link'
import { ChefHat, Timer, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { RarityBadge } from './RarityBadge'
import { bestVariantOf } from '@/lib/data'
import type { Recipe } from '@/types/recipe'
import { Card, CardContent } from './ui/card'
import { AspectRatio } from './ui/aspect-ratio'
import Image from 'next/image'
import { Badge } from './ui/badge'

interface RecipeCardProps {
  recipe: Recipe;
  className?: string;
}

export function RecipeCard({ recipe, className }: RecipeCardProps) {
  const imageUrl = recipe.image 
    ? recipe.image.replace('/recipes-img/', '/recipes-img-optimized/').replace(/\.(jpg|jpeg|png)$/i, '.webp') 
    : '/placeholder.webp'; // Fallback for recipes without image

  return (
    <Card className={cn("overflow-hidden", className)}>
      <Link href={`/recipes/${recipe.id}`}>
        <AspectRatio ratio={16 / 9}>
          <Image 
            src={imageUrl}
            alt={recipe.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy" // Add lazy loading
            quality={80} // Reduce image quality
          />
        </AspectRatio>
      </Link>
      <CardContent className="p-6">
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
      </CardContent>
    </Card>
  )
}