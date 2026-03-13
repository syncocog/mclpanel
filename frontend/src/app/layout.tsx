import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MCLEGENDS.GG - Game Server Management',
  description: 'Next-generation game server management panel',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-dark-900 text-white`}>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  )
}
