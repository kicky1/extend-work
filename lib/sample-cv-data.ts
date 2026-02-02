export interface SampleCVData {
  name: string
  initials: string
  title: string
  email: string
  location: string
  skills: string[]
  hasAvatar: boolean
  experience: {
    role: string
    company: string
    period: string
  }[]
}

export const sampleCVData: SampleCVData[] = [
  {
    name: 'Sarah Chen',
    initials: 'SC',
    title: 'Marketing Manager',
    email: 'sarah.chen@email.com',
    location: 'San Francisco, CA',
    skills: ['Brand Strategy', 'SEO/SEM', 'Analytics', 'Content'],
    hasAvatar: true,
    experience: [
      { role: 'Marketing Manager', company: 'TechBrand Inc.', period: '2022-Present' },
      { role: 'Marketing Specialist', company: 'StartupGrow', period: '2019-2022' },
    ],
  },
  {
    name: 'Alex Johnson',
    initials: 'AJ',
    title: 'Software Engineer',
    email: 'alex.j@email.com',
    location: 'Seattle, WA',
    skills: ['React', 'TypeScript', 'Node.js', 'AWS'],
    hasAvatar: false,
    experience: [
      { role: 'Senior Engineer', company: 'CloudScale', period: '2021-Present' },
      { role: 'Software Developer', company: 'DevStudio', period: '2018-2021' },
    ],
  },
  {
    name: 'Michael Roberts',
    initials: 'MR',
    title: 'Financial Analyst',
    email: 'm.roberts@email.com',
    location: 'New York, NY',
    skills: ['Financial Modeling', 'Excel', 'SQL', 'Tableau'],
    hasAvatar: true,
    experience: [
      { role: 'Senior Analyst', company: 'Goldman & Co.', period: '2020-Present' },
      { role: 'Junior Analyst', company: 'FinanceFirst', period: '2017-2020' },
    ],
  },
  {
    name: 'Emily Thompson',
    initials: 'ET',
    title: 'Healthcare Admin',
    email: 'emily.t@email.com',
    location: 'Boston, MA',
    skills: ['HIPAA', 'EHR Systems', 'Operations', 'Compliance'],
    hasAvatar: false,
    experience: [
      { role: 'Admin Director', company: 'MedCare Hospital', period: '2021-Present' },
      { role: 'Operations Coord.', company: 'HealthPlus', period: '2018-2021' },
    ],
  },
  {
    name: 'David Kim',
    initials: 'DK',
    title: 'Legal Counsel',
    email: 'david.kim@email.com',
    location: 'Chicago, IL',
    skills: ['Contract Law', 'M&A', 'Compliance', 'Litigation'],
    hasAvatar: true,
    experience: [
      { role: 'Senior Counsel', company: 'LawGroup LLP', period: '2019-Present' },
      { role: 'Associate', company: 'Legal Partners', period: '2015-2019' },
    ],
  },
  {
    name: 'Luna Martinez',
    initials: 'LM',
    title: 'Creative Director',
    email: 'luna.m@email.com',
    location: 'Los Angeles, CA',
    skills: ['Brand Design', 'Adobe Suite', 'Motion', 'UI/UX'],
    hasAvatar: true,
    experience: [
      { role: 'Creative Director', company: 'DesignCraft', period: '2020-Present' },
      { role: 'Senior Designer', company: 'Artistry Co.', period: '2016-2020' },
    ],
  },
  {
    name: 'James Wilson',
    initials: 'JW',
    title: 'Civil Engineer',
    email: 'j.wilson@email.com',
    location: 'Denver, CO',
    skills: ['AutoCAD', 'Project Mgmt', 'Structural', 'LEED'],
    hasAvatar: false,
    experience: [
      { role: 'Lead Engineer', company: 'BuildRight Corp.', period: '2019-Present' },
      { role: 'Project Engineer', company: 'CityBuilders', period: '2015-2019' },
    ],
  },
  {
    name: 'Rachel Green',
    initials: 'RG',
    title: 'Sales Director',
    email: 'rachel.g@email.com',
    location: 'Austin, TX',
    skills: ['B2B Sales', 'CRM', 'Negotiations', 'Team Lead'],
    hasAvatar: false,
    experience: [
      { role: 'Sales Director', company: 'SalesPro Inc.', period: '2021-Present' },
      { role: 'Account Manager', company: 'GrowthCo', period: '2017-2021' },
    ],
  },
  {
    name: 'Thomas Brown',
    initials: 'TB',
    title: 'HR Manager',
    email: 't.brown@email.com',
    location: 'Atlanta, GA',
    skills: ['Recruiting', 'HRIS', 'Benefits', 'Training'],
    hasAvatar: true,
    experience: [
      { role: 'HR Manager', company: 'PeopleFirst', period: '2020-Present' },
      { role: 'HR Specialist', company: 'TalentHub', period: '2016-2020' },
    ],
  },
  {
    name: 'Sophia Davis',
    initials: 'SD',
    title: 'Teacher',
    email: 'sophia.d@email.com',
    location: 'Portland, OR',
    skills: ['Curriculum Dev', 'EdTech', 'Assessment', 'IEP'],
    hasAvatar: true,
    experience: [
      { role: 'Lead Teacher', company: 'Lincoln Elementary', period: '2019-Present' },
      { role: 'Teacher', company: 'Westside School', period: '2015-2019' },
    ],
  },
]
