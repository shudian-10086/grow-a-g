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
  
  // This would search through recipe cravings, names, and descriptions
  // Placeholder implementation for now
  return []
}