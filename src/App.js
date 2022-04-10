import React, { useEffect, useState } from "react";
import api from "./services/api";
import "./App.css";
import Tilt from "react-vanilla-tilt";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import search from "../src/search.png";
import Loader from "./components/Loader/Loader";

export default function App() {
  const [pokemonsList, setPokemonsList] = useState([]);
  const [namePokemon, setNamePokemon] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function main() {
      try {
        const { data } = await api.get("/pokemons");
        setPokemonsList(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    }
    main();
  }, []);

  function submitSearch(e) {
    e.preventDefault();
    async function main() {
      try {
        const { data } = await api.get(`/pokemons?name=${namePokemon}`);
        setPokemonsList(data);
      } catch (err) {
        console.error(err);
      }
    }
    main();
  }

  return (
    <div className="app">
      <Header />
      {loading ? (
        <Loader />
      ) : (
        <>
          <section className="search">
            <form>
              <input
                type="search"
                name="search"
                id="search"
                placeholder="Pesquisar pokémon"
                onChange={(e) => setNamePokemon(e.target.value)}
              />
              <button type="submit" onClick={submitSearch}></button>
            </form>
            <img src={search} alt="" onClick={submitSearch} />
          </section>
          <main>
            {pokemonsList.map((pokemon) => (
              <section
                className={`pokemon-card ${pokemon.category}`}
                key={pokemon.id}
              >
                <Tilt className="tilt">
                  <div
                    className="background"
                    style={{
                      backgroundImage: `url(${pokemon.background_image_url})`,
                    }}
                  >
                    <img
                      src={pokemon.image_url}
                      alt="Pokemon image"
                      className={pokemon.category}
                    />
                  </div>
                  <div className="description">
                    <p className="name">{pokemon.name}</p>
                    <p className="category">{pokemon.category}</p>
                  </div>
                </Tilt>
              </section>
            ))}
          </main>
        </>
      )}
      <Footer />
    </div>
  );
}
