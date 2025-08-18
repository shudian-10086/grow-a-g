'use client'

import { Button } from '@/components/ui/button'
import { Copy } from 'lucide-react'
import { getIngredientById } from '@/lib/data'

interface CopyIngredientsButtonProps {
  ingredients: { id: string; qty: number }[]
}

export function CopyIngredientsButton({ ingredients }: CopyIngredientsButtonProps) {
  const handleCopyIngredients = () => {
    const text = ingredients.map(ing => {
      const ingredient = getIngredientById(ing.id)
      return `${ing.qty}× ${ingredient?.name || ing.id}`
    }).join('\n')
    
    navigator.clipboard.writeText(text)
    // Would show toast notification in real app
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleCopyIngredients}
      className="gap-2"
    >
      <Copy className="h-3 w-3" />
      Copy Ingredients
    </Button>
  )
}