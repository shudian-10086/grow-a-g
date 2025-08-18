# 🍳 新菜单添加指南

## 📝 **添加新菜单的完整流程**

### 1. **编辑 data/recipes.json**

在数组中添加新的菜谱对象：

```json
{
  "id": "mushroom-risotto",
  "name": "Mushroom Risotto",
  "category": "Main",
  "image": "/recipes-img/mushroom-risotto.jpg",
  "description": "Creamy Italian rice dish with wild mushrooms",
  "variants": [
    {
      "rarity": "Rare",
      "ingredients": [
        { "id": "rice", "qty": 2 },
        { "id": "wild-mushroom", "qty": 3 },
        { "id": "cheese", "qty": 1 },
        { "id": "white-wine", "qty": 1 }
      ],
      "cookTimeMin": 45,
      "potColor": "Default",
      "notes": ["Stir frequently", "Add broth gradually"],
      "verified": true
    }
  ]
}
```

### 2. **运行自动同步**

```bash
# 重启开发服务器（会自动检测和添加新配料）
npm run dev

# 或者单独运行配料检测
npm run auto-sync-ingredients
```

### 3. **手动调整新配料属性**

如果有新配料，系统会自动创建但需要手动调整：

在 `data/ingredients.json` 中找到新添加的配料，修改：
- `type`: "Fruit", "Vegetable", "Grain", "Flower", "Mushroom", "Other"
- `rarity`: "VeryCommon", "Common", "Uncommon", "Rare", "Legendary", "Mythical", "Divine", "Prismatic", "Transcendent"

### 4. **重启服务器生效**

```bash
npm run dev
```

## 🥕 **配料字段说明**

### Recipe 对象结构：
- `id`: 唯一标识符（kebab-case）
- `name`: 显示名称
- `category`: 菜谱类别
- `image`: 图片路径（可选）
- `description`: 描述
- `variants`: 变体数组

### Variant 对象结构：
- `rarity`: 稀有度等级
- `ingredients`: 配料数组
- `cookTimeMin`: 烹饪时间（分钟，可选）
- `potColor`: 锅子颜色（可选）
- `notes`: 注意事项（可选）
- `verified`: 是否验证过

### Ingredient 对象结构：
- `id`: 配料ID
- `qty`: 数量
- `orderSensitive`: 是否顺序敏感（可选）

## 🚀 **自动化功能**

### ✅ **现在自动处理的**：
1. 新配料自动检测和创建
2. 数据自动同步到前端
3. 静态路由自动生成
4. 前端自动显示新菜谱

### ⚠️ **需要手动处理的**：
1. 新配料的 `type` 和 `rarity` 属性
2. 图片文件放置（如果需要）
3. 配料详细信息完善

## 🔧 **可用的 npm 脚本**

- `npm run auto-sync-ingredients` - 检测并添加新配料
- `npm run sync-data` - 同步数据到 public 目录
- `npm run full-sync` - 完整同步（配料 + 数据）
- `npm run dev` - 开发服务器（自动完整同步）
- `npm run build` - 构建生产版本（自动完整同步）

## 📋 **菜谱模板**

```json
{
  "id": "recipe-id",
  "name": "Recipe Name",
  "category": "Main",
  "image": "/recipes-img/recipe-id.jpg",
  "description": "Recipe description",
  "variants": [
    {
      "rarity": "Common",
      "ingredients": [
        { "id": "ingredient-1", "qty": 1 },
        { "id": "ingredient-2", "qty": 2 }
      ],
      "cookTimeMin": 30,
      "verified": true
    }
  ]
}
```