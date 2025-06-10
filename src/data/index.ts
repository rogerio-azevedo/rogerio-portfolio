export const navItems = [
  { name: 'About', link: '#about' },
  { name: 'Projects', link: '#projects' },
  { name: 'Testimonials', link: '#testimonials' },
  { name: 'Contact', link: '#contact' },
]

export const gridItems = [
  {
    id: 1,
    title: 'I prioritize client collaboration, fostering open communication ',
    description: '',
    className: 'lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]',
    imgClassName: 'w-full h-full',
    titleClassName: 'justify-end',
    img: '/b1.svg',
    spareImg: '',
  },
  {
    id: 2,
    title: "I'm very flexible with time zone communications",
    description: '',
    className: 'lg:col-span-2 md:col-span-3 md:row-span-2',
    imgClassName: '',
    titleClassName: 'justify-start',
    img: '',
    spareImg: '',
  },
  {
    id: 3,
    title: 'My tech stack',
    description: 'I constantly try to improve',
    className: 'lg:col-span-2 md:col-span-3 md:row-span-2',
    imgClassName: '',
    titleClassName: 'justify-center',
    img: '',
    spareImg: '',
  },
  {
    id: 4,
    title: 'Tech enthusiast with a passion for development.',
    description: '',
    className: 'lg:col-span-2 md:col-span-3 md:row-span-1',
    imgClassName: '',
    titleClassName: 'justify-start',
    img: '/grid.svg',
    spareImg: '/b4.svg',
  },

  {
    id: 5,
    title: 'Currently building a JS Animation library',
    description: 'The Inside Scoop',
    className: 'md:col-span-3 md:row-span-2',
    imgClassName: 'absolute right-0 bottom-0 md:w-96 w-60',
    titleClassName: 'justify-center md:justify-start lg:justify-center',
    img: '/b5.svg',
    spareImg: '/grid.svg',
  },
  {
    id: 6,
    title: 'Do you want to start a project together?',
    description: '',
    className: 'lg:col-span-2 md:col-span-3 md:row-span-1',
    imgClassName: '',
    titleClassName: 'justify-center md:max-w-full max-w-60 text-center',
    img: '',
    spareImg: '',
  },
]

export const techStacks = [
  {
    name: 'React Native',
    icon: '/tech/react.svg',
    description: 'Cross-Platform Mobile Framework',
    category: 'Mobile',
    level: 'Advanced',
    color: 'from-blue-600 to-cyan-600',
  },
  {
    name: 'React',
    icon: '/tech/react.svg',
    description: 'Modern UI Library',
    category: 'Frontend',
    level: 'Advanced',
    color: 'from-blue-400 to-cyan-400',
  },
  {
    name: 'Next.js',
    icon: '/tech/next.svg',
    description: 'React Framework',
    category: 'Frontend',
    level: 'Advanced',
    color: 'from-gray-300 to-white',
  },
  {
    name: 'TypeScript',
    icon: '/tech/typescript.svg',
    description: 'Type-Safe JavaScript',
    category: 'Language',
    level: 'Advanced',
    color: 'from-blue-500 to-blue-600',
  },
  {
    name: 'JavaScript',
    icon: '/tech/javascript.svg',
    description: 'Programming Language',
    category: 'Language',
    level: 'Advanced',
    color: 'from-yellow-400 to-yellow-500',
  },
  {
    name: 'Tailwind CSS',
    icon: '/tech/tailwind.svg',
    description: 'Utility-First CSS',
    category: 'Styling',
    level: 'Advanced',
    color: 'from-teal-400 to-blue-500',
  },
  {
    name: 'Node.js',
    icon: '/tech/nodejs.svg',
    description: 'JavaScript Runtime',
    category: 'Backend',
    level: 'Advanced',
    color: 'from-green-400 to-green-600',
  },
  {
    name: 'NestJS',
    icon: '/tech/nestjs.svg',
    description: 'Node.js Framework',
    category: 'Backend',
    level: 'Advanced',
    color: 'from-red-500 to-pink-500',
  },
  {
    name: 'PostgreSQL',
    icon: '/tech/postgresql.svg',
    description: 'Relational Database',
    category: 'Database',
    level: 'Advanced',
    color: 'from-blue-500 to-indigo-500',
  },
  {
    name: 'MongoDB',
    icon: '/tech/mongo.svg',
    description: 'NoSQL Database',
    category: 'Database',
    level: 'Advanced',
    color: 'from-green-500 to-emerald-500',
  },
  {
    name: 'GraphQL',
    icon: '/tech/graphql.svg',
    description: 'Query Language',
    category: 'API',
    level: 'Advanced',
    color: 'from-pink-500 to-purple-500',
  },
  {
    name: 'AWS',
    icon: '/tech/aws.svg',
    description: 'Cloud Services',
    category: 'Cloud',
    level: 'Intermediate',
    color: 'from-orange-400 to-yellow-500',
  },
  {
    name: 'C#',
    icon: '/tech/csharp.svg',
    description: 'Programming Language',
    category: 'Language',
    level: 'Intermediate',
    color: 'from-purple-400 to-purple-500',
  },
  {
    name: 'Python',
    icon: '/tech/python.svg',
    description: 'Versatile Programming Language',
    category: 'Language',
    level: 'Beginner',
    color: 'from-blue-400 to-yellow-400',
  },
]

