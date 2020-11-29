import { Card } from 'antd';
import React from 'react';
import { Character } from '../types';

interface Props {
  data: Character;
}

const CharacterCard: React.FC<Props> = ({ data }) => {
  return (
    <Card role="img" cover={<img role="" src={data.image}></img>}>
      <h3> {data.name} </h3>
      <span> {data.species} </span>
      <i> {data.status} </i>
    </Card>
  );
};

export default CharacterCard;
