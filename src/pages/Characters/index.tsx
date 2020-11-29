import React, { useEffect, useState } from 'react';
import { charactersAPI } from '../../api';
import { Character } from '../../types';
import CharacterCard from '../../components/CharacterCard';
import { Button, Col, Row } from 'antd';

import useCharacterLibrary from '../../composables/characterDirectory';

import './styles.scss';

const CharactersPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const {
    pagination,
    characters,
    nextPage,
    previousPage,
  } = useCharacterLibrary();
  // const [characters, setCharacters] = useState<Character[]>([]);

  return (
    <div id="characters__wrapper">
      <h1> Rick and Morty!</h1>

      <div className="actions">
        <Button onClick={previousPage}> Anterior </Button>
        <Button onClick={nextPage}> Siguiente </Button>
      </div>

      <Row gutter={[20, 20]}>
        {pagination.map((character, index) => (
          <Col key={`character-${index}`} className="gutter-row" span={8}>
            <CharacterCard key={`char-${index}`} data={character} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CharactersPage;
