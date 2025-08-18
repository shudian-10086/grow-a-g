'use client'

import { useState, useMemo } from 'react'
import { RecipeCard } from '@/components/RecipeCard'
import { Filters, type FilterState } from '@/components/Filters'
import { SearchBox } from '@/components/SearchBox'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { DB } from '@/lib/data'
import { simpleSearch } from '@/lib/search'
import { Sparkles, Grid3X3, List, SortAsc, SortDesc } from 'lucide-react'

type SortOption = 'name' | 'rarity' | 'variants' | 'ingredients'
type SortDirection = 'asc' | 'desc'
type ViewMode = 'grid' | 'list'

export default function RecipesPage() {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    categories: [],
    rarities: [],
    maxCookTime: 120,
    onlyMakeable: false
  })
  
  const [sortBy, setSortBy] = useState<SortOption>('name')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')

  const filteredAndSortedRecipes = useMemo(() => {
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
    if (filters.maxCookTime < 120) {
      recipes = recipes.filter(recipe =>
        recipe.variants.some(variant => 
          !variant.cookTimeMin || variant.cookTimeMin <= filters.maxCookTime
        )
      )
    }

    // Only makeable filter (placeholder - would check against user's ingredients)
    if (filters.onlyMakeable) {
      // Placeholder: filter based on user's ingredient collection
      // For now, return empty since we don't have user data
      recipes = []
    }

    // Sorting
    recipes.sort((a, b) => {
      let comparison = 0
      
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name)
          break
        case 'rarity':
          const rarityOrder = ['VeryCommon', 'Common', 'Uncommon', 'Rare', 'Legendary', 'Mythical', 'Divine', 'Prismatic', 'Transcendent']
          const aMaxRarity = Math.max(...a.variants.map(v => rarityOrder.indexOf(v.rarity)))
          const bMaxRarity = Math.max(...b.variants.map(v => rarityOrder.indexOf(v.rarity)))
          comparison = aMaxRarity - bMaxRarity
          break
        case 'variants':
          comparison = a.variants.length - b.variants.length
          break
        case 'ingredients':
          const aMinIngredients = Math.min(...a.variants.map(v => v.ingredients.length))
          const bMinIngredients = Math.min(...b.variants.map(v => v.ingredients.length))
          comparison = aMinIngredients - bMinIngredients
          break
      }
      
      return sortDirection === 'asc' ? comparison : -comparison
    })

    return recipes
  }, [filters, sortBy, sortDirection])

  const toggleSort = (option: SortOption) => {
    if (sortBy === option) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(option)
      setSortDirection('asc')
    }
  }

  const getSortIcon = (option: SortOption) => {
    if (sortBy !== option) return null
    return sortDirection === 'asc' ? <SortAsc className="h-3 w-3" /> : <SortDesc className="h-3 w-3" />
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters Sidebar */}
        <aside className="lg:w-80 flex-shrink-0">
          <Filters onFiltersChange={setFilters} />
        </aside>
        
        {/* Main Content */}
        <div className="flex-1 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">All Recipes</h1>
              <p className="text-muted-foreground">
                Discover delicious recipes from your garden ingredients
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Results Summary & Sorting */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-muted/50 rounded-lg">
            <div className="text-sm text-muted-foreground">
              Showing <span className="font-medium text-foreground">{filteredAndSortedRecipes.length}</span> of{' '}
              <span className="font-medium text-foreground">{DB.recipes.length}</span> recipes
            </div>
            
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              {[
                { key: 'name' as const, label: 'Name' },
                { key: 'rarity' as const, label: 'Rarity' },
                { key: 'variants' as const, label: 'Variants' },
                { key: 'ingredients' as const, label: 'Ingredients' }
              ].map(({ key, label }) => (
                <Button
                  key={key}
                  variant={sortBy === key ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => toggleSort(key)}
                  className="gap-1"
                >
                  {label}
                  {getSortIcon(key)}
                </Button>
              ))}
            </div>
          </div>

          {/* Recipe Grid/List */}
          {filteredAndSortedRecipes.length > 0 ? (
            <div className={
              viewMode === 'grid' 
                ? "grid sm:grid-cols-2 xl:grid-cols-3 gap-6"
                : "space-y-4"
            }>
              {filteredAndSortedRecipes.map(recipe => (
                <RecipeCard 
                  key={recipe.id} 
                  recipe={recipe}
                  className={viewMode === 'list' ? 'flex-row' : ''}
                />
              ))}
            </div>
          ) : DB.recipes.length === 0 ? (
            <Card className="p-12 text-center">
              <div className="space-y-4">
                <Sparkles className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
                <div>
                  <h3 className="text-lg font-medium text-muted-foreground mb-2">No Recipes Available</h3>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto">
                    Recipes will appear here once data is loaded into the system.
                  </p>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="p-12 text-center">
              <div className="space-y-4">
                <Sparkles className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
                <div>
                  <h3 className="text-lg font-medium text-muted-foreground mb-2">No Results Found</h3>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto">
                    Try adjusting your filters or search terms to find more recipes.
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setFilters({
                    search: '',
                    categories: [],
                    rarities: [],
                    maxCookTime: 120,
                    onlyMakeable: false
                  })}
                >
                  Clear All Filters
                </Button>
              </div>
            </Card>
          )}

          {/* Quick Stats */}
          {filteredAndSortedRecipes.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t">
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">
                  {filteredAndSortedRecipes.length}
                </div>
                <div className="text-sm text-muted-foreground">Recipes Found</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">
                  {filteredAndSortedRecipes.reduce((sum, recipe) => sum + recipe.variants.length, 0)}
                </div>
                <div className="text-sm text-muted-foreground">Total Variants</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">
                  {new Set(filteredAndSortedRecipes.map(r => r.category)).size}
                </div>
                <div className="text-sm text-muted-foreground">Categories</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">
                  {Math.round(filteredAndSortedRecipes.reduce((sum, recipe) => 
                    sum + recipe.variants.reduce((vSum, variant) => 
                      vSum + variant.ingredients.length, 0
                    ) / recipe.variants.length, 0
                  ) / filteredAndSortedRecipes.length) || 0}
                </div>
                <div className="text-sm text-muted-foreground">Avg Ingredients</div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}