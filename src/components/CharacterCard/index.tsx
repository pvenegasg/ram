import React from 'react';
import { Card } from 'antd';
import { Character } from '../../types';

import './styles.scss';

interface Props {
  data: Character;
}

const getStatusStyle = (status: string) => {
  switch (status) {
    case 'Alive':
      return 'status--alive';

    case 'Dead':
      return 'status--dead';

    default:
      return 'gray';
  }
};

const CharacterCard: React.FC<Props> = ({ data }) => {
  const statusClass = getStatusStyle(data.status);

  return (
    <div id="character-card">
      <Card role="img" cover={<img role="" src={data.image}></img>}>
        <h3> {data.name} </h3>
        <span> {data.species} </span>
        <i className={statusClass}>{data.status}</i>
      </Card>
    </div>
  );
};

export default CharacterCard;
