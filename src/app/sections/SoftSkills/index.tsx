import { workExperience } from '@/data'
import { Button } from '../../../components/ui/MovingBorder'
import Image from 'next/image'

export const SoftSkills = () => {
  return (
    <div className="relative z-10 w-full py-10 md:py-20">
      <h1 className="text-center text-4xl font-bold text-white md:text-5xl">
        Beyond the <span className="text-purple-300">Code</span>
      </h1>

      <div className="mt-12 grid w-full grid-cols-1 gap-10 lg:grid-cols-4">
        {workExperience.map(card => (
          <Button
            key={card.id}
            duration={Math.floor(Math.random() * 10000) + 10000}
            borderRadius="1.75rem"
            style={{
              background: 'rgb(4,7,29)',
              backgroundColor:
                'linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)',
              borderRadius: `calc(1.75rem* 0.96)`,
            }}
            className="flex-1 border-neutral-200 text-black dark:border-slate-800 dark:text-white">
            <div className="flex flex-col gap-2 p-3 py-6 md:p-5 lg:flex-row lg:items-center lg:p-10">
              <Image
                src={card.thumbnail}
                alt={card.thumbnail}
                width={160}
                height={160}
                className="h-20 w-20 lg:h-40 lg:w-40"
              />
              <div className="lg:ms-5">
                <h1 className="text-start text-xl font-bold text-white md:text-3xl">
                  {card.title}
                </h1>
                <p className="text-white-100 mt-3 text-start text-lg font-normal text-white">
                  {card.desc}
                </p>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  )
}
