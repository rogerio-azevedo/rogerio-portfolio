import { Dictionary } from '@/types/dictionary'

export interface NavItem {
  key: keyof Dictionary['navigation']
  link: string
  icon?: React.JSX.Element
}

// Dados da navegação com chaves que serão traduzidas
export const navigationItems: NavItem[] = [
  { key: 'about', link: '#about' },
  { key: 'tech_stack', link: '#tech-stack' },
  { key: 'soft_skills', link: '#soft-skills' },
  { key: 'projects', link: '#projects' },
  { key: 'testimonials', link: '#testimonials' },
]

// Função para gerar navItems traduzidos
export const getNavItems = (dict: Dictionary) => {
  return navigationItems.map(item => ({
    name: dict.navigation[item.key],
    link: item.link,
    icon: item.icon,
  }))
}
