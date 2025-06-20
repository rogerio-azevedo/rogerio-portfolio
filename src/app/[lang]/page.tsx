import { getDictionary, Locale } from './dictionaries'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'

interface PageProps {
  params: Promise<{ lang: Locale }>
}

export default async function HomePage({ params }: PageProps) {
  const { lang } = await params
  const dict = await getDictionary(lang)

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Hero dict={dict} />
      <About dict={dict} />
    </main>
  )
}
