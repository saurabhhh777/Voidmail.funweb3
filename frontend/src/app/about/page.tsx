import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Zap, Globe, Lock } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-[#10B981] to-[#3B82F6] bg-clip-text text-transparent">
            About VoidMail.fun
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We&apos;re revolutionizing email privacy by combining disposable email technology with Web3 innovation. 
            Your privacy is our priority.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-surface/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              To provide secure, private, and verifiable email addresses that give users complete control over their digital identity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-[#10B981]/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-[#10B981]" />
                </div>
                <CardTitle className="text-lg">Privacy First</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Your emails are never stored or tracked. Complete anonymity guaranteed.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-[#10B981]/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6 text-[#10B981]" />
                </div>
                <CardTitle className="text-lg">Instant Setup</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Get your disposable email address in seconds. No registration required.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-[#10B981]/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-6 w-6 text-[#10B981]" />
                </div>
                <CardTitle className="text-lg">Global Access</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Access from anywhere in the world. No geo-restrictions or limitations.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-[#10B981]/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Lock className="h-6 w-6 text-[#10B981]" />
                </div>
                <CardTitle className="text-lg">Web3 Security</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Built on Solana blockchain with NFT ownership verification.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Our Story</CardTitle>
              <CardDescription>
                How VoidMail.fun came to be
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                In an era where privacy is increasingly compromised, we recognized the need for a truly private email solution. 
                Traditional email providers track, store, and analyze user data, creating privacy concerns for millions of people.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                VoidMail.fun was born from the idea that email privacy shouldn&apos;t be a luxury. We combined the convenience of 
                disposable email addresses with the security and verifiability of blockchain technology, creating a unique 
                solution that puts users in complete control of their digital identity.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, we serve users worldwide who value their privacy and want to maintain control over their online presence. 
                Our platform continues to evolve, incorporating the latest Web3 technologies to provide even more secure and 
                private communication options.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-surface/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">The Team</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            We&apos;re a team of privacy advocates, blockchain developers, and security experts 
            dedicated to protecting your digital rights.
          </p>
          
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-6">
              <p className="text-muted-foreground">
                Our team combines decades of experience in cybersecurity, blockchain development, and user experience design. 
                We&apos;re committed to building tools that protect privacy while maintaining the highest standards of usability and security.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
} 