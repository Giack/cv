// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Giacomo Sortino — Director of Engineering',
  description:
    'Engineering Director with 15+ years of experience in SaaS and platform teams. Specializing in AI transformation, platform leadership, and scaling engineering organizations.',
  openGraph: {
    title: 'Giacomo Sortino — Director of Engineering',
    description: 'Engineering Director specializing in AI transformation and platform leadership',
    type: 'profile',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  )
}
