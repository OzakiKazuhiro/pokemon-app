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

// エラー表示コンポーネント
const ErrorMessage = ({ error }) => {
  if (!error) return null;
  return <div className="error">{error}</div>;
};

// ローディング表示コンポーネント
const LoadingIndicator = () => {
  return <h1>ロード中・・・</h1>;
};

// ポケモンカードコンテナコンポーネント
const PokemonCardContainer = ({ pokemonData }) => {
  return (
    <div className="pokemonCardContainer">
      {pokemonData.map((pokemon, i) => (
        <Card key={i} pokemon={pokemon} />
      ))}
    </div>
  );
};

// ページネーションボタンコンポーネント
const PaginationButtons = ({ prevURL, nextURL, onPageChange, loading }) => {
  return (
    <div className="btn">
      <button
        onClick={() => prevURL && onPageChange(prevURL)}
        disabled={!prevURL || loading}
      >
        まえへ
      </button>
      <button
        onClick={() => nextURL && onPageChange(nextURL)}
        disabled={!nextURL || loading}
      >
        つぎへ
      </button>
    </div>
  );
};

function App() {
  const dispatch = useDispatch();
  const { loading, pokemonData, nextURL, prevURL, error } = useSelector(
    (state) => state.pokemon
  );

  // 初期データの取得
  useEffect(() => {
    dispatch(fetchPokemonByUrl(POKEMON_GENERATIONS.INITIAL));
    dispatch(fetchPokemonList());
  }, [dispatch]);

  // ページネーション処理
  const handlePageChange = (url) => {
    dispatch(fetchPokemonByUrl(url));
  };

  return (
    <>
      <Navbar />
      <div className="App">
        <ErrorMessage error={error} />

        {loading ? (
          <LoadingIndicator />
        ) : (
          <PokemonCardContainer pokemonData={pokemonData} />
        )}

        <PaginationButtons
          prevURL={prevURL}
          nextURL={nextURL}
          onPageChange={handlePageChange}
          loading={loading}
        />

        <div className="generation-buttons">
          <button
            onClick={() => handlePageChange(POKEMON_GENERATIONS.GOLD_SILVER)}
          >
            金銀
          </button>
          <button
            onClick={() => handlePageChange(POKEMON_GENERATIONS.RUBY_SAPPHIRE)}
          >
            ルビサファ
          </button>
          <button
            onClick={() => handlePageChange(POKEMON_GENERATIONS.DIAMOND_PEARL)}
          >
            ダイパ
          </button>
          <button
            onClick={() => handlePageChange(POKEMON_GENERATIONS.BLACK_WHITE)}
          >
            黒白
          </button>
          <button onClick={() => handlePageChange(POKEMON_GENERATIONS.XY)}>
            X・Y
          </button>
          <button
            onClick={() => handlePageChange(POKEMON_GENERATIONS.SUN_MOON)}
          >
            サンムーン
          </button>
          <button
            onClick={() => handlePageChange(POKEMON_GENERATIONS.SWORD_SHIELD)}
          >
            剣盾
          </button>
          <button onClick={() => handlePageChange(POKEMON_GENERATIONS.ARCEUS)}>
            アルセウス
          </button>
          <button
            onClick={() => handlePageChange(POKEMON_GENERATIONS.SCARLET_VIOLET)}
          >
            スカー・バイオ
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
