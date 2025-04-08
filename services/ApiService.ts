import ProcessRequest from "./ProcessRequest";

export async function getPokemons(
  currentPageOffset: number,
  pageSize: number = 10
) {
  return await ProcessRequest.get(
    `https://pokeapi.co/api/v2/pokemon/?offset=${currentPageOffset}&limit=${pageSize}`
  );
}

export async function getPokemon(urlDetail: string) {
  return await ProcessRequest.get(urlDetail);
}

export async function getPokemonColorInfo(idColor: number) {
  //este endpoint, si le mando un id, es de 1 color
  //luego, en la response, devuelve qué pokemones tiene este color
  //en el arreglo de pokemon_species, y el nombre del pokemon
  //en cuestión está en el atributo name
  return await ProcessRequest.get(
    `https://pokeapi.co/api/v2/pokemon-color/${idColor}`
  );
}
