import { Dictionary } from '@/types/dictionary'
import { Section } from '@/components/Section'
import { Button } from '@/components/ui/MovingBorder'
import { softSkillItems } from '@/data/soft-skills'
import Image from 'next/image'

interface SoftSkillsProps {
  dict: Dictionary
}

export const SoftSkills = ({ dict }: SoftSkillsProps) => {
  return (
    <Section
      id="soft-skills"
      className="relative z-10 w-full bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900">
      <h1 className="text-center text-4xl font-bold text-white md:text-5xl">
        {dict.softSkills.title}{' '}
        <span className="bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent">
          {dict.softSkills.subtitle}
        </span>
      </h1>

      <div className="mt-12 grid w-full grid-cols-1 gap-10 lg:grid-cols-4">
        {softSkillItems.map((item, index) => {
          const skillData = dict.softSkills.skills[item.key]
          // Duração predefinida baseada no índice para evitar problemas de hidratação
          const duration = 10000 + index * 1500 + (index % 3) * 800
          return (
            <Button
              key={item.key}
              duration={duration}
              borderRadius="1.75rem"
              style={{
                width: '100%',
                background: 'rgb(4,7,29)',
                backgroundColor:
                  'linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)',
                borderRadius: `calc(1.75rem* 0.96)`,
              }}
              className="w-full border-slate-800 text-white">
              <div className="flex w-full flex-col gap-2 p-4 py-6 lg:flex-row lg:items-center lg:p-6 xl:p-10">
                <Image
                  src={item.thumbnail}
                  alt={skillData.title}
                  width={160}
                  height={160}
                  className="h-20 w-20 lg:h-28 lg:w-28 xl:h-40 xl:w-40"
                />
                <div className="lg:ms-3 xl:ms-5">
                  <h1 className="text-start text-xl font-bold text-white md:text-2xl xl:text-3xl">
                    {skillData.title}
                  </h1>
                  <p className="text-white-100 mt-3 flex w-full flex-1 text-start text-lg font-normal text-white">
                    {skillData.description}
                  </p>
                </div>
              </div>
            </Button>
          )
        })}
      </div>
    </Section>
  )
}
