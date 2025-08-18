import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const load = (file) => {
  try {
    return JSON.parse(fs.readFileSync(path.join(root, 'src', 'data', file), 'utf-8'))
  } catch (error) {
    console.error(`Failed to load ${file}:`, error.message)
    return []
  }
}

const ingredients = load('ingredients.json')
const recipes = load('recipes.json')
const versions = load('versions.json')

console.log('🔍 Validating data integrity...\n')

let errors = []
let warnings = []

// Validate ingredients
const ingredientIds = new Set(ingredients.map(i => i.id))
if (ingredientIds.size !== ingredients.length) {
  errors.push('Ingredient IDs are not unique')
}

// Validate ingredient structure
ingredients.forEach((ing, index) => {
  if (!ing.id || !ing.name || !ing.type) {
    errors.push(`Ingredient at index ${index} is missing required fields (id, name, type)`)
  }
})

// Validate recipes
const recipeIds = new Set(recipes.map(r => r.id))
if (recipeIds.size !== recipes.length) {
  errors.push('Recipe IDs are not unique')
}

// Validate recipe ingredients exist
recipes.forEach(recipe => {
  if (!recipe.variants || recipe.variants.length === 0) {
    warnings.push(`Recipe "${recipe.name}" has no variants`)
  }
  
  recipe.variants?.forEach((variant, variantIndex) => {
    if (!variant.ingredients || variant.ingredients.length === 0) {
      warnings.push(`Recipe "${recipe.name}" variant ${variantIndex} has no ingredients`)
    }
    
    variant.ingredients?.forEach(ing => {
      if (!ingredientIds.has(ing.id)) {
        errors.push(`Recipe "${recipe.name}" references non-existent ingredient: "${ing.id}"`)
      }
      if (!ing.qty || ing.qty <= 0) {
        errors.push(`Recipe "${recipe.name}" has invalid quantity for ingredient "${ing.id}"`)
      }
    })
  })
})

// Report results
console.log(`📊 Validation Results:`)
console.log(`   Ingredients: ${ingredients.length}`)
console.log(`   Recipes: ${recipes.length}`)
console.log(`   Versions: ${versions.length}\n`)

if (warnings.length > 0) {
  console.log('⚠️  Warnings:')
  warnings.forEach(warning => console.log(`   - ${warning}`))
  console.log('')
}

if (errors.length > 0) {
  console.log('❌ Errors:')
  errors.forEach(error => console.log(`   - ${error}`))
  console.log('')
  process.exit(1)
} else {
  console.log('✅ Data validation passed!')
  if (ingredients.length === 0 && recipes.length === 0) {
    console.log('ℹ️  Note: No data loaded yet - this is expected for initial setup')
  }
}