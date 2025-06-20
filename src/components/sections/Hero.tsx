import { interpolate } from '@/lib/interpolate'
import { Dictionary } from '@/types/dictionary'

interface HeroProps {
  dict: Dictionary
}

export default function Hero({ dict }: HeroProps) {
  const heroData = dict.hero

  return (
    <section className="relative flex min-h-screen items-center justify-center px-6 py-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <div className="animate-fade-in">
          <h1 className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-5xl font-bold text-gray-900 text-transparent md:text-7xl">
            {heroData.title}
          </h1>

          <h2 className="mb-8 text-xl font-light text-gray-600 md:text-2xl">
            {heroData.subtitle}
          </h2>

          <p className="mx-auto mb-12 max-w-3xl text-lg leading-relaxed text-gray-700 md:text-xl">
            {interpolate(heroData.description, { years: '8' })}
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button className="transform rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              {heroData.cta_projects}
            </button>

            <button className="rounded-full border-2 border-gray-300 px-8 py-4 font-semibold text-gray-700 transition-all duration-300 hover:border-blue-500 hover:text-blue-600">
              {heroData.cta_contact}
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 transform animate-bounce">
          <div className="flex flex-col items-center text-gray-500">
            <span className="mb-2 text-sm">{heroData.scroll_down}</span>
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
