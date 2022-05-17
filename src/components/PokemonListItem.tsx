import Link from "next/link";
import { Pokemon } from "../types/pokemon";
import Image from "next/image";

type PokemonListItemProps = {
  pokemon: Pokemon;
  favorite: boolean;
  setFavorite: (pokemon: Pokemon) => void;
};

const PokemonListItem: React.FC<PokemonListItemProps> = ({
  pokemon,
  favorite,
  setFavorite,
}) => {
  return (
    <div className="rounded bg-sky-50 grid grid-cols-4 max-w-3xl m-2 p-2 border-2 items-center font-mono">
      <div className="col-span-1 m-auto">
        <img
          src={pokemon.sprites.front_default}
          alt={`${pokemon.name} image`}
          width="96"
          height="96"
        />
        <Link href={`/pokemons/${encodeURIComponent(pokemon.id)}`}>
          <a>
            <p className="text-center capitalize font-bold hover:text-slate-400">
              {pokemon.name}
            </p>
          </a>
        </Link>
      </div>
      <div className="col-span-3 font-light">
        <div className="flex justify-between my-2">
          <div></div>
          <p className="text-center">Statistics:</p>
          <Image
            className="hover:opacity-75"
            src={favorite ? "/favourited.png" : "/favourite.png"}
            alt="heart"
            width="24"
            height="16"
            onClick={(e) => {
              setFavorite(pokemon);
            }}
          />
        </div>
        <ul className="grid grid-cols-3 gap-1 border-2 border-dashed items-center w-auto justify-between rounded text-sm">
          {pokemon.stats.map((stat) => (
            <li className="text-center" key={stat.stat.name}>
              {stat.stat.name} = {stat.base_stat}
            </li>
          ))}
          <li className="text-center">base-xp = {pokemon.base_experience}</li>
          <li className="text-center">height = {pokemon.height}</li>
          <li className="text-center">weight = {pokemon.weight}</li>
        </ul>
      </div>
    </div>
  );
};

export default PokemonListItem;
