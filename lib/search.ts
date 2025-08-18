import type { Recipe } from '@/types/recipe'

export function simpleSearch<T extends { name: string; aliases?: string[] }>(
  list: T[], 
  query: string
): T[] {
  const q = query.trim().toLowerCase()
  if (!q) return list
  
  return list.filter(item => {
    const nameMatch = item.name.toLowerCase().includes(q)
    const aliasMatch = item.aliases?.some(alias => 
      alias.toLowerCase().includes(q)
    )
    return nameMatch || aliasMatch
  })
}

export function searchRecipesByCraving(craving: string): Recipe[] {
  const q = craving.trim().toLowerCase()
  if (!q) return []
  
  // Import DB dynamically to avoid client-side issues
  let recipes: Recipe[] = []
  try {
    const { DB } = require('@/lib/data')
    recipes = DB.recipes as Recipe[]
  } catch (error) {
    console.warn('Failed to load recipes for craving search:', error)
    return []
  }
  
  return recipes.filter(recipe => {
    // Search in cravings tags
    const cravingsMatch = recipe.cravings?.some(tag => 
      tag.toLowerCase().includes(q)
    )
    
    // Search in recipe name
    const nameMatch = recipe.name.toLowerCase().includes(q)
    
    // Search in description
    const descriptionMatch = recipe.description?.toLowerCase().includes(q)
    
    // Search in category (for terms like "dessert", "main", etc.)
    const categoryMatch = recipe.category.toLowerCase().includes(q)
    
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
        return keywords.some(keyword => 
          recipe.category.toLowerCase().includes(keyword.toLowerCase()) ||
          recipe.name.toLowerCase().includes(keyword.toLowerCase()) ||
          recipe.description?.toLowerCase().includes(keyword.toLowerCase())
        )
      }
      return false
    })
    
    return cravingsMatch || nameMatch || descriptionMatch || categoryMatch || moodMatch
  })
}