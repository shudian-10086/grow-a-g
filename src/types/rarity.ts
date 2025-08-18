export type Rarity =
  | 'VeryCommon' | 'Common' | 'Uncommon' | 'Rare'
  | 'Legendary' | 'Mythical' | 'Divine' | 'Prismatic' | 'Transcendent'

export type PotColor = 'Default' | 'Red' | 'Green' | 'Blue' | 'Gold' | 'Prismatic'

export const RARITY_ORDER: Rarity[] = [
  'VeryCommon', 'Common', 'Uncommon', 'Rare', 
  'Legendary', 'Mythical', 'Divine', 'Prismatic', 'Transcendent'
]