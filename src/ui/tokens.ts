// Design tokens — editorial / letterpress feel.
// Restrained palette: paper (cream), ink (near-black), ochre accent.

export const palette = {
  paper: '#F2EDE4',
  paperDeep: '#E8E0D1',
  paperSoft: '#EDE7DB',
  ink: '#1A1814',
  inkSoft: '#3B362D',
  inkMuted: '#6B6256',
  inkFaint: '#A49A8A',
  rule: '#2A2620',
  ruleSoft: '#C8BEA9',
  ochre: '#C85C2E',
  ochreDeep: '#A8481E',
  forest: '#2E5941',
  slate: '#3A4553',
  bordeaux: '#7A2E2E',
  success: '#4A6B3A',
  warn: '#B8761A',
  danger: '#9C3A28',
} as const;

export const space = {
  hair: 1,
  xxs: 2,
  xs: 4,
  s: 8,
  m: 12,
  l: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
  gutter: 20,
  page: 24,
} as const;

export const radius = {
  none: 0,
  s: 2,
  m: 4,
  pill: 999,
} as const;

export const typeScale = {
  micro: 10,
  caption: 12,
  body: 15,
  bodyL: 17,
  lead: 19,
  h5: 20,
  h4: 24,
  h3: 30,
  h2: 38,
  h1: 52,
  display: 72,
} as const;

export const fonts = {
  display: 'Fraunces_700Bold',
  displayItalic: 'Fraunces_400Regular_Italic',
  serif: 'Fraunces_400Regular',
  serifMedium: 'Fraunces_500Medium',
  sans: 'Inter_400Regular',
  sansMedium: 'Inter_500Medium',
  sansBold: 'Inter_700Bold',
  mono: 'JetBrainsMono_400Regular',
  monoMedium: 'JetBrainsMono_500Medium',
} as const;

export type FontKey = keyof typeof fonts;

export const durations = {
  fast: 140,
  med: 240,
  slow: 420,
} as const;
