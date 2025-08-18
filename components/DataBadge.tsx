import { Badge } from '@/components/ui/badge'
import { getLatestVersion } from '@/lib/data'
import { Database, AlertCircle } from 'lucide-react'

export function DataBadge() {
  const version = getLatestVersion()
  
  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      <Database className="h-3 w-3" />
      {version ? (
        <Badge variant="outline" className="text-xs">
          v{version.version}
        </Badge>
      ) : (
        <div className="flex items-center gap-1">
          <AlertCircle className="h-3 w-3 text-amber-500" />
          <span>No data loaded</span>
        </div>
      )}
    </div>
  )
}