import React, { useState } from "react";
import "./Navbar.css";
import monsterBall from "./monsterBall.png"; // 画像を変数としてインポート
import { getURLtoJson, getPokemon } from "../../utils/pokemon";

const Navbar = () => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [nextURL, setNextURL] = useState("");
  const [prevURL, setPrevURL] = useState("");
  const [pokemonList, setPokemonList] = useState([]); // JSONデータを保持するstate

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
      await getPokemon(data.results);
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

  return (
    <>
      <nav>
        <img className="monsterBall" src={monsterBall} alt="モンスターボール" />
        ポケモン図鑑
        <img className="monsterBall" src={monsterBall} alt="モンスターボール" />
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
      </nav>
    </>
  );
};

export default Navbar;
