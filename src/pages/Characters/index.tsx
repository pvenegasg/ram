import React, { useState } from 'react';
import CharacterSearch from '../../components/CharacterSearch';
import CharacterMatrix from '../../components/CharacterMatrix';

import CharacterContext, { Pages } from './Context';

import './styles.scss';
import { Character } from '../../types';

const CharactersPage: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [mode, setMode] = useState('default');
  const [pages, setPages] = useState<Pages>({
    next: null,
    prev: null,
  });

  return (
    <div id="characters__wrapper">
      <CharacterContext.Provider
        value={{
          characters,
          setCharacters,
          pages,
          setPages,
          setMode,
          mode,
        }}
      >
        <h1> Rick and Morty!</h1>

        <CharacterSearch />
        <CharacterMatrix />
      </CharacterContext.Provider>
    </div>
  );
};

export default CharactersPage;
