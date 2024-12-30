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
  // 検索機能のための新しいstate
  const [searchTerm, setSearchTerm] = useState("");
  const [pokemonList, setPokemonList] = useState([]); // JSONデータを保持するstate
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        // PokeAPI データの取得
        let res = await getURLtoJson(initialURL);
        loadPokemon(res.results);
        setNextURL(res.next);
        setPrevURL(res.previous);

        // ローカルのJSONデータの取得
        const response = await fetch("./pokemon_all.json");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPokemonList(data);
      } catch (error) {
        console.error("Error loading data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonData();
  }, []);

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };

  // 検索機能の実装
  const handleSearch = async () => {
    if (!searchTerm) return;

    setLoading(true);
    // JSONデータから該当するポケモンを検索
    const foundPokemon = pokemonList.find(
      (pokemon) =>
        pokemon.pokeapi_species_name_ja === searchTerm ||
        pokemon.yakkuncom_name === searchTerm
    );

    if (foundPokemon) {
      const offset = foundPokemon.pokeapi_id - 1;
      const searchURL = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=1`;

      let data = await getURLtoJson(searchURL);
      await loadPokemon(data.results);
      setNextURL(data.next);
      setPrevURL(data.previous);
    }
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    // Enterキーが押されたとき（キーコード13）に検索を実行
    if (e.key === "Enter") {
      handleSearch();
    }
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
      "https://pokeapi.co/api/v2/pokemon?offset=151&limit=20";
    setLoading(true);
    let data = await getURLtoJson(goldSilverPageUrl);
    console.log(data.previous);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };

  const handleRubySapphirePage = async () => {
    const RubySapphireUrl =
      "https://pokeapi.co/api/v2/pokemon?offset=251&limit=20";
    setLoading(true);
    let data = await getURLtoJson(RubySapphireUrl);
    console.log(data.previous);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };

  const handleDiamondPearl = async () => {
    const DiamondPealUrl =
      "https://pokeapi.co/api/v2/pokemon?offset=386&limit=20";
    setLoading(true);
    let data = await getURLtoJson(DiamondPealUrl);
    console.log(data.previous);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };

  const handleBlackWhite = async () => {
    const DiamondPealUrl =
      "https://pokeapi.co/api/v2/pokemon?offset=494&limit=20";
    setLoading(true);
    let data = await getURLtoJson(DiamondPealUrl);
    console.log(data.previous);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };

  const handleXY = async () => {
    const DiamondPealUrl =
      "https://pokeapi.co/api/v2/pokemon?offset=649&limit=20";
    setLoading(true);
    let data = await getURLtoJson(DiamondPealUrl);
    console.log(data.previous);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };
  const handleSunMoon = async () => {
    const DiamondPealUrl =
      "https://pokeapi.co/api/v2/pokemon?offset=721&limit=20";
    setLoading(true);
    let data = await getURLtoJson(DiamondPealUrl);
    console.log(data.previous);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };

  const handleSwordShield = async () => {
    const DiamondPealUrl =
      "https://pokeapi.co/api/v2/pokemon?offset=809&limit=20";
    setLoading(true);
    let data = await getURLtoJson(DiamondPealUrl);
    console.log(data.previous);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };

  const handleArceus = async () => {
    const DiamondPealUrl =
      "https://pokeapi.co/api/v2/pokemon?offset=898&limit=20";
    setLoading(true);
    let data = await getURLtoJson(DiamondPealUrl);
    console.log(data.previous);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };

  const handleScarletViolet = async () => {
    const DiamondPealUrl =
      "https://pokeapi.co/api/v2/pokemon?offset=905&limit=20";
    setLoading(true);
    let data = await getURLtoJson(DiamondPealUrl);
    console.log(data.previous);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };

  const handleSample = async () => {
    const DiamondPealUrl =
      "https://pokeapi.co/api/v2/pokemon?offset=150&limit=1";
    setLoading(true);
    let data = await getURLtoJson(DiamondPealUrl);
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
        <div className="searchContainer">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="ポケモンの名前を入力"
            className="searchInput"
          />
          <button onClick={handleSearch} className="searchButton">
            検索
          </button>
        </div>

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
          <button onClick={handleSample}>実験</button>
        </div>
      </div>
    </>
  );
}

export default App;
