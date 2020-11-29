import { createContext } from 'react';
import { Character } from '../../types';

export type Pages = {
  next: string | null;
  prev: string | null;
};

type CharacterContextType = {
  characters: Character[];
  pages: Pages;
  mode: string;
  setCharacters: (characters: Character[]) => void;
  setPages: (obj: Pages) => void;
  setMode: (mode: string) => void;
};

const CharacterContext = createContext<CharacterContextType>({
  characters: [],
  pages: {
    prev: null,
    next: null,
  },
  mode: 'default',
  setCharacters: () => {
    console.log('cant update, no context');
  },
  setPages: () => {
    console.log('cant update, no context');
  },
  setMode: () => {
    console.log('cant update, no context');
  },
});

export default CharacterContext;
