export interface LooseObject {
  [key: ?string]: unknown;
}

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: LooseObject;
  location: LooseObject;
  image: string;
  episode: string[];
  url: string;
  created: string;
}
