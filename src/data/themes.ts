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
 * PrismCode palettes.
 * Carbon Pulse is preserved as the signature default with its distinct dot-grid texture.
 * The remaining palettes feature rich, distinct chromatic dark-mode identities so each
 * theme possesses an unmistakable ambiance and high visual contrast.
 */
export const themePalettes: ThemePalette[] = [
  {
    id: 'carbon',
    name: 'Carbon Pulse',
    description: 'Clean graphite surfaces with an electric teal accent and signature dot grid',
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
    id: 'copper',
    name: 'Molten Bronze',
    description: 'Warm espresso canvas with glowing molten copper and silk bronze light rays',
    colors: ['#FDF8F5', '#F5EAE1', '#E8D5C4', '#C2410C', '#B45309'],
    primary: '#C2410C',
    secondary: '#B45309',
    editorDark: '#181310',
    editorLight: '#FCFAF7',
    darkCanvas: '#0E0B08',
    darkSurface: '#1A1410',
    darkPrimary: '#F97316',
    darkSecondary: '#F59E0B',
    darkColors: ['#0E0B08', '#1A1410', '#3D2817', '#F97316', '#F59E0B'],
  },
  {
    id: 'frost',
    name: 'Glacial Mist',
    description: 'Deep titanium-slate canvas with luminous arctic ice-blue and silver glow',
    colors: ['#F8FAFC', '#EDF2F7', '#CBD5E1', '#0284C7', '#64748B'],
    primary: '#0284C7',
    secondary: '#64748B',
    editorDark: '#0F1726',
    editorLight: '#FAFCFF',
    darkCanvas: '#0A0F18',
    darkSurface: '#111A28',
    darkPrimary: '#38BDF8',
    darkSecondary: '#94A3B8',
    darkColors: ['#0A0F18', '#111A28', '#23334A', '#38BDF8', '#94A3B8'],
  },
  {
    id: 'crimson',
    name: 'Crimson Ember',
    description: 'Deep velvet obsidian canvas with radiant scarlet ruby and rose quartz glow',
    colors: ['#FFF5F7', '#FFE4E8', '#FECDD6', '#E11D48', '#BE123C'],
    primary: '#E11D48',
    secondary: '#FB7185',
    editorDark: '#160C14',
    editorLight: '#FFF8F9',
    darkCanvas: '#0F080E',
    darkSurface: '#180E16',
    darkPrimary: '#F43F5E',
    darkSecondary: '#FDA4AF',
    darkColors: ['#0F080E', '#180E16', '#331726', '#F43F5E', '#FDA4AF'],
  },
  {
    id: 'onyx',
    name: 'Obsidian Onyx',
    description: 'Monochrome obsidian stealth with gleaming platinum silver and diamond accents',
    colors: ['#F8FAFC', '#F1F5F9', '#E2E8F0', '#334155', '#0F172A'],
    primary: '#334155',
    secondary: '#64748B',
    editorDark: '#101217',
    editorLight: '#F8FAFC',
    darkCanvas: '#0A0B0E',
    darkSurface: '#12141A',
    darkPrimary: '#F1F5F9',
    darkSecondary: '#94A3B8',
    darkColors: ['#0A0B0E', '#12141A', '#222733', '#F1F5F9', '#94A3B8'],
  },
  {
    id: 'cobalt',
    name: 'Royal Cobalt',
    description: 'Deep abyssal space navy with radiant electric cobalt and lapis lazuli glow',
    colors: ['#EFF6FF', '#DBEAFE', '#BFDBFE', '#1D4ED8', '#1E40AF'],
    primary: '#1D4ED8',
    secondary: '#2563EB',
    editorDark: '#080D1F',
    editorLight: '#F8FAFF',
    darkCanvas: '#050814',
    darkSurface: '#0B1124',
    darkPrimary: '#3B82F6',
    darkSecondary: '#60A5FA',
    darkColors: ['#050814', '#0B1124', '#152248', '#3B82F6', '#60A5FA'],
  },
  {
    id: 'dune',
    name: 'Sandstone Dunes',
    description: 'Warm minimalist linen canvas with desert sandstone and roasted mocha accents',
    colors: ['#FBF9F5', '#F5EFE6', '#EADCCB', '#9A6A38', '#784E23'],
    primary: '#9A6A38',
    secondary: '#B48252',
    editorDark: '#14100D',
    editorLight: '#FAF8F4',
    darkCanvas: '#0F0C0A',
    darkSurface: '#1A1512',
    darkPrimary: '#D4A373',
    darkSecondary: '#E6CCB2',
    darkColors: ['#0F0C0A', '#1A1512', '#33271F', '#D4A373', '#E6CCB2'],
  },
];

export const defaultPalette: PaletteId = 'carbon';

export function getPalette(id: PaletteId): ThemePalette {
  return themePalettes.find((palette) => palette.id === id) ?? themePalettes[0];
}
