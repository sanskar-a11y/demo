export const BRAND = {
  name: 'DEMO',
  tagline: 'Liquid Luxury. Crafted in Velvet.',
  subtitle: 'Protein + Caffeine',
  description: 'A revolutionary blend of high-octane caffeine and muscle-building protein. Spylt is designed for those who refuse to compromise on energy or nutrition. Grab a can, fuel your fire, and crush your day.',
} as const;

export const NAV_ITEMS = [
  { label: 'Home', href: '#hero' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
] as const;

export const GALLERY_ITEMS = [
  {
    id: 1,
    src: '/drink/ezgif-frame-050.jpg',
    title: 'Orange Blast',
    description: 'A surge of citrus energy to kickstart your morning',
  },
  {
    id: 2,
    src: '/drink/ezgif-frame-070.jpg',
    title: 'Mocha Charge',
    description: 'Deep chocolate meets high-voltage espresso',
  },
  {
    id: 3,
    src: '/drink/ezgif-frame-090.jpg',
    title: 'Vanilla Strike',
    description: 'Smooth vanilla bean with a protein punch',
  },
  {
    id: 4,
    src: '/drink/ezgif-frame-100.jpg',
    title: 'Caramel Rush',
    description: 'Sweet caramel notes riding a wave of caffeine',
  },
  {
    id: 5,
    src: '/drink/ezgif-frame-120.jpg',
    title: 'Berry Blitz',
    description: 'Wild berries packed with fuel and flavor',
  },
  {
    id: 6,
    src: '/drink/ezgif-frame-140.jpg',
    title: 'Nitro Cold Brew',
    description: 'Extra smooth, extra strong, pure focus',
  },
  {
    id: 7,
    src: '/drink/ezgif-frame-150.jpg',
    title: 'Spylt Zero',
    description: 'All the energy, zero sugar, max performance',
  },
  {
    id: 8,
    src: '/drink/ezgif-frame-170.jpg',
    title: 'The Original',
    description: 'Our signature Spylt blend — unapologetically bold',
  },
] as const;

export const ABOUT_FEATURES = [
  {
    title: 'High Protein',
    description: 'Packed with premium whey isolate to fuel your muscles and keep you full.',
    icon: '⚡',
  },
  {
    title: 'Clean Energy',
    description: 'Sourced from natural caffeine for a smooth, crash-free surge of power.',
    icon: '🔥',
  },
  {
    title: 'Bold Flavor',
    description: 'No chalky aftertaste. Just rich, uncompromised flavor that hits hard.',
    icon: '💥',
  },
] as const;

export const ABOUT_STATS = [
  { value: 30, suffix: 'g', label: 'Protein per Can' },
  { value: 200, suffix: 'mg', label: 'Natural Caffeine' },
  { value: 0, suffix: 'g', label: 'Added Sugar' },
  { value: 100, suffix: '%', label: 'Unapologetic' },
] as const;

export const COLORS = {
  midnight: '#050505',
  surface: '#140307',
  berry: '#7A0026',
  rose: '#FF4F87',
  pearl: '#FFF5F7',
};

export const FRAME_COUNT = 192;
export const FRAME_PATH = '/drink/ezgif-frame-';
