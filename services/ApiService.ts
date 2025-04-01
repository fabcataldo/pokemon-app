import ProcessRequest from "./ProcessRequest";

export async function getPokemons(currentPageOffset: number, pageSize: number) {
  return ProcessRequest.get(
    `https://pokeapi.co/api/v2/pokemon/?offset=${currentPageOffset}&limit=${pageSize}`
  );
}

export async function getPokemon(urlDetail: string, idPokemon: string) {
  //este endpoint, si le mando un id, es de 1 color
  //luego, en la response, devuelve qué pokemones tiene este color
  //en el arreglo de pokemon_species, y el nombre del pokemon
  //en cuestión está en el atributo name
  const promisePokemonDetail = ProcessRequest.get(urlDetail);

  return {
    promisePokemonDetail,
  };
}

export async function getPokemonColorInfo(idColor: number) {
  return ProcessRequest.get(
    `https://pokeapi.co/api/v2/pokemon-color/${idColor}`
  );
}
