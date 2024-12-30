import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import Card from "./components/Card/Card";
import Navbar from "./components/Navbar/Navbar";
import {
  fetchPokemonByUrl,
  fetchPokemonList,
} from "./store/slices/pokemonSlice";
import { POKEMON_GENERATIONS } from "./constants/pokemonGenerations";

function App() {
  const dispatch = useDispatch();
  const { loading, pokemonData, nextURL, prevURL, error } = useSelector(
    (state) => state.pokemon
  );

  useEffect(() => {
    dispatch(fetchPokemonByUrl(POKEMON_GENERATIONS.INITIAL));
    dispatch(fetchPokemonList());
  }, [dispatch]);

  const handleGeneration = (url) => {
    dispatch(fetchPokemonByUrl(url));
  };

  return (
    <>
      <Navbar />
      <div className="App">
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
            金銀
          </button>
          <button
            onClick={() => handleGeneration(POKEMON_GENERATIONS.RUBY_SAPPHIRE)}
          >
            ルビサファ
          </button>
          <button
            onClick={() => handleGeneration(POKEMON_GENERATIONS.DIAMOND_PEARL)}
          >
            ダイパ
          </button>
          <button
            onClick={() => handleGeneration(POKEMON_GENERATIONS.BLACK_WHITE)}
          >
            黒白
          </button>
          <button onClick={() => handleGeneration(POKEMON_GENERATIONS.XY)}>
            X・Y
          </button>
          <button
            onClick={() => handleGeneration(POKEMON_GENERATIONS.SUN_MOON)}
          >
            サンムーン
          </button>
          <button
            onClick={() => handleGeneration(POKEMON_GENERATIONS.SWORD_SHIELD)}
          >
            剣盾
          </button>
          <button onClick={() => handleGeneration(POKEMON_GENERATIONS.ARCEUS)}>
            アルセウス
          </button>
          <button
            onClick={() => handleGeneration(POKEMON_GENERATIONS.SCARLET_VIOLET)}
          >
            スカー・バイオ
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
