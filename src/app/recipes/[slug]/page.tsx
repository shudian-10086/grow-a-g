import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { RarityBadge } from '@/components/RarityBadge'
import { IngredientPill } from '@/components/IngredientPill'
import { DB, getIngredientById } from '@/lib/data'
import { ArrowLeft, Timer, Copy, CheckCircle, AlertCircle } from 'lucide-react'
import type { Metadata } from 'next'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const recipe = DB.recipes.find(r => r.id === params.slug)
  
  if (!recipe) {
    return {
      title: 'Recipe Not Found'
    }
  }

  return {
    title: `${recipe.name} | Garden Recipes`,
    description: recipe.description || `Learn how to make ${recipe.name} using ingredients from your garden.`,
    openGraph: {
      title: `${recipe.name} Recipe`,
      description: recipe.description || `Cooking guide for ${recipe.name}`,
      type: 'article'
    }
  }
}

export default function RecipeDetailPage({ params }: Props) {
  const recipe = DB.recipes.find(r => r.id === params.slug)
  
  if (!recipe) {
    notFound()
  }

  const handleCopyIngredients = (ingredients: any[]) => {
    const text = ingredients.map(ing => {
      const ingredient = getIngredientById(ing.id)
      return `${ing.qty}× ${ingredient?.name || ing.id}`
    }).join('\n')
    
    navigator.clipboard.writeText(text)
    // Would show toast notification
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" asChild>
          <Link href="/recipes">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Recipes
          </Link>
        </Button>
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Badge variant="outline">{recipe.category}</Badge>
            {recipe.cravings?.map(craving => (
              <Badge key={craving} variant="secondary">{craving}</Badge>
            ))}
          </div>
          <h1 className="text-4xl font-bold tracking-tight">{recipe.name}</h1>
          {recipe.description && (
            <p className="text-lg text-muted-foreground mt-2">{recipe.description}</p>
          )}
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Recipe Variants</h2>
          <div className="grid gap-6">
            {recipe.variants.map((variant, index) => (
              <Card key={index} className="relative">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3">
                      <RarityBadge rarity={variant.rarity} />
                      {variant.rarity} Variant
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      {variant.verified ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-amber-500" />
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCopyIngredients(variant.ingredients)}
                      >
                        <Copy className="h-3 w-3 mr-1" />
                        Copy List
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Recipe Info */}
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    {variant.cookTimeMin && (
                      <div className="flex items-center gap-1">
                        <Timer className="h-4 w-4" />
                        {variant.cookTimeMin} minutes
                      </div>
                    )}
                    {variant.potColor && variant.potColor !== 'Default' && (
                      <div>Pot: {variant.potColor}</div>
                    )}
                  </div>

                  {/* Ingredients */}
                  <div>
                    <h4 className="font-medium mb-3">Ingredients ({variant.ingredients.length})</h4>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {variant.ingredients.map((ing, idx) => {
                        const ingredient = getIngredientById(ing.id)
                        if (!ingredient) {
                          return (
                            <div key={idx} className="text-sm text-muted-foreground">
                              {ing.qty}× {ing.id} (not found)
                            </div>
                          )
                        }
                        return (
                          <div key={idx} className="flex items-center gap-2">
                            <span className="text-sm font-medium">{ing.qty}×</span>
                            <IngredientPill ingredient={ingredient} />
                            {ing.orderSensitive && (
                              <Badge variant="outline" className="text-xs">Order Sensitive</Badge>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Notes */}
                  {variant.notes && variant.notes.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Notes</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {variant.notes.map((note, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-muted-foreground">•</span>
                            {note}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}