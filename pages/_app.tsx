import "../styles/globals.css";
import "maplibre-gl/dist/maplibre-gl.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
