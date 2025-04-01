import ProcessRequest from "./ProcessRequest";

const processRequest: ProcessRequest = new ProcessRequest();
export async function getPokemons(currentPageOffset: number, pageSize: number) {
  processRequest.url = `https://pokeapi.co/api/v2/pokemon/?offset=${currentPageOffset}&limit=${pageSize}`;
  return processRequest.get();
}

export async function getPokemon(urlDetail: string, idPokemon: string) {
  //este endpoint, si le mando un id, es de 1 color
  //luego, en la response, devuelve qué pokemones tiene este color
  //en el arreglo de pokemon_species, y el nombre del pokemon
  //en cuestión está en el atributo name
  processRequest.url = urlDetail;

  const promisePokemonDetail = processRequest.get();

  return {
    promisePokemonDetail,
  };
}

export async function getPokemonColorInfo(idColor: number) {
  processRequest.url = `https://pokeapi.co/api/v2/pokemon-color/${idColor}`;
  return processRequest.get();
}
