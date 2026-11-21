export interface FontOption {
  id: string;
  name: string;
  category: string;
  description: string;
  fontFamily: string;
  previewSample: string;
  provider: 'google' | 'fontshare';
}

export const defaultFontId = 'manrope';

export const fontOptions: FontOption[] = [
  {
    id: 'manrope',
    name: 'Manrope',
    category: 'Geometric Sans',
    description: 'Modern, balanced default UI typeface',
    fontFamily: "'Manrope', ui-sans-serif, system-ui, sans-serif",
    previewSample: 'Sphinx of black quartz, judge my vow',
    provider: 'google',
  },
  {
    id: 'supreme',
    name: 'Supreme',
    category: 'Modern Geometric',
    description: 'Constructivist, clean neo-grotesque',
    fontFamily: "'Supreme', ui-sans-serif, system-ui, sans-serif",
    previewSample: 'Sphinx of black quartz, judge my vow',
    provider: 'fontshare',
  },
  {
    id: 'inter',
    name: 'Inter',
    category: 'Neo-grotesque',
    description: 'High-precision interface standard',
    fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif",
    previewSample: 'Sphinx of black quartz, judge my vow',
    provider: 'google',
  },
  {
    id: 'roboto',
    name: 'Roboto',
    category: 'Neo-grotesque',
    description: 'Crisp, universally recognizable clarity',
    fontFamily: "'Roboto', ui-sans-serif, system-ui, sans-serif",
    previewSample: 'Sphinx of black quartz, judge my vow',
    provider: 'google',
  },
  {
    id: 'instrument-serif',
    name: 'Instrument Serif',
    category: 'Editorial Serif',
    description: 'Expressive, refined luxury serif',
    fontFamily: "'Instrument Serif', Georgia, serif",
    previewSample: 'Sphinx of black quartz, judge my vow',
    provider: 'google',
  },
  {
    id: 'jetbrains-mono',
    name: 'JetBrains Mono',
    category: 'Developer Monospace',
    description: 'Engineered for dense technical comprehension',
    fontFamily: "'JetBrains Mono', ui-monospace, monospace",
    previewSample: 'Sphinx of black quartz, judge my vow',
    provider: 'google',
  },
];
