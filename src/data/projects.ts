// Import das imagens dos projetos
import analyticsImage from '@assets/images/projects/analytics.png'
import meuiotImage from '@assets/images/projects/meuiot.png'
import escovaltoImage from '@assets/images/projects/escovato.png'
// import sindicoproImage from '@assets/images/projects/sindicopro.png'

// Import dos ícones das tecnologias
import reactIcon from '@assets/images/tech/react.svg'
// import nextIcon from '@assets/images/tech/next.svg'
import typescriptIcon from '@assets/images/tech/typescript.svg'
import tailwindIcon from '@assets/images/tech/tailwind.svg'
import nodejsIcon from '@assets/images/tech/nodejs.svg'
import nestjsIcon from '@assets/images/tech/nestjs.svg'
import postgresqlIcon from '@assets/images/tech/postgresql.svg'
import mongoIcon from '@assets/images/tech/mongo.svg'
import graphqlIcon from '@assets/images/tech/graphql.svg'

import { StaticImageData } from 'next/image'

export interface ProjectItem {
  key: string
  id: number
  img: StaticImageData | string
  iconLists: (StaticImageData | string)[]
  link: string
}

export const projectItems: ProjectItem[] = [
  {
    key: 'porter_analytics',
    id: 1,
    img: analyticsImage,
    iconLists: [
      reactIcon,
      tailwindIcon,
      typescriptIcon,
      nodejsIcon,
      mongoIcon,
      postgresqlIcon,
    ],
    link: 'porter.com.br',
  },
  {
    key: 'meu_iot',
    id: 2,
    img: meuiotImage,
    iconLists: [
      reactIcon,
      tailwindIcon,
      typescriptIcon,
      nestjsIcon,
      graphqlIcon,
      postgresqlIcon,
      mongoIcon,
    ],
    link: 'meuiot.com.br',
  },
  {
    key: 'escovato',
    id: 4,
    img: escovaltoImage,
    iconLists: [reactIcon, tailwindIcon, typescriptIcon],
    link: 'escovato.com.br',
  },
  // Projeto comentado - descomente se quiser adicionar
  // {
  //   key: 'sindicopro',
  //   id: 3,
  //   img: sindicoproImage,
  //   iconLists: [
  //     reactIcon,
  //     nextIcon,
  //     tailwindIcon,
  //     typescriptIcon,
  //     nestjsIcon,
  //     graphqlIcon,
  //   ],
  //   link: 'sindicopro.adm.br',
  // },
]
