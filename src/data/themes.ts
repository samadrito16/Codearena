import type { PaletteId } from '../types';

export interface ThemePalette {
  id: PaletteId;
  name: string;
  description: string;
  colors: [string, string, string, string, string];
  primary: string;
  secondary: string;
  editorDark: string;
  editorLight: string;
  darkCanvas?: string;
  darkSurface?: string;
  darkPrimary?: string;
  darkSecondary?: string;
  darkColors?: [string, string, string, string, string];
  /** Coolors palette page, when the colors came from a published Coolors palette. */
  sourceUrl?: string;
}

/**
 * CodeArena palettes.
 * Carbon Pulse is preserved as the signature default with its distinct dot-grid texture.
 * The remaining palettes feature rich, distinct chromatic dark-mode identities so each
 * theme possesses an unmistakable ambiance and high visual contrast.
 */
export const themePalettes: ThemePalette[] = [
  {
    id: 'carbon',
    name: 'Carbon Pulse',
    description: 'Clean graphite surfaces with an electric teal accent',
    colors: ['#101A22', '#142A35', '#20B8AE', '#A7E7DA', '#F0F6F7'],
    primary: '#20B8AE',
    secondary: '#E5B35B',
    editorDark: '#0B141B',
    editorLight: '#F8FCFC',
    darkCanvas: '#0A131A',
    darkSurface: '#111E27',
    darkPrimary: '#42CFC2',
    darkSecondary: '#E5B35B',
    darkColors: ['#0A131A', '#111E27', '#1A2A35', '#20B8AE', '#42CFC2'],
  },
  {
    id: 'indigo',
    name: 'Indigo Studio',
    description: 'Deep cosmic midnight sapphire with electric ultraviolet',
    colors: ['#312E81', '#6366F1', '#A78BFA', '#C7D2FE', '#F5F3FF'],
    primary: '#6366F1',
    secondary: '#A78BFA',
    editorDark: '#080D24',
    editorLight: '#FBFBFF',
    darkCanvas: '#060919',
    darkSurface: '#0C122B',
    darkPrimary: '#6366F1',
    darkSecondary: '#A78BFA',
    darkColors: ['#060919', '#0C122B', '#141C42', '#6366F1', '#818CF8'],
  },
  {
    id: 'lagoon',
    name: 'Lagoon Glow',
    description: 'Bioluminescent abyssal teal with fiery amber sparks',
    colors: ['#0A656A', '#0C9AA8', '#B8D6D8', '#F3C8A8', '#F57706'],
    primary: '#0C9AA8',
    secondary: '#F57706',
    editorDark: '#03171E',
    editorLight: '#F7FCFC',
    darkCanvas: '#02141A',
    darkSurface: '#06232C',
    darkPrimary: '#00D2D3',
    darkSecondary: '#FB923C',
    darkColors: ['#02141A', '#06232C', '#0C333E', '#00D2D3', '#FB923C'],
    sourceUrl: 'https://coolors.co/0a656a-0c9aa8-b8d6d8-f3c8a8-f57706',
  },
  {
    id: 'sage',
    name: 'Sage Garden',
    description: 'Nocturnal pine and emerald forest with radiant jade accents',
    colors: ['#F1F7EE', '#B0BEA9', '#92AA83', '#E0EDC5', '#E7F59E'],
    primary: '#6F9167',
    secondary: '#A4B96C',
    editorDark: '#06170E',
    editorLight: '#FAFCF8',
    darkCanvas: '#05140B',
    darkSurface: '#0B2214',
    darkPrimary: '#10B981',
    darkSecondary: '#A3E635',
    darkColors: ['#05140B', '#0B2214', '#123320', '#10B981', '#34D399'],
    sourceUrl: 'https://coolors.co/f1f7ee-b0bea9-92aa83-e0edc5-e7f59e',
  },
  {
    id: 'vivid',
    name: 'Vivid Festival',
    description: 'Cyberpunk neon noir with hot magenta and sunburst gold',
    colors: ['#F03F81', '#8CAF3A', '#3D405B', '#FFF460', '#D65C20'],
    primary: '#D93678',
    secondary: '#D65C20',
    editorDark: '#17061A',
    editorLight: '#FFFAFC',
    darkCanvas: '#140516',
    darkSurface: '#240A28',
    darkPrimary: '#FF2D78',
    darkSecondary: '#F59E0B',
    darkColors: ['#140516', '#240A28', '#36103C', '#FF2D78', '#F59E0B'],
    sourceUrl: 'https://coolors.co/f03f81-8caf3a-3d405b-fff460-d65c20',
  },
  {
    id: 'coastal',
    name: 'Coastal Current',
    description: 'Dusk maritime ocean with seafoam teal and terracotta coral',
    colors: ['#264653', '#2A9D8F', '#E9C46A', '#F4A261', '#E76F51'],
    primary: '#2A9D8F',
    secondary: '#E76F51',
    editorDark: '#08171E',
    editorLight: '#F8FCFA',
    darkCanvas: '#07151B',
    darkSurface: '#0F242E',
    darkPrimary: '#2DD4BF',
    darkSecondary: '#FB7185',
    darkColors: ['#07151B', '#0F242E', '#173644', '#2DD4BF', '#FB7185'],
  },
  {
    id: 'lavender',
    name: 'Lavender Focus',
    description: 'Royal amethyst abyss with luminous celestial violet',
    colors: ['#3C096C', '#7B2CBF', '#9D4EDD', '#C77DFF', '#E0AAFF'],
    primary: '#7B2CBF',
    secondary: '#C77DFF',
    editorDark: '#110720',
    editorLight: '#FCF9FF',
    darkCanvas: '#0E061A',
    darkSurface: '#1A0D30',
    darkPrimary: '#A855F7',
    darkSecondary: '#E879F9',
    darkColors: ['#0E061A', '#1A0D30', '#281448', '#A855F7', '#C084FC'],
  },
];

export const defaultPalette: PaletteId = 'carbon';

export function getPalette(id: PaletteId): ThemePalette {
  return themePalettes.find((palette) => palette.id === id) ?? themePalettes[0];
}
