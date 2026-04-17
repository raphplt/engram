import { Pack } from '../types';

type Entry = { front: string; back: string; hint?: string; note?: string; difficulty: 1 | 2 | 3 | 4 };

const entries: Entry[] = [
  { front: 'Maïeutique', back: 'Art d’accoucher les esprits par le questionnement.', hint: 'Socrate', difficulty: 2 },
  { front: 'Allégorie de la caverne', back: 'Les humains prennent l’ombre pour la réalité ; la philosophie est le chemin vers le vrai.', hint: 'République, livre VII', difficulty: 2 },
  { front: 'Ataraxie', back: 'Absence de trouble ; tranquillité de l’âme.', hint: 'Épicurisme et stoïcisme', difficulty: 2 },
  { front: 'Eudémonisme', back: 'Doctrine qui fait du bonheur la fin suprême.', hint: 'Aristote, Éthique à Nicomaque', difficulty: 3 },
  { front: 'Hédonisme', back: 'Recherche du plaisir comme bien supérieur.', difficulty: 2 },
  { front: 'Stoïcisme — dichotomie du contrôle', back: 'Distinguer ce qui dépend de nous et ce qui n’en dépend pas.', hint: 'Épictète', difficulty: 2 },
  { front: 'Cogito ergo sum', back: 'Je pense, donc je suis — première certitude indubitable.', hint: 'Descartes', difficulty: 1 },
  { front: 'Impératif catégorique', back: '« Agis selon la maxime que tu peux vouloir ériger en loi universelle. »', hint: 'Kant', difficulty: 2 },
  { front: 'Tabula rasa', back: 'L’esprit à la naissance est vierge ; tout savoir vient de l’expérience.', hint: 'Locke', difficulty: 3 },
  { front: 'Dialectique hégélienne', back: 'Thèse → antithèse → synthèse.', difficulty: 3 },
  { front: 'Aliénation', back: 'État où l’humain est dépossédé de lui-même (travail, idéologie).', hint: 'Hegel puis Marx', difficulty: 2 },
  { front: 'Volonté de puissance', back: 'Force créatrice, affirmation de soi au-delà du bien et du mal.', hint: 'Nietzsche', difficulty: 3 },
  { front: 'Éternel retour', back: 'Épreuve existentielle : accepterais-tu que ta vie se répète à l’identique ?', hint: 'Nietzsche', difficulty: 2 },
  { front: 'Absurde', back: 'Décalage entre notre quête de sens et le silence du monde.', hint: 'Camus', difficulty: 2 },
  { front: 'Mauvaise foi', back: 'Se mentir à soi-même pour échapper à sa liberté.', hint: 'Sartre', difficulty: 3 },
  { front: 'Banalité du mal', back: 'Le mal extrême peut être accompli par des fonctionnaires ordinaires.', hint: 'Hannah Arendt, Eichmann à Jérusalem', difficulty: 2 },
  { front: 'Biopouvoir', back: 'Pouvoir sur la vie biologique des populations (santé, normes, discipline).', hint: 'Foucault', difficulty: 3 },
  { front: 'Voile d’ignorance', back: 'Choisir les principes de justice sans savoir la place qu’on occupera.', hint: 'Rawls', difficulty: 3 },
  { front: 'Rasoir d’Ockham', back: 'Entre plusieurs explications équivalentes, préférer la plus simple.', hint: 'Guillaume d’Ockham', difficulty: 2 },
  { front: 'Problème de l’induction', back: 'On ne peut jamais prouver qu’une régularité observée se répétera.', hint: 'Hume', difficulty: 3 },
  { front: 'Falsifiabilité', back: 'Critère de scientificité : une théorie doit pouvoir être réfutée.', hint: 'Karl Popper', difficulty: 3 },
  { front: 'Dilemme du tramway', back: 'Expérience morale — sacrifier un pour en sauver cinq ?', hint: 'Philippa Foot', difficulty: 2 },
  { front: 'Agapè / Éros / Philia', back: 'Amour-don / désir / amitié — distinctions grecques.', difficulty: 3 },
  { front: 'Autrui comme fin', back: 'Ne jamais traiter l’humain comme simple moyen.', hint: 'Kant, Fondements de la métaphysique des mœurs', difficulty: 2 },
  { front: 'Nominalisme', back: 'Les universaux sont des noms, non des réalités.', hint: 'XIVᵉ s., Ockham', difficulty: 4 },
  { front: 'Noumène / phénomène', back: 'La chose en soi / l’apparence accessible à nos sens.', hint: 'Kant', difficulty: 3 },
  { front: 'Herméneutique', back: 'Théorie de l’interprétation des textes et du sens.', hint: 'Gadamer, Ricœur', difficulty: 3 },
  { front: 'Épochè phénoménologique', back: 'Mise entre parenthèses des jugements naturels pour décrire le vécu.', hint: 'Husserl', difficulty: 4 },
  { front: 'Dasein', back: 'L’étant humain en tant qu’il interroge son être.', hint: 'Heidegger', difficulty: 3 },
  { front: 'Déconstruction', back: 'Révéler les oppositions cachées et hiérarchisées d’un texte.', hint: 'Derrida', difficulty: 4 },
  { front: 'Utilitarisme', back: 'Agir pour maximiser le bonheur total.', hint: 'Bentham, Mill', difficulty: 2 },
  { front: 'Déontologie', back: 'Éthique du devoir, indépendante des conséquences.', hint: 'Kant', difficulty: 2 },
  { front: 'Conséquentialisme', back: 'La moralité se juge à l’aune des conséquences.', difficulty: 3 },
  { front: 'Phronesis', back: 'Sagesse pratique — savoir ce qu’il convient de faire ici et maintenant.', hint: 'Aristote', difficulty: 3 },
  { front: 'Akrasia', back: 'Faiblesse de la volonté — agir contre ce qu’on croit bon.', hint: 'Aristote', difficulty: 3 },
  { front: 'Amor fati', back: 'Aimer son destin, jusqu’à vouloir ce qui arrive.', hint: 'Nietzsche reprenant les stoïciens', difficulty: 3 },
];

const baseId = 'phil.concepts';

export const philosophyConceptsPack: Pack = {
  theme: {
    id: baseId,
    title: 'Concepts philosophiques',
    subtitle: `${entries.length} notions essentielles`,
    category: 'philosophy',
    description: 'Idées pivots, avec leur auteur principal et une formulation claire.',
    color: '#3A4553',
    sortOrder: 61,
  },
  cards: entries.map((e, i) => ({
    id: `${baseId}.${String(i).padStart(3, '0')}`,
    themeId: baseId,
    front: e.front,
    back: e.back,
    hint: e.hint,
    note: e.note,
    difficulty: e.difficulty,
    tags: ['philosophie', 'concepts'],
  })),
};
