import { CravingMatcher } from '@/components/CravingMatcher'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Heart, Sparkles, Target } from 'lucide-react'

export default function CravingsPage() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">What are you craving?</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Tell us what you're in the mood for, and we'll help you find the perfect recipes 
          to satisfy your cravings using ingredients from your garden.
        </p>
      </div>

      <CravingMatcher />

      {/* Tips Section */}
      <div className="grid md:grid-cols-2 gap-6 mt-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Target className="h-5 w-5 text-blue-500" />
              Search Tips
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• Try descriptive terms like "sweet", "savory", "comfort food"</p>
            <p>• Mention specific ingredients you want to use</p>
            <p>• Describe the occasion or meal type</p>
            <p>• Ask for "quick" or "easy" recipes when time is limited</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Sparkles className="h-5 w-5 text-purple-500" />
              Popular Cravings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• Something sweet and indulgent</p>
            <p>• Quick healthy breakfast</p>
            <p>• Comfort food for dinner</p>
            <p>• Light and refreshing snack</p>
            <p className="text-xs italic">* Examples will populate with real data</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}