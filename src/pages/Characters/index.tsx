import React, { useState } from 'react';
import CharacterSearch from '../../components/CharacterSearch';
import CharacterMatrix from '../../components/CharacterMatrix';

import CharacterContext, { Pages } from './Context';

import './styles.scss';
import { Character } from '../../types';

const CharactersPage: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [pages, setPages] = useState<Pages>({
    next: null,
    prev: null,
  });

  const [loading, setLoading] = useState(false);

  return (
    <div id="characters__wrapper">
      <CharacterContext.Provider
        value={{
          characters,
          setCharacters,
          pages,
          setPages,
        }}
      >
        <h1> Rick and Morty!</h1>

        <CharacterSearch onSearch={setLoading} />
        <CharacterMatrix loading={loading} />
      </CharacterContext.Provider>
    </div>
  );
};

export default CharactersPage;
