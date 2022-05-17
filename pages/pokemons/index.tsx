import clsx from "clsx";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import PokemonListItem from "../../src/components/PokemonListItem";
import { useFavoritePokemon } from "../../src/favorite-pokemon";
import { Pokemon } from "../../src/types/pokemon";
import { PokemonRef } from "../../src/types/pokemon-ref";

type PokemonListProps = {
  pokemons: Pokemon[];
  page: number;
  maxPage: number;
};

const PokemonList: React.FC<PokemonListProps> = ({
  pokemons,
  page,
  maxPage,
}) => {
  const router = useRouter();
  const { favoritePokemon, setFavoritePokemon } = useFavoritePokemon();

  return (
    <div className="flex justify-center">
      <div>
        <div className="flex gap-5 justify-center my-6">
          <button
            className={clsx({ hidden: page <= 1 })}
            onClick={(e) => router.push(`/pokemons?page=${page - 1}`)}
          >
            &lt;
          </button>
          <p className="font-bold font-mono"> Current page: {page} </p>
          <button
            className={clsx({ hidden: page >= maxPage })}
            onClick={(e) => router.push(`/pokemons?page=${page + 1}`)}
          >
            &gt;
          </button>
        </div>
        <div>
          {pokemons.map((pokemon) => (
            <PokemonListItem
              key={pokemon.id}
              pokemon={pokemon}
              favorite={pokemon.id == favoritePokemon?.id}
              setFavorite={setFavoritePokemon}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonList;

export const getServerSideProps: GetServerSideProps = async (context) => {
  let page = 1;
  if (typeof context.query.page == "string") {
    const parsedQuery = parseInt(context.query.page);

    if (!isNaN(parsedQuery)) page = parsedQuery;
  }

  if (page < 1) page = 1;

  const limit = 10;

  const countRes = await fetch("https://pokeapi.co/api/v2/pokemon?");

  const { count } = await countRes.json();

  const maxPage = Math.ceil(count / limit);

  if (page > maxPage) page = maxPage;

  const res = await fetch(
    "https://pokeapi.co/api/v2/pokemon?" +
      new URLSearchParams({ limit: `${limit}`, offset: `${(page - 1) * 10}` })
  );

  const { results: pokemonRefs } = await res.json();

  const pokemons = await Promise.all(
    pokemonRefs.map(async (pokemonRef: PokemonRef) => {
      const res = await fetch(`${pokemonRef.url}`);
      return await res.json();
    })
  );

  return { props: { pokemons, page, maxPage } };
};
