import { Pack } from '../types';

type Entry = { front: string; back: string; hint?: string; note?: string; difficulty: 1 | 2 | 3 | 4 };

const entries: Entry[] = [
  { front: 'Chute de l’Empire romain d’Occident', back: '476', hint: 'Déposition de Romulus Augustule', difficulty: 2 },
  { front: 'Couronnement d’Otton Iᵉʳ', back: '962', hint: 'Saint-Empire romain germanique', difficulty: 3 },
  { front: 'Schisme d’Orient', back: '1054', hint: 'Rome / Constantinople', difficulty: 2 },
  { front: 'Magna Carta', back: '1215', hint: 'Jean sans Terre', note: 'Fondement des libertés individuelles britanniques.', difficulty: 2 },
  { front: 'Chute de Constantinople', back: '1453', hint: 'Fin de l’Empire byzantin', difficulty: 1 },
  { front: 'Découverte de l’Amérique', back: '1492', hint: 'Christophe Colomb', difficulty: 1 },
  { front: '95 thèses de Luther', back: '1517', hint: 'Début de la Réforme', difficulty: 2 },
  { front: 'Paix d’Augsbourg', back: '1555', hint: '« Cujus regio, ejus religio »', difficulty: 3 },
  { front: 'Paix de Westphalie', back: '1648', hint: 'Fin guerre de Trente Ans', note: 'Souveraineté des États modernes.', difficulty: 2 },
  { front: 'Glorious Revolution', back: '1688', hint: 'Guillaume III d’Orange', difficulty: 3 },
  { front: 'Révolution américaine', back: '1776', hint: 'Déclaration d’indépendance', difficulty: 1 },
  { front: 'Congrès de Vienne', back: '1814-1815', hint: 'Après Napoléon', difficulty: 2 },
  { front: 'Printemps des peuples', back: '1848', hint: 'Révolutions européennes', difficulty: 2 },
  { front: 'Unification italienne', back: '1861', hint: 'Cavour, Garibaldi, Victor-Emmanuel II', difficulty: 2 },
  { front: 'Unification allemande', back: '1871', hint: 'Bismarck, proclamation à Versailles', difficulty: 2 },
  { front: 'Révolution russe d’Octobre', back: '1917', hint: 'Prise du Palais d’Hiver', difficulty: 1 },
  { front: 'Traité de Versailles', back: '28 juin 1919', difficulty: 1 },
  { front: 'Hitler chancelier', back: '30 janvier 1933', difficulty: 2 },
  { front: 'Invasion de la Pologne', back: '1er septembre 1939', difficulty: 1 },
  { front: 'Capitulation allemande', back: '8 mai 1945', difficulty: 1 },
  { front: 'Fondation de l’ONU', back: '24 octobre 1945', difficulty: 2 },
  { front: 'Plan Marshall', back: '1948', hint: 'Aide américaine à l’Europe', difficulty: 2 },
  { front: 'Traité de Rome (CEE)', back: '25 mars 1957', difficulty: 2 },
  { front: 'Construction du Mur de Berlin', back: '13 août 1961', difficulty: 2 },
  { front: 'Chute du Mur de Berlin', back: '9 novembre 1989', difficulty: 1 },
  { front: 'Dissolution de l’URSS', back: '25 décembre 1991', difficulty: 2 },
  { front: 'Traité de Maastricht', back: '7 février 1992', hint: 'Création de l’Union européenne', difficulty: 2 },
  { front: 'Guerre du Kosovo', back: '1998-1999', difficulty: 3 },
  { front: 'Élargissement de l’UE à l’Est', back: '1er mai 2004', hint: '10 nouveaux membres', difficulty: 3 },
  { front: 'Brexit — référendum', back: '23 juin 2016', difficulty: 2 },
];

const baseId = 'hist.europe';

export const historyEuropePack: Pack = {
  theme: {
    id: baseId,
    title: 'Histoire européenne',
    subtitle: `${entries.length} repères, du Moyen Âge à aujourd’hui`,
    category: 'history',
    description: 'Les bornes essentielles de l’histoire du continent européen hors France.',
    color: '#7A2E2E',
    sortOrder: 51,
  },
  cards: entries.map((e, i) => ({
    id: `${baseId}.${String(i).padStart(3, '0')}`,
    themeId: baseId,
    front: e.front,
    back: e.back,
    hint: e.hint,
    note: e.note,
    difficulty: e.difficulty,
    tags: ['histoire', 'europe'],
  })),
};
