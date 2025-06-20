import porterLogo from '@assets/images/companies/porter.png'
import meuiotLogo from '@assets/images/companies/meuiot.png'
import escovatoLogo from '@assets/images/companies/escovato.svg'

import fabioPhoto from '@assets/images/testimonials/fabio.jpg'
import daviPhoto from '@assets/images/testimonials/davi.jpeg'
import avelinoPhoto from '@assets/images/testimonials/avelino.png'
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

// New modern testimonial interface
export interface ModernTestimonial {
  name: string
  role: string
  company: string
  testimonial: string
  initials: string
  companyLogo: StaticImageData
  companyType: 'horizontal' | 'square' | 'vertical'
  photo: StaticImageData
}

export const testimonials: ModernTestimonial[] = [
  {
    name: 'Fabio Beal',
    role: 'CEO at Porter Group',
    company: 'Porter',
    initials: 'FB',
    photo: fabioPhoto,
    companyLogo: porterLogo,
    companyType: 'horizontal',
    testimonial:
      'Rogerio desempenhou um papel fundamental na transformação do PorterGroup em uma empresa verdadeiramente orientada por dados. Ele liderou o desenvolvimento do Analytics, nossa plataforma interna de BI, que se tornou uma ferramenta estratégica em toda a organização.',
  },
  {
    name: 'Davi Beber',
    role: 'Fundador at Jardim Home Senior',
    company: 'MeuIoT',
    initials: 'DB',
    photo: daviPhoto,
    companyLogo: meuiotLogo,
    companyType: 'square',
    testimonial:
      'A implementação do Meu IoT trouxe um novo nível de organização e controle para nossas operações diárias no Jardim Home Senior. Uma das mudanças mais impactantes foi no gerenciamento dos nossos armários de medicamentos.',
  },
  {
    name: 'Avelino Barbosa',
    role: 'Co-Fundador at Escovato',
    company: 'Escovato',
    initials: 'AB',
    companyLogo: escovatoLogo,
    companyType: 'vertical',
    photo: avelinoPhoto,
    testimonial:
      'Contratamos o Rogerio para projetar e desenvolver o site oficial do Escovato, e os resultados superaram nossas expectativas. Desde o início, ele demonstrou uma clara compreensão da nossa marca.',
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
