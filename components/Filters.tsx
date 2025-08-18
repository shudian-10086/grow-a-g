'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { X, Filter, ChevronDown, Search } from 'lucide-react'
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
    maxCookTime: 120,
    onlyMakeable: false
  })

  const [isOpen, setIsOpen] = useState(true)

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
      maxCookTime: 120,
      onlyMakeable: false
    }
    setFilters(defaultFilters)
    onFiltersChange(defaultFilters)
  }

  const hasActiveFilters = filters.search || filters.categories.length > 0 || 
    filters.rarities.length > 0 || filters.maxCookTime < 120 || filters.onlyMakeable

  const activeFilterCount = 
    (filters.search ? 1 : 0) +
    filters.categories.length +
    filters.rarities.length +
    (filters.maxCookTime < 120 ? 1 : 0) +
    (filters.onlyMakeable ? 1 : 0)

  return (
    <Card className={className}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="pb-3 cursor-pointer hover:bg-accent/50 transition-colors">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters
                {activeFilterCount > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {activeFilterCount}
                  </Badge>
                )}
              </CardTitle>
              <div className="flex items-center gap-2">
                {hasActiveFilters && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={(e) => {
                      e.stopPropagation()
                      clearFilters()
                    }}
                  >
                    <X className="h-4 w-4 mr-1" />
                    Clear
                  </Button>
                )}
                <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="space-y-6">
            {/* Search */}
            <div className="space-y-2">
              <Label htmlFor="search" className="text-sm font-medium flex items-center gap-2">
                <Search className="h-4 w-4" />
                Search Recipes
              </Label>
              <Input
                id="search"
                placeholder="Search by name, description, or ingredients..."
                value={filters.search}
                onChange={(e) => updateFilters({ search: e.target.value })}
                className="h-10"
              />
            </div>

            {/* Categories */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Categories</Label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(category => (
                  <Badge
                    key={category}
                    variant={filters.categories.includes(category) ? "default" : "outline"}
                    className="cursor-pointer hover:bg-accent transition-colors px-3 py-1"
                    onClick={() => toggleCategory(category)}
                  >
                    {category}
                    {filters.categories.includes(category) && (
                      <X className="h-3 w-3 ml-1" />
                    )}
                  </Badge>
                ))}
              </div>
              {filters.categories.length > 0 && (
                <div className="text-xs text-muted-foreground">
                  {filters.categories.length} category selected
                </div>
              )}
            </div>

            {/* Rarities */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Rarities</Label>
              <div className="grid grid-cols-2 gap-2">
                {RARITIES.map(rarity => (
                  <Badge
                    key={rarity}
                    variant={filters.rarities.includes(rarity) ? "default" : "outline"}
                    className="cursor-pointer hover:bg-accent transition-colors text-xs justify-center py-2"
                    onClick={() => toggleRarity(rarity)}
                  >
                    {rarity}
                    {filters.rarities.includes(rarity) && (
                      <X className="h-3 w-3 ml-1" />
                    )}
                  </Badge>
                ))}
              </div>
              {filters.rarities.length > 0 && (
                <div className="text-xs text-muted-foreground">
                  {filters.rarities.length} rarity selected
                </div>
              )}
            </div>

            {/* Cook Time */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">
                Max Cook Time: {filters.maxCookTime === 120 ? 'Any' : `${filters.maxCookTime} minutes`}
              </Label>
              <div className="px-2">
                <Slider
                  value={[filters.maxCookTime]}
                  onValueChange={([value]) => updateFilters({ maxCookTime: value })}
                  max={120}
                  min={5}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>5 min</span>
                  <span>60 min</span>
                  <span>120+ min</span>
                </div>
              </div>
            </div>

            {/* Only Makeable */}
            <div className="flex items-center space-x-3 p-3 border rounded-lg">
              <Checkbox
                id="makeable"
                checked={filters.onlyMakeable}
                onCheckedChange={(checked) => updateFilters({ onlyMakeable: !!checked })}
              />
              <div className="flex-1">
                <Label htmlFor="makeable" className="text-sm font-medium cursor-pointer">
                  Only show recipes I can make
                </Label>
                <p className="text-xs text-muted-foreground">
                  Filter based on your ingredient collection
                </p>
              </div>
            </div>

            {/* Filter Summary */}
            {hasActiveFilters && (
              <div className="pt-3 border-t">
                <div className="text-sm text-muted-foreground mb-2">Active filters:</div>
                <div className="flex flex-wrap gap-1">
                  {filters.search && (
                    <Badge variant="secondary" className="text-xs">
                      Search: "{filters.search}"
                    </Badge>
                  )}
                  {filters.categories.map(cat => (
                    <Badge key={cat} variant="secondary" className="text-xs">
                      {cat}
                    </Badge>
                  ))}
                  {filters.rarities.map(rarity => (
                    <Badge key={rarity} variant="secondary" className="text-xs">
                      {rarity}
                    </Badge>
                  ))}
                  {filters.maxCookTime < 120 && (
                    <Badge variant="secondary" className="text-xs">
                      ≤{filters.maxCookTime}min
                    </Badge>
                  )}
                  {filters.onlyMakeable && (
                    <Badge variant="secondary" className="text-xs">
                      Makeable only
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}