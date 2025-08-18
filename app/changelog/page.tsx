import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { DB } from '@/lib/data'
import { History, Calendar, FileText } from 'lucide-react'

export default function ChangelogPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Changelog</h1>
        <p className="text-lg text-muted-foreground">
          Track data updates, new recipes, and system improvements.
        </p>
      </div>

      {DB.versions.length > 0 ? (
        <div className="space-y-6">
          {DB.versions.slice().reverse().map((version, index) => (
            <Card key={version.version}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <History className="h-5 w-5" />
                    Version {version.version}
                  </CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {new Date(version.date).toLocaleDateString()}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {version.notes.map((note, noteIndex) => (
                    <li key={noteIndex} className="flex items-start gap-2 text-sm">
                      <span className="text-muted-foreground mt-1">•</span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-8 text-center">
          <div className="space-y-4">
            <FileText className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
            <h3 className="text-lg font-medium text-muted-foreground">No Version History</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Version history and changelog entries will appear here as data updates are made.
            </p>
          </div>
        </Card>
      )}

      {/* Data Sources */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Data Sources & Validation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="outline">Data Validation</Badge>
            <span className="text-sm text-muted-foreground">
              All recipes and ingredients are cross-referenced for consistency
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">Community Verified</Badge>
            <span className="text-sm text-muted-foreground">
              Recipe accuracy confirmed by community testing
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">Regular Updates</Badge>
            <span className="text-sm text-muted-foreground">
              New content added as the game evolves
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}