import type { Rarity } from './rarity'

export interface Ingredient {
  id: string // kebab-case, unique identifier
  name: string // display name
  type: 'Fruit' | 'Vegetable' | 'Grain' | 'Flower' | 'Mushroom' | 'Other'
  rarity?: Rarity
  reharvestable?: boolean
  notes?: string[] // source/event/limited time info (placeholder)
  aliases?: string[] // synonyms for search
}