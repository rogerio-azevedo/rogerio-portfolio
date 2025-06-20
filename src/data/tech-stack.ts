// Import das imagens
import reactIcon from '@assets/images/tech/react.svg'
import nextIcon from '@assets/images/tech/next.svg'
import typescriptIcon from '@assets/images/tech/typescript.svg'
import javascriptIcon from '@assets/images/tech/javascript.svg'
import tailwindIcon from '@assets/images/tech/tailwind.svg'
import nodejsIcon from '@assets/images/tech/nodejs.svg'
import nestjsIcon from '@assets/images/tech/nestjs.svg'
import postgresqlIcon from '@assets/images/tech/postgresql.svg'
import mongoIcon from '@assets/images/tech/mongo.svg'
import graphqlIcon from '@assets/images/tech/graphql.svg'
import awsIcon from '@assets/images/tech/aws.svg'
import csharpIcon from '@assets/images/tech/csharp.svg'
import pythonIcon from '@assets/images/tech/python.svg'

export interface TechStackItem {
  key: string
  icon: string
  category:
    | 'frontend'
    | 'backend'
    | 'mobile'
    | 'language'
    | 'styling'
    | 'database'
    | 'api'
    | 'cloud'
  level: 'expert' | 'advanced' | 'intermediate' | 'beginner'
  color: string
}

export const techStackItems: TechStackItem[] = [
  {
    key: 'react_native',
    icon: reactIcon,
    category: 'mobile',
    level: 'advanced',
    color: 'from-blue-600 to-cyan-600',
  },
  {
    key: 'react',
    icon: reactIcon,
    category: 'frontend',
    level: 'advanced',
    color: 'from-blue-400 to-cyan-400',
  },
  {
    key: 'nextjs',
    icon: nextIcon,
    category: 'frontend',
    level: 'advanced',
    color: 'from-gray-300 to-white',
  },
  {
    key: 'typescript',
    icon: typescriptIcon,
    category: 'language',
    level: 'advanced',
    color: 'from-blue-500 to-blue-600',
  },
  {
    key: 'javascript',
    icon: javascriptIcon,
    category: 'language',
    level: 'advanced',
    color: 'from-yellow-400 to-yellow-500',
  },
  {
    key: 'tailwind',
    icon: tailwindIcon,
    category: 'styling',
    level: 'advanced',
    color: 'from-teal-400 to-blue-500',
  },
  {
    key: 'nodejs',
    icon: nodejsIcon,
    category: 'backend',
    level: 'advanced',
    color: 'from-green-400 to-green-600',
  },
  {
    key: 'nestjs',
    icon: nestjsIcon,
    category: 'backend',
    level: 'advanced',
    color: 'from-red-500 to-pink-500',
  },
  {
    key: 'postgresql',
    icon: postgresqlIcon,
    category: 'database',
    level: 'advanced',
    color: 'from-blue-500 to-indigo-500',
  },
  {
    key: 'mongodb',
    icon: mongoIcon,
    category: 'database',
    level: 'advanced',
    color: 'from-green-500 to-emerald-500',
  },
  {
    key: 'graphql',
    icon: graphqlIcon,
    category: 'api',
    level: 'advanced',
    color: 'from-pink-500 to-purple-500',
  },
  {
    key: 'aws',
    icon: awsIcon,
    category: 'cloud',
    level: 'intermediate',
    color: 'from-orange-400 to-yellow-500',
  },
  {
    key: 'csharp',
    icon: csharpIcon,
    category: 'language',
    level: 'intermediate',
    color: 'from-purple-400 to-purple-500',
  },
  {
    key: 'python',
    icon: pythonIcon,
    category: 'language',
    level: 'beginner',
    color: 'from-blue-400 to-yellow-400',
  },
]
