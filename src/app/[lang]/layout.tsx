import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { Locale } from './dictionaries'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import AIAgent from '@/components/AIAgent'
import Script from 'next/script'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export async function generateStaticParams() {
  return [{ lang: 'pt' }, { lang: 'en' }, { lang: 'es' }]
}

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
  authors: [{ name: 'Rogério', url: 'https://azevedo.dev.br' }],
  creator: 'Rogério',
  publisher: 'Rogério',
  metadataBase: new URL('https://azevedo.dev.br'),
  alternates: {
    canonical: 'https://azevedo.dev.br',
  },
  openGraph: {
    title: 'Rogério - Senior Software Engineer Portfolio',
    description:
      'Portfolio of Rogério, a senior software engineer specialized in scalable systems, modern frontend, robust backend, and cloud solutions.',
    url: 'https://azevedo.dev.br',
    siteName: 'Rogério Portfolio',
    images: [
      {
        url: '/og-image.png',
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
    // apple: '/apple-touch-icon.png',
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

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ lang: Locale }>
}>) {
  const { lang } = await params

  return (
    <html lang={lang}>
      <head>
        <Script
          src="https://cdn.amplitude.com/libs/analytics-browser-2.11.1-min.js.gz"
          strategy="beforeInteractive"
        />
        <Script
          src="https://cdn.amplitude.com/libs/plugin-session-replay-browser-1.8.0-min.js.gz"
          strategy="beforeInteractive"
        />
        <Script id="amplitude-init" strategy="beforeInteractive">
          {`
            window.amplitude.add(window.sessionReplay.plugin({sampleRate: 1}));
            window.amplitude.init('${process.env.AMPLITUDE_API_KEY}', {
              "autocapture": {
                "elementInteractions": true
              }
            });
          `}
        </Script>
        <meta property="fb:app_id" content={process.env.FB_APP_ID} />
      </head>

      <body className={`${inter.variable} font-sans antialiased`}>
        <LanguageSwitcher currentLang={lang} />
        {children}
        <AIAgent />
      </body>
    </html>
  )
}
