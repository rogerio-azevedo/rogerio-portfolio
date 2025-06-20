import { getDictionary, Locale } from './dictionaries'
import Hero from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { TechStack } from '@/components/sections/TechStack'
import { SoftSkills } from '@/components/sections/SoftSkills'
import { Testimonials } from '@/components/sections/Testimonials'
import { Projects } from '@/components/sections/Projects'
import { FloatingNav } from '@/components/FloatingNav'
import { getNavItems } from '@/data/navigation'

interface PageProps {
  params: Promise<{ lang: Locale }>
}

export default async function HomePage({ params }: PageProps) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const navItems = getNavItems(dict)

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <FloatingNav navItems={navItems} />
      <Hero dict={dict} />
      <TechStack dict={dict} />
      <SoftSkills dict={dict} />
      <About dict={dict} />
      <Projects dict={dict} />
      <Testimonials dict={dict} />
    </main>
  )
}
