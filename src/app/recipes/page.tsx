'use client'

import { useState, useMemo } from 'react'
import { RecipeCard } from '@/components/RecipeCard'
import { Filters, type FilterState } from '@/components/Filters'
import { SearchBox } from '@/components/SearchBox'
import { DB } from '@/lib/data'
import { simpleSearch } from '@/lib/search'
import { Sparkles } from 'lucide-react'

export default function RecipesPage() {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    categories: [],
    rarities: [],
    maxCookTime: 60,
    onlyMakeable: false
  })

  const filteredRecipes = useMemo(() => {
    let recipes = DB.recipes

    // Text search
    if (filters.search) {
      recipes = simpleSearch(recipes, filters.search)
    }

    // Category filter
    if (filters.categories.length > 0) {
      recipes = recipes.filter(recipe => 
        filters.categories.includes(recipe.category)
      )
    }

    // Rarity filter
    if (filters.rarities.length > 0) {
      recipes = recipes.filter(recipe =>
        recipe.variants.some(variant => 
          filters.rarities.includes(variant.rarity)
        )
      )
    }

    // Cook time filter
    recipes = recipes.filter(recipe =>
      recipe.variants.some(variant => 
        !variant.cookTimeMin || variant.cookTimeMin <= filters.maxCookTime
      )
    )

    // Only makeable filter (placeholder - would check against user's ingredients)
    if (filters.onlyMakeable) {
      // Placeholder: filter based on user's ingredient collection
      // For now, return empty since we don't have user data
      recipes = []
    }

    return recipes
  }, [filters])

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <aside className="lg:w-80 flex-shrink-0">
          <Filters onFiltersChange={setFilters} />
        </aside>
        
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">All Recipes</h1>
            <div className="text-sm text-muted-foreground">
              {filteredRecipes.length} of {DB.recipes.length} recipes
            </div>
          </div>

          {filteredRecipes.length > 0 ? (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredRecipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          ) : DB.recipes.length === 0 ? (
            <div className="text-center py-12">
              <Sparkles className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-medium text-muted-foreground mb-2">No Recipes Available</h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                Recipes will appear here once data is loaded into the system.
              </p>
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-muted-foreground mb-2">No Results Found</h3>
              <p className="text-sm text-muted-foreground">
                Try adjusting your filters or search terms.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}