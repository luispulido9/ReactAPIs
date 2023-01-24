import { useEffect, useState } from "react";
/**
 * 🇬🇧
 * Given these 2 APIs:
 *  - https://catfact.ninja/fact - Cat Random Facts
 *  - https://developers.giphy.com/docs/ - Giphy API
 *
 * Select one random cat fact and look for a matching gif by using
 * the first 3 words from the fact.
 *
 * The result should be displayed with the
 * image on the left side and the text on the right side,
 * positioned in the middle.
 *
 * Here, find a valid GIPHY API KEY:
 */

/*
const GIPHY_API_KEY = "2cZkiFTqyiS79UdSapL6LHWlublpl7iy";
 
 * 🇪🇸
 * Dadas estas 2 APIs:
 *  - https://catfact.ninja/fact - Cat Random Facts
 *  - https://developers.giphy.com/docs/ - Giphy API
 *
 * Selecciona un dato sobre gatos usando la primera API.
 * De ese dato, usa las tres primeras palabras
 * y busca un gif usando la API de Giphy.
 *
 * El resultado se tiene que mostrar con una imagen a la izquierda
 * y el texto a la derecha, todo centrado verticalmente.
 *
 * Aquí tienes la API Key de Giphy:


 const GIPHY_API_KEY = "2cZkiFTqyiS79UdSapL6LHWlublpl7iy"
 */
export default function App() {
  const [catFact, setCatFact] = useState("");
  const [gifUrl, setGifUrl] = useState("");

  const getFactAPI = async () => {
    const CAT_API_KEY = "https://catfact.ninja/fact";
    const response = await fetch(CAT_API_KEY);
    const { fact } = await response.json();
    setCatFact(fact);
    gifAPI(fact.split(" ").slice(0, 3));
  };

  const gifAPI = async (search) => {
    const GIPHY_APY_KEY = "2cZkiFTqyiS79UdSapL6LHWlublpl7iy";
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_APY_KEY}&q=${search}`
    );
    const { data } = await response.json();
    const img = data[0].images.original.url;
    setGifUrl(img);
  };

  useEffect(() => {
    getFactAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={gifUrl}
          alt=""
          style={{ objectFit: "contain", height: "150px", width: "150px" }}
        />
        <h1>{catFact}</h1>
      </div>
    </>
  );
}
