import React from "react";
import "./Navbar.css";
import monsterBall from "./monsterBall.png"; // 画像を変数としてインポート

const Navbar = () => {
  return (
    <>
      <nav>
        <img className="monsterBall" src={monsterBall} alt="モンスターボール" />
        ポケモン図鑑
        <img className="monsterBall" src={monsterBall} alt="モンスターボール" />
      </nav>
    </>
  );
};

export default Navbar;
