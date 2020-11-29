import Request from '../interfaces/Request';
import { Character } from '../types';

export interface GetCharactersResponse {
  info: {
    count: number;
    net: string;
    pages: number;
    prev: string | null;
  };
  results: Character[];
  id: 1;
  name: 'Rick Sanchez';
  status: 'Alive';
  species: 'Human';
  type: '';
  gender: 'Male';
  origin: {
    name: 'Earth (C-137)';
    url: 'https://rickandmortyapi.com/api/location/1';
  };
  location: {
    name: 'Earth (Replacement Dimension)';
    url: 'https://rickandmortyapi.com/api/location/20';
  };
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg';
  episode: [
    'https://rickandmortyapi.com/api/episode/1',
    'https://rickandmortyapi.com/api/episode/2'
  ];
  url: 'https://rickandmortyapi.com/api/character/1';
  created: '2017-11-04T18:48:46.250Z';
}

class CharactersAPI extends Request {
  async getMany(page?: number): Promise<GetCharactersResponse> {
    try {
      const response = await this.instance.get<GetCharactersResponse>(
        `/character/?page=${page}`
      );

      return response.data;
    } catch (err) {
      throw 'Cannot get characters';
    }
  }
}

export default CharactersAPI;
