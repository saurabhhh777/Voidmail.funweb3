import { Button } from '@/components/ui/button'
import { Mail } from 'lucide-react'

export default function Hero() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
            <Mail className="h-6 w-6 text-purple-600" />
          </div>
          <h1 className="text-5xl font-bold">VoidMail</h1>
        </div>
        <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
          Web3 Native Disposable Email Service – Generate instant temporary emails or create premium custom addresses with NFT ownership.
        </p>
        <div className="flex justify-center gap-4">
          <Button variant="default" className="bg-purple-600 hover:bg-purple-700">Get Free Email</Button>
          <Button variant="outline">Go Premium</Button>
        </div>
      </div>
    </section>
  )
} 