export type ThemeCategory =
  | 'geography'
  | 'history'
  | 'philosophy'
  | 'books';

export type ThemeSeed = {
  id: string;
  parentId?: string;
  title: string;
  subtitle?: string;
  category: ThemeCategory;
  description?: string;
  color: string;
  sortOrder: number;
};

export type CardSeed = {
  id: string;
  themeId: string;
  front: string;
  back: string;
  hint?: string;
  note?: string;
  difficulty: 1 | 2 | 3 | 4; // 1=very easy, 4=hard
  tags?: string[];
};

export type Pack = {
  theme: ThemeSeed;
  cards: CardSeed[];
};
