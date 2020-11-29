import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'antd';
import { useContext } from 'react';
import CharacterContext from '../pages/Characters/Context';
import CharacterCard from './CharacterCard';
import { charactersAPI } from '../api';

const CHARS_PER_PAGE = 9;
const MAX_CHARS_FROM_API = 20;

const CharacterMatrix: React.FC = () => {
  const { characters, setCharacters, setPages, pages, mode } = useContext(
    CharacterContext
  );

  const [position, setPosition] = useState(0);
  const [apiPage, setAPIPage] = useState(1);

  const fetchCharacters = () => {
    charactersAPI
      .getByPage(pages.next ? pages.next : '')
      .then((result) => {
        const { next, prev } = result.info;

        setCharacters([...characters, ...result.results]);
        setPages({ next, prev });
      })
      .catch((err) => console.log(err));
  };

  const nextPage = () => {
    setPosition(position + CHARS_PER_PAGE);
  };

  const previousPage = () => {
    const prevPosition = position - CHARS_PER_PAGE;

    if (prevPosition < 0) {
      return;
    }

    setPosition(prevPosition);
  };

  // Reset pagination
  useEffect(() => {
    setPosition(0);
    setAPIPage(1);
  }, [mode]);

  // Triggers fetch
  useEffect(() => {
    if (apiPage * MAX_CHARS_FROM_API - position < 9) {
      setAPIPage(apiPage + 1);
    }
  }, [position]);

  useEffect(fetchCharacters, [apiPage]);

  const charactersToDisplay = characters.slice(
    position,
    position + CHARS_PER_PAGE
  );

  return (
    <>
      <div className="actions">
        <Button onClick={previousPage}> Anterior </Button>
        <Button onClick={nextPage}> Siguiente </Button>
      </div>

      <Row gutter={[20, 20]}>
        {charactersToDisplay.map((character, index) => (
          <Col key={`character-${index}`} className="gutter-row" span={8}>
            <CharacterCard key={`char-${index}`} data={character} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default CharacterMatrix;
