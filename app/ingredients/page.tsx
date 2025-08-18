'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { RarityBadge } from '@/components/RarityBadge'
import { SearchBox } from '@/components/SearchBox'
import { DB, findRecipesUsingIngredient } from '@/lib/data'
import { simpleSearch } from '@/lib/search'
import { Leaf, Recycle, ChefHat, Sparkles, Grid3X3, List, SortAsc, SortDesc, Filter, X } from 'lucide-react'
import type { Ingredient } from '@/types/ingredient'

const INGREDIENT_TYPES = ['Fruit', 'Vegetable', 'Grain', 'Flower', 'Mushroom', 'Other']
const RARITIES = ['VeryCommon', 'Common', 'Uncommon', 'Rare', 'Legendary', 'Mythical', 'Divine', 'Prismatic', 'Transcendent']

type SortOption = 'name' | 'type' | 'rarity' | 'recipes'
type SortDirection = 'asc' | 'desc'
type ViewMode = 'grid' | 'list'

export default function IngredientsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedRarities, setSelectedRarities] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<SortOption>('name')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [showFilters, setShowFilters] = useState(false)

  const filteredAndSortedIngredients = useMemo(() => {
    let ingredients = DB.ingredients

    // Text search
    if (searchQuery) {
      ingredients = simpleSearch(ingredients, searchQuery)
    }

    // Type filter
    if (selectedTypes.length > 0) {
      ingredients = ingredients.filter(ing => selectedTypes.includes(ing.type))
    }

    // Rarity filter  
    if (selectedRarities.length > 0) {
      ingredients = ingredients.filter(ing => 
        ing.rarity && selectedRarities.includes(ing.rarity)
      )
    }

    // Sorting
    ingredients.sort((a, b) => {
      let comparison = 0
      
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name)
          break
        case 'type':
          comparison = a.type.localeCompare(b.type)
          break
        case 'rarity':
          const rarityOrder = ['VeryCommon', 'Common', 'Uncommon', 'Rare', 'Legendary', 'Mythical', 'Divine', 'Prismatic', 'Transcendent']
          const aRarity = a.rarity ? rarityOrder.indexOf(a.rarity) : -1
          const bRarity = b.rarity ? rarityOrder.indexOf(b.rarity) : -1
          comparison = aRarity - bRarity
          break
        case 'recipes':
          const aRecipes = findRecipesUsingIngredient(a.id).length
          const bRecipes = findRecipesUsingIngredient(b.id).length
          comparison = aRecipes - bRecipes
          break
      }
      
      return sortDirection === 'asc' ? comparison : -comparison
    })

    return ingredients
  }, [searchQuery, selectedTypes, selectedRarities, sortBy, sortDirection])

  const toggleType = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    )
  }

  const toggleRarity = (rarity: string) => {
    setSelectedRarities(prev =>
      prev.includes(rarity)
        ? prev.filter(r => r !== rarity)
        : [...prev, rarity]
    )
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedTypes([])
    setSelectedRarities([])
  }

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

  const hasActiveFilters = searchQuery || selectedTypes.length > 0 || selectedRarities.length > 0
  const activeFilterCount = (searchQuery ? 1 : 0) + selectedTypes.length + selectedRarities.length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Ingredients Catalog</h1>
          <p className="text-muted-foreground">
            Explore all available ingredients and their properties
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={showFilters ? 'default' : 'outline'}
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4 mr-1" />
            Filters
            {activeFilterCount > 0 && (
              <Badge variant="secondary" className="ml-1 text-xs">
                {activeFilterCount}
              </Badge>
            )}
          </Button>
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

      {/* Search */}
      <SearchBox 
        placeholder="Search ingredients..."
        onSearch={setSearchQuery}
        className="max-w-md"
      />

      {/* Filters */}
      {showFilters && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Filters</span>
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  <X className="h-4 w-4 mr-1" />
                  Clear All
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Filter by Type</h3>
              <div className="flex flex-wrap gap-2">
                {INGREDIENT_TYPES.map(type => (
                  <Badge
                    key={type}
                    variant={selectedTypes.includes(type) ? "default" : "outline"}
                    className="cursor-pointer hover:bg-accent transition-colors"
                    onClick={() => toggleType(type)}
                  >
                    {type}
                    {selectedTypes.includes(type) && (
                      <X className="h-3 w-3 ml-1" />
                    )}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Filter by Rarity</h3>
              <div className="grid grid-cols-3 gap-2">
                {RARITIES.map(rarity => (
                  <Badge
                    key={rarity}
                    variant={selectedRarities.includes(rarity) ? "default" : "outline"}
                    className="cursor-pointer hover:bg-accent transition-colors text-xs justify-center py-2"
                    onClick={() => toggleRarity(rarity)}
                  >
                    {rarity}
                    {selectedRarities.includes(rarity) && (
                      <X className="h-3 w-3 ml-1" />
                    )}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results Summary & Sorting */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-muted/50 rounded-lg">
        <div className="text-sm text-muted-foreground">
          Showing <span className="font-medium text-foreground">{filteredAndSortedIngredients.length}</span> of{' '}
          <span className="font-medium text-foreground">{DB.ingredients.length}</span> ingredients
        </div>
        
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          {[
            { key: 'name' as const, label: 'Name' },
            { key: 'type' as const, label: 'Type' },
            { key: 'rarity' as const, label: 'Rarity' },
            { key: 'recipes' as const, label: 'Recipes' }
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

      {/* Ingredients Grid/List */}
      {filteredAndSortedIngredients.length > 0 ? (
        <div className={
          viewMode === 'grid' 
            ? "grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            : "space-y-3"
        }>
          {filteredAndSortedIngredients.map(ingredient => (
            <IngredientCard 
              key={ingredient.id} 
              ingredient={ingredient} 
              viewMode={viewMode}
            />
          ))}
        </div>
      ) : DB.ingredients.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="space-y-4">
            <Sparkles className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
            <div>
              <h3 className="text-lg font-medium text-muted-foreground mb-2">No Ingredients Available</h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                Ingredients will appear here once data is loaded into the system.
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
                Try adjusting your search terms or filters.
              </p>
            </div>
            <Button variant="outline" onClick={clearFilters}>
              Clear All Filters
            </Button>
          </div>
        </Card>
      )}

      {/* Quick Stats */}
      {filteredAndSortedIngredients.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {filteredAndSortedIngredients.length}
            </div>
            <div className="text-sm text-muted-foreground">Ingredients</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {new Set(filteredAndSortedIngredients.map(i => i.type)).size}
            </div>
            <div className="text-sm text-muted-foreground">Types</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {filteredAndSortedIngredients.filter(i => i.reharvestable).length}
            </div>
            <div className="text-sm text-muted-foreground">Reharvestable</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {filteredAndSortedIngredients.reduce((sum, ing) => 
                sum + findRecipesUsingIngredient(ing.id).length, 0
              )}
            </div>
            <div className="text-sm text-muted-foreground">Recipe Uses</div>
          </Card>
        </div>
      )}
    </div>
  )
}

function IngredientCard({ ingredient, viewMode }: { ingredient: Ingredient; viewMode: ViewMode }) {
  const usedInRecipes = findRecipesUsingIngredient(ingredient.id)

  if (viewMode === 'list') {
    return (
      <Card id={ingredient.id} className="hover:bg-accent/50 transition-colors">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-green-500" />
                <span className="font-semibold text-lg">{ingredient.name}</span>
              </div>
              <Badge variant="outline">{ingredient.type}</Badge>
              {ingredient.rarity && <RarityBadge rarity={ingredient.rarity} />}
              {ingredient.reharvestable && (
                <div className="flex items-center gap-1 text-green-600">
                  <Recycle className="h-4 w-4" />
                  <span className="text-sm">Reharvestable</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <ChefHat className="h-4 w-4" />
              <span className="text-sm">{usedInRecipes.length} recipes</span>
            </div>
          </div>
          {ingredient.notes && ingredient.notes.length > 0 && (
            <div className="text-sm text-muted-foreground mt-2">
              {ingredient.notes.join(' • ')}
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card id={ingredient.id} className="hover:bg-accent/50 transition-colors group">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="h-4 w-4 text-green-500" />
            <span className="font-medium">{ingredient.name}</span>
          </div>
          {ingredient.rarity && (
            <RarityBadge rarity={ingredient.rarity} />
          )}
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
          <Badge variant="outline" className="text-xs">
            {ingredient.type}
          </Badge>
          {ingredient.reharvestable && (
            <div className="flex items-center gap-1 text-green-600">
              <Recycle className="h-3 w-3" />
              <span>Reharvestable</span>
            </div>
          )}
        </div>

        {ingredient.notes && ingredient.notes.length > 0 && (
          <div className="text-xs text-muted-foreground line-clamp-2">
            {ingredient.notes.join(' • ')}
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <ChefHat className="h-3 w-3" />
            <span>Used in {usedInRecipes.length} recipes</span>
          </div>
          {usedInRecipes.length > 0 && (
            <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
              View Recipes
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}