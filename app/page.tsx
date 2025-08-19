'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { SearchBox } from '@/components/SearchBox'
import dynamic from 'next/dynamic'

const RecipeCard = dynamic(() => import('@/components/RecipeCard').then(mod => mod.RecipeCard), {
  loading: () => <p>加载食谱...</p>,
});

import { DB } from '@/lib/data'
import { ChefHat, Leaf, Heart, TrendingUp, Search, Sparkles, ArrowRight, Star, Clock, Users } from 'lucide-react'
import type { Recipe } from '@/types/recipe'

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>(DB.recipes) // 初始使用静态数据
  
  // 动态获取最新数据
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('/data/recipes.json')
        if (response.ok) {
          const data = await response.json()
          setRecipes(data)
        }
      } catch (error) {
        console.warn('Failed to fetch latest recipes data for homepage, using static data:', error)
      }
    }
    
    fetchRecipes()
  }, [])

  // Get featured recipes - highest rarity variants and popular ones
  const getFeaturedRecipes = () => {
    return recipes
      .filter(recipe => recipe.variants.length > 0)
      .sort((a, b) => {
        // Sort by highest rarity variant
        const rarityOrder = ['VeryCommon', 'Common', 'Uncommon', 'Rare', 'Legendary', 'Mythical', 'Divine', 'Prismatic', 'Transcendent']
        const aHighestRarity = Math.max(...a.variants.map(v => rarityOrder.indexOf(v.rarity)))
        const bHighestRarity = Math.max(...b.variants.map(v => rarityOrder.indexOf(v.rarity)))
        return bHighestRarity - aHighestRarity
      })
      .slice(0, 12) // Show top 6 featured recipes
  }

  const featuredRecipes = getFeaturedRecipes()

  // Get category stats
  const categoryStats = ['Main', 'Dessert', 'Breakfast', 'Other'].map(category => {
    const categoryRecipes = recipes.filter(recipe => recipe.category === category)
    return {
      name: category,
      count: categoryRecipes.length,
      icon: {
        'Main': ChefHat,
        'Dessert': Heart,
        'Breakfast': Sparkles,
        'Other': TrendingUp
      }[category] || ChefHat
    }
  })

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-8 py-12">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            <Leaf className="h-4 w-4" />
            Garden to Table Cooking
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold tracking-tight">
            Grow a Garden
            <span className="block text-4xl lg:text-5xl text-muted-foreground mt-2">Cooking Recipes</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover delicious recipes using ingredients from your garden. 
            Find what you can cook with your current harvest and unlock rare culinary combinations.
          </p>
        </div>
      </section>

      {/* Featured Recipes */}
      <section style={{ marginTop: '10px' }}>

        {featuredRecipes.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredRecipes.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <div className="space-y-4">
              <Sparkles className="h-16 w-16 mx-auto text-muted-foreground opacity-50" />
              <div>
                <h3 className="text-lg font-medium text-muted-foreground mb-2">Featured Recipes Coming Soon</h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  Featured recipes will appear here once data is loaded into the system.
                </p>
              </div>
            </div>
          </Card>
        )}
      </section>

      {/* Navigation Buttons */}
      <section className="text-center">
        <div className="flex items-center justify-center gap-4">
          <Button asChild size="lg" className="gap-2">
            <Link href="/recipes">
              <ChefHat className="h-5 w-5" />
              Browse Recipes
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link href="/ingredients">
              <Leaf className="h-5 w-5" />
              View Ingredients
            </Link>
          </Button>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50" />
          <CardContent className="pt-8 pb-6 relative">
            <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mx-auto mb-4">
              <ChefHat className="h-8 w-8 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-green-800">{recipes.length}</div>
            <div className="text-sm text-green-600 font-medium">Unique Recipes</div>
          </CardContent>
        </Card>
        
        <Card className="text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50" />
          <CardContent className="pt-8 pb-6 relative">
            <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4">
              <Leaf className="h-8 w-8 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-blue-800">{DB.ingredients.length}</div>
            <div className="text-sm text-blue-600 font-medium">Garden Ingredients</div>
          </CardContent>
        </Card>
        
        <Card className="text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50" />
          <CardContent className="pt-8 pb-6 relative">
            <div className="flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mx-auto mb-4">
              <Sparkles className="h-8 w-8 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-purple-800">
              {DB.recipes.reduce((sum, recipe) => sum + recipe.variants.length, 0)}
            </div>
            <div className="text-sm text-purple-600 font-medium">Recipe Variants</div>
          </CardContent>
        </Card>
        
        <Card className="text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-amber-50" />
          <CardContent className="pt-8 pb-6 relative">
            <div className="flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mx-auto mb-4">
              <Star className="h-8 w-8 text-orange-600" />
            </div>
            <div className="text-3xl font-bold text-orange-800">
              {DB.recipes.filter(r => r.variants.some(v => 
                ['Legendary', 'Mythical', 'Divine', 'Prismatic', 'Transcendent'].includes(v.rarity)
              )).length}
            </div>
            <div className="text-sm text-orange-600 font-medium">Rare Recipes</div>
          </CardContent>
        </Card>
      </section>

      {/* Quick Actions */}
      <section className="grid md:grid-cols-2 gap-8">
        <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50" />
          <CardHeader className="relative">
            <CardTitle className="flex items-center gap-3 text-xl">
              <Search className="h-6 w-6 text-green-600" />
              Browse All Recipes
            </CardTitle>
          </CardHeader>
          <CardContent className="relative space-y-4">
            <p className="text-muted-foreground">
              Explore our complete collection of recipes with advanced filtering and sorting options.
              Find recipes by category, rarity, cooking time, and ingredients.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>Quick & Easy</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>All Skill Levels</span>
              </div>
            </div>
            <Button asChild className="group-hover:translate-x-1 transition-transform">
              <Link href="/recipes" className="gap-2">
                View All Recipes
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-rose-50" />
          <CardHeader className="relative">
            <CardTitle className="flex items-center gap-3 text-xl">
              <Heart className="h-6 w-6 text-pink-600" />
              Match Your Cravings
            </CardTitle>
          </CardHeader>
          <CardContent className="relative space-y-4">
            <p className="text-muted-foreground">
              Tell us what you're craving and we'll suggest the perfect recipes to satisfy your desires.
              From sweet treats to hearty meals.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Sparkles className="h-4 w-4" />
                <span>High accuracy                </span>
              </div>
              <div className="flex items-center gap-1">
                <Heart className="h-4 w-4" />
                <span>Personalized</span>
              </div>
            </div>
            <Button asChild variant="outline" className="group-hover:translate-x-1 transition-transform">
              <Link href="/cravings" className="gap-2">
                Find Perfect Recipes
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>



      {/* Recipe Categories */}
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Browse by Category</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore recipes organized by meal type and occasion
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoryStats.map(({ name, count, icon: IconComponent }) => (
            <Link key={name} href={`/recipes?category=${name}`}>
              <Card className="hover:bg-accent/50 transition-all duration-300 cursor-pointer group hover:shadow-md hover:scale-105">
                <CardContent className="pt-8 pb-6 text-center">
                  <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {count} recipes available
                  </p>
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="h-4 w-4 mx-auto text-primary" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-16 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 rounded-full text-sm font-medium text-green-800">
            <Sparkles className="h-4 w-4" />
            Start Your Culinary Journey
          </div>
          <h2 className="text-3xl font-bold text-green-900">
            Ready to Cook Something Amazing?
          </h2>
          <p className="text-green-700 max-w-2xl mx-auto">
            Join thousands of gardeners who have discovered the joy of cooking with fresh, 
            home-grown ingredients. Start exploring recipes today!
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button asChild size="lg" className="gap-2">
              <Link href="/recipes">
                <ChefHat className="h-5 w-5" />
                Start Cooking
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link href="/guides">
                <Sparkles className="h-5 w-5" />
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}