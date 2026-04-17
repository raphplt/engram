import { Pack } from '../types';

// Régions françaises (13 métropolitaines + 5 DROM = 18)
const cards: Array<{ region: string; capital: string; note?: string; difficulty: 1 | 2 | 3 | 4 }> = [
  { region: 'Île-de-France', capital: 'Paris', difficulty: 1 },
  { region: 'Provence-Alpes-Côte d’Azur', capital: 'Marseille', difficulty: 1 },
  { region: 'Auvergne-Rhône-Alpes', capital: 'Lyon', difficulty: 1 },
  { region: 'Occitanie', capital: 'Toulouse', difficulty: 1 },
  { region: 'Nouvelle-Aquitaine', capital: 'Bordeaux', difficulty: 1 },
  { region: 'Hauts-de-France', capital: 'Lille', difficulty: 1 },
  { region: 'Grand Est', capital: 'Strasbourg', difficulty: 2 },
  { region: 'Pays de la Loire', capital: 'Nantes', difficulty: 1 },
  { region: 'Bretagne', capital: 'Rennes', difficulty: 1 },
  { region: 'Normandie', capital: 'Rouen', difficulty: 2, note: 'Caen est la préfecture du Calvados.' },
  { region: 'Centre-Val de Loire', capital: 'Orléans', difficulty: 2 },
  { region: 'Bourgogne-Franche-Comté', capital: 'Dijon', difficulty: 2 },
  { region: 'Corse', capital: 'Ajaccio', difficulty: 2 },
  { region: 'Guadeloupe', capital: 'Basse-Terre', difficulty: 3, note: 'Chef-lieu officiel, mais Pointe-à-Pitre est plus peuplée.' },
  { region: 'Martinique', capital: 'Fort-de-France', difficulty: 2 },
  { region: 'Guyane', capital: 'Cayenne', difficulty: 2 },
  { region: 'La Réunion', capital: 'Saint-Denis', difficulty: 2 },
  { region: 'Mayotte', capital: 'Mamoudzou', difficulty: 3 },
];

export const frRegionsPack: Pack = {
  theme: {
    id: 'geo.fr.regions',
    parentId: 'geo.fr',
    title: 'Régions françaises',
    subtitle: 'Les 18 régions et leurs chefs-lieux',
    category: 'geography',
    description:
      '13 régions métropolitaines et 5 régions d’outre-mer — capitale / chef-lieu de chacune.',
    color: '#2E5941',
    sortOrder: 10,
  },
  cards: cards.map((c, i) => ({
    id: `geo.fr.regions.${i + 1}`,
    themeId: 'geo.fr.regions',
    front: c.region,
    back: c.capital,
    hint: 'Chef-lieu de région',
    note: c.note,
    difficulty: c.difficulty,
    tags: ['france', 'regions'],
  })),
};
