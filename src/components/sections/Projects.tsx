import { PinContainer } from '@/components/ui/Pin'
import { FaLocationArrow } from 'react-icons/fa'
import Image from 'next/image'
import { Section } from '@/components/Section'
import { projectItems } from '@/data/projects'
import { Dictionary } from '@/types/dictionary'
interface ProjectsProps {
  dict: Dictionary
}
export const Projects: React.FC<ProjectsProps> = ({ dict }) => {
  const projectsData = dict.projects
  return (
    <Section
      className="relative z-10 w-full bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900"
      id="projects">
      <h1 className="text-center text-4xl font-bold text-white md:text-5xl">
        A small selection of{' '}
        <span className="text-emerald-400">recent projects</span>
      </h1>
      <div className="mb-20 flex flex-wrap items-center justify-center gap-x-24 md:mt-8 md:gap-y-10 lg:mt-20 lg:gap-y-40">
        {projectItems.map(item => {
          const projectData = projectsData.projects[item.key]

          if (!projectData) return null

          return (
            <div
              className="flex h-[32rem] w-[80vw] items-center justify-center md:h-[41rem] md:w-[570px] lg:min-h-[32.5rem]"
              key={item.id}>
              <PinContainer
                title={item.link}
                href={`https://${item.link}`}
                className="target-blank">
                <div className="relative mb-8 flex h-[30vh] w-[80vw] items-center justify-center overflow-hidden sm:h-[40vh] sm:w-[570px]">
                  <div className="relative h-full w-full overflow-hidden bg-[#00110f] lg:rounded-3xl"></div>
                  <Image
                    src={item.img}
                    alt={projectData.title}
                    width={570}
                    height={400}
                    className="absolute bottom-0 left-1/2 z-10 -translate-x-1/2 rotate-3 object-contain"
                  />
                </div>

                <h1 className="line-clamp-1 text-base font-bold text-white md:text-xl lg:text-2xl">
                  {projectData.title}
                </h1>

                <p
                  className="line-clamp-3 text-sm font-light lg:text-xl lg:font-normal"
                  style={{
                    color: '#BEC1DD',
                    margin: '1vh 0',
                  }}>
                  {projectData.description}
                </p>

                <div className="mt-5 mb-2 flex items-center justify-between">
                  <div className="flex items-center">
                    {item.iconLists.map((icon, index) => (
                      <div
                        key={index}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[.2] bg-black lg:h-10 lg:w-10"
                        style={{
                          transform: `translateX(-${5 * index + 2}px)`,
                        }}>
                        <Image
                          src={icon}
                          alt="icon5"
                          width={32}
                          height={32}
                          className="p-2"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-center">
                    <p className="text-purple flex text-sm md:text-xs lg:text-xl">
                      Live Site
                    </p>
                    <FaLocationArrow className="ms-3" color="#CBACF9" />
                  </div>
                </div>
              </PinContainer>
            </div>
          )
        })}
      </div>
    </Section>
  )
}
