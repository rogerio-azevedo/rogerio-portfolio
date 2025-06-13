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
    link: 'porter.com.br',
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
  // {
  //   id: 3,
  //   title: 'Síndico Pro - Condo Management Platform',
  //   des: 'A real-world SaaS platform built to simplify and professionalize condo management. Includes: realizations, tasks management, document organization, occurrences management, and more.',
  //   img: '/projects/sindicopro.png',
  //   iconLists: [
  //     '/tech/react.svg',
  //     '/tech/next.svg',
  //     '/tech/tailwind.svg',
  //     '/tech/typescript.svg',
  //     '/tech/nestjs.svg',
  //     '/tech/graphql.svg',
  //   ],
  //   link: 'sindicopro.adm.br',
  // },
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
      'Rogerio played a key role in transforming PorterGroup into a truly data-driven company. He led the development of Analytics, our internal BI platform, which has become a strategic tool across the entire organization. The system provides real-time visibility into our operations and performance, supporting both operational and technical decision-making at all levels. What impressed us most was Rogerio’s ability to combine deep technical expertise with a clear understanding of our business challenges. The platform is intuitive, fast, and scalable — and it continues to evolve based on the needs of our teams. Today, Analytics is not just a dashboard — it’s an essential part of how we operate. I highly recommend Rogerio for any organization seeking to turn data into action and strategy.',
    name: 'Fabio Beal',
    title: 'CEO of Porter Group',
    img: '/testimonials/fabio.jpg',
  },
  {
    quote:
      'Implementing Meu IoT has brought a new level of organization and control to our daily operations at Jardim Home Senior. One of the most impactful changes was in the management of our medicine cabinets — which now remain securely closed and accessible only to authorized staff. It also simplified and secured visitor access, giving family members controlled entry while keeping our residents safe. The platform is reliable, easy to use, and has become an essential part of how we run our facility. I’m very satisfied with the results.',
    name: 'Davi Beber',
    title: 'Founder Jardim Home Senior',
    img: '/testimonials/davi.jpeg',
  },
  // {
  //   quote:
  //     'Since implementing Meu IoT at Dona Kleo Cosméticos, we’ve experienced a significant increase in security and peace of mind. The alarm system has become a key part of our daily routine, and the fact that our doors remain closed at all times — only opened by authorized staff via the app or computer — makes all the difference. Our team quickly adapted to the system, and it has brought both efficiency and safety to our store operations. I highly recommend it to any business looking to modernize and protect their access control.',
  //   name: 'Polyana Borges',
  //   title: 'Co-Founder of Dona Kleo',
  //   img: '/testimonials/polyana.jpeg',
  // },
  // {
  //   quote:
  //     "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
  //   name: 'Zara Smith',
  //   title: 'CEO of AlphaStream Technologies',
  //   img: '/testimonials/profile.svg',
  // },
  {
    quote:
      'We hired Rogerio to design and develop the official website for Escovato, and the results exceeded our expectations. From the start, he demonstrated a clear understanding of our brand and delivered a site that is elegant, responsive, and aligned with the high-end experience we offer in our salon. The entire process was smooth and professional. Rogerio was proactive, creative, and highly committed to quality — always delivering on time and with great attention to detail. We constantly receive compliments on how beautiful and easy to navigate the website is. I would gladly recommend him to anyone looking for a top-notch web developer.',
    name: 'Avelino Barbosa',
    title: 'Co-Founder of Escovato',
    img: '/testimonials/avelino.png',
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
  // {
  //   id: 3,
  //   name: 'Sindico Pro',
  //   img: '/companies/sindicopro.svg',
  //   nameImg: 'Sindico Pro',
  //   type: 'horizontal',
  //   link: 'sindicopro.adm.br',
  // },
  {
    id: 4,
    name: 'Escovato',
    img: '/companies/escovato.svg',
    nameImg: 'Escovato',
    type: 'vertical',
    link: 'escovato.com.br',
  },
]

export const workExperience = [
  {
    id: 1,
    title: 'Strategic Leadership',
    desc: 'Strategic vision and leadership of high-performance teams.',
    thumbnail: '/soft-skills/leadership.svg',
  },
  {
    id: 2,
    title: 'Stakeholder Communication',
    desc: 'Effective communication with C-level executives and technical stakeholders.',
    thumbnail: '/soft-skills/stakeholder.svg',
  },
  {
    id: 3,
    title: 'Innovation Management',
    desc: 'Implementation of innovative solutions and continuous improvement processes.',
    thumbnail: '/soft-skills/innovation.svg',
  },
  {
    id: 4,
    title: 'Technical Mentorship',
    desc: 'Talent development and technical culture building.',
    thumbnail: '/soft-skills/mentorship.svg',
  },
]

export const socialMedia = [
  {
    id: 1,
    label: 'GitHub',
    img: '/social/git.svg',
    link: 'https://github.com/rogerio-azevedo',
  },
  {
    id: 2,
    label: 'LinkedIn',
    img: '/social/link.svg',
    link: 'https://www.linkedin.com/in/rogerio-fazevedo',
  },
  {
    id: 3,
    label: 'WhatsApp',
    img: '/social/wha.svg',
    link: 'https://wa.me/5565999112805',
  },
  {
    id: 4,
    img: '/social/insta.svg',
    link: 'https://www.instagram.com/rogerazevedo',
  },
]
