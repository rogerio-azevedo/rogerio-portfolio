import { FloatingNav } from '@/components/ui/FloatingNav'

import {
  AboutMe,
  Footer,
  Hero,
  RecentProjects,
  SoftSkills,
  Testimonials,
  TechStack,
} from '@/app/sections'

import { navItems } from '@/data'

export default function Home() {
  return (
    <main className="bg-black-100 relative mx-auto flex flex-col items-center justify-center overflow-hidden px-5 sm:px-10">
      <div className="w-full max-w-7xl">
        <FloatingNav navItems={navItems} />
        <Hero />
        <TechStack />
        <SoftSkills />
        <AboutMe />
        <RecentProjects />
        <Testimonials />
        <Footer />
      </div>
    </main>
  )
}
