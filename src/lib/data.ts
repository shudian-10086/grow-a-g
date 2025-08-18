import type { Ingredient } from '@/types/ingredient'
import type { Recipe } from '@/types/recipe'
import type { DataVersion } from '@/types/changelog'
import { RARITY_ORDER, type Rarity } from '@/types/rarity'
import versions from '@/data/versions.json'
import ingredients from '@/data/ingredients.json'
import recipes from '@/data/recipes.json'

export const DB = {
  versions: versions as DataVersion[],
  ingredients: ingredients as Ingredient[],
  recipes: recipes as Recipe[],
}

export function findRecipesByIngredients(owned: string[]): Recipe[] {
  return DB.recipes.filter(recipe => 
    recipe.variants.some(variant => 
      variant.ingredients.every(ingredient => owned.includes(ingredient.id))
    )
  )
}

export function bestVariantOf(recipe: Recipe, targetRarity?: Rarity) {
  if (targetRarity) {
    return recipe.variants.find(variant => variant.rarity === targetRarity)
  }
  
  // Return highest rarity variant
  return [...recipe.variants].sort((a, b) => 
    RARITY_ORDER.indexOf(b.rarity) - RARITY_ORDER.indexOf(a.rarity)
  )[0]
}

export function getIngredientById(id: string): Ingredient | undefined {
  return DB.ingredients.find(ingredient => ingredient.id === id)
}

export function findRecipesUsingIngredient(ingredientId: string): Recipe[] {
  return DB.recipes.filter(recipe =>
    recipe.variants.some(variant =>
      variant.ingredients.some(ingredient => ingredient.id === ingredientId)
    )
  )
}

export function filterRecipesByCategory(category?: string): Recipe[] {
  if (!category) return DB.recipes
  return DB.recipes.filter(recipe => recipe.category === category)
}

export function getLatestVersion(): DataVersion | null {
  return DB.versions.length > 0 ? DB.versions[DB.versions.length - 1] : null
}