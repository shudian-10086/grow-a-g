#!/usr/bin/env node

import fs from 'fs/promises'
import path from 'path'

/**
 * 自动从 recipes.json 中检测新配料并更新 ingredients.json
 */
async function autoSyncIngredients() {
  try {
    console.log('[auto-sync-ingredients] 开始检测新配料...')
    
    // 读取现有数据
    const recipesData = JSON.parse(await fs.readFile('data/recipes.json', 'utf8'))
    const ingredientsData = JSON.parse(await fs.readFile('data/ingredients.json', 'utf8'))
    
    // 提取现有配料ID
    const existingIngredientIds = new Set(ingredientsData.map(ing => ing.id))
    
    // 从recipes中提取所有配料ID
    const usedIngredientIds = new Set()
    recipesData.forEach(recipe => {
      recipe.variants.forEach(variant => {
        variant.ingredients.forEach(ingredient => {
          usedIngredientIds.add(ingredient.id)
        })
      })
    })
    
    // 找出缺失的配料
    const missingIngredients = [...usedIngredientIds].filter(id => 
      !existingIngredientIds.has(id)
    )
    
    if (missingIngredients.length === 0) {
      console.log('[auto-sync-ingredients] ✅ 没有发现新配料')
      return
    }
    
    console.log('[auto-sync-ingredients] 🔍 发现新配料:', missingIngredients)
    
    // 创建新配料条目（使用默认值）
    const newIngredients = missingIngredients.map(id => ({
      id,
      name: id.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' '), // 将 "bell-pepper" 转换为 "Bell Pepper"
      type: "Other", // 默认类型，需要手动调整
      rarity: "Common" // 默认稀有度，需要手动调整
    }))
    
    // 合并到现有数据
    const updatedIngredients = [...ingredientsData, ...newIngredients]
    
    // 按名称排序
    updatedIngredients.sort((a, b) => a.name.localeCompare(b.name))
    
    // 写回文件
    await fs.writeFile(
      'data/ingredients.json', 
      JSON.stringify(updatedIngredients, null, 2), 
      'utf8'
    )
    
    console.log(`[auto-sync-ingredients] ✅ 已添加 ${newIngredients.length} 个新配料`)
    console.log('[auto-sync-ingredients] ⚠️  请手动调整新配料的 type 和 rarity 属性')
    
    // 显示需要手动调整的配料
    newIngredients.forEach(ing => {
      console.log(`  - ${ing.name} (id: ${ing.id}) - 默认: ${ing.type}/${ing.rarity}`)
    })
    
  } catch (error) {
    console.error('[auto-sync-ingredients] ❌ 错误:', error.message)
    process.exit(1)
  }
}

autoSyncIngredients()