import CharactersAPI from './CharactersAPI';

const BASE_URL = 'https://rickandmortyapi.com/api/';

const charactersAPI = new CharactersAPI(BASE_URL);

export { charactersAPI };
