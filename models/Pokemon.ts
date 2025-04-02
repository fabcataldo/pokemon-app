export interface Pokemon {
  base_experience: number;
  height: number;
  id: number;
  name: string;
  img: string;
  weight: number;
  color: string;
  types: Type[];
}

interface Type {
  name: string;
  url: string;
}
