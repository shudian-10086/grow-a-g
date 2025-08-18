import type { Rarity, PotColor } from './rarity'

export interface RecipeVariant {
  rarity: Rarity
  ingredients: { id: string; qty: number; orderSensitive?: boolean }[]
  cookTimeMin?: number
  potColor?: PotColor
  notes?: string[] // order, restrictions, alternatives
  verified?: boolean // data validation status (placeholder)
  sources?: string[] // data source URLs (placeholder)
}

export interface Recipe {
  id: string // e.g., 'spaghetti'
  name: string
  category: 'Breakfast' | 'Main' | 'Dessert' | 'Snack' | 'Other'
  variants: RecipeVariant[]
  cravings?: string[] // wishlist tags that this recipe satisfies (placeholder)
  description?: string
}