import { Card, CardContent } from '@/components/ui/card'
import { Shield, Crown, Zap } from 'lucide-react'

export default function Features() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="h-10 w-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center mx-auto mb-3">
                <Zap className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Instant Generation</h3>
              <p className="text-sm text-gray-600">Get a temporary email in seconds, no signup required</p>
            </CardContent>
          </Card>

          <Card className="rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="h-10 w-10 rounded-lg bg-yellow-100 text-yellow-600 flex items-center justify-center mx-auto mb-3">
                <Crown className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">NFT Ownership</h3>
              <p className="text-sm text-gray-600">Create custom emails with blockchain-verified ownership</p>
            </CardContent>
          </Card>

          <Card className="rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="h-10 w-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-3">
                <Shield className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Privacy First</h3>
              <p className="text-sm text-gray-600">Anonymous and secure, your privacy is protected</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
} 