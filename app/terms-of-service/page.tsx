import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, AlertTriangle, Users, Shield, Gavel, Info } from 'lucide-react'

export const metadata = {
  title: 'Terms of Service | Garden Recipes',
  description: 'Terms of Service for Garden Recipes - Read our terms and conditions for using our service.'
}

export default function TermsOfServicePage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <FileText className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold tracking-tight">Terms of Service</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Please read these terms and conditions carefully before using Garden Recipes.
        </p>
        <p className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-green-500" />
              Acceptance of Terms
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              By accessing and using Garden Recipes, you accept and agree to be bound by the terms and 
              provision of this agreement. If you do not agree to abide by these terms, please do not use this service.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5 text-blue-500" />
              Description of Service
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">What Garden Recipes Provides</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Recipe and ingredient information for the "Grow a Garden" game</li>
                <li>• Search and filtering tools for recipes and ingredients</li>
                <li>• Craving-based recipe recommendations</li>
                <li>• Educational content about cooking and gardening</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Service Availability</h3>
              <p className="text-sm text-muted-foreground">
                This service is provided "as-is" and we make no guarantees about uptime, accuracy, or availability.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-purple-500" />
              Acceptable Use
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <h3 className="font-semibold mb-2">You agree NOT to:</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Use the service for any unlawful purpose or illegal activity</li>
              <li>• Attempt to gain unauthorized access to our systems</li>
              <li>• Distribute malware or engage in any harmful activities</li>
              <li>• Copy, reproduce, or redistribute our content without permission</li>
              <li>• Use automated tools to scrape or harvest data excessively</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gavel className="h-5 w-5 text-orange-500" />
              Intellectual Property
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Content Ownership</h3>
              <p className="text-sm text-muted-foreground">
                The recipes, ingredient data, and game information are based on publicly available 
                "Grow a Garden" game content. Our website design, code, and original content are protected by copyright.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Fair Use</h3>
              <p className="text-sm text-muted-foreground">
                This service is created for educational and entertainment purposes under fair use principles.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Disclaimers and Limitations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">No Warranties</h3>
              <p className="text-sm text-muted-foreground">
                Garden Recipes is provided "as-is" without any warranties, express or implied. 
                We do not guarantee the accuracy, completeness, or usefulness of any information.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Limitation of Liability</h3>
              <p className="text-sm text-muted-foreground">
                In no event shall Garden Recipes be liable for any indirect, incidental, special, 
                consequential, or punitive damages arising from your use of the service.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-gray-500" />
              Changes to Terms
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              We reserve the right to modify these terms at any time. Changes will be effective immediately 
              upon posting. Your continued use of the service after changes constitutes acceptance of the new terms.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-2">Contact Information</h3>
            <p className="text-sm text-muted-foreground">
              If you have any questions about these Terms of Service, please contact us through our 
              GitHub repository or support channels.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}