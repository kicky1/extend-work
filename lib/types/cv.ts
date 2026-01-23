export interface PersonalInfo {
  fullName: string
  email: string
  phone: string
  location: string
  website?: string
  linkedIn?: string
  github?: string
  profileImage?: string
}

export interface WorkExperience {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  current: boolean
  location: string
  description: string
  achievements: string[]
}

export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  startDate: string
  endDate: string
  current: boolean
  gpa?: string
  description?: string
}

export interface Skill {
  id: string
  name: string
  category: string
  level?: 'beginner' | 'intermediate' | 'advanced' | 'expert'
}

export interface Language {
  id: string
  name: string
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
}

export interface Certificate {
  id: string
  name: string
  issuer: string
  issueDate: string
  expiryDate?: string
  credentialId?: string
  credentialUrl?: string
}

export interface Footer {
  rodoConsent: string
}

export interface CVTheme {
  colors: {
    primary: string
    accent: string
    text: string
    background: string
  }
  fonts: {
    heading: string
    body: string
  }
  layout: 'classic' | 'modern' | 'minimal' | 'two-column'
  // Style variations
  headerStyle: 'centered' | 'left-aligned' | 'split'
  skillsStyle: 'pills' | 'list' | 'grid' | 'bars'
  languagesStyle: 'inline' | 'pills' | 'bars' | 'grid'
  sectionDivider: 'line' | 'none' | 'dotted' | 'accent-bar'
  bulletStyle: 'disc' | 'circle' | 'square' | 'dash' | 'arrow'
  showHeaderIcons: boolean
  pageNumbers?: {
    show: boolean
    position: 'left' | 'center' | 'right'
  }
}

export type CVSectionType = 'summary' | 'workExperience' | 'education' | 'skills' | 'languages' | 'certificates'

export const defaultSectionOrder: CVSectionType[] = ['summary', 'workExperience', 'education', 'skills', 'languages', 'certificates']

export interface CVData {
  id?: string
  userId?: string
  personalInfo: PersonalInfo
  summary: string
  workExperience: WorkExperience[]
  education: Education[]
  skills: Skill[]
  languages: Language[]
  certificates: Certificate[]
  customSkillCategories?: string[]
  theme: CVTheme
  sectionOrder?: CVSectionType[]
  footer: Footer
  createdAt?: string
  updatedAt?: string
}

export interface CV {
  id: string
  user_id: string
  title: string
  data: Omit<CVData, 'id' | 'userId' | 'createdAt' | 'updatedAt'>
  theme: CVTheme
  created_at: string
  updated_at: string
}

export const defaultCVTheme: CVTheme = {
  colors: {
    primary: '#000000',
    accent: '#000000',
    text: '#000000',
    background: '#FFFFFF',
  },
  fonts: {
    heading: 'Arial',
    body: 'Arial',
  },
  layout: 'classic',
  headerStyle: 'left-aligned',
  skillsStyle: 'list',
  languagesStyle: 'inline',
  sectionDivider: 'none',
  bulletStyle: 'disc',
  showHeaderIcons: false,
  pageNumbers: {
    show: false,
    position: 'center',
  },
}

export const defaultPersonalInfo: PersonalInfo = {
  fullName: 'Alex Johnson',
  email: 'alex.johnson@email.com',
  phone: '+1 (555) 123-4567',
  location: 'San Francisco, CA',
  website: 'https://alexjohnson.dev',
  linkedIn: 'linkedin.com/in/alexjohnson',
  github: 'github.com/alexjohnson',
}

export const defaultFooter: Footer = {
  rodoConsent: 'I hereby consent to my personal data being processed for the purpose of considering my application for the vacancy advertised under the terms of the Regulation (EU) 2016/679 (GDPR).',
}

export const defaultCVData: Omit<CVData, 'id' | 'userId' | 'createdAt' | 'updatedAt'> = {
  personalInfo: defaultPersonalInfo,
  summary: 'Experienced Full-Stack Developer with 5+ years of expertise in building scalable web applications. Proficient in React, Node.js, and cloud technologies. Passionate about creating intuitive user experiences and writing clean, maintainable code. Strong track record of leading technical projects and mentoring junior developers.',
  workExperience: [
    {
      id: 'work-1',
      company: 'TechCorp Solutions',
      position: 'Senior Full-Stack Developer',
      startDate: '2022-03',
      endDate: '',
      current: true,
      location: 'San Francisco, CA',
      description: 'Leading development of enterprise web applications using modern tech stack',
      achievements: [
        'Architected and deployed microservices infrastructure serving 100K+ daily users',
        'Reduced application load time by 40% through performance optimization',
        'Mentored team of 5 junior developers and conducted code reviews',
        'Implemented CI/CD pipeline reducing deployment time by 60%'
      ]
    },
    {
      id: 'work-2',
      company: 'StartupHub Inc',
      position: 'Full-Stack Developer',
      startDate: '2019-06',
      endDate: '2022-02',
      current: false,
      location: 'Remote',
      description: 'Developed and maintained customer-facing web applications',
      achievements: [
        'Built RESTful APIs and responsive frontend interfaces using React and Node.js',
        'Collaborated with product team to deliver features on schedule',
        'Improved test coverage from 45% to 85% through comprehensive unit testing',
        'Optimized database queries resulting in 30% faster response times'
      ]
    }
  ],
  education: [
    {
      id: 'edu-1',
      institution: 'University of California, Berkeley',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startDate: '2015-09',
      endDate: '2019-05',
      current: false,
      gpa: '3.8',
      description: 'Focus on Software Engineering and Artificial Intelligence'
    }
  ],
  skills: [
    { id: 'skill-1', name: 'JavaScript/TypeScript', category: 'technical', level: 'expert' },
    { id: 'skill-2', name: 'React', category: 'technical', level: 'expert' },
    { id: 'skill-3', name: 'Node.js', category: 'technical', level: 'advanced' },
    { id: 'skill-4', name: 'Next.js', category: 'technical', level: 'advanced' },
    { id: 'skill-5', name: 'Python', category: 'technical', level: 'intermediate' },
    { id: 'skill-6', name: 'PostgreSQL', category: 'technical', level: 'advanced' },
    { id: 'skill-7', name: 'MongoDB', category: 'technical', level: 'intermediate' },
    { id: 'skill-8', name: 'Git', category: 'tool', level: 'expert' },
    { id: 'skill-9', name: 'Docker', category: 'tool', level: 'advanced' },
    { id: 'skill-10', name: 'AWS', category: 'tool', level: 'intermediate' },
    { id: 'skill-11', name: 'Problem Solving', category: 'soft', level: 'expert' },
    { id: 'skill-12', name: 'Team Collaboration', category: 'soft', level: 'expert' },
  ],
  languages: [
    { id: 'lang-1', name: 'English', level: 'expert' },
    { id: 'lang-2', name: 'Spanish', level: 'intermediate' },
  ],
  certificates: [],
  theme: defaultCVTheme,
  sectionOrder: defaultSectionOrder,
  footer: defaultFooter,
}
