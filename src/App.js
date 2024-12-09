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

      // console.log(res.next);
      loadPokemon(res.results);
      setNextURL(res.next);
      setPrevURL(res.previous);
      setLoading(false);
    };
    fetchPokemonData();
    // getPokemonJaName(initialURL);
  }, []); //←初回時にだけ発火

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

  const handleNextPage = async () => {
    setLoading(true);
    let data = await getURLtoJson(nextURL);
    console.log(data);
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
          <>
            <div className="gameBoyBody"></div>
            <div className="gameBoyFrame__redLine"></div>
            <div className="gameBoyFrame"></div>
            <div className="gameBoyFrame__redLine"></div>
            <div className="gameBoyFrame__blueLine"></div>
            <div className="gameBoyFrame__message">
              DOT MATRIX WITH STEREO SOUND
            </div>
            <div className="gameBoyFrame__batteryLight"></div>
            <div className="gameBoyFrame__batteryMessage">Battery</div>
            <div className="gameBoyFrame__nintenbo">Nintenbo</div>
            <div className="gameBoyFrame__gameGirl">GAME GIRL</div>

            <div className="pokemonCardContainer">
              {pokemonData.map((pokemon, i) => {
                return (
                  <Card
                    key={i}
                    pokemon={pokemon} //←配列１つ１つ渡していく
                    // getPokemonJaName={getPokemonJaName}
                  />
                );
              })}
            </div>
          </>
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
