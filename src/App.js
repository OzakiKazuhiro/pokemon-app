import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import Card from "./components/Card/Card";
import Navbar from "./components/Navbar/Navbar";
import {
  fetchPokemonByUrl,
  fetchPokemonList,
  searchPokemon,
  setSearchTerm,
} from "./store/slices/pokemonSlice";
import { POKEMON_GENERATIONS } from "./constants/pokemonGenerations";

function App() {
  const dispatch = useDispatch();
  const {
    loading,
    pokemonData,
    nextURL,
    prevURL,
    searchTerm,
    pokemonList,
    error,
  } = useSelector((state) => state.pokemon);

  useEffect(() => {
    dispatch(fetchPokemonByUrl(POKEMON_GENERATIONS.INITIAL));
    dispatch(fetchPokemonList());
  }, [dispatch]);

  const handleSearch = () => {
    if (!searchTerm) return;
    dispatch(searchPokemon({ searchTerm, pokemonList }));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleGeneration = (url) => {
    dispatch(fetchPokemonByUrl(url));
  };

  return (
    <>
      <Navbar />
      <div className="App">
        <div className="searchContainer">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            onKeyDown={handleKeyDown}
            placeholder="ポケモンの名前を入力"
            className="searchInput"
          />
          <button onClick={handleSearch} className="searchButton">
            検索
          </button>
        </div>

        {error && <div className="error">{error}</div>}

        {loading ? (
          <h1>ロード中・・・</h1>
        ) : (
          <div className="pokemonCardContainer">
            {pokemonData.map((pokemon, i) => (
              <Card key={i} pokemon={pokemon} />
            ))}
          </div>
        )}

        <div className="btn">
          <button
            onClick={() => prevURL && handleGeneration(prevURL)}
            disabled={!prevURL}
          >
            まえへ
          </button>
          <button
            onClick={() => nextURL && handleGeneration(nextURL)}
            disabled={!nextURL}
          >
            つぎへ
          </button>
        </div>

        <div className="generation-buttons">
          <button
            onClick={() => handleGeneration(POKEMON_GENERATIONS.GOLD_SILVER)}
          >
            金・銀
          </button>
          <button
            onClick={() => handleGeneration(POKEMON_GENERATIONS.RUBY_SAPPHIRE)}
          >
            ルビ・サファ
          </button>
          <button
            onClick={() => handleGeneration(POKEMON_GENERATIONS.DIAMOND_PEARL)}
          >
            ダイ・パ
          </button>
          <button
            onClick={() => handleGeneration(POKEMON_GENERATIONS.BLACK_WHITE)}
          >
            黒・白
          </button>
          <button onClick={() => handleGeneration(POKEMON_GENERATIONS.XY)}>
            X・Y
          </button>
          <button
            onClick={() => handleGeneration(POKEMON_GENERATIONS.SUN_MOON)}
          >
            サン・ムーン
          </button>
          <button
            onClick={() => handleGeneration(POKEMON_GENERATIONS.SWORD_SHIELD)}
          >
            剣・盾
          </button>
          <button onClick={() => handleGeneration(POKEMON_GENERATIONS.ARCEUS)}>
            アルセウス
          </button>
          <button
            onClick={() => handleGeneration(POKEMON_GENERATIONS.SCARLET_VIOLET)}
          >
            スカーレット・バイオレット
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
