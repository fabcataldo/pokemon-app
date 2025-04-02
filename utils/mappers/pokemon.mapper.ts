import { GetPokemonsResponseResult } from "@/models/GetPokemonsResponse";
import { Pokemon } from "@/models/Pokemon";
import { PokemonColor, PokemonDetail } from "@/models/PokemonDetail";
import { getPokemon, getPokemonColorInfo } from "@/services/ApiService";

const possiblePokemonColors = new Array(10).fill(null).map((_, i) => i + 1);

export class PokemonMapper {
  static getPokemonIdFromURL = (url: string): string | null => {
    const evaluatorMatches = url.match(/\/(\d+)\/$/);
    return evaluatorMatches ? evaluatorMatches[1] : null;
  };

  static getFullPokemonInfo = async (
    pokemonResultAPI: GetPokemonsResponseResult
  ) => {
    let pokemon = null;
    const pokemonId = this.getPokemonIdFromURL(pokemonResultAPI.url);
    if (pokemonId) {
      const pokemonDetail: PokemonDetail = await getPokemon(
        pokemonResultAPI.url
      );

      if (pokemonDetail) {
        for (const idColor of possiblePokemonColors) {
          const responseColor: PokemonColor = await getPokemonColorInfo(
            idColor
          );

          if (responseColor) {
            const colorInPokemon = responseColor.pokemon_species.find(
              (pok: any) => pok.name === pokemonDetail.name
            );

            if (colorInPokemon) {
              pokemon = {
                base_experience: pokemonDetail.base_experience,
                height: pokemonDetail.height,
                id: pokemonDetail.id,
                name: pokemonDetail.name,
                img:
                  pokemonDetail.sprites.other?.["official-artwork"]
                    .front_default || "",
                weight: pokemonDetail.weight,
                color: responseColor.name,
                types: pokemonDetail.types.map((type) => ({
                  name: type.type.name,
                  url: type.type.url,
                })),
              };

              break;
            }
          }
        }
      }
    }

    return pokemon as Pokemon;
  };
}
