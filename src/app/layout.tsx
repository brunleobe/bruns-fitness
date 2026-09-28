import type { Metadata } from 'next'
import { Inter, JetBrains_Mono, Oswald } from 'next/font/google'
import './globals.css'

// Type system — see globals.css:
//   Oswald         → headings, buttons, big numbers (font-display)
//   Inter          → body text (default, font-sans)
//   JetBrains Mono → labels, dates, times, badges (font-mono)
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
})

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-oswald',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  title: 'Bruns Fitness — Where Limits Break',
  description:
    'Elite training, world-class coaches, and a community that holds you accountable. Join Bruns Fitness today.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased bg-black text-white">{children}</body>
    </html>
  )
}
