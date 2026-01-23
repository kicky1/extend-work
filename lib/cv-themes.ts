import type { CVTheme } from './types/cv'

export const predefinedThemes: Record<string, CVTheme> = {
  ats: {
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
  },
  professional: {
    colors: {
      primary: '#3B82F6',
      accent: '#10B981',
      text: '#1F2937',
      background: '#FFFFFF',
    },
    fonts: {
      heading: 'DM Sans',
      body: 'DM Sans',
    },
    layout: 'classic',
    headerStyle: 'centered',
    skillsStyle: 'list',
    languagesStyle: 'inline',
    sectionDivider: 'line',
    bulletStyle: 'disc',
    showHeaderIcons: true,
  },
  creative: {
    colors: {
      primary: '#8B5CF6',
      accent: '#EC4899',
      text: '#18181B',
      background: '#FFFFFF',
    },
    fonts: {
      heading: 'DM Sans',
      body: 'DM Sans',
    },
    layout: 'modern',
    headerStyle: 'left-aligned',
    skillsStyle: 'pills',
    languagesStyle: 'pills',
    sectionDivider: 'accent-bar',
    bulletStyle: 'arrow',
    showHeaderIcons: true,
  },
  minimal: {
    colors: {
      primary: '#374151',
      accent: '#6B7280',
      text: '#111827',
      background: '#FFFFFF',
    },
    fonts: {
      heading: 'Geist',
      body: 'Geist',
    },
    layout: 'minimal',
    headerStyle: 'left-aligned',
    skillsStyle: 'list',
    languagesStyle: 'inline',
    sectionDivider: 'none',
    bulletStyle: 'dash',
    showHeaderIcons: false,
  },
  elegant: {
    colors: {
      primary: '#1E40AF',
      accent: '#059669',
      text: '#0F172A',
      background: '#FFFFFF',
    },
    fonts: {
      heading: 'Playfair Display',
      body: 'Inter',
    },
    layout: 'classic',
    headerStyle: 'centered',
    skillsStyle: 'grid',
    languagesStyle: 'grid',
    sectionDivider: 'dotted',
    bulletStyle: 'circle',
    showHeaderIcons: true,
  },
  executive: {
    colors: {
      primary: '#0F172A',
      accent: '#D97706',
      text: '#1E293B',
      background: '#FFFFFF',
    },
    fonts: {
      heading: 'Playfair Display',
      body: 'Inter',
    },
    layout: 'classic',
    headerStyle: 'split',
    skillsStyle: 'bars',
    languagesStyle: 'bars',
    sectionDivider: 'accent-bar',
    bulletStyle: 'square',
    showHeaderIcons: true,
  },
}

export const fontOptions = [
  'Arial',
  'Calibri',
  'DM Sans',
  'Geist',
  'Inter',
  'Roboto',
  'Open Sans',
  'Lato',
  'Merriweather',
  'Playfair Display',
]

export const layoutOptions: Array<CVTheme['layout']> = ['classic', 'modern', 'minimal']
