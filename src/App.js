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
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };

  const loadPokemonGoldSilverRubySapphire = async (data) => {
    let _pokemonData = await Promise.all(
      data.slice(11).map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };
  const loadPokemonDiamondPearl = async (data) => {
    let _pokemonData = await Promise.all(
      data.slice(6).map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };

  const loadPokemonBlackWhite = async (data) => {
    let _pokemonData = await Promise.all(
      data.slice(14).map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };

  const loadPokemonXYSwordShield = async (data) => {
    let _pokemonData = await Promise.all(
      data.slice(9).map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };

  const loadPokemonSunMoon = async (data) => {
    let _pokemonData = await Promise.all(
      data.slice(1).map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };

  const loadPokemonArceus = async (data) => {
    let _pokemonData = await Promise.all(
      data.slice(18).map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };

  const loadPokemonScarletViolet = async (data) => {
    let _pokemonData = await Promise.all(
      data.slice(5).map((pokemon) => {
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

  const handleGoldSilverPage = async () => {
    const goldSilverPageUrl =
      "https://pokeapi.co/api/v2/pokemon?offset=140&limit=20";
    setLoading(true);
    let data = await getURLtoJson(goldSilverPageUrl);
    console.log(data.previous);
    await loadPokemonGoldSilverRubySapphire(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };

  const handleRubySapphirePage = async () => {
    const RubySapphireUrl =
      "https://pokeapi.co/api/v2/pokemon?offset=240&limit=20";
    setLoading(true);
    let data = await getURLtoJson(RubySapphireUrl);
    console.log(data.previous);
    await loadPokemonGoldSilverRubySapphire(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };

  const handleDiamondPearl = async () => {
    const DiamondPealUrl =
      "https://pokeapi.co/api/v2/pokemon?offset=380&limit=20";
    setLoading(true);
    let data = await getURLtoJson(DiamondPealUrl);
    console.log(data.previous);
    await loadPokemonDiamondPearl(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };

  const handleBlackWhite = async () => {
    const DiamondPealUrl =
      "https://pokeapi.co/api/v2/pokemon?offset=480&limit=20";
    setLoading(true);
    let data = await getURLtoJson(DiamondPealUrl);
    console.log(data.previous);
    await loadPokemonBlackWhite(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };

  const handleXY = async () => {
    const DiamondPealUrl =
      "https://pokeapi.co/api/v2/pokemon?offset=640&limit=20";
    setLoading(true);
    let data = await getURLtoJson(DiamondPealUrl);
    console.log(data.previous);
    await loadPokemonXYSwordShield(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };
  const handleSunMoon = async () => {
    const DiamondPealUrl =
      "https://pokeapi.co/api/v2/pokemon?offset=720&limit=20";
    setLoading(true);
    let data = await getURLtoJson(DiamondPealUrl);
    console.log(data.previous);
    await loadPokemonSunMoon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };

  const handleSwordShield = async () => {
    const DiamondPealUrl =
      "https://pokeapi.co/api/v2/pokemon?offset=800&limit=20";
    setLoading(true);
    let data = await getURLtoJson(DiamondPealUrl);
    console.log(data.previous);
    await loadPokemonXYSwordShield(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };

  const handleArceus = async () => {
    const DiamondPealUrl =
      "https://pokeapi.co/api/v2/pokemon?offset=880&limit=20";
    setLoading(true);
    let data = await getURLtoJson(DiamondPealUrl);
    console.log(data.previous);
    await loadPokemonArceus(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };

  const handleScarletViolet = async () => {
    const DiamondPealUrl =
      "https://pokeapi.co/api/v2/pokemon?offset=900&limit=20";
    setLoading(true);
    let data = await getURLtoJson(DiamondPealUrl);
    console.log(data.previous);
    await loadPokemonScarletViolet(data.results);
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
            {/* <div className="gameBoyBody"></div>
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
            <div className="gameBoyFrame__gameGirl">GAME GIRL</div> */}

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
          <button onClick={handleGoldSilverPage}>金・銀</button>
          <button onClick={handleRubySapphirePage}>ルビ・サファ</button>
          <button onClick={handleDiamondPearl}>ダイ・パ</button>
          <button onClick={handleBlackWhite}>黒・白</button>
          <button onClick={handleXY}>X・Y</button>
          <button onClick={handleSunMoon}>サン・ムーン</button>
          <button onClick={handleSwordShield}>剣・盾</button>
          <button onClick={handleArceus}>アルセウス</button>
          <button onClick={handleScarletViolet}>
            スカーレット・バイオレット
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
