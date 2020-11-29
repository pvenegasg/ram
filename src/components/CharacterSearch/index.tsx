import React, { useContext, useState } from 'react';
import { Button, Input, Select } from 'antd';
import CharacterContext from '../../pages/Characters/Context';
import { charactersAPI } from '../../api';

import './styles.scss';

const { Option } = Select;

const CharacterSearch: React.FC = () => {
  const { setCharacters, setPages, setMode } = useContext(CharacterContext);
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');

  const handleSearch = () => {
    charactersAPI
      .getByParameters({
        name,
        status,
      })
      .then((result) => {
        const { next, prev } = result.info;

        setCharacters(result.results);
        setPages({ next, prev });
        setMode('search');
      });
  };

  return (
    <div id="character-search">
      <Input.Group>
        <Input
          style={{ width: '65%' }}
          size="large"
          placeholder="Which character are you searching?"
          value={name}
          onChange={(evt) => setName(evt.currentTarget.value)}
        />

        <Select
          defaultValue=""
          size="large"
          className="select"
          style={{
            width: '25%',
          }}
          onChange={(value) => setStatus(value)}
        >
          <Option value=""> Todos </Option>
          <Option value="Alive">Alive</Option>
          <Option value="Dead">Dead</Option>
          <Option value="unknown">unknown</Option>
        </Select>

        <Button
          style={{
            width: '10%',
            borderTopLeftRadius: '0',
            borderBottomLeftRadius: '0',
          }}
          type="primary"
          size="large"
          onClick={handleSearch}
        >
          Search
        </Button>
      </Input.Group>
    </div>
  );
};

export default CharacterSearch;
