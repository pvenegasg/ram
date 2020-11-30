import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'antd';
import { useContext } from 'react';
import CharacterContext from '../../pages/Characters/Context';
import CharacterCard from '../CharacterCard';
import { charactersAPI } from '../../api';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

import './styles.scss';

const CHARS_PER_PAGE = 9;
const MAX_CHARS_FROM_API = 20;

type Props = {
  loading: boolean;
};

const CharacterMatrix: React.FC<Props> = ({ loading }) => {
  const { characters, setCharacters, setPages, pages } = useContext(
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
    if (loading) {
      return;
    }

    if (
      pages.next === null &&
      position * CHARS_PER_PAGE + 9 >= characters.length
    ) {
      return;
    }

    setPosition(position + 1);
  };

  const previousPage = () => {
    if (loading) {
      return;
    }

    const prevPosition = position - 1;

    if (prevPosition < 0) {
      return;
    }

    setPosition(prevPosition);
  };

  // Reset pagination
  useEffect(() => {
    if (loading === false) {
      setPosition(0);
      setAPIPage(1);
    }
  }, [loading]);

  // Triggers fetch
  useEffect(() => {
    if (
      apiPage * MAX_CHARS_FROM_API - position * CHARS_PER_PAGE <
      CHARS_PER_PAGE
    ) {
      setAPIPage(apiPage + 1);
      fetchCharacters();
    }
  }, [position]);

  useEffect(fetchCharacters, []);

  // Paginate
  const charactersToDisplay = characters.slice(
    position * CHARS_PER_PAGE,
    position * CHARS_PER_PAGE + CHARS_PER_PAGE
  );

  return (
    <div id="character-matrix">
      <div className="actions">
        <Button className="btn__prev" onClick={previousPage}>
          <LeftOutlined />
        </Button>
        <Button className="btn__next" onClick={nextPage}>
          <RightOutlined />
        </Button>
      </div>

      <Row gutter={[20, 20]}>
        {charactersToDisplay.map((character, index) => (
          <Col key={`character-${index}`} className="gutter-row" span={8}>
            <CharacterCard key={`char-${index}`} data={character} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CharacterMatrix;
