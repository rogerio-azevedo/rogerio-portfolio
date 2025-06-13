import { projects } from '@/data'
import { PinContainer } from '../../../components/ui/Pin'
import { FaLocationArrow } from 'react-icons/fa'
import Image from 'next/image'

export const RecentProjects = () => {
  return (
    <div className="relative z-10 py-10 md:py-20" id="projects">
      <h1 className="text-center text-4xl font-bold md:text-5xl">
        A small selection of{' '}
        <span className="text-purple-300">recent projects</span>
      </h1>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-24 gap-y-2 p-2 md:gap-y-16 md:p-4 lg:mt-12 lg:gap-y-40">
        {projects.map(item => (
          <div
            className="flex h-[32rem] w-[80vw] items-center justify-center sm:h-[41rem] sm:w-[570px] lg:min-h-[32.5rem]"
            key={item.id}>
            <PinContainer
              title={item.link}
              href={`https://${item.link}`}
              className="target-blank">
              <div className="relative mb-8 flex h-[30vh] w-[80vw] items-center justify-center overflow-hidden sm:h-[40vh] sm:w-[570px]">
                <div className="relative h-full w-full overflow-hidden bg-[#13162D] lg:rounded-3xl">
                  <Image
                    src="/bg.png"
                    alt="bgimg"
                    width={570}
                    height={400}
                    className="h-full w-full object-cover"
                  />
                </div>
                <Image
                  src={item.img}
                  alt="cover"
                  width={570}
                  height={400}
                  className="absolute bottom-0 left-1/2 z-10 -translate-x-1/2 rotate-3 object-contain"
                />
              </div>

              <h1 className="line-clamp-1 text-base font-bold md:text-xl lg:text-2xl">
                {item.title}
              </h1>

              <p
                className="line-clamp-3 text-sm font-light lg:text-xl lg:font-normal"
                style={{
                  color: '#BEC1DD',
                  margin: '1vh 0',
                }}>
                {item.des}
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
        ))}
      </div>
    </div>
  )
}
