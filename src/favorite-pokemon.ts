import { useEffect, useState } from "react";
import { Pokemon } from "./types/pokemon";

export function getFavoritePokemon(): Pokemon | undefined {
  if (typeof localStorage === "undefined") return undefined;
  const pokemon = localStorage.getItem("fav-pokemon");

  return pokemon != null ? JSON.parse(pokemon) : undefined;
}

export function changeFavoritePokemon(wasFavorite: boolean, pokemon: Pokemon) {
  return wasFavorite
    ? localStorage?.removeItem("fav-pokemon")
    : localStorage?.setItem("fav-pokemon", JSON.stringify(pokemon));
}

export function useFavoritePokemon() {
  const [favoritePokemon, setFavorite] = useState<Pokemon | undefined>();

  useEffect(() => {
    if (favoritePokemon != undefined) return;

    const localStorage: Pokemon | undefined = getFavoritePokemon();

    if (!localStorage) return;

    setFavorite(localStorage);
  }, [favoritePokemon]);

  return {
    favoritePokemon,
    setFavoritePokemon(pokemon: Pokemon) {
      const wasFavorite = pokemon.id == favoritePokemon?.id;
      changeFavoritePokemon(wasFavorite, pokemon);
      setFavorite(wasFavorite ? undefined : pokemon);
    },
  };
}
