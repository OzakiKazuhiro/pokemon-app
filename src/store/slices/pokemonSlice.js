import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getURLtoJson, getPokemon } from "../../utils/pokemon";

// 非同期アクション
export const fetchPokemonByUrl = createAsyncThunk(
  "pokemon/fetchByUrl",
  async (url) => {
    const res = await getURLtoJson(url);
    const pokemonData = await Promise.all(
      res.results.map((pokemon) => getPokemon(pokemon.url))
    );
    return {
      pokemonData,
      next: res.next,
      previous: res.previous,
    };
  }
);

export const searchPokemon = createAsyncThunk(
  "pokemon/search",
  async ({ searchTerm, pokemonList }) => {
    const foundPokemon = pokemonList.find(
      (pokemon) =>
        pokemon.pokeapi_species_name_ja === searchTerm ||
        pokemon.yakkuncom_name === searchTerm
    );

    if (foundPokemon) {
      const offset = foundPokemon.pokeapi_id - 1;
      const searchURL = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=1`;
      const data = await getURLtoJson(searchURL);
      const pokemonData = await Promise.all(
        data.results.map((pokemon) => getPokemon(pokemon.url))
      );
      return {
        pokemonData,
        next: data.next,
        previous: data.previous,
      };
    }
    throw new Error("ポケモンが見つかりませんでした");
  }
);

export const fetchPokemonList = createAsyncThunk(
  "pokemon/fetchList",
  async () => {
    const response = await fetch("./pokemon_all.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  }
);

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: {
    loading: false,
    pokemonData: [],
    nextURL: "",
    prevURL: "",
    searchTerm: "",
    pokemonList: [],
    error: null,
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchPokemonByUrl
      .addCase(fetchPokemonByUrl.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPokemonByUrl.fulfilled, (state, action) => {
        state.loading = false;
        state.pokemonData = action.payload.pokemonData;
        state.nextURL = action.payload.next;
        state.prevURL = action.payload.previous;
      })
      .addCase(fetchPokemonByUrl.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // searchPokemon
      .addCase(searchPokemon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchPokemon.fulfilled, (state, action) => {
        state.loading = false;
        state.pokemonData = action.payload.pokemonData;
        state.nextURL = action.payload.next;
        state.prevURL = action.payload.previous;
      })
      .addCase(searchPokemon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // fetchPokemonList
      .addCase(fetchPokemonList.fulfilled, (state, action) => {
        state.pokemonList = action.payload;
      });
  },
});

export const { setSearchTerm, clearError } = pokemonSlice.actions;
export default pokemonSlice.reducer;
