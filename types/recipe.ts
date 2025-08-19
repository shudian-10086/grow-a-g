import type { Rarity, PotColor } from './rarity'

export interface RecipeVariant {
  rarity: Rarity;
  ingredients: IngredientItem[];
  cookTimeMin?: number;
  potColor?: PotColor;
  notes?: string[]; // order, restrictions, alternatives
  verified?: boolean; // data validation status (placeholder)
  sources?: string[]; // data source URLs (placeholder)
}

export interface IngredientItem {
  id: string;
  qty: number;
  orderSensitive?: boolean;
}

export interface Recipe {
  id: string // e.g., 'spaghetti'
  name: string
  category: 'Breakfast' | 'Main' | 'Dessert' | 'Snack' | 'Other'
  image?: string // recipe image path, e.g., '/public/recipes-img/spaghetti.jpg'
  variants: RecipeVariant[]
  cravings?: string[] // wishlist tags that this recipe satisfies (placeholder)
  description?: string
}