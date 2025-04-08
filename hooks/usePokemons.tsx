import { getPokemons } from "@/services/ApiService";
import { useInfiniteQuery } from "@tanstack/react-query";

export const usePokemons = () => {
  const allPokemonsQuery = useInfiniteQuery({
    initialPageParam: 0,
    queryKey: ["pokemons", "all-pokemons"],
    queryFn: ({ pageParam }) => {
      console.log("pageParam");
      console.log(pageParam);
      return getPokemons(pageParam);
    },
    getNextPageParam: (lastPage, pages) => {
      console.log("last page");
      console.log(lastPage.next);
      const parsedNextPageUrl = new URL(lastPage.next);
      const nextPage = !!parsedNextPageUrl.searchParams.get("offset")
        ? Number(parsedNextPageUrl.searchParams.get("offset"))
        : 0;
      console.log("nextPage");
      console.log(nextPage);
      return nextPage;
    },
    staleTime: 1000 * 60 * 60 * 24,
  });
  return {
    allPokemonsQuery,
  };
};
