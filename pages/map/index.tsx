import mapboxgl from "mapbox-gl";
import maplibregl from "maplibre-gl";
import { GetStaticProps } from "next";
import { useState } from "react";
import Map, {
  FullscreenControl,
  GeolocateControl,
  Marker,
  NavigationControl,
} from "react-map-gl";
import MapMarkerModal from "../../src/components/MapMarkerModal";
import { initViewState } from "../../src/constants/initViewState";
import { PokemonRef } from "../../src/types/pokemon-ref";

export type PokemonMapProps = {
  pokemonNames: string[];
};

export type MarkEventWithImage = {
  event: mapboxgl.MapLayerMouseEvent;
  image: string;
};

export type MarkerData = {
  image: string;
  lng: number;
  lat: number;
};

const PokemonMap: React.FC<PokemonMapProps> = ({ pokemonNames }) => {
  const [viewState, setViewState] = useState(initViewState);
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const [markEvent, setMarkEvent] = useState<mapboxgl.MapLayerMouseEvent>();
  const [showModal, setShowModal] = useState(false);

  function toggleModal() {
    setShowModal(!showModal);
  }

  function addMarker(marker: MarkEventWithImage) {
    setMarkers([
      ...markers,
      {
        image: marker.image,
        lng: marker.event.lngLat.lng,
        lat: marker.event.lngLat.lat,
      },
    ]);
  }

  return (
    <div className="fixed flex-col justify-center items-center left-0 right-0 bottom-0 top-0">
      <div className="w-full h-[95%]">
        <Map
          mapLib={maplibregl}
          initialViewState={viewState}
          onMove={(e) => setViewState(e.viewState)}
          onClick={(e) => {
            setMarkEvent(e);
            toggleModal();
          }}
          style={{ width: "100%", height: "100%" }}
          mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
        >
          {markers.map((m, i) => (
            <Marker longitude={m.lng} latitude={m.lat} key={i}>
              <img src={m.image} />
            </Marker>
          ))}
          <FullscreenControl />
          <GeolocateControl />
          <NavigationControl />
        </Map>
        {showModal ? (
          <MapMarkerModal
            pokemonNames={pokemonNames}
            markEvent={markEvent}
            addMarker={addMarker}
            toggleModal={toggleModal}
          />
        ) : null}
      </div>
      <div className="flex justify-center my-2 mx-auto">
        <button
          className="bg-gray-300 px-2 rounded"
          onClick={() => setMarkers([])}
        >
          Clear Markers
        </button>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(
    "https://pokeapi.co/api/v2/pokemon?" +
      new URLSearchParams({ limit: "10000", offset: "0" })
  );

  const json = await res.json();

  const pokemonNames = json.results.map(
    (pokemonRef: PokemonRef) => pokemonRef.name
  );

  return { props: { pokemonNames } };
};

export default PokemonMap;
