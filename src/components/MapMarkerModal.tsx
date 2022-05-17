import { MutableRefObject, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { MarkEventWithImage } from "../../pages/map";

export type MapMarkerModalProps = {
  pokemonNames: string[];
  markEvent: mapboxgl.MapLayerMouseEvent | undefined;
  toggleModal: () => void;
  addMarker: (marker: MarkEventWithImage) => void;
};

const MapMarkerModal: React.FC<MapMarkerModalProps> = ({
  pokemonNames,
  markEvent,
  toggleModal,
  addMarker,
}) => {
  const elRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const [spottedPokemon, setSpottedPokemon] = useState("");

  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  async function getPokemonImage(): Promise<string> {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${spottedPokemon}`
    );

    const json = await res.json();

    return json.sprites.front_default;
  }

  const content = (
    <div className=" bg-white border-r-8 p-4 w-[350px] font-mono">
      <label>
        <p className="text-center">Spotted Pokemon</p>
        <select
          className="block my-2 mx-auto"
          id="spotted-pokemon"
          value={spottedPokemon}
          onChange={(e) => {
            setSpottedPokemon(e.target.value);
          }}
          onBlur={(e) => {
            setSpottedPokemon(e.target.value);
          }}
        >
          <option />
          {pokemonNames.map((pokemonName) => (
            <option key={pokemonName} value={pokemonName}>
              {pokemonName}
            </option>
          ))}
        </select>
      </label>
      <div className="flex justify-evenly items-center mt-4">
        {spottedPokemon !== "" ? (
          <button
            className="bg-gray-300 px-2 rounded"
            onClick={async () => {
              toggleModal();
              if (markEvent !== undefined) {
                addMarker({ event: markEvent, image: await getPokemonImage() });
              }
            }}
          >
            Save Marker
          </button>
        ) : null}
        <button className="bg-gray-300 px-2 rounded" onClick={toggleModal}>
          Exit
        </button>
      </div>
    </div>
  );

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    if (!modalRoot || !elRef.current) return;
    modalRoot.appendChild(elRef.current);

    return () => {
      if (elRef.current) {
        modalRoot.removeChild(elRef.current);
      }
    };
  }, []);

  return createPortal(
    <div className="bg-opacity-70 bg-black fixed flex justify-center items-center left-0 right-0 bottom-0 top-0 z-10">
      {content}
    </div>,
    elRef.current
  );
};

export default MapMarkerModal;
