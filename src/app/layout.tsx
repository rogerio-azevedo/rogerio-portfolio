import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from './providers/ThemeProvider'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'Rogério - Senior Software Engineer Portfolio',
    template: '%s | Rogério Portfolio',
  },
  description:
    'Portfolio of Rogério, a senior software engineer specialized in scalable systems, modern frontend, robust backend, and cloud solutions.',
  keywords: [
    'Rogério',
    'Portfolio',
    'Software Engineer',
    'Senior Developer',
    'Next.js',
    'React',
    'Node.js',
    'TypeScript',
    'Tailwind CSS',
    'AWS',
    'Fullstack',
    'Projects',
  ],
  authors: [{ name: 'Rogério', url: 'https://yourdomain.com' }],
  creator: 'Rogério',
  publisher: 'Rogério',
  metadataBase: new URL('https://yourdomain.com'),
  alternates: {
    canonical: 'https://yourdomain.com',
  },
  openGraph: {
    title: 'Rogério - Senior Software Engineer Portfolio',
    description:
      'Portfolio of Rogério, a senior software engineer specialized in scalable systems, modern frontend, robust backend, and cloud solutions.',
    url: 'https://yourdomain.com',
    siteName: 'Rogério Portfolio',
    images: [
      {
        url: '/og-image.png', // coloque uma imagem em /app/og-image.png ou /public/og-image.png
        width: 1200,
        height: 630,
        alt: 'Rogério - Senior Software Engineer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rogério - Senior Software Engineer Portfolio',
    description:
      'Portfolio of Rogério, a senior software engineer specialized in scalable systems, modern frontend, robust backend, and cloud solutions.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  category: 'technology',
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
