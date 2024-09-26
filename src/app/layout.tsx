import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import { Providers } from "./providers"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bagel Knowledge Hub',
  description: 'Share and discover bagel wisdom',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-[#E35A2F] p-4">
          <div className="max-w-7xl mx-auto flex justify-between">
            <Link href="/" className="text-white text-xl font-bold">Bagel Home</Link>
            <Link href="/knowledge-hub" className="text-white text-xl font-bold">Knowledge Hub</Link>
          </div>
        </nav>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}