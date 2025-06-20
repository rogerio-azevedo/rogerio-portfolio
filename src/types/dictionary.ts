// Tipos centralizados para dicionários de tradução

export interface HeroDictionary {
  title: string
  animated_title: string
  subtitle: string
  description: string
  cta_projects: string
  cta_contact: string
  scroll_down: string
}

export interface AboutDictionary {
  title: string
  subtitle: string
  greeting: string
  name: string
  role: string
  description_1: string
  description_2: string
  values_intro: string
  values: string
}

export interface NavigationDictionary {
  home: string
  about: string
  tech_stack: string
  soft_skills: string
  projects: string
  testimonials: string
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

export interface FooterDictionary {
  title: string
  title_highlight: string
  title_end: string
  description: string
  cta_button: string
  copyright: string
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
  techStack: {
    title: string
    categories: {
      frontend: string
      backend: string
      mobile: string
      language: string
      styling: string
      database: string
      api: string
      cloud: string
    }
    levels: {
      expert: string
      advanced: string
      intermediate: string
      beginner: string
    }
    technologies: {
      [key: string]: {
        name: string
        description: string
      }
    }
  }
  softSkills: {
    title: string
    subtitle: string
    skills: {
      [key: string]: {
        title: string
        description: string
      }
    }
  }
  testimonials: {
    title: string
    subtitle: string
    clients: {
      [key: string]: {
        quote: string
        name: string
        title: string
        company: string
      }
    }
    companies: {
      [key: string]: {
        name: string
      }
    }
  }
  projects: {
    title: string
    subtitle: string
    projects: {
      [key: string]: {
        title: string
        description: string
      }
    }
  }
  footer: FooterDictionary
  ai_assistant: AIAssistantDictionary
}
