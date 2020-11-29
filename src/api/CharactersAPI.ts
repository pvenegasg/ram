import Request from '../interfaces/Request';
import { Character } from '../types';

export interface GetCharactersResponse {
  info: {
    count: number;
    next: string;
    pages: number;
    prev: string | null;
  };
  results: Character[];
}

interface GetByParameterParams {
  name: string;
  status: string;
  [key: string]: string;
}

class CharactersAPI extends Request {
  async getByPage(url = ''): Promise<GetCharactersResponse> {
    const resource =
      url.split('https://rickandmortyapi.com/api/character/')[1] || '';

    try {
      const response = await this.instance.get<GetCharactersResponse>(
        `/character/${resource}`
      );

      return response.data;
    } catch (err) {
      throw 'Cannot get characters';
    }
  }

  async getByParameters(
    params: GetByParameterParams
  ): Promise<GetCharactersResponse> {
    const query = Object.keys(params)
      .map((key) => {
        if (params[key]) {
          return key + '=' + params[key];
        }
      })
      .filter((item) => item)
      .join('&');

    try {
      const response = await this.instance.get<GetCharactersResponse>(
        `/character/?${query}`
      );

      return response.data;
    } catch (err) {
      throw 'Cannot get characters';
    }
  }
}

export default CharactersAPI;
