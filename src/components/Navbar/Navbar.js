import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Navbar.css";
import monsterBall from "./monsterBall.png"; // 画像を変数としてインポート
import {
  searchPokemon,
  setSearchTerm,
  fetchPokemonByUrl,
} from "../../store/slices/pokemonSlice";
import { POKEMON_GENERATIONS } from "../../constants/pokemonGenerations";

const Navbar = () => {
  const dispatch = useDispatch();
  const { searchTerm, pokemonList } = useSelector((state) => state.pokemon);

  const handleSearch = () => {
    if (!searchTerm) return;
    dispatch(searchPokemon({ searchTerm, pokemonList }));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleGeneration = (generation) => {
    dispatch(fetchPokemonByUrl(generation));
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img className="monsterBall" src={monsterBall} alt="モンスターボール" />
        <h1 className="navbar-title">ポケモン図鑑</h1>
        <img className="monsterBall" src={monsterBall} alt="モンスターボール" />
      </div>

      <div className="search-section">
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
        <button onClick={() => handleGeneration(POKEMON_GENERATIONS.SUN_MOON)}>
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
    </nav>
  );
};

export default Navbar;
