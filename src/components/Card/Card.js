import React from "react";
import "./Card.css";

const Card = ({ pokemon, pokemonName }) => {
  return (
    <div className="card">
      <h3 className="cardName">{pokemon.name}</h3>
      <div className="cardImg">
        {" "}
        <img src={pokemon.sprites.front_default} alt="" />
      </div>
      <div className="cardTypes">
        <div>タイプ</div>
        {pokemon.types.map((typeArray, i) => {
          return (
            <div key={i}>
              <span className="typeName">{typeArray.type.name}</span>
            </div>
          );
        })}
      </div>
      <div className="cardInfo">
        <div className="cardData">
          <p>重さ：{pokemon.weight}</p>
        </div>
        <div className="cardData">
          <p>高さ：{pokemon.height}</p>
        </div>
        <div className="cardData">
          <p>アビリティ：{pokemon.abilities[0].ability.name}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
