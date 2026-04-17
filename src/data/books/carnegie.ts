import { Pack } from '../types';

// "How to Win Friends and Influence People" — Dale Carnegie.
// Les 30 principes.

type Principle = { part: string; n: number; title: string; idea: string };

const principles: Principle[] = [
  // Part 1 — Fundamentals of handling people
  { part: 'Manier les gens', n: 1, title: 'Ne critiquez pas, ne condamnez pas, ne vous plaignez pas', idea: 'Critiquer suscite la défense et le ressentiment, jamais le changement.' },
  { part: 'Manier les gens', n: 2, title: 'Complimentez honnêtement et sincèrement', idea: 'Le besoin d’être reconnu est universel ; l’appréciation authentique dépasse la flatterie.' },
  { part: 'Manier les gens', n: 3, title: 'Éveillez chez autrui un désir intense', idea: 'Parlez de ce qu’ils veulent, pas de ce que vous voulez.' },
  // Part 2 — Six ways to make people like you
  { part: 'Se faire aimer', n: 4, title: 'Intéressez-vous réellement aux autres', idea: 'Deux mois d’intérêt pour eux valent plus que deux ans à parler de soi.' },
  { part: 'Se faire aimer', n: 5, title: 'Souriez', idea: 'Le sourire est un message gratuit de bienveillance ; il appelle le sourire en retour.' },
  { part: 'Se faire aimer', n: 6, title: 'Utilisez leur prénom', idea: 'Le prénom est le son le plus doux dans toutes les langues.' },
  { part: 'Se faire aimer', n: 7, title: 'Sachez écouter, encouragez l’autre à parler de lui', idea: 'Pour être intéressant, soyez intéressé ; écouter est rare et précieux.' },
  { part: 'Se faire aimer', n: 8, title: 'Parlez des centres d’intérêt de votre interlocuteur', idea: 'La voie royale vers le cœur d’un homme, c’est de l’entretenir de ce qu’il chérit le plus.' },
  { part: 'Se faire aimer', n: 9, title: 'Faites sentir leur importance — sincèrement', idea: 'Donner à l’autre le sentiment d’importer crée un lien profond.' },
  // Part 3 — Win people to your way of thinking
  { part: 'Convaincre', n: 10, title: 'Évitez les controverses — seul moyen de gagner est de les éviter', idea: 'On ne gagne jamais une discussion ; on perd de l’amitié ou on renforce l’hostilité.' },
  { part: 'Convaincre', n: 11, title: 'Respectez les opinions d’autrui, ne dites jamais « vous avez tort »', idea: 'Aucun esprit ne change sous accusation frontale.' },
  { part: 'Convaincre', n: 12, title: 'Reconnaissez vos torts rapidement et avec énergie', idea: 'Un mea-culpa sincère désamorce la critique et impose le respect.' },
  { part: 'Convaincre', n: 13, title: 'Abordez l’autre avec douceur', idea: 'Une goutte de miel attire plus que tout un tonneau de vinaigre.' },
  { part: 'Convaincre', n: 14, title: 'Faites dire « oui » dès le début', idea: 'Une série de « oui » met l’autre dans un état mental positif et ouvre la porte.' },
  { part: 'Convaincre', n: 15, title: 'Laissez votre interlocuteur parler', idea: 'Les gens aiment leurs idées ; laissez-les les énoncer eux-mêmes.' },
  { part: 'Convaincre', n: 16, title: 'Laissez-leur croire que l’idée vient d’eux', idea: 'Suggérer plutôt qu’imposer ; l’appropriation est le moteur de l’action.' },
  { part: 'Convaincre', n: 17, title: 'Essayez sincèrement de voir les choses du point de vue d’autrui', idea: 'Comprendre pourquoi l’autre pense ainsi est plus utile que de prouver qu’il a tort.' },
  { part: 'Convaincre', n: 18, title: 'Accueillez avec sympathie leurs idées et désirs', idea: 'La sympathie désarme ; elle rend possible l’écoute réelle.' },
  { part: 'Convaincre', n: 19, title: 'Faites appel aux motifs nobles', idea: 'Les gens agissent pour deux raisons : une « bonne » et la vraie. Honorez la bonne.' },
  { part: 'Convaincre', n: 20, title: 'Dramatisez vos idées', idea: 'Une idée mise en scène marque davantage qu’un argument énoncé.' },
  { part: 'Convaincre', n: 21, title: 'Lancez un défi', idea: 'Le désir de se surpasser est un ressort puissant ; donner un défi mobilise l’énergie.' },
  // Part 4 — Changing people without offending
  { part: 'Changer l’autre', n: 22, title: 'Commencez par un compliment sincère', idea: 'Un éloge ouvre ; un reproche ferme.' },
  { part: 'Changer l’autre', n: 23, title: 'Attirez l’attention sur les erreurs indirectement', idea: 'Le « mais » détruit l’éloge qui précède ; préférer « et ».' },
  { part: 'Changer l’autre', n: 24, title: 'Avant de critiquer, parlez de vos propres erreurs', idea: 'Mettre son propre cas en balance rend la critique plus acceptable.' },
  { part: 'Changer l’autre', n: 25, title: 'Posez des questions au lieu de donner des ordres', idea: 'Une question laisse l’autre se rendre compte lui-même et préserve sa dignité.' },
  { part: 'Changer l’autre', n: 26, title: 'Laissez l’autre sauver la face', idea: 'Ne jamais humilier publiquement. Le prix à payer est souvent la loyauté.' },
  { part: 'Changer l’autre', n: 27, title: 'Louez le moindre progrès, soyez « enthousiaste dans votre approbation »', idea: 'La reconnaissance spécifique renforce le bon comportement.' },
  { part: 'Changer l’autre', n: 28, title: 'Donnez à l’autre une belle réputation à soutenir', idea: 'Dites qu’il a telle qualité — il s’efforcera de la porter.' },
  { part: 'Changer l’autre', n: 29, title: 'Encouragez ; faites paraître les erreurs faciles à corriger', idea: 'Donnez le sentiment que c’est accessible, et la capacité suivra.' },
  { part: 'Changer l’autre', n: 30, title: 'Rendez l’autre heureux de faire ce que vous suggérez', idea: 'Reliez votre demande à quelque chose qu’il trouve bénéfique pour lui-même.' },
];

const baseId = 'books.carnegie';

export const carnegiePack: Pack = {
  theme: {
    id: baseId,
    title: 'Comment se faire des amis',
    subtitle: 'Dale Carnegie — 30 principes',
    category: 'books',
    description:
      'Les 30 principes du classique de Carnegie : fondamentaux des relations, gagner la sympathie, convaincre sans heurter, faire évoluer sans blesser.',
    color: '#C85C2E',
    sortOrder: 71,
  },
  cards: principles.flatMap((p) => [
    {
      id: `${baseId}.${p.n}.title`,
      themeId: baseId,
      front: `${p.part} — principe ${p.n}`,
      back: p.title,
      hint: p.part,
      note: p.idea,
      difficulty: 2 as 1 | 2 | 3 | 4,
      tags: ['carnegie'],
    },
    {
      id: `${baseId}.${p.n}.idea`,
      themeId: baseId,
      front: `${p.title} — pourquoi ?`,
      back: p.idea,
      hint: `Carnegie — ${p.part}`,
      difficulty: 3 as 1 | 2 | 3 | 4,
      tags: ['carnegie', 'idee'],
    },
  ]),
};
