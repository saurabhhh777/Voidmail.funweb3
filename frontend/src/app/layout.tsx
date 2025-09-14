import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { WalletProvider } from '@/components/WalletProvider'
import { Toaster } from 'react-hot-toast'

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
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <WalletProvider>
          <div className="min-h-screen bg-white text-gray-900 transition-colors duration-200">
            <Navbar />
            <main className="pt-16">
              {children}
            </main>
            <Footer />
            <Toaster 
              position="bottom-right"
              toastOptions={{
                style: {
                  background: '#ffffff',
                  color: '#111827',
                  border: '1px solid #e5e7eb',
                },
              }}
            />
          </div>
        </WalletProvider>
      </body>
    </html>
  )
} 