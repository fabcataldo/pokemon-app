import { Pokemon } from "./Pokemon";

export interface GetPokemonsResponse {
  count: number;
  next: string;
  previous: null;
  results: GetPokemonsResponseResult[];
}

export interface GetPokemonsResponseResult {
  name: string;
  url: string;
  detail: Pokemon;
}