export const projects = [
  {
    id: 1,
    title: 'Porter Analytics – Operational BI',
    des: 'A Business Intelligence system developed for Porter to provide clear, strategic insights into operational data, supporting decision-making with real-time metrics.',
    img: '/projects/analytics.png',
    iconLists: [
      '/tech/react.svg',
      '/tech/tailwind.svg',
      '/tech/typescript.svg',
      '/tech/nodejs.svg',
      '/tech/mongo.svg',
      '/tech/postgresql.svg',
    ],
    link: '/porter.com.br',
  },
  {
    id: 2,
    title: 'Meu IoT - Smart Access & Emergency System',
    des: 'Control gates and smart devices remotely while protecting what matters most. Meu IoT also features an integrated panic button and alarm system for real-time emergency response.',
    img: '/projects/meuiot.png',
    iconLists: [
      '/tech/react.svg',
      '/tech/tailwind.svg',
      '/tech/typescript.svg',
      '/tech/nestjs.svg',
      '/tech/graphql.svg',
      '/tech/postgresql.svg',
      '/tech/mongo.svg',
    ],
    link: 'meuiot.com.br',
  },
  {
    id: 3,
    title: 'Síndico Pro - Condo Management Platform',
    des: 'A real-world SaaS platform built to simplify and professionalize condo management. Includes: realizations, tasks management, document organization, occurrences management, and more.',
    img: '/projects/sindicopro.png',
    iconLists: [
      '/tech/react.svg',
      '/tech/next.svg',
      '/tech/tailwind.svg',
      '/tech/typescript.svg',
      '/tech/nestjs.svg',
      '/tech/graphql.svg',
    ],
    link: 'sindicopro.adm.br',
  },
  {
    id: 4,
    title: 'Escovato Beauty Salon Website',
    des: 'Developed a modern and elegant institutional website for Escovato, a high-end beauty salon, focusing on premium aesthetics, responsiveness, and a seamless user experience.',
    img: '/projects/escovato.png',
    iconLists: [
      '/tech/react.svg',
      '/tech/tailwind.svg',
      '/tech/typescript.svg',
    ],
    link: 'escovato.com.br',
  },
]

export const testimonials = [
  {
    quote:
      "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
    name: 'Michael Johnson',
    title: 'Director of AlphaStream Technologies',
  },
  {
    quote:
      "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
    name: 'Michael Johnson',
    title: 'Director of AlphaStream Technologies',
  },
  {
    quote:
      "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
    name: 'Michael Johnson',
    title: 'Director of AlphaStream Technologies',
  },
  {
    quote:
      "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
    name: 'Michael Johnson',
    title: 'Director of AlphaStream Technologies',
  },
  {
    quote:
      "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
    name: 'Michael Johnson',
    title: 'Director of AlphaStream Technologies',
  },
]

export const companies = [
  {
    id: 1,
    name: 'porter',
    img: '/companies/porter.png',
    nameImg: 'Porter',
    type: 'horizontal',
    link: 'porter.com.br',
  },
  {
    id: 2,
    name: 'meuIOT',
    img: '/companies/meuiot.png',
    nameImg: 'Meu IoT',
    type: 'square',
    link: 'meuiot.com.br',
  },
  {
    id: 3,
    name: 'Sindico Pro',
    img: '/companies/sindicopro.svg',
    nameImg: 'Sindico Pro',
    type: 'horizontal',
    link: 'sindicopro.adm.br',
  },
  {
    id: 4,
    name: 'Escovato',
    img: '/companies/escovato.svg',
    nameImg: 'Escovato',
    type: 'horizontal',
    link: 'escovato.com.br',
  },
]

export const workExperience = [
  {
    id: 1,
    title: 'Frontend Engineer Intern',
    desc: 'Assisted in the development of a web-based platform using React.js, enhancing interactivity.',
    className: 'md:col-span-2',
    thumbnail: '/exp1.svg',
  },
  {
    id: 2,
    title: 'Mobile App Dev - JSM Tech',
    desc: 'Designed and developed mobile app for both iOS & Android platforms using React Native.',
    className: 'md:col-span-2',
    thumbnail: '/exp2.svg',
  },
  {
    id: 3,
    title: 'Freelance App Dev Project',
    desc: 'Led the dev of a mobile app for a client, from initial concept to deployment on app stores.',
    className: 'md:col-span-2',
    thumbnail: '/exp3.svg',
  },
  {
    id: 4,
    title: 'Lead Frontend Developer',
    desc: 'Developed and maintained user-facing features using modern frontend technologies.',
    className: 'md:col-span-2',
    thumbnail: '/exp4.svg',
  },
]

export const socialMedia = [
  {
    id: 1,
    img: '/social/git.svg',
    link: 'https://github.com/rogerio-azevedo',
  },
  {
    id: 2,
    img: '/social/link.svg',
    link: 'https://www.linkedin.com/in/rogerio-fazevedo',
  },
  {
    id: 3,
    img: '/social/wha.svg',
    link: 'https://wa.me/5565999112805',
  },
  {
    id: 4,
    img: '/social/insta.svg',
    link: 'https://www.instagram.com/rogerazevedo',
  },
]
