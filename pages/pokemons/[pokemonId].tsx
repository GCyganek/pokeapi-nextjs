import { GetServerSideProps, GetStaticProps } from "next";
import PokemonListItem from "../../src/components/PokemonListItem";
import { useFavoritePokemon } from "../../src/favorite-pokemon";
import { Pokemon } from "../../src/types/pokemon";

type PokemonProps = {
  pokemon: Pokemon;
};

const Pokemon: React.FC<PokemonProps> = ({ pokemon }) => {
  const { favoritePokemon, setFavoritePokemon } = useFavoritePokemon();

  return (
    <div className="flex justify-center mt-10">
      <PokemonListItem
        key={pokemon.id}
        pokemon={pokemon}
        favorite={favoritePokemon?.id == pokemon.id}
        setFavorite={setFavoritePokemon}
      />
    </div>
  );
};

export default Pokemon;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const pokemonId = context.query.pokemonId;

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
  const pokemon = await res.json();

  return { props: { pokemon } };
};
