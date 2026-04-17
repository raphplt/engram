import { Pack } from '../types';

type Entry = { front: string; back: string; hint?: string; note?: string; difficulty: 1 | 2 | 3 | 4 };

const entries: Entry[] = [
  { front: 'Éléments d’Euclide', back: 'Vers -300', hint: 'Fondements de la géométrie', difficulty: 3 },
  { front: 'Principe d’Archimède', back: 'Vers -250', difficulty: 3 },
  { front: 'Almageste de Ptolémée', back: 'IIᵉ siècle', hint: 'Modèle géocentrique', difficulty: 3 },
  { front: 'De Revolutionibus — Copernic', back: '1543', hint: 'Héliocentrisme', difficulty: 2 },
  { front: 'Lunette de Galilée', back: '1609', hint: 'Observation de Jupiter', difficulty: 3 },
  { front: 'Lois de Kepler (publiées)', back: '1609-1619', difficulty: 3 },
  { front: 'Principia — Newton', back: '1687', hint: 'Gravitation universelle', difficulty: 2 },
  { front: 'Classification de Linné', back: '1735', hint: 'Systema Naturae', difficulty: 3 },
  { front: 'Lavoisier — loi de conservation', back: '1789', hint: '« Rien ne se perd... »', difficulty: 3 },
  { front: 'Vaccination de Jenner', back: '1796', hint: 'Variole', difficulty: 3 },
  { front: 'Théorie atomique de Dalton', back: '1808', difficulty: 4 },
  { front: 'Induction électromagnétique (Faraday)', back: '1831', difficulty: 3 },
  { front: 'Voyage du Beagle (Darwin)', back: '1831-1836', difficulty: 3 },
  { front: 'L’Origine des espèces', back: '1859', difficulty: 2 },
  { front: 'Tableau périodique — Mendeleïev', back: '1869', difficulty: 2 },
  { front: 'Pasteurisation (publiée)', back: '1864', difficulty: 3 },
  { front: 'Équations de Maxwell', back: '1865', hint: 'Électromagnétisme', difficulty: 3 },
  { front: 'Ampoule électrique (Edison)', back: '1879', difficulty: 2 },
  { front: 'Rayons X — Röntgen', back: '1895', difficulty: 3 },
  { front: 'Découverte du radium', back: '1898', hint: 'Pierre et Marie Curie', difficulty: 2 },
  { front: 'Quanta — Planck', back: '1900', difficulty: 3 },
  { front: 'Relativité restreinte', back: '1905', hint: 'Einstein, annus mirabilis', difficulty: 2 },
  { front: 'Relativité générale', back: '1915', hint: 'Einstein', difficulty: 2 },
  { front: 'Modèle atomique de Bohr', back: '1913', difficulty: 3 },
  { front: 'Pénicilline — Fleming', back: '1928', difficulty: 2 },
  { front: 'Fission nucléaire (Hahn, Meitner)', back: '1938', difficulty: 3 },
  { front: 'ENIAC — premier ordinateur généraliste', back: '1946', difficulty: 3 },
  { front: 'Structure de l’ADN (Watson, Crick, Franklin)', back: '1953', difficulty: 2 },
  { front: 'Premier satellite (Spoutnik)', back: '4 octobre 1957', difficulty: 2 },
  { front: 'Premier homme dans l’espace', back: '12 avril 1961', hint: 'Youri Gagarine', difficulty: 2 },
  { front: 'Apollo 11 — alunissage', back: '20 juillet 1969', difficulty: 1 },
  { front: 'Première FIV — Louise Brown', back: '1978', difficulty: 3 },
  { front: 'Découverte du virus du SIDA (Institut Pasteur)', back: '1983', difficulty: 2 },
  { front: 'World Wide Web — Tim Berners-Lee', back: '1989-1991', difficulty: 2 },
  { front: 'Projet génome humain achevé', back: '2003', difficulty: 3 },
  { front: 'Observation des ondes gravitationnelles', back: '2015', hint: 'LIGO', difficulty: 3 },
  { front: 'Première image d’un trou noir', back: '2019', hint: 'M87', difficulty: 2 },
  { front: 'Vaccins ARNm — autorisation Covid', back: 'Décembre 2020', difficulty: 2 },
];

const baseId = 'hist.science';

export const historySciencePack: Pack = {
  theme: {
    id: baseId,
    title: 'Histoire des sciences',
    subtitle: `${entries.length} découvertes et théories`,
    category: 'history',
    description: 'Les grandes bornes intellectuelles : dates, découvreurs, contexte.',
    color: '#3A4553',
    sortOrder: 53,
  },
  cards: entries.map((e, i) => ({
    id: `${baseId}.${String(i).padStart(3, '0')}`,
    themeId: baseId,
    front: e.front,
    back: e.back,
    hint: e.hint,
    note: e.note,
    difficulty: e.difficulty,
    tags: ['histoire', 'sciences'],
  })),
};
