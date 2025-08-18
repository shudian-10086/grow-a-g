'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RecipeCard } from './RecipeCard'
import { DB } from '@/lib/data'
import { Heart, Search } from 'lucide-react'
import type { Recipe } from '@/types/recipe'

export function CravingMatcher() {
  const [craving, setCraving] = useState('')
  const [matches, setMatches] = useState<Recipe[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [recipes, setRecipes] = useState<Recipe[]>(DB.recipes)

  // 动态获取最新数据
  useEffect(() => {
    console.log('CravingMatcher: Component mounted, initial recipes length:', DB.recipes.length)
    const fetchRecipes = async () => {
      try {
        console.log('CravingMatcher: Fetching recipes from /data/recipes.json')
        const response = await fetch('/data/recipes.json')
        if (response.ok) {
          const data = await response.json()
          console.log('CravingMatcher: Fetched recipes successfully, length:', data.length)
          setRecipes(data)
        } else {
          console.error('CravingMatcher: Failed to fetch recipes, status:', response.status)
        }
      } catch (error) {
        console.warn('CravingMatcher: Failed to fetch latest recipes data for cravings, using static data:', error)
      }
    }
    
    fetchRecipes()
  }, [])

  // 客户端搜索函数
  const searchRecipesByCraving = (craving: string): Recipe[] => {
    const q = craving.trim().toLowerCase()
    console.log('Searching for term:', q)
    if (!q) return []
    
    const results = recipes.filter(recipe => {
      console.log('Checking recipe:', recipe.name, 'cravings:', recipe.cravings)
      
      // Search in cravings tags
      const cravingsMatch = recipe.cravings?.some(tag => {
        const match = tag.toLowerCase().includes(q)
        if (match) console.log('Cravings match found:', tag, 'contains', q)
        return match
      })
      
      // Search in recipe name
      const nameMatch = recipe.name.toLowerCase().includes(q)
      if (nameMatch) console.log('Name match found:', recipe.name)
      
      // Search in description
      const descriptionMatch = recipe.description?.toLowerCase().includes(q)
      if (descriptionMatch) console.log('Description match found:', recipe.description)
      
      // Search in category (for terms like "dessert", "main", etc.)
      const categoryMatch = recipe.category.toLowerCase().includes(q)
      if (categoryMatch) console.log('Category match found:', recipe.category)
      
      // Search for specific mood/feeling keywords
      const moodKeywords = {
        'sweet': ['Dessert', 'candy', 'cake', 'donut', 'ice-cream'],
        'comfort': ['Main', 'soup', 'hot', 'warm'],
        'quick': ['Snack', 'easy', 'fast'],
        'hearty': ['Main', 'burger', 'sandwich'],
        'light': ['Snack', 'salad'],
        'refreshing': ['smoothie', 'salad', 'cold'],
        'indulgent': ['Dessert', 'rich', 'decadent'],
        'healthy': ['salad', 'smoothie'],
        'breakfast': ['Breakfast', 'morning'],
        'snack': ['Snack', 'bite', 'quick']
      }
      
      const moodMatch = Object.entries(moodKeywords).some(([mood, keywords]) => {
        if (q.includes(mood)) {
          const keywordMatch = keywords.some(keyword => 
            recipe.category.toLowerCase().includes(keyword.toLowerCase()) ||
            recipe.name.toLowerCase().includes(keyword.toLowerCase()) ||
            recipe.description?.toLowerCase().includes(keyword.toLowerCase())
          )
          if (keywordMatch) console.log('Mood match found for:', mood)
          return keywordMatch
        }
        return false
      })
      
      const totalMatch = cravingsMatch || nameMatch || descriptionMatch || categoryMatch || moodMatch
      console.log('Recipe', recipe.name, 'matches:', totalMatch)
      return totalMatch
    })
    
    console.log('Final search results:', results.length, 'recipes found')
    return results
  }

  const handleSearch = async () => {
    if (!craving.trim()) return
    
    setIsSearching(true)
    // Simulate search delay
    setTimeout(() => {
      console.log('Searching for:', craving)
      console.log('Total recipes available:', recipes.length)
      const results = searchRecipesByCraving(craving)
      console.log('Search results:', results.length, results.map(r => r.name))
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
          <div className="space-y-2">
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
            
            {/* Test buttons for debugging */}
            <div className="flex gap-2 flex-wrap text-xs">
              <button 
                className="px-2 py-1 bg-gray-200 rounded" 
                onClick={() => {setCraving('savory'); setTimeout(() => handleSearch(), 100)}}
              >
                Test: savory
              </button>
              <button 
                className="px-2 py-1 bg-gray-200 rounded" 
                onClick={() => {setCraving('sweet'); setTimeout(() => handleSearch(), 100)}}
              >
                Test: sweet
              </button>
              <button 
                className="px-2 py-1 bg-gray-200 rounded" 
                onClick={() => {setCraving('comfort'); setTimeout(() => handleSearch(), 100)}}
              >
                Test: comfort
              </button>
              <button 
                className="px-2 py-1 bg-gray-200 rounded" 
                onClick={() => console.log('Available recipes:', recipes.length, recipes.map(r => ({name: r.name, cravings: r.cravings})))}
              >
                Debug: Show recipes
              </button>
            </div>
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