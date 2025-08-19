import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { RarityBadge } from '@/components/RarityBadge'
import { IngredientPill } from '@/components/IngredientPill'
import { CopyIngredientsButton } from '@/components/CopyIngredientsButton'
import { DB, getIngredientById, findRecipesUsingIngredient } from '@/lib/data'
import { ArrowLeft, Timer, CheckCircle, AlertCircle, ChefHat, Sparkles, Users, Clock } from 'lucide-react'
import type { Metadata } from 'next'
import recipesData from '../../../data/recipes.json'

export async function generateStaticParams() {
  // 顶层静态导入，确保构建和开发环境都能拿到完整列表
  const list = recipesData as { id: string }[]
  if (process.env.NODE_ENV !== 'production') {
    console.log('[generateStaticParams] ids:', list.map(r => r.id))
  }
  return list.map((recipe) => ({ slug: recipe.id }))
}

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // 尝试从动态数据获取，失败则使用静态数据
  let recipes = DB.recipes
  try {
    const recipesData = (await import('../../../data/recipes.json')).default as any[]
    recipes = recipesData
  } catch (error) {
    console.warn('Failed to load dynamic recipes data for metadata, using static data')
  }
  
  const recipe = recipes.find(r => r.id === params.slug)
  
  if (!recipe) {
    return {
      title: 'Recipe Not Found'
    }
  }

  return {
    title: `How to Make ${recipe.name} | Grow a Garden Recipes`,
    description: recipe.description || `Learn how to make ${recipe.name} using ingredients from your garden.`,
    openGraph: {
      title: `${recipe.name} Recipe`,
      description: recipe.description || `Cooking guide for ${recipe.name}`,
      type: 'article'
    }
  }
}

export default function RecipeDetailPage({ params }: Props) {
  // 使用静态导入的数据，确保在服务端和客户端都能正常工作
  const recipes = recipesData as any[]
  
  const recipe = recipes.find(r => r.id === params.slug)
  
  if (!recipe) {
    notFound()
  }

  // Get all unique ingredients used across variants
  const allIngredients = Array.from(
    new Set(
      recipe.variants.flatMap(variant => 
        variant.ingredients.map(ing => ing.id)
      )
    )
  ).map(id => getIngredientById(id)).filter(Boolean)

  // Find related recipes that share ingredients
  const relatedRecipes = recipes
    .filter(r => r.id !== recipe.id)
    .filter(r => 
      r.variants.some(variant =>
        variant.ingredients.some(ing =>
          allIngredients.some(ai => ai?.id === ing.id)
        )
      )
    )
    .slice(0, 3)

  return (
    <div className="space-y-8">
      {/* Navigation */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" asChild>
          <Link href="/recipes">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Recipes
          </Link>
        </Button>
      </div>

      {/* Recipe Header */}
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3 flex-wrap">
            <Badge variant="outline" className="text-sm">
              <ChefHat className="h-3 w-3 mr-1" />
              {recipe.category}
            </Badge>
            {recipe.cravings?.map(craving => (
              <Badge key={craving} variant="secondary">{craving}</Badge>
            ))}
            <Badge variant="outline" className="text-sm">
              <Sparkles className="h-3 w-3 mr-1" />
              {recipe.variants.length} Variants
            </Badge>
          </div>
          
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-3">{recipe.name} Recipe</h1>
            {recipe.description && (
              <p className="text-xl text-muted-foreground leading-relaxed">
                {recipe.description}
              </p>
            )}
          </div>

          {/* Recipe Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">
                {recipe.variants.length}
              </div>
              <div className="text-sm text-muted-foreground">Variants</div>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">
                {allIngredients.length}
              </div>
              <div className="text-sm text-muted-foreground">Unique Ingredients</div>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">
                {recipe.variants.filter(v => v.cookTimeMin).length > 0 
                  ? Math.min(...recipe.variants.filter(v => v.cookTimeMin).map(v => v.cookTimeMin!))
                  : '?'}
              </div>
              <div className="text-sm text-muted-foreground">Min Cook Time</div>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">
                {Math.max(...recipe.variants.map(v => {
                  const rarityOrder = ['VeryCommon', 'Common', 'Uncommon', 'Rare', 'Legendary', 'Mythical', 'Divine', 'Prismatic', 'Transcendent']
                  return rarityOrder.indexOf(v.rarity)
                }))}
              </div>
              <div className="text-sm text-muted-foreground">Max Rarity Level</div>
            </Card>
          </div>
        </div>

        <Separator />

        {/* Recipe Variants */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold">Recipe Variants</h2>
            <div className="text-sm text-muted-foreground">
              Sorted by rarity (highest first)
            </div>
          </div>
          
          <div className="grid gap-6">
            {recipe.variants
              .sort((a, b) => {
                const rarityOrder = ['VeryCommon', 'Common', 'Uncommon', 'Rare', 'Legendary', 'Mythical', 'Divine', 'Prismatic', 'Transcendent']
                return rarityOrder.indexOf(b.rarity) - rarityOrder.indexOf(a.rarity)
              })
              .map((variant, index) => (
              <Card key={index} className="relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                  <ChefHat className="w-full h-full" />
                </div>
                
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3">
                      <RarityBadge rarity={variant.rarity} />
                      <span className="text-xl">{variant.rarity} Variant</span>
                    </CardTitle>
                    <div className="flex items-center gap-3">
                      {variant.verified ? (
                        <div className="flex items-center gap-1 text-green-600">
                          <CheckCircle className="h-4 w-4" />
                          <span className="text-sm">Verified</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-amber-600">
                          <AlertCircle className="h-4 w-4" />
                          <span className="text-sm">Unverified</span>
                        </div>
                      )}
                      <CopyIngredientsButton ingredients={variant.ingredients} />
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* Recipe Metadata */}
                  <div className="flex items-center gap-6 text-sm">
                    {variant.cookTimeMin && (
                      <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-full">
                        <Timer className="h-4 w-4 text-blue-600" />
                        <span className="text-blue-700 font-medium">{variant.cookTimeMin} minutes</span>
                      </div>
                    )}
                    {variant.potColor && variant.potColor !== 'Default' && (
                      <div className="flex items-center gap-2 px-3 py-1 bg-purple-50 rounded-full">
                        <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                        <span className="text-purple-700 font-medium">{variant.potColor} Pot</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full">
                      <Users className="h-4 w-4 text-green-600" />
                      <span className="text-green-700 font-medium">{variant.ingredients.length} Ingredients</span>
                    </div>
                  </div>

                  {/* Ingredients Grid */}
                  <div>
                    <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-primary" />
                      Ingredients Required
                    </h4>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {variant.ingredients.map((ing, idx) => {
                        const ingredient = getIngredientById(ing.id)
                        if (!ingredient) {
                          return (
                            <div key={idx} className="flex items-center gap-2 p-3 border rounded-lg bg-red-50 border-red-200">
                              <span className="text-sm font-bold text-red-600">{ing.qty}×</span>
                              <span className="text-sm text-red-600">{ing.id} (not found)</span>
                            </div>
                          )
                        }
                        return (
                          <div key={idx} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                            <span className="text-lg font-bold text-primary min-w-[2rem]">{ing.qty}×</span>
                            <IngredientPill ingredient={ingredient} clickable={true} />
                            {ing.orderSensitive && (
                              <Badge variant="outline" className="text-xs ml-auto">
                                Order Sensitive
                              </Badge>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Special Notes */}
                  {variant.notes && variant.notes.length > 0 && (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <h4 className="font-semibold text-amber-800 mb-3 flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        Important Notes
                      </h4>
                      <ul className="space-y-2">
                        {variant.notes.map((note, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-amber-700">
                            <span className="text-amber-500 mt-1">•</span>
                            <span>{note}</span>
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

        <Separator />

        {/* Ingredient Details */}
        {allIngredients.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">All Ingredients Used</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {allIngredients.map(ingredient => {
                if (!ingredient) return null
                const usedInRecipes = findRecipesUsingIngredient(ingredient.id)
                return (
                  <Card key={ingredient.id} className="p-4 hover:bg-accent/50 transition-colors">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{ingredient.name}</h4>
                        {ingredient.rarity && (
                          <RarityBadge rarity={ingredient.rarity} className="text-xs" />
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <div className="flex items-center gap-1 mb-1">
                          <Badge variant="outline" className="text-xs">
                            {ingredient.type}
                          </Badge>
                        </div>
                        <div>Used in {usedInRecipes.length} recipes</div>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>
        )}

        {/* Related Recipes */}
        {relatedRecipes.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">Related Recipes</h3>
            <p className="text-muted-foreground">
              Other recipes that share ingredients with {recipe.name}
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedRecipes.map(relatedRecipe => {
                const bestVariant = relatedRecipe.variants.sort((a, b) => {
                  const rarityOrder = ['VeryCommon', 'Common', 'Uncommon', 'Rare', 'Legendary', 'Mythical', 'Divine', 'Prismatic', 'Transcendent']
                  return rarityOrder.indexOf(b.rarity) - rarityOrder.indexOf(a.rarity)
                })[0]
                
                return (
                  <Link key={relatedRecipe.id} href={`/recipes/${relatedRecipe.id}`}>
                    <Card className="p-4 hover:bg-accent/50 transition-colors cursor-pointer">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">
                            {relatedRecipe.category}
                          </Badge>
                          {bestVariant && (
                            <RarityBadge rarity={bestVariant.rarity} className="text-xs" />
                          )}
                        </div>
                        <h4 className="font-semibold">{relatedRecipe.name}</h4>
                        {relatedRecipe.description && (
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {relatedRecipe.description}
                          </p>
                        )}
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{relatedRecipe.variants.length} variants</span>
                          <span>{bestVariant?.ingredients.length || 0} ingredients</span>
                        </div>
                      </div>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}