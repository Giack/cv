// app/layout.tsx
import type { Metadata } from "next"
import { Inter, Syne } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["700", "800"],
  display: "swap",
})

export const metadata: Metadata = {
  title:
    "Giacomo Sortino — Director of Engineering | AI Transformation · SaaS · Platform Leadership",
  description:
    "Engineering Director with 15+ years building SaaS platforms and scaling engineering organizations. Specializing in AI transformation, platform leadership, and high-performing teams.",
  alternates: {
    canonical: "https://giack.github.io/cv",
  },
  openGraph: {
    title:
      "Giacomo Sortino — Director of Engineering | AI Transformation · SaaS · Platform Leadership",
    description:
      "Engineering Director with 15+ years building SaaS platforms and scaling engineering organizations. Specializing in AI transformation, platform leadership, and high-performing teams.",
    type: "profile",
    url: "https://giack.github.io/cv",
    siteName: "Giacomo Sortino — CV",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Giacomo Sortino — Director of Engineering",
    description:
      "Engineering Director specializing in AI transformation, platform leadership, and high-performing teams.",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Giacomo Sortino",
  jobTitle: "Director of Engineering",
  url: "https://giack.github.io/cv",
  sameAs: ["https://www.linkedin.com/in/sortino---giacomo/"],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`}>
      <head>
        {/* JSON-LD structured data — React 18 serializes script children as-is in server rendering */}
        <script id="json-ld-schema" type="application/ld+json" suppressHydrationWarning>
          {JSON.stringify(jsonLd)}
        </script>
      </head>
      <body>{children}</body>
    </html>
  )
}
