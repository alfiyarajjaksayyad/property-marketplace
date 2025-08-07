import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
// import { Toaster } from '@/components/ui/Toaster'
import { Toaster } from '../components/ui/Toaster';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PropertyHub - Find Your Perfect Home',
  description: 'Discover amazing properties for rent and sale. Connect directly with property owners.',
  keywords: 'property, real estate, rent, buy, apartment, house, condo',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  )
}