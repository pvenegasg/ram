import React from 'react';
import { render, screen } from '@testing-library/react';

import CharacterCard from '../../src/components/CharacterCard';

describe('CharacterCard', () => {
  it('it should render the card', () => {
    const props = {
      data: {
        id: 1,
        name: 'Rick Sanchez',
        status: 'Alive',
        species: 'Human',
        type: '',
        gender: 'Male',
        origin: {
          name: 'Earth (C-137)',
          url: 'https://rickandmortyapi.com/api/location/1',
        },
        location: {
          name: 'Earth (Replacement Dimension)',
          url: 'https://rickandmortyapi.com/api/location/20',
        },
        image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
        episode: [
          'https://rickandmortyapi.com/api/episode/1',
          'https://rickandmortyapi.com/api/episode/2',
        ],
        url: 'https://rickandmortyapi.com/api/character/1',
        created: '2017-11-04T18:48:46.250Z',
      },
    };

    const { container } = render(<CharacterCard {...props} />);

    expect(screen.getByText('Rick Sanchez')).toBeDefined();
    expect(screen.getByText('Human')).toBeDefined();
    expect(screen.getByText('Alive')).toBeDefined();
    expect(screen.getByText('Alive')).toHaveClass('status--alive');

    expect(container.querySelector('img').getAttribute('src')).toEqual(
      'https://rickandmortyapi.com/api/character/avatar/1.jpeg'
    );
  });
});
