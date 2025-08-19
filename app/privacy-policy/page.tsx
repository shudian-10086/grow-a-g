import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Lock, Eye, Database, UserCheck, Mail } from 'lucide-react'

export const metadata = {
  title: 'Privacy Policy | Garden Recipes',
  description: 'Privacy Policy for Garden Recipes - Learn how we protect your data and privacy.'
}

export default function PrivacyPolicyPage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Shield className="h-8 w-8 text-green-600" />
          <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Your privacy is important to us. This policy explains how Garden Recipes collects, uses, and protects your information.
        </p>
        <p className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-blue-500" />
              Information We Collect
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Usage Data</h3>
              <p className="text-sm text-muted-foreground">
                We may collect information about how you access and use our service, including your IP address, 
                browser type, pages visited, and time spent on our site.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Game Data</h3>
              <p className="text-sm text-muted-foreground">
                Garden Recipes is designed to help with the "Grow a Garden" game. We do not collect or store 
                any personal game data or account information.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-purple-500" />
              How We Use Your Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• To provide and maintain our service</li>
              <li>• To improve user experience and website functionality</li>
              <li>• To analyze usage patterns and optimize performance</li>
              <li>• To ensure the security and integrity of our service</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-green-500" />
              Data Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              We implement appropriate security measures to protect your information against unauthorized access, 
              alteration, disclosure, or destruction. However, no method of transmission over the internet or 
              electronic storage is 100% secure.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-orange-500" />
              Third-Party Services
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Our service may contain links to third-party websites or services. We are not responsible for 
              the privacy practices of these external sites. We encourage you to review their privacy policies.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-red-500" />
              Contact Us
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              If you have any questions about this Privacy Policy, please contact us through our website 
              or by visiting our GitHub repository for support.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-2">Important Notes</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• This service is provided as-is for educational and entertainment purposes</p>
              <p>• No personal or sensitive information is required to use Garden Recipes</p>
              <p>• All recipe and ingredient data is publicly available game information</p>
              <p>• We reserve the right to update this policy as needed</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}