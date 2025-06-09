import { FloatingNav } from '@/components/ui/FloatingNav'

import {
  Experience,
  Footer,
  // Grid,
  Hero,
  RecentProjects,
  Testimonials,
  TechStack,
} from '@/components'

import { navItems } from '@/data'

export default function Home() {
  return (
    <main className="bg-black-100 relative mx-auto flex flex-col items-center justify-center overflow-hidden px-5 sm:px-10">
      <div className="w-full max-w-7xl">
        <FloatingNav navItems={navItems} />
        <Hero />
        {/* <Grid /> */}
        <TechStack />
        <RecentProjects />
        <Testimonials />
        <Experience />
        <Footer />
      </div>
    </main>
  )
}
