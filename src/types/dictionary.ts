// Tipos centralizados para dicionários de tradução

export interface HeroDictionary {
  title: string
  subtitle: string
  description: string
  cta_projects: string
  cta_contact: string
  scroll_down: string
}

export interface AboutDictionary {
  title: string
  description: string
  experience_years: string
  projects_completed: string
  technologies_mastered: string
}

export interface NavigationDictionary {
  home: string
  about: string
  projects: string
  contact: string
}

export interface CommonDictionary {
  loading: string
  error: string
  success: string
  welcome: string
}

export interface AIAssistantDictionary {
  welcome_message: string
  speech_bubble: {
    line1: string
    line2: string
    line3: string
  }
  error_message: string
  input_placeholder: string
  header_title: string
  header_subtitle: string
}

export interface SkillsDictionary {
  title: string
  frontend: string
  backend: string
  tools: string
  databases: string
}

// Tipo principal do dicionário completo
export interface Dictionary {
  common: CommonDictionary
  navigation: NavigationDictionary
  hero: HeroDictionary
  about: AboutDictionary
  skills: SkillsDictionary
  ai_assistant: AIAssistantDictionary
}
