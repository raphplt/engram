import { Pack } from '../types';

type Entry = { front: string; back: string; hint?: string; note?: string; difficulty: 1 | 2 | 3 | 4 };

const entries: Entry[] = [
  { front: 'Invention de l’écriture (Sumer)', back: 'Vers -3300', hint: 'Cunéiforme', difficulty: 3 },
  { front: 'Code d’Hammourabi', back: 'Vers -1750', difficulty: 3 },
  { front: 'Naissance de Bouddha', back: 'Vers -563', difficulty: 3 },
  { front: 'Dynastie Qin — unification de la Chine', back: '-221', hint: 'Qin Shi Huang', difficulty: 2 },
  { front: 'Construction du Colisée', back: '70-80 apr. J.-C.', difficulty: 3 },
  { front: 'Hégire (calendrier musulman)', back: '622', hint: 'Médine', difficulty: 2 },
  { front: 'Dynastie Tang', back: '618-907', hint: 'Âge d’or chinois', difficulty: 3 },
  { front: 'Empire mongol — Gengis Khan', back: '1206', difficulty: 2 },
  { front: 'Chute de Bagdad (Mongols)', back: '1258', difficulty: 3 },
  { front: 'Voyages de Zheng He', back: '1405-1433', hint: 'Flottes chinoises des Ming', difficulty: 3 },
  { front: 'Prise de Tenochtitlán (Cortés)', back: '1521', hint: 'Chute de l’empire aztèque', difficulty: 2 },
  { front: 'Conquête de l’empire inca', back: '1532', hint: 'Pizarro, Atahualpa', difficulty: 2 },
  { front: 'Shogunat Tokugawa', back: '1603-1868', hint: 'Fermeture du Japon', difficulty: 3 },
  { front: 'Guerre de Sept Ans', back: '1756-1763', hint: 'Première guerre mondialisée', difficulty: 3 },
  { front: 'Indépendance des États-Unis', back: '4 juillet 1776', difficulty: 1 },
  { front: 'Guerre de Sécession', back: '1861-1865', difficulty: 2 },
  { front: 'Ère Meiji (Japon)', back: '1868-1912', hint: 'Modernisation', difficulty: 2 },
  { front: 'Conférence de Berlin (partage de l’Afrique)', back: '1884-1885', difficulty: 3 },
  { front: 'Révolution chinoise (République)', back: '1911', hint: 'Sun Yat-sen', difficulty: 3 },
  { front: 'Indépendance de l’Inde', back: '15 août 1947', hint: 'Nehru, Gandhi', difficulty: 1 },
  { front: 'Création de l’État d’Israël', back: '14 mai 1948', difficulty: 2 },
  { front: 'Révolution communiste chinoise', back: '1949', hint: 'Mao Zedong', difficulty: 2 },
  { front: 'Guerre de Corée', back: '1950-1953', difficulty: 2 },
  { front: 'Crise de Suez', back: '1956', difficulty: 3 },
  { front: 'Crise des missiles de Cuba', back: 'Octobre 1962', difficulty: 2 },
  { front: 'Assassinat de JFK', back: '22 novembre 1963', difficulty: 2 },
  { front: 'Révolution culturelle chinoise', back: '1966-1976', difficulty: 3 },
  { front: 'Premier homme sur la Lune', back: '20 juillet 1969', hint: 'Apollo 11', difficulty: 1 },
  { front: 'Fin de la guerre du Vietnam', back: '30 avril 1975', hint: 'Chute de Saïgon', difficulty: 2 },
  { front: 'Révolution iranienne', back: '1979', hint: 'Khomeini', difficulty: 2 },
  { front: 'Place Tian’anmen', back: '4 juin 1989', difficulty: 2 },
  { front: 'Fin de l’apartheid — Mandela président', back: '1994', difficulty: 1 },
  { front: 'Attentats du 11 septembre', back: '2001', difficulty: 1 },
  { front: 'Printemps arabe (Tunisie)', back: 'Décembre 2010', difficulty: 2 },
];

const baseId = 'hist.world';

export const historyWorldPack: Pack = {
  theme: {
    id: baseId,
    title: 'Histoire du monde',
    subtitle: `${entries.length} jalons, Antiquité → XXIᵉ siècle`,
    category: 'history',
    description: 'Les grands faits de l’histoire mondiale hors Europe ou à portée globale.',
    color: '#7A2E2E',
    sortOrder: 52,
  },
  cards: entries.map((e, i) => ({
    id: `${baseId}.${String(i).padStart(3, '0')}`,
    themeId: baseId,
    front: e.front,
    back: e.back,
    hint: e.hint,
    note: e.note,
    difficulty: e.difficulty,
    tags: ['histoire', 'monde'],
  })),
};
