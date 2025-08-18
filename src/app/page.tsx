'use client'

'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { SearchBox } from '@/components/SearchBox'
import { DB } from '@/lib/data'
import { ChefHat, Leaf, Heart, TrendingUp, Search, Sparkles } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
            Grow a Garden
            <span className="block text-3xl lg:text-4xl text-muted-foreground">Cooking Recipes</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover delicious recipes using ingredients from your garden. 
            Find what you can cook with your current harvest.
          </p>
        </div>
        
        <div className="max-w-md mx-auto">
          <SearchBox 
            placeholder="Search recipes and ingredients..."
            onSearch={(query) => {
              // Placeholder - would implement global search
              console.log('Global search:', query)
            }}
          />
        </div>
      </section>

      {/* Quick Stats */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-3">
              <ChefHat className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold">{DB.recipes.length}</div>
            <div className="text-sm text-muted-foreground">Recipes</div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-3">
              <Leaf className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold">{DB.ingredients.length}</div>
            <div className="text-sm text-muted-foreground">Ingredients</div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mx-auto mb-3">
              <Heart className="h-6 w-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold">0</div>
            <div className="text-sm text-muted-foreground">Cravings Matched</div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mx-auto mb-3">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
            <div className="text-2xl font-bold">0</div>
            <div className="text-sm text-muted-foreground">Trending</div>
          </CardContent>
        </Card>
      </section>

      {/* Quick Actions */}
      <section className="grid md:grid-cols-2 gap-6">
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50" />
          <CardHeader className="relative">
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Browse All Recipes
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <p className="text-muted-foreground mb-4">
              Explore our complete collection of recipes with advanced filtering and sorting options.
            </p>
            <Button asChild>
              <Link href="/recipes">View Recipes</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-rose-50" />
          <CardHeader className="relative">
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              Match Your Cravings
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <p className="text-muted-foreground mb-4">
              Tell us what you're craving and we'll suggest the perfect recipes to satisfy your desires.
            </p>
            <Button asChild variant="outline">
              <Link href="/cravings">Find Recipes</Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Featured Section (Placeholder) */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Featured Recipes</h2>
          <Button variant="ghost" asChild>
            <Link href="/recipes">View All</Link>
          </Button>
        </div>
        
        <div className="text-center py-12 text-muted-foreground">
          <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>Featured recipes will appear here once data is loaded.</p>
        </div>
      </section>
    </div>
  )
}