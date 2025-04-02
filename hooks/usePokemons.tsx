import { getPokemons } from "@/services/ApiService";
import { useQuery } from "@tanstack/react-query";

export const usePokemons = (currentPageOffset: number, pageSize: number) => {
  return useQuery({
    queryKey: ["pokemons", "allPokemons", currentPageOffset, pageSize],
    queryFn: () => getPokemons(currentPageOffset, pageSize),
    staleTime: 1000 * 60 * 60 * 24,
  });
};
