import porterLogo from '@assets/images/companies/porter.png'
import meuiotLogo from '@assets/images/companies/meuiot.png'
import escovatoLogo from '@assets/images/companies/escovato.svg'
import { StaticImageData } from 'next/image'

export interface TestimonialItem {
  key: string
  featured?: boolean
}

export const testimonialItems: TestimonialItem[] = [
  {
    key: 'fabio_beal',
    featured: true,
  },
  {
    key: 'davi_beber',
  },
  {
    key: 'avelino_barbosa',
  },
]

export interface CompanyItem {
  id: number
  name: string
  img: StaticImageData | string
  nameImg: string
  type: 'horizontal' | 'square' | 'vertical'
  link: string
}

export const companies: CompanyItem[] = [
  {
    id: 1,
    name: 'porter',
    img: porterLogo,
    nameImg: 'Porter',
    type: 'horizontal',
    link: 'porter.com.br',
  },
  {
    id: 2,
    name: 'meuIOT',
    img: meuiotLogo,
    nameImg: 'Meu IoT',
    type: 'square',
    link: 'meuiot.com.br',
  },
  {
    id: 4,
    name: 'Escovato',
    img: escovatoLogo,
    nameImg: 'Escovato',
    type: 'vertical',
    link: 'escovato.com.br',
  },
]

export const handleImageSize = (type: string) => {
  if (type === 'square') {
    return 'h-16 w-16 md:h-24 md:w-24'
  }
  if (type === 'horizontal') {
    return 'h-12 w-24 md:h-20 md:w-36'
  }
  return 'h-20 w-20 md:h-30 md:w-30'
}
