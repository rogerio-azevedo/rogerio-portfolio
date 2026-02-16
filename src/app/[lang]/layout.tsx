import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { Locale } from './dictionaries'
import ClientLayout from '@/components/ClientLayout'
import Script from 'next/script'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export async function generateStaticParams() {
  return [{ lang: 'pt' }, { lang: 'en' }, { lang: 'es' }]
}

// Metadata dinâmica baseada no idioma
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>
}): Promise<Metadata> {
  const { lang } = await params

  const metadata = {
    pt: {
      title: 'Rogério - Engenheiro de Software Sênior',
      description:
        'Portfólio do Rogério, engenheiro de software sênior especializado em sistemas escaláveis, frontend moderno, backend robusto e soluções em nuvem.',
      ogTitle: 'Rogério - Engenheiro de Software Sênior',
      ogDescription:
        'Portfólio do Rogério, engenheiro de software sênior especializado em sistemas escaláveis, frontend moderno, backend robusto e soluções em nuvem.',
      locale: 'pt_BR',
    },
    en: {
      title: 'Rogério - Senior Software Engineer',
      description:
        'Portfolio of Rogério, a senior software engineer specialized in scalable systems, modern frontend, robust backend, and cloud solutions.',
      ogTitle: 'Rogério - Senior Software Engineer',
      ogDescription:
        'Portfolio of Rogério, a senior software engineer specialized in scalable systems, modern frontend, robust backend, and cloud solutions.',
      locale: 'en_US',
    },
    es: {
      title: 'Rogério - Ingeniero de Software Senior',
      description:
        'Portafolio de Rogério, ingeniero de software senior especializado en sistemas escalables, frontend moderno, backend robusto y soluciones en la nube.',
      ogTitle: 'Rogério - Ingeniero de Software Senior',
      ogDescription:
        'Portafolio de Rogério, ingeniero de software senior especializado en sistemas escalables, frontend moderno, backend robusto y soluciones en la nube.',
      locale: 'es_ES',
    },
  }

  const currentMetadata = metadata[lang] || metadata.en

  return {
    title: {
      default: currentMetadata.title,
      template: `%s | ${currentMetadata.title}`,
    },
    description: currentMetadata.description,
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
      canonical: `https://azevedo.dev.br/${lang}`,
      languages: {
        'pt-BR': 'https://azevedo.dev.br/pt',
        'en-US': 'https://azevedo.dev.br/en',
        'es-ES': 'https://azevedo.dev.br/es',
      },
    },
    openGraph: {
      title: currentMetadata.ogTitle,
      description: currentMetadata.ogDescription,
      url: `https://azevedo.dev.br/${lang}`,
      siteName: 'Rogério Portfolio',
      images: [
        {
          url: `/api/og?lang=${lang}`,
          width: 1200,
          height: 630,
          alt: currentMetadata.title,
        },
      ],
      locale: currentMetadata.locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: currentMetadata.ogTitle,
      description: currentMetadata.ogDescription,
      images: [`/api/og?lang=${lang}`],
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
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
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
        <ClientLayout currentLang={lang}>{children}</ClientLayout>
      </body>
    </html>
  )
}
