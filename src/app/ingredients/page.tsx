'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { RarityBadge } from '@/components/RarityBadge'
import { SearchBox } from '@/components/SearchBox'
import { DB, findRecipesUsingIngredient } from '@/lib/data'
import { simpleSearch } from '@/lib/search'
import { Leaf, Recycle, ChefHat, Sparkles } from 'lucide-react'
import type { Ingredient } from '@/types/ingredient'

const INGREDIENT_TYPES = ['Fruit', 'Vegetable', 'Grain', 'Flower', 'Mushroom', 'Other']

export default function IngredientsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedRarities, setSelectedRarities] = useState<string[]>([])

  const filteredIngredients = useMemo(() => {
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

    return ingredients
  }, [searchQuery, selectedTypes, selectedRarities])

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

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Ingredients Catalog</h1>
        <SearchBox 
          placeholder="Search ingredients..."
          onSearch={setSearchQuery}
          className="max-w-md"
        />
      </div>

      {/* Filters */}
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium mb-2">Filter by Type</h3>
          <div className="flex flex-wrap gap-2">
            {INGREDIENT_TYPES.map(type => (
              <Badge
                key={type}
                variant={selectedTypes.includes(type) ? "default" : "outline"}
                className="cursor-pointer hover:bg-accent"
                onClick={() => toggleType(type)}
              >
                {type}
              </Badge>
            ))}
          </div>
        </div>

        {(selectedTypes.length > 0 || selectedRarities.length > 0 || searchQuery) && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear all
            </Button>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredIngredients.length} of {DB.ingredients.length} ingredients
      </div>

      {filteredIngredients.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredIngredients.map(ingredient => (
            <IngredientCard key={ingredient.id} ingredient={ingredient} />
          ))}
        </div>
      ) : DB.ingredients.length === 0 ? (
        <div className="text-center py-12">
          <Sparkles className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
          <h3 className="text-lg font-medium text-muted-foreground mb-2">No Ingredients Available</h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Ingredients will appear here once data is loaded into the system.
          </p>
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-muted-foreground mb-2">No Results Found</h3>
          <p className="text-sm text-muted-foreground">
            Try adjusting your search terms or filters.
          </p>
        </div>
      )}
    </div>
  )
}

function IngredientCard({ ingredient }: { ingredient: Ingredient }) {
  const usedInRecipes = findRecipesUsingIngredient(ingredient.id)

  return (
    <Card id={ingredient.id} className="hover:bg-accent/50 transition-colors">
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

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Badge variant="outline" className="text-xs">
            {ingredient.type}
          </Badge>
          {ingredient.reharvestable && (
            <div className="flex items-center gap-1">
              <Recycle className="h-3 w-3" />
              <span>Reharvestable</span>
            </div>
          )}
        </div>

        {ingredient.notes && ingredient.notes.length > 0 && (
          <div className="text-xs text-muted-foreground">
            {ingredient.notes.join(' • ')}
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <ChefHat className="h-3 w-3" />
            <span>Used in {usedInRecipes.length} recipes</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}