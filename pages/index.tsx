import type { GetStaticProps } from "next";
import Link from "next/link";
import PokemonListItem from "../src/components/PokemonListItem";
import { useFavoritePokemon } from "../src/favorite-pokemon";
import { Pokemon } from "../src/types/pokemon";
import { PokemonRef } from "../src/types/pokemon-ref";
import Map, { Marker } from "react-map-gl";
import maplibregl from "maplibre-gl";
import { useRouter } from "next/router";
import { initViewState } from "../src/constants/initViewState";

type HomeProps = {
  pokemonsData: Pokemon[];
};

const Home: React.FC<HomeProps> = ({ pokemonsData }) => {
  const router = useRouter();
  const { favoritePokemon, setFavoritePokemon } = useFavoritePokemon();

  return (
    <div className="grid grid-cols-2 gap-2 mx-16 mt-8">
      <div className="bg-slate-100 rounded">
        <div className="flex justify-center">
          <div>
            {pokemonsData.map((pokemon) => (
              <PokemonListItem
                key={pokemon.id}
                pokemon={pokemon}
                favorite={favoritePokemon?.id == pokemon.id}
                setFavorite={setFavoritePokemon}
              />
            ))}
            <Link href="/pokemons/">
              <button className="float-right rounded border-2 p-2 m-2 bg-sky-100 hover:bg-slate-100 font-mono hover:font-slate-400">
                List all pokemons
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="grid grid-rows-4 gap-2 rounded">
        <div className="row-span-3 bg-slate-100 rounded grid justify-center items-center">
          <Map
            mapLib={maplibregl}
            initialViewState={initViewState}
            style={{ width: 600, height: 400 }}
            mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
          ></Map>
          <button
            onClick={(e) => router.push("/map")}
            className="mx-auto rounded border-2 p-2 m-2 bg-sky-100 hover:bg-slate-100 font-mono hover:font-slate-400"
          >
            Go to pokemon map
          </button>
        </div>
        <div className="row-span-1 bg-slate-100 rounded">
          <p className="text-center font-mono mt-2">Your favourite pokemon:</p>
          <div className="flex justify-center">
            {favoritePokemon?.id ? (
              <PokemonListItem
                key={favoritePokemon?.id}
                pokemon={favoritePokemon}
                favorite={true}
                setFavorite={setFavoritePokemon}
              />
            ) : (
              <p className="text-center font-mono text-pink-700 mt-4">
                Select your favorite pokemon first!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(
    "https://pokeapi.co/api/v2/pokemon?" +
      new URLSearchParams({ limit: "5", offset: "0" })
  );

  const { results: pokemons } = await res.json();

  const pokemonsData = await Promise.all(
    pokemons.map(async (pokemon: PokemonRef) => {
      const res = await fetch(`${pokemon.url}`);
      return await res.json();
    })
  );

  return { props: { pokemonsData } };
};

export default Home;
