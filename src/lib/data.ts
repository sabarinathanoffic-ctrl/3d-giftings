import type { Miniature } from './types';

export const miniatures: Miniature[] = [
  {
    id: '1',
    name: 'Dragon Knight',
    description: 'A fierce dragon knight armed with a legendary sword.',
    price: 2499,
    imageUrls: [
      'https://picsum.photos/seed/min1a/600/400',
      'https://picsum.photos/seed/min1b/600/400',
      'https://picsum.photos/seed/min1c/600/400',
    ],
    imageHints: ['fantasy knight', 'dragon armor', 'warrior'],
    isFeatured: true,
  },
  {
    id: '2',
    name: 'Elven Archer',
    description: 'A sharp-eyed elven archer from the mystical forests.',
    price: 1999,
    imageUrls: [
      'https://picsum.photos/seed/min2a/600/400',
      'https://picsum.photos/seed/min2b/600/400',
    ],
    imageHints: ['fantasy archer', 'elf'],
  },
  {
    id: '3',
    name: 'Dwarven Warrior',
    description: 'A sturdy dwarven warrior with an unbreakable shield.',
    price: 2299,
    imageUrls: [
      'https://picsum.photos/seed/min3a/600/400',
      'https://picsum.photos/seed/min3b/600/400',
      'https://picsum.photos/seed/min3c/600/400',
    ],
    imageHints: ['fantasy dwarf', 'axe warrior'],
    onSale: { label: '20% OFF' },
  },
  {
    id: '4',
    name: 'Orc Berserker',
    description: 'A raging orc berserker ready for battle.',
    price: 2199,
    imageUrls: ['https://picsum.photos/seed/min4a/600/400'],
    imageHints: ['fantasy orc'],
  },
  {
    id: '5',
    name: 'Mystic Sorceress',
    description: 'A powerful sorceress wielding arcane energies.',
    price: 2399,
    imageUrls: [
      'https://picsum.photos/seed/min5a/600/400',
      'https://picsum.photos/seed/min5b/600/400',
    ],
    imageHints: ['fantasy sorceress', 'magic user'],
    isFeatured: true,
  },
  {
    id: '6',
    name: 'Goblin Scout',
    description: 'A sneaky goblin scout, perfect for ambushes.',
    price: 1599,
    imageUrls: ['https://picsum.photos/seed/min6a/600/400'],
    imageHints: ['fantasy goblin'],
    onSale: { label: 'SALE' },
  },
  {
    id: '7',
    name: 'Human Paladin',
    description: 'A righteous paladin, defender of the innocent.',
    price: 2499,
    imageUrls: [
      'https://picsum.photos/seed/min7a/600/400',
      'https://picsum.photos/seed/min7b/600/400',
    ],
    imageHints: ['fantasy paladin', 'holy knight'],
  },
  {
    id: '8',
    name: 'Undead Lich',
    description: 'A terrifying lich commanding legions of the dead.',
    price: 2799,
    imageUrls: ['https://picsum.photos/seed/min8a/600/400'],
    imageHints: ['fantasy lich', 'undead wizard'],
  },
];
