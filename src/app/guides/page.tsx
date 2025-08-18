import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Lightbulb, TrendingUp, Calendar } from 'lucide-react'

export default function GuidesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Guides & Tips</h1>
        <p className="text-lg text-muted-foreground">
          Learn advanced cooking techniques, seasonal strategies, and game updates.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50" />
          <CardHeader className="relative">
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Cooking Basics
            </CardTitle>
          </CardHeader>
          <CardContent className="relative space-y-3">
            <p className="text-muted-foreground">
              Master the fundamentals of garden-to-table cooking.
            </p>
            <div className="flex gap-2">
              <Badge variant="outline">Beginner</Badge>
              <Badge variant="outline">Essential</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50" />
          <CardHeader className="relative">
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5" />
              Advanced Techniques
            </CardTitle>
          </CardHeader>
          <CardContent className="relative space-y-3">
            <p className="text-muted-foreground">
              Unlock rare recipes and optimize your cooking efficiency.
            </p>
            <div className="flex gap-2">
              <Badge variant="outline">Advanced</Badge>
              <Badge variant="outline">Optimization</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50" />
          <CardHeader className="relative">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Seasonal Events
            </CardTitle>
          </CardHeader>
          <CardContent className="relative space-y-3">
            <p className="text-muted-foreground">
              Special recipes and limited-time ingredients guide.
            </p>
            <div className="flex gap-2">
              <Badge variant="outline">Seasonal</Badge>
              <Badge variant="outline">Limited</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-amber-50" />
          <CardHeader className="relative">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Game Updates
            </CardTitle>
          </CardHeader>
          <CardContent className="relative space-y-3">
            <p className="text-muted-foreground">
              Latest patches, new features, and balance changes.
            </p>
            <div className="flex gap-2">
              <Badge variant="outline">Updates</Badge>
              <Badge variant="outline">News</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="p-8 text-center">
        <div className="space-y-4">
          <BookOpen className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
          <h3 className="text-lg font-medium text-muted-foreground">Guides Coming Soon</h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Comprehensive guides and tutorials will be available here once content is added to the system.
          </p>
        </div>
      </Card>
    </div>
  )
}