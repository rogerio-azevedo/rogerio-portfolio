// Import das imagens das redes sociais
import githubIcon from '@assets/images/social/git.svg'
import linkedinIcon from '@assets/images/social/link.svg'
import instagramIcon from '@assets/images/social/insta.svg'
// import whatsappIcon from '@assets/images/social/wha.svg'
// import twitterIcon from '@assets/images/social/twit.svg'

export interface SocialMediaItem {
  id: number
  label: string
  img: string
  link: string
}

export const socialMediaItems: SocialMediaItem[] = [
  {
    id: 1,
    label: 'GitHub',
    img: githubIcon,
    link: 'https://github.com/rogerio-azevedo',
  },
  {
    id: 2,
    label: 'LinkedIn',
    img: linkedinIcon,
    link: 'https://www.linkedin.com/in/rogerio-fazevedo',
  },
  {
    id: 3,
    label: 'Instagram',
    img: instagramIcon,
    link: 'https://www.instagram.com/rogerazevedo',
  },
  // Comentados por enquanto - descomente se quiser usar
  // {
  //   id: 4,
  //   label: 'WhatsApp',
  //   img: whatsappIcon,
  //   link: 'https://wa.me/5565',
  // },
  // {
  //   id: 5,
  //   label: 'Twitter',
  //   img: twitterIcon,
  //   link: 'https://twitter.com/seu-usuario',
  // },
]
