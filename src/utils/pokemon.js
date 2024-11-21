export const getAllPokemon = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url) //通常、この第１段階はオブジェクトで帰って来る
      .then((res) => res.json()) //このオブジェクトをjsonファイルにしている
      .then((data) => resolve(data)); //そしてresolve(data)をreturnしている
  });
};

export const getPokemon = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        resolve(data);
      });
  });
};
