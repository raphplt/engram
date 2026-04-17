import { Pack } from '../types';

// Bonus 1 — Pensées pour moi-même (Marc Aurèle). Sélection de maximes clés.
const meditationsEntries: Array<{ front: string; back: string; note?: string; difficulty: 1 | 2 | 3 | 4 }> = [
  { front: 'Maxime sur l’instant', back: '« Tu peux commencer une nouvelle vie. Recommence à voir les choses comme tu avais coutume de les voir ; c’est en cela que renaître consiste. »', difficulty: 3 },
  { front: 'Sur les obstacles', back: '« L’obstacle à l’action fait progresser l’action. Ce qui se met en travers de notre chemin devient le chemin. »', note: 'Célèbre reformulation : "The obstacle is the way".', difficulty: 2 },
  { front: 'Sur les actions d’autrui', back: '« Commence chaque matin en te disant : aujourd’hui je rencontrerai des importuns, des ingrats… tout cela leur arrive parce qu’ils ne savent pas distinguer le bien du mal. »', difficulty: 3 },
  { front: 'Sur la vie brève', back: '« Ne vis pas comme si tu avais dix mille années devant toi. La mort est au-dessus de ta tête. Tant que tu vis, tant que tu le peux, sois bon. »', difficulty: 2 },
  { front: 'Sur le contrôle', back: '« Tu as pouvoir sur ton esprit — pas sur les événements. Réalise-le et tu trouveras la force. »', difficulty: 2 },
  { front: 'Sur le jugement', back: '« Si tu es blessé par quelque chose d’extérieur, ce n’est pas cette chose qui te dérange, mais ton propre jugement sur elle. Et tu as le pouvoir de l’effacer à tout moment. »', difficulty: 3 },
  { front: 'Sur l’action utile', back: '« N’agis jamais à contrecœur ni sans égard au bien commun, ni sans réflexion ni en te laissant tirer en sens contraire. »', difficulty: 4 },
  { front: 'Sur la vertu', back: '« Tout ce qui est en harmonie avec toi, ô Univers, est en harmonie avec moi. »', difficulty: 3 },
  { front: 'Sur la simplicité', back: '« La plupart des choses que nous disons et faisons ne sont pas nécessaires : écarte-les et tu auras plus de temps et de tranquillité. »', difficulty: 2 },
  { front: 'Sur la mort', back: '« La mort sourit à chacun de nous ; tout ce qu’on peut faire, c’est lui sourire en retour. »', difficulty: 2 },
];

export const meditationsPack: Pack = {
  theme: {
    id: 'books.meditations',
    title: 'Pensées (Marc Aurèle)',
    subtitle: 'Stoïcisme impérial — sélection',
    category: 'books',
    description:
      'Maximes pivots des Pensées pour moi-même, utiles au quotidien pour ancrer la dichotomie du contrôle et l’attention au jugement.',
    color: '#3A4553',
    sortOrder: 72,
  },
  cards: meditationsEntries.map((e, i) => ({
    id: `books.meditations.${i}`,
    themeId: 'books.meditations',
    front: e.front,
    back: e.back,
    hint: 'Marc Aurèle',
    note: e.note,
    difficulty: e.difficulty,
    tags: ['stoicisme', 'marc-aurele'],
  })),
};

// Bonus 2 — Never Split the Difference (Chris Voss) — principes de négociation.
type NegotiationPoint = { front: string; back: string; note?: string; difficulty: 1 | 2 | 3 | 4 };

const negotiation: NegotiationPoint[] = [
  { front: 'Empathie tactique', back: 'Comprendre les sentiments de l’autre et les nommer à voix haute — sans avoir à les partager.', difficulty: 2 },
  { front: 'Voix de « DJ de nuit »', back: 'Ton calme, grave et apaisé ; ralentit le rythme, désamorce la tension.', difficulty: 3 },
  { front: 'Mirroring', back: 'Répéter les 1 à 3 derniers mots de l’autre, avec ton montant — l’invite à développer.', difficulty: 2 },
  { front: 'Labeling', back: 'Nommer l’émotion perçue : « On dirait que ça vous inquiète. » — désamorce l’émotion en la validant.', difficulty: 2 },
  { front: 'Obtenir un « c’est juste »', back: 'Objectif de la négociation : que l’autre dise « that’s right » — preuve qu’il s’est senti compris.', note: 'Différent de « you’re right », qui est souvent une esquive.', difficulty: 3 },
  { front: 'L’accusation préventive (accusation audit)', back: 'Lister soi-même toutes les critiques que l’autre pourrait avoir avant qu’il ne les formule.', difficulty: 3 },
  { front: 'Le « non » est votre ami', back: 'Un « non » rend l’autre à l’aise ; il préserve son autonomie. Formuler des questions auxquelles il peut répondre « non » sans danger.', difficulty: 3 },
  { front: 'Questions calibrées', back: 'Questions ouvertes commençant par « comment... », « qu’est-ce que... » qui forcent l’autre à résoudre le problème.', difficulty: 2 },
  { front: 'Règle 7-38-55', back: '7 % des mots, 38 % du ton, 55 % du langage corporel. Soigner le comment plus que le quoi.', difficulty: 3 },
  { front: 'Trouver l’inconnu inconnu (black swan)', back: 'Rechercher l’information qui change la donne et que l’autre n’a pas mise sur la table.', difficulty: 4 },
];

export const negotiationPack: Pack = {
  theme: {
    id: 'books.negotiation',
    title: 'Never Split the Difference',
    subtitle: 'Chris Voss — empathie tactique',
    category: 'books',
    description:
      'Principes de négociation issus de 20 ans au FBI : écoute active, miroir, labels, questions calibrées.',
    color: '#7A2E2E',
    sortOrder: 73,
  },
  cards: negotiation.map((e, i) => ({
    id: `books.negotiation.${i}`,
    themeId: 'books.negotiation',
    front: e.front,
    back: e.back,
    hint: 'Chris Voss',
    note: e.note,
    difficulty: e.difficulty,
    tags: ['negociation', 'voss'],
  })),
};

// Bonus 3 — Atomic Habits (James Clear) — lois du changement d’habitude.
const habitsPrinciples: Array<{ front: string; back: string; note?: string; difficulty: 1 | 2 | 3 | 4 }> = [
  { front: 'Les petites habitudes composent', back: 'Une amélioration de 1 % par jour ≈ ×37 en un an. L’écart est exponentiel.', difficulty: 2 },
  { front: 'Identité > résultat', back: 'On ne devient pas lecteur en se forçant à lire ; on lit parce qu’on est devenu lecteur. Changer l’identité, pas l’objectif.', difficulty: 2 },
  { front: 'Loi 1 — Rendre évident', back: 'Concevoir l’environnement pour rendre le signal inévitable (emplacement, visibilité).', difficulty: 2 },
  { front: 'Loi 2 — Rendre attirant', back: 'Attacher l’habitude à un plaisir (tentation bundling), rejoindre un groupe où c’est la norme.', difficulty: 2 },
  { front: 'Loi 3 — Rendre facile', back: 'Réduire la friction. Règle des 2 minutes : commencer par une version minimale.', difficulty: 2 },
  { front: 'Loi 4 — Rendre satisfaisant', back: 'Récompense immédiate ; tracker l’habitude ; ne jamais sauter deux fois.', difficulty: 2 },
  { front: 'Contrat d’engagement', back: 'Rendre le coût d’un échec visible aux yeux d’un tiers — ou d’une somme d’argent.', difficulty: 3 },
];

export const atomicHabitsPack: Pack = {
  theme: {
    id: 'books.habits',
    title: 'Atomic Habits',
    subtitle: 'James Clear — les lois du changement',
    category: 'books',
    description:
      'Les quatre lois du changement d’habitude : évidence, attirance, facilité, satisfaction. Plus l’idée que l’identité précède l’action.',
    color: '#2E5941',
    sortOrder: 74,
  },
  cards: habitsPrinciples.map((e, i) => ({
    id: `books.habits.${i}`,
    themeId: 'books.habits',
    front: e.front,
    back: e.back,
    hint: 'James Clear',
    note: e.note,
    difficulty: e.difficulty,
    tags: ['habitudes', 'clear'],
  })),
};
