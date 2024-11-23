import { useEffect, useState } from "react";
import "./App.css";
import { getURLtoJson, getPokemon } from "./utils/pokemon";
import Card from "./components/Card/Card";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  //最初の２０匹のデータが入っているURL

  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [nextURL, setNextURL] = useState("");
  const [prevURL, setPrevURL] = useState("");
  const [pokemonName, setPokemonName] = useState(0);

  useEffect(() => {
    const fetchPokemonData = async () => {
      //全てのポケモンデータを取得
      let res = await getURLtoJson(initialURL);
      console.log(res);
      // console.log(res.results[0].url);
      // let res2 = await getAllPokemon(res.results[0].url);
      // console.log(res2);
      // let res3 = await getAllPokemon(res2.species.url);
      // console.log(res3);
      // let pokemonJaName = res3.names[0].name;
      // console.log(pokemonJaName);

      // console.log(res.next);
      loadPokemon(res.results);
      setNextURL(res.next);
      setPrevURL(res.previous);
      setLoading(false);
    };
    fetchPokemonData();
    getPokemonJaName();
  }, []); //←初回時にだけ発火

  const getPokemonJaName = async () => {
    let res = await getURLtoJson(initialURL);
    let res2 = await getURLtoJson(res.results[pokemonName].url);
    let res3 = await getURLtoJson(res2.species.url);
    const pokemonJaName = res3.names[0].name;
    console.log(pokemonJaName);
    setPokemonName((prevName) => prevName + 1);
  };

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        // console.log(pokemon);
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };

  // console.log(pokemonData);

  const handleNextPage = async () => {
    setLoading(true);
    let data = await getURLtoJson(nextURL);
    // console.log(data);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };

  const handlePrevPage = async () => {
    if (!prevURL) return;
    setLoading(true);
    let data = await getURLtoJson(prevURL);
    console.log(data.previous);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="App">
        {loading ? (
          <h1>ロード中・・・</h1>
        ) : (
          <div className="pokemonCardContainer">
            {pokemonData.map((pokemon, i) => {
              return <Card key={i} pokemon={pokemon} />;
            })}
          </div>
        )}
        <div className="btn">
          <button onClick={handlePrevPage}>まえへ</button>
          <button onClick={handleNextPage}>つぎへ</button>
        </div>
      </div>
    </>
  );
}

export default App;
