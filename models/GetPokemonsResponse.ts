export interface GetPokemonsResponse {
  count: number;
  results: GetPokemonsResponseResult[];
}

export interface GetPokemonsResponseResult {
  name: string;
  url: string;
}
