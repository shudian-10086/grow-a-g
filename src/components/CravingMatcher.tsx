'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RecipeCard } from './RecipeCard'
import { searchRecipesByCraving } from '@/lib/search'
import { Heart, Search } from 'lucide-react'

export function CravingMatcher() {
  const [craving, setCraving] = useState('')
  const [matches, setMatches] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = async () => {
    if (!craving.trim()) return
    
    setIsSearching(true)
    // Simulate search delay
    setTimeout(() => {
      const results = searchRecipesByCraving(craving)
      setMatches(results)
      setIsSearching(false)
    }, 500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-pink-500" />
            What are you craving?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              value={craving}
              onChange={(e) => setCraving(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="e.g., something sweet, hearty meal, quick snack..."
              className="flex-1"
            />
            <Button onClick={handleSearch} disabled={!craving.trim() || isSearching}>
              <Search className="h-4 w-4 mr-2" />
              {isSearching ? 'Searching...' : 'Find Recipes'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {matches.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {matches.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}

      {craving && matches.length === 0 && !isSearching && (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">
            No recipes found for "{craving}". Try a different search term or add more recipes to your collection.
          </p>
        </Card>
      )}
    </div>
  )
}