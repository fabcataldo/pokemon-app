import ProcessRequest from "./ProcessRequest";

const processRequest: ProcessRequest = new ProcessRequest();
export async function getPokemons() {
  processRequest.url = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10";
  return processRequest.get();
}

export async function getPokemon(urlPokemon: string) {
  processRequest.url = urlPokemon;
  return processRequest.get();
}
