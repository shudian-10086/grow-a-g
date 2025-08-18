'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { X, Filter } from 'lucide-react'
import type { Rarity } from '@/types/rarity'

interface FiltersProps {
  onFiltersChange: (filters: FilterState) => void
  className?: string
}

export interface FilterState {
  search: string
  categories: string[]
  rarities: Rarity[]
  maxCookTime: number
  onlyMakeable: boolean
}

const CATEGORIES = ['Breakfast', 'Main', 'Dessert', 'Snack', 'Other']
const RARITIES: Rarity[] = ['VeryCommon', 'Common', 'Uncommon', 'Rare', 'Legendary', 'Mythical', 'Divine', 'Prismatic', 'Transcendent']

export function Filters({ onFiltersChange, className }: FiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    categories: [],
    rarities: [],
    maxCookTime: 60,
    onlyMakeable: false
  })

  const updateFilters = (newFilters: Partial<FilterState>) => {
    const updated = { ...filters, ...newFilters }
    setFilters(updated)
    onFiltersChange(updated)
  }

  const toggleCategory = (category: string) => {
    const categories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category]
    updateFilters({ categories })
  }

  const toggleRarity = (rarity: Rarity) => {
    const rarities = filters.rarities.includes(rarity)
      ? filters.rarities.filter(r => r !== rarity)
      : [...filters.rarities, rarity]
    updateFilters({ rarities })
  }

  const clearFilters = () => {
    const defaultFilters: FilterState = {
      search: '',
      categories: [],
      rarities: [],
      maxCookTime: 60,
      onlyMakeable: false
    }
    setFilters(defaultFilters)
    onFiltersChange(defaultFilters)
  }

  const hasActiveFilters = filters.search || filters.categories.length > 0 || 
    filters.rarities.length > 0 || filters.maxCookTime < 60 || filters.onlyMakeable

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search */}
        <div>
          <Label htmlFor="search" className="text-sm font-medium">Search Recipes</Label>
          <Input
            id="search"
            placeholder="Search by name or description..."
            value={filters.search}
            onChange={(e) => updateFilters({ search: e.target.value })}
            className="mt-1"
          />
        </div>

        {/* Categories */}
        <div>
          <Label className="text-sm font-medium">Categories</Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {CATEGORIES.map(category => (
              <Badge
                key={category}
                variant={filters.categories.includes(category) ? "default" : "outline"}
                className="cursor-pointer hover:bg-accent"
                onClick={() => toggleCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Rarities */}
        <div>
          <Label className="text-sm font-medium">Rarities</Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {RARITIES.map(rarity => (
              <Badge
                key={rarity}
                variant={filters.rarities.includes(rarity) ? "default" : "outline"}
                className="cursor-pointer hover:bg-accent text-xs"
                onClick={() => toggleRarity(rarity)}
              >
                {rarity}
              </Badge>
            ))}
          </div>
        </div>

        {/* Cook Time */}
        <div>
          <Label className="text-sm font-medium">
            Max Cook Time: {filters.maxCookTime} minutes
          </Label>
          <Slider
            value={[filters.maxCookTime]}
            onValueChange={([value]) => updateFilters({ maxCookTime: value })}
            max={120}
            min={1}
            step={5}
            className="mt-2"
          />
        </div>

        {/* Only Makeable */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="makeable"
            checked={filters.onlyMakeable}
            onCheckedChange={(checked) => updateFilters({ onlyMakeable: !!checked })}
          />
          <Label htmlFor="makeable" className="text-sm">
            Only show recipes I can make
          </Label>
        </div>
      </CardContent>
    </Card>
  )
}