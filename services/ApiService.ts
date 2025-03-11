import ProcessRequest from "./ProcessRequest";

const processRequest: ProcessRequest = new ProcessRequest();
export async function getPokemons() {
  processRequest.url = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10";
  return processRequest.get();
}

export async function getPokemon(urlDetail: string, idPokemon: string) {
  processRequest.url = urlDetail;
  const promisePokemonDetail = processRequest.get();

  processRequest.url = `https://pokeapi.co/api/v2/pokemon-color/${idPokemon}`;
  const promisePokemonColor = processRequest.get();

  return {
    promisePokemonDetail,
    promisePokemonColor,
  };
}
