import React, { useEffect, useState } from "react";
import "./Card.css";
import { getURLtoJson } from "../../utils/pokemon";

const Card = ({ pokemon }) => {
  // 日本語名を保持するための状態を追加
  const [japaneseName, setJapaneseName] = useState("");
  const [pokemonCry, setPokemonCry] = useState("");
  const [pokemonWeight, setPokemonWeight] = useState("");
  const [pokemonHeight, setPokemonHeight] = useState("");
  const [isFront, setIsFront] = useState(true);
  const [isDifferentColor, setIsDifferentColor] = useState(false);

  // コンポーネントのマウント時に日本語名を取得
  useEffect(() => {
    const fetchJapaneseName = async () => {
      let res3 = await getURLtoJson(pokemon.species.url);
      const pokemonJaName = res3.names.find(
        (name) => name.language.name === "ja"
      ).name;
      setJapaneseName(pokemonJaName);
    };

    const fetchPokemonCry = async () => {
      const response = await fetch(pokemon.cries.latest);
      const blob = await response.blob();
      // AudioElementを作成して再生
      const pokemonCry = new Audio(URL.createObjectURL(blob));
      // pokemonCry.play();
      setPokemonCry(pokemonCry);
    };

    const changeJaWeight = async () => {
      const pokemonJaWeight = pokemon.weight / 10;
      setPokemonWeight(pokemonJaWeight);
    };

    const changeJaHeight = async () => {
      const pokemonJaHeight = pokemon.height / 10;
      setPokemonHeight(pokemonJaHeight);
    };

    fetchJapaneseName();
    fetchPokemonCry();
    changeJaWeight();
    changeJaHeight();
  }, [
    pokemon.species.url,
    pokemon.cries.latest,
    pokemon.weight,
    pokemon.height,
  ]); // 依存配列に必要な値を追加

  const togglePokemonImage = () => {
    setIsFront(!isFront);
  };
  const togglePokemonColor = () => {
    setIsDifferentColor(!isDifferentColor);
  };

  // タイプを英語から日本語に変換する関数
  const translateType = (type) => {
    switch (type) {
      case "normal":
        return "ノーマル";
      case "fire":
        return "ほのお";
      case "water":
        return "みず";
      case "electric":
        return "でんき";
      case "grass":
        return "くさ";
      case "ice":
        return "こおり";
      case "fighting":
        return "かくとう";
      case "poison":
        return "どく";
      case "ground":
        return "じめん";
      case "flying":
        return "ひこう";
      case "psychic":
        return "エスパー";
      case "bug":
        return "むし";
      case "rock":
        return "いわ";
      case "ghost":
        return "ゴースト";
      case "dragon":
        return "ドラゴン";
      case "dark":
        return "あく";
      case "steel":
        return "はがね";
      case "fairy":
        return "フェアリー";
      default:
        return type; // 未知のタイプの場合は英語のまま返す
    }
  };

  return (
    <div className="card">
      <h3 className="cardName">{japaneseName}</h3>
      <div className="cardImg">
        {isDifferentColor ? (
          <img
            src={
              isFront ? pokemon.sprites.front_shiny : pokemon.sprites.back_shiny
            }
            onClick={togglePokemonImage}
            alt={`${japaneseName}（色違い）`}
          />
        ) : (
          <img
            src={
              isFront
                ? pokemon.sprites.front_default
                : pokemon.sprites.back_default
            }
            onClick={togglePokemonImage}
            alt={japaneseName}
          />
        )}
      </div>
      <div className="cardTypes">
        <div>タイプ</div>
        {pokemon.types.map((typeArray, i) => {
          return (
            <div key={i}>
              <span className="typeName">
                {translateType(typeArray.type.name)}
              </span>
            </div>
          );
        })}
      </div>
      <div className="cardInfo">
        <div className="cardData">
          <p>おもさ：{pokemonWeight} kg</p>
        </div>
        <div className="cardData">
          <p>たかさ：{pokemonHeight} m</p>
        </div>
        <div className="monsterBallFrameContainer">
          <div className="monsterBallFrame" onClick={() => pokemonCry.play()}>
            <div className="monsterBallButton">なき声</div>
          </div>
          <div className="masterBallFrame" onClick={togglePokemonColor}>
            <div className="monsterBallButton">色ちがい</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
