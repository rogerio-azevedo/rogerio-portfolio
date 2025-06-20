import { interpolate } from '@/lib/interpolate'
import { Dictionary } from '@/types/dictionary'

interface AboutProps {
  dict: Dictionary
}

export default function About({ dict }: AboutProps) {
  const aboutData = dict.about
  const skillsData = dict.skills

  const stats = [
    { key: 'experience_years', count: 8 },
    { key: 'projects_completed', count: 50 },
    { key: 'technologies_mastered', count: 25 },
  ]

  const skills = {
    [skillsData.frontend]: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    [skillsData.backend]: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB'],
    [skillsData.tools]: ['Git', 'Docker', 'AWS', 'Vercel'],
    [skillsData.databases]: ['PostgreSQL', 'MongoDB', 'Redis', 'Supabase'],
  }

  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
            {aboutData.title}
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            {aboutData.description}
          </p>
        </div>

        {/* Stats */}
        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {stats.map(({ key, count }) => (
            <div
              key={key}
              className="rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-purple-50 p-6 text-center">
              <div className="mb-2 text-4xl font-bold text-blue-600">
                {count}+
              </div>
              <div className="font-medium text-gray-700">
                {interpolate(aboutData[key as keyof typeof aboutData], {
                  count,
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div className="mb-16">
          <h3 className="mb-12 text-center text-3xl font-bold text-gray-900">
            {skillsData.title}
          </h3>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {Object.entries(skills).map(([category, items]) => (
              <div
                key={category}
                className="rounded-xl border border-gray-200 bg-gray-50 p-6">
                <h4 className="mb-4 text-center font-bold text-gray-900">
                  {category}
                </h4>
                <div className="space-y-2">
                  {items.map((skill, index) => (
                    <div
                      key={skill}
                      className="rounded-lg border border-gray-100 bg-white px-3 py-2 text-center text-gray-700 transition-colors hover:border-blue-200">
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
