import { createContext } from 'react';
import { Character } from '../../types';

export type Pages = {
  next: string | null;
  prev: string | null;
};

type CharacterContextType = {
  characters: Character[];
  pages: Pages;
  setCharacters: (characters: Character[]) => void;
  setPages: (obj: Pages) => void;
};

const CharacterContext = createContext<CharacterContextType>({
  characters: [],
  pages: {
    prev: null,
    next: null,
  },
  setCharacters: () => {
    console.log('cant update, no context');
  },
  setPages: () => {
    console.log('cant update, no context');
  },
});

export default CharacterContext;
