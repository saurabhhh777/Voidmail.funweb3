import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'VoidMail.fun - Web3 Email Platform',
  description: 'Secure, disposable email addresses with NFT ownership. Protect your privacy while maintaining control.',
  keywords: ['email', 'disposable', 'privacy', 'web3', 'nft', 'solana'],
  authors: [{ name: 'VoidMail Team' }],
  creator: 'VoidMail',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://voidmail.fun',
    title: 'VoidMail.fun - Web3 Email Platform',
    description: 'Secure, disposable email addresses with NFT ownership',
    siteName: 'VoidMail.fun',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VoidMail.fun - Web3 Email Platform',
    description: 'Secure, disposable email addresses with NFT ownership',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        <div className="min-h-screen bg-background text-white transition-colors duration-200">
          <Navbar />
          <main className="pt-16">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
} 