export type Lang = 'es' | 'en'
type L<T> = Record<Lang, T>

export const profile = {
  name: 'RØQUE',
  email: 'luis.roquetic@gmail.com',
  github: 'https://github.com/L-R0QU3',
  githubLabel: 'github.com/L-R0QU3',
  site: 'luisroque.cl',
  whatsapp: '56931120979',
}

/** Icon: clase de Devicon. mono = sin color de marca (hereda el color del texto). */
export interface Tech { name: string; icon?: string; mono?: boolean }

export const stack: { group: L<string>; items: Tech[] }[] = [
  {
    group: { es: 'Frontend', en: 'Frontend' },
    items: [
      { name: 'React', icon: 'devicon-react-original' },
      { name: 'Vite', icon: 'devicon-vitejs-plain' },
      { name: 'TypeScript', icon: 'devicon-typescript-plain' },
      { name: 'JavaScript', icon: 'devicon-javascript-plain' },
      { name: 'HTML5', icon: 'devicon-html5-plain' },
      { name: 'CSS3', icon: 'devicon-css3-plain' },
      { name: 'Tailwind CSS', icon: 'devicon-tailwindcss-original' },
    ],
  },
  {
    group: { es: 'Backend', en: 'Backend' },
    items: [
      { name: 'Java', icon: 'devicon-java-plain' },
      { name: 'Spring Boot', icon: 'devicon-spring-original' },
      { name: 'Node.js', icon: 'devicon-nodejs-plain' },
      { name: 'Express.js', icon: 'devicon-express-original', mono: true },
      { name: 'REST APIs' },
    ],
  },
  {
    group: { es: 'Bases de datos', en: 'Databases' },
    items: [
      { name: 'PostgreSQL', icon: 'devicon-postgresql-plain' },
      { name: 'MySQL', icon: 'devicon-mysql-plain' },
      { name: 'SQL' },
      { name: 'Supabase', icon: 'devicon-supabase-plain' },
    ],
  },
  {
    group: { es: 'Herramientas', en: 'Tools' },
    items: [
      { name: 'Git', icon: 'devicon-git-plain' },
      { name: 'GitHub', icon: 'devicon-github-original', mono: true },
      { name: 'Postman', icon: 'devicon-postman-plain' },
      { name: 'Docker', icon: 'devicon-docker-plain' },
      { name: 'Vercel', icon: 'devicon-vercel-original', mono: true },
      { name: 'Render' },
      { name: 'VS Code', icon: 'devicon-vscode-plain' },
    ],
  },
]

export const extra: Tech[] = [
  { name: 'C#', icon: 'devicon-csharp-plain' },
  { name: 'ASP.NET', icon: 'devicon-dotnetcore-plain' },
  { name: 'Visual Basic', icon: 'devicon-visualbasic-plain' },
  { name: 'Python', icon: 'devicon-python-plain' },
  { name: 'Django', icon: 'devicon-django-plain', mono: true },
  { name: 'Firebase', icon: 'devicon-firebase-plain' },
  { name: 'Google Cloud', icon: 'devicon-googlecloud-plain' },
  { name: 'Angular', icon: 'devicon-angularjs-plain' },
  { name: 'SQL Server', icon: 'devicon-microsoftsqlserver-plain' },
  { name: 'MongoDB', icon: 'devicon-mongodb-plain' }, // <-- Agregado aquí
  { name: 'CI/CD' },
]

export const aiTools = ['Claude', 'DeepSeek', 'OpenAI Codex']

export type Status = 'dev' | 'academic' | 'done' | 'proposal'

export interface Project {
  title: string
  status: Status
  desc: L<string>
  tech: string[]
  planned?: boolean
}

export const projects: Project[] = [
  {
    title: 'EduGestion',
    status: 'dev',
    desc: {
      es: 'Aplicación web para la gestión académica y administrativa de establecimientos educativos: cursos, asignaturas, horarios, asistencia, evaluaciones, planificación curricular y herramientas para docentes. Incluye autenticación JWT, control de acceso por roles y segundo factor TOTP. Se ejecuta localmente con Docker Compose.',
      en: 'Web application for the academic and administrative management of schools: courses, subjects, schedules, attendance, assessments, curriculum planning and teacher tools. Includes JWT authentication, role-based access control and TOTP two-factor authentication. Runs locally with Docker Compose.',
    },
    tech: ['Java 21', 'Spring Boot 3', 'React 18', 'PostgreSQL', 'Flyway', 'Docker'],
  },
  {
    title: 'HelpDesk Pro',
    status: 'academic',
    desc: {
      es: 'Aplicación para gestionar solicitudes de soporte técnico: tickets, asignación de técnicos, prioridades, SLA, historial de actividad, usuarios y roles, y panel de indicadores.',
      en: 'Application to manage technical support requests: tickets, technician assignment, priorities, SLAs, activity history, users and roles, and a metrics dashboard.',
    },
    tech: ['Java 21', 'Spring Boot', 'React', 'TypeScript', 'PostgreSQL'],
    planned: true,
  },
  {
    title: 'IT Asset Manager',
    status: 'academic',
    desc: {
      es: 'Aplicación para administrar el inventario y ciclo de vida de activos tecnológicos: equipos, asignaciones, movimientos, mantenimientos, garantías, auditoría y reportes.',
      en: 'Application to manage the inventory and lifecycle of technology assets: equipment, assignments, movements, maintenance, warranties, auditing and reports.',
    },
    tech: ['C#', 'ASP.NET Core', 'Entity Framework Core', 'React', 'TypeScript', 'PostgreSQL'],
    planned: true,
  },
  {
    title: 'Turismo Navidad',
    status: 'done',
    desc: {
      es: 'Portal web de atractivos y servicios turísticos de la comuna de Navidad, con panel privado para administrar servicios, categorías, localidades e imágenes. Catálogo dinámico con filtros, información histórica y patrimonial y mapa interactivo.',
      en: 'Web portal for tourist attractions and services in the municipality of Navidad, with a private panel to manage services, categories, locations and images. Dynamic catalog with filters, historical and heritage information, and an interactive map.',
    },
    tech: ['React', 'Vite', 'Tailwind CSS', 'React Router', 'Framer Motion', 'React Leaflet', 'Supabase'],
  },
  {
    title: 'Liceo Pablo Neruda — Web',
    status: 'proposal',
    desc: {
      es: 'Propuesta de modernización de la plataforma web institucional del Liceo Municipal Pablo Neruda de Navidad: navegación por secciones, carrusel, galería, mapa integrado y diseño responsivo. Es una propuesta de frontend; un CMS y panel administrativo se contemplan como ampliación futura.',
      en: 'Modernization proposal for the institutional website of Liceo Municipal Pablo Neruda in Navidad: section navigation, carousel, gallery, embedded map and responsive design. It is a frontend proposal; a CMS and admin panel are considered a future extension.',
    },
    tech: ['React 18', 'Vite', 'Tailwind CSS', 'React Router', 'Lucide React', 'Vercel'],
  },
]

export const statusLabel: Record<Status, L<string>> = {
  dev: { es: 'En desarrollo', en: 'In development' },
  academic: { es: 'Proyecto académico · en desarrollo', en: 'Academic project · in development' },
  done: { es: 'Proyecto Full Stack', en: 'Full Stack project' },
  proposal: { es: 'Propuesta · frontend', en: 'Proposal · frontend' },
}

export const experience: { role: L<string>; org: string; period: string; points: L<string[]> }[] = [
  {
    role: { es: 'Informador Turístico', en: 'Tourist Information Officer' },
    org: 'Ilustre Municipalidad de Navidad',
    period: '2025 – 2026',
    points: {
      es: ['Atención y orientación a turistas sobre atractivos, servicios y oferta turística de la comuna.', 'Apoyo en labores administrativas y gestión de información del área de turismo.'],
      en: ['Assisted and guided tourists on the attractions, services and offerings of the municipality.', 'Supported administrative tasks and information management for the tourism area.'],
    },
  },
  {
    role: { es: 'Soporte TI, Monitor del Taller de Informática y Gestión de Plataformas Educativas', en: 'IT Support, Computer Workshop Instructor and Educational Platform Management' },
    org: 'Liceo Pablo Neruda',
    period: '2024 – 2025',
    points: {
      es: [
        'Soporte técnico de equipos y resolución de incidencias de hardware, software y conectividad.',
        'Apoyo a docentes y personal administrativo en herramientas tecnológicas y en la plataforma educativa Lirmi.',
        'Talleres de informática dos veces por semana durante 2024, con más de 40 estudiantes.',
        'Enseñanza de informática básica, ofimática, programación de videojuegos, diseño web y producción audiovisual.',
        'Participación en la gestión y mantenimiento del sitio institucional (WordPress), publicado entre 2022 y fines de 2024.',
      ],
      en: [
        'Technical support for computers and resolution of hardware, software and connectivity issues.',
        'Support for teachers and administrative staff with technology tools and the Lirmi educational platform.',
        'Ran computer workshops twice a week during 2024, teaching over 40 students.',
        'Taught basic computing, office software, game programming, web design and audiovisual production.',
        'Took part in managing and maintaining the institutional website (WordPress), published between 2022 and late 2024.',
      ],
    },
  },
  {
    role: { es: 'Práctica Profesional', en: 'Professional Internship' },
    org: 'Liceo Pablo Neruda',
    period: '2022',
    points: {
      es: ['Mantenimiento y soporte de equipos computacionales.', 'Apoyo en procesos informáticos y diseño de material gráfico institucional.', 'Participación en propuestas de soluciones digitales para el establecimiento.'],
      en: ['Computer maintenance and support.', 'Support for IT processes and design of institutional graphic material.', 'Took part in digital solution proposals for the school.'],
    },
  },
]

export const certs = [
  { name: 'IBM Java Developer', org: 'IBM / Coursera', year: '2026' },
  { name: 'IBM Full Stack Software Developer', org: 'IBM Skills Network / Coursera', year: '2026' },
  { name: 'Google Cloud Digital Leader Training', org: 'Google Cloud / Coursera', year: '2026' },
]

export const t = {
  es: {
    nav: { about: 'Perfil', stack: 'Stack', projects: 'Proyectos', experience: 'Experiencia', contact: 'Contacto' },
    role: 'Técnico en Programación y Analista de Sistemas',
    headline: 'Desarrollo aplicaciones web Full Stack.',
    sub: 'Busco mi primera oportunidad como desarrollador Full Stack, en modalidad remota. Vengo del soporte TI y la enseñanza de informática, y estoy construyendo mi experiencia en desarrollo a través de proyectos propios.',
    cta1: 'Ver proyectos', cta2: 'Contactar',
    available: 'Disponible · remoto',
    aboutTitle: 'Perfil',
    about: [
      'Soy Técnico en Programación y Analista de Sistemas (AIEP, 2019–2022). Trabajo con React, Java, Spring Boot y Node.js, integrando APIs REST y bases de datos relacionales.',
      'He desarrollado proyectos personales, académicos e institucionales en torno a gestión escolar, administración de servicios, portales web y automatización.',
    ],
    honestTitle: 'Para ser transparente',
    honest: [
      'Mi experiencia laboral es principalmente en soporte TI, enseñanza de informática y atención de usuarios; todavía no tengo un cargo formal de desarrollo de software.',
      'Mi experiencia en desarrollo proviene de proyectos propios y académicos. Varios siguen en desarrollo y lo indico en cada uno.',
      'Uso herramientas de IA (Claude, DeepSeek, OpenAI Codex) como apoyo al desarrollo; reviso y entiendo lo que integro.',
    ],
    stackTitle: 'Stack técnico',
    stackSub: 'Tecnologías que aparecen en mis proyectos. No clasifico mi nivel con porcentajes: lo que ves en cada proyecto es lo que hice.',
    extraTitle: 'Conocimientos adicionales',
    aiTitle: 'Desarrollo asistido por IA',
    projectsTitle: 'Proyectos',
    projectsSub: 'Proyectos en los que he aplicado mi stack tecnológico. Cada uno incluye su estado de avance y las herramientas reales utilizadas en su desarrollo.', // <-- Texto actualizado
    planned: 'Tecnologías previstas',
    tech: 'Tecnologías',
    expTitle: 'Experiencia',
    certTitle: 'Certificaciones',
    eduTitle: 'Formación',
    edu: 'Técnico en Programación y Analista de Sistemas',
    contactTitle: 'Contacto',
    contactSub: 'Si buscas a alguien para un rol Full Stack o para un proyecto web, escríbeme.',
    email: 'Enviar correo',
    footer: 'Hecho con React, Vite, Tailwind CSS y Framer Motion.',
    theme: 'Cambiar tema', lang: 'Cambiar idioma',
  },
  en: {
    nav: { about: 'Profile', stack: 'Stack', projects: 'Projects', experience: 'Experience', contact: 'Contact' },
    role: 'Programming Technician and Systems Analyst',
    headline: 'I build Full Stack web applications.',
    sub: "I'm looking for my first opportunity as a Full Stack developer, remote. I come from IT support and teaching computing, and I'm building my development experience through my own projects.",
    cta1: 'View projects', cta2: 'Get in touch',
    available: 'Open to opportunities · remote',
    aboutTitle: 'Profile',
    about: [
      "I'm a Programming Technician and Systems Analyst (AIEP, 2019–2022). I work with React, Java, Spring Boot and Node.js, integrating REST APIs and relational databases.",
      "I've built personal, academic and institutional projects around school management, service administration, web portals and automation.",
    ],
    honestTitle: 'To be transparent',
    honest: [
      "My work experience is mainly in IT support, teaching computing and user assistance; I don't yet hold a formal software development role.",
      'My development experience comes from personal and academic projects. Several are still in progress, and I label each one accordingly.',
      'I use AI tools (Claude, DeepSeek, OpenAI Codex) to assist development; I review and understand what I integrate.',
    ],
    stackTitle: 'Tech stack',
    stackSub: "Technologies that appear in my projects. I don't rate my level with percentages: what you see in each project is what I did.",
    extraTitle: 'Additional knowledge',
    aiTitle: 'AI-assisted development',
    projectsTitle: 'Projects',
    projectsSub: 'Projects where I have applied my tech stack. Each one includes its progress status and the actual tools used in its development.', // <-- Texto actualizado
    planned: 'Planned technologies',
    tech: 'Technologies',
    expTitle: 'Experience',
    certTitle: 'Certifications',
    eduTitle: 'Education',
    edu: 'Programming Technician and Systems Analyst',
    contactTitle: 'Contact',
    contactSub: "If you're looking for someone for a Full Stack role or a web project, get in touch.",
    email: 'Send email',
    footer: 'Built with React, Vite, Tailwind CSS and Framer Motion.',
    theme: 'Toggle theme', lang: 'Switch language',
  },
}

export const t2 = {
  es: {
    more: 'Ver más', close: 'Cerrar', repo: 'Ver repositorio en GitHub', demo: 'Ver demo en vivo',
    noRepo: 'El repositorio aún no está publicado.', noImg: 'Capturas pendientes', stackOf: 'Tecnologías', planned: 'Tecnologías previstas',
    sticker: 'Full Stack · Remoto', note: 'Nota', gallery: 'Galería', scroll: 'Desplázate',
  },
  en: {
    more: 'View more', close: 'Close', repo: 'View repository on GitHub', demo: 'View live demo',
    noRepo: "The repository isn't public yet.", noImg: 'Screenshots pending', stackOf: 'Technologies', planned: 'Planned technologies',
    sticker: 'Full Stack · Remote', note: 'Note', gallery: 'Gallery', scroll: 'Scroll',
  },
}

export const t3 = {
  es: {
    nav: { about: 'Sobre mí', stack: 'Stack', projects: 'Proyectos', services: 'Servicios', education: 'Formación', experience: 'Experiencia', contact: 'Contacto' },
    cta: 'Contáctame', chip: 'RØQUE', h1a: 'Hola, soy RØQUE.', h1b: 'Desarrollador Full Stack.',
    sub: 'Técnico en Programación y Analista de Sistemas. Construyo aplicaciones web con React, Java y Spring Boot. Desarrollo soluciones web de alto impacto. Disponible para trabajar en modalidad remota.',
    avail: 'Disponible · remoto',
    aboutChip: 'SOBRE MÍ', aboutPre: 'Disponible para desarrollar', aboutAcc: 'soluciones', aboutBtn: 'Hablemos',
    stats: ['Estudiantes en talleres de informática (2024)', 'Proyectos en este portafolio', 'Certificaciones (2026)'],
    stackChip: 'STACK', workChip: 'MIS PROYECTOS', workTitle: 'Proyectos recientes',
    servicesChip: 'SERVICIOS', servicesPre: 'Lo que puedo', servicesAcc: 'hacer por ti',
    services: [
      { title: 'Desarrollo Full Stack', desc: 'Aplicaciones web con React en el frontend y Java con Spring Boot o Node.js en el backend, con APIs REST y bases de datos relacionales.' },
      { title: 'Portales y sitios web', desc: 'Sitios institucionales y portales con catálogo, mapas y paneles de administración, con diseño responsivo.' },
      { title: 'Soporte TI', desc: 'Soporte de equipos, resolución de incidencias de hardware, software y conectividad, y apoyo a usuarios.' },
      { title: 'Capacitación en informática', desc: 'Talleres de ofimática, diseño web y programación para estudiantes y personal.' },
    ],
    expChip: 'TRAYECTORIA', contactChip: 'CONTACTO', ctaA: 'Trabajemos', ctaB: 'juntos',
    eduChip: 'FORMACIÓN', eduTitle: 'Formación y certificaciones', fieldTitle: 'Campo laboral', asTitle: 'Aprendizaje + Servicio',
    aiepCerts: 'Certificaciones AIEP', onlineCerts: 'Certificaciones online',
    wa: 'Escribir por WhatsApp', waMsg: 'Hola RØQUE, vi tu portafolio y me gustaría conversar.',
    form: { name: 'Nombre', email: 'Tu correo', message: 'Mensaje', send: 'Enviar mensaje', sending: 'Enviando…',
      ok: 'Mensaje enviado. Te responderé pronto.', err: 'No se pudo enviar el mensaje. Prueba por WhatsApp o escríbeme directo al correo.' },
  },
  en: {
    nav: { about: 'About', stack: 'Stack', projects: 'Projects', services: 'Services', education: 'Education', experience: 'Experience', contact: 'Contact' },
    cta: 'Contact me', chip: 'RØQUE', h1a: "Hi, I'm RØQUE.", h1b: 'Full Stack Developer.',
    sub: "Programming Technician and Systems Analyst. I build web applications with React, Java and Spring Boot. I'm looking for my first opportunity in development, remote.",
    avail: 'Available · remote',
    aboutChip: 'ABOUT ME', aboutPre: 'Available to build', aboutAcc: 'solutions', aboutBtn: "Let's talk",
    stats: ['Students in computer workshops (2024)', 'Projects in this portfolio', 'Certifications (2026)'],
    stackChip: 'STACK', workChip: 'MY WORK', workTitle: 'Recent projects',
    servicesChip: 'SERVICES', servicesPre: 'What I can', servicesAcc: 'do for you',
    services: [
      { title: 'Full Stack development', desc: 'Web applications with React on the frontend and Java with Spring Boot or Node.js on the backend, with REST APIs and relational databases.' },
      { title: 'Portals and websites', desc: 'Institutional sites and portals with catalogs, maps and admin panels, with responsive design.' },
      { title: 'IT support', desc: 'Equipment support, resolving hardware, software and connectivity issues, and user assistance.' },
      { title: 'Computer training', desc: 'Workshops on office software, web design and programming for students and staff.' },
    ],
    expChip: 'BACKGROUND', contactChip: 'CONTACT', ctaA: "Let's work", ctaB: 'together',
    eduChip: 'EDUCATION', eduTitle: 'Education and certifications', fieldTitle: 'Career field', asTitle: 'Learning + Service',
    aiepCerts: 'AIEP certifications', onlineCerts: 'Online certifications',
    wa: 'Message on WhatsApp', waMsg: "Hi RØQUE, I saw your portfolio and I'd like to talk.",
    form: { name: 'Name', email: 'Your email', message: 'Message', send: 'Send message', sending: 'Sending…',
      ok: "Message sent. I'll get back to you soon.", err: "The message couldn't be sent. Try WhatsApp or email me directly." },
  },
}

export const education = {
  inst: 'AIEP',
  period: '2019 – 2022',
  degree: {
    es: 'Técnico de Nivel Superior en Programación y Análisis de Sistemas',
    en: 'Higher-Level Technician in Programming and Systems Analysis',
  },
  profile: {
    es: 'Técnico de nivel superior preparado para participar en todo el ciclo de desarrollo de software: análisis de requerimientos, diseño, construcción, pruebas e implementación de soluciones. La carrera tiene un fuerte componente práctico, orientado a las competencias para el trabajo.',
    en: 'Higher-level technician trained for the whole software development cycle: requirements analysis, design, construction, testing and implementation of solutions. The program has a strong practical component, focused on job-ready skills.',
  },
  field: {
    es: 'Empresas y organizaciones que operan con plataformas informáticas y requieren diseño, desarrollo, implementación y evaluación de software y sistemas de información. También permite emprender en consultoría o servicios TIC.',
    en: 'Companies and organizations that run on IT platforms and need software and information systems designed, developed, implemented and evaluated. It also allows starting your own IT consulting or services business.',
  },
  as: {
    es: 'La formación incluye un módulo de Aprendizaje + Servicio (A+S), que combina lo aprendido en la especialidad con trabajo en la comunidad.',
    en: 'The curriculum includes a Learning + Service (A+S) module, which combines what is learned in the specialty with work in the community.',
  },
  certs: [
    { name: { es: 'Soporte de Hardware y Software', en: 'Hardware and Software Support' }, desc: { es: 'Habilita para realizar soporte de sistemas computacionales.', en: 'Qualifies to provide support for computer systems.' } },
    { name: { es: 'Programación Básica de Software', en: 'Basic Software Programming' }, desc: { es: 'Habilita para desarrollar software básico según requerimientos, usando el lenguaje Java.', en: 'Qualifies to develop basic software to requirements, using Java.' } },
    { name: { es: 'Programación de Aplicaciones Web', en: 'Web Application Programming' }, desc: { es: 'Habilita para desarrollar aplicaciones web.', en: 'Qualifies to develop web applications.' } },
    { name: { es: 'Calidad de Software', en: 'Software Quality' }, desc: { es: 'Habilita para diseñar pruebas de funcionamiento de software.', en: 'Qualifies to design software functional tests.' } },
  ],
  next: {
    title: { es: 'Continuidad de estudios', en: 'Continuing studies' },
    tag: { es: 'En evaluación · aún no confirmado', en: 'Under consideration · not yet confirmed' },
    text: { es: 'Contemplo continuar con una ingeniería en el mismo instituto. Todavía no está confirmado.', en: 'I am considering continuing with an engineering degree at the same institute. It is not confirmed yet.' },
  },
}