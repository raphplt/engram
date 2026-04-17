import { Pack } from './types';
import { frRegionsPack } from './geography/fr-regions';
import { frDepartmentsPack } from './geography/fr-departments';
import { worldCapitalsPack, worldCountriesByCapitalPack } from './geography/world-capitals';
import { frCitiesPack } from './geography/fr-cities';
import { historyFrancePack } from './history/france';
import { historyEuropePack } from './history/europe';
import { historyWorldPack } from './history/world';
import { historySciencePack } from './history/science';
import { philosophersPack } from './philosophy/philosophers';
import { philosophyConceptsPack } from './philosophy/concepts';
import { powerLawsPack } from './books/power-laws';
import { carnegiePack } from './books/carnegie';
import { meditationsPack, negotiationPack, atomicHabitsPack } from './books/bonus';

export const ALL_PACKS: Pack[] = [
  frRegionsPack,
  frDepartmentsPack,
  frCitiesPack,
  worldCapitalsPack,
  worldCountriesByCapitalPack,
  historyFrancePack,
  historyEuropePack,
  historyWorldPack,
  historySciencePack,
  philosophersPack,
  philosophyConceptsPack,
  powerLawsPack,
  carnegiePack,
  meditationsPack,
  negotiationPack,
  atomicHabitsPack,
];

export const CATEGORY_LABELS: Record<string, { title: string; subtitle: string; color: string }> = {
  geography: {
    title: 'Géographie',
    subtitle: 'Cartes, départements, capitales',
    color: '#2E5941',
  },
  history: {
    title: 'Histoire',
    subtitle: 'France, Europe, monde, sciences',
    color: '#7A2E2E',
  },
  philosophy: {
    title: 'Philosophie',
    subtitle: 'Auteurs, courants, concepts',
    color: '#3A4553',
  },
  books: {
    title: 'Livres',
    subtitle: 'Pouvoir, relations, stoïcisme',
    color: '#1A1814',
  },
};
