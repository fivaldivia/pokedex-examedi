import { FC, useEffect, useState } from 'react';
import '../Types.css';
import getPokemonsTypes from '../utils/getPokemonsTypes';
import PokemonCard from '../components/PokemonCard';

const HomePage: FC = () => {
  const [pokemonArray, setPokemonArray] = useState<any[]>([]);
  const [pokemonTypes, setPokemonTypes] = useState<any[]>([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [pagesVisited, setpagesVisited] = useState(12);
  const pokemonsPerPage = 12;
  const displayMorePokemons = () => {
    if(pageNumber<75){
      setPageNumber(pageNumber + 1);
      setpagesVisited(pageNumber * pokemonsPerPage);
    }else if(pageNumber == 75){
      setPageNumber(pageNumber + 1);
      setpagesVisited((pageNumber * pokemonsPerPage) - 7);
    }
  };

  const displayPokemons = pokemonArray
    .slice(0, pagesVisited + pokemonsPerPage)
    .map((pokemon, id) => {
      return (
        <div className="App-card">
          <header className="card-header">
            {id + 1 < 10 ? (
              <img
                alt="pokemon"
                src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/00${
                  id + 1
                }.png`}
              />
            ) : id + 1 < 100 ? (
              <img
                alt="pokemon"
                src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/0${
                  id + 1
                }.png`}
              />
            ) : (
              <img
                alt="pokemon"
                src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${
                  id + 1
                }.png`}
              />
            )}
          </header>
          <div className="card-body">
            {id + 1 < 10 ? (
              <p className="card-number">N.° 00{id + 1}</p>
            ) : id + 1 < 100 ? (
              <p className="card-number">N.° 0{id + 1}</p>
            ) : (
              <p className="card-number">N.° {id + 1}</p>
            )}
            <h5 className="card-name">{pokemon['name']}</h5>
            {pokemonTypes.length > 0
              ? pokemonTypes[id].map((types: any, idx: number) => (
                  <div className="card-type">
                    <span data-status={pokemonTypes[id][idx].type.name}>{pokemonTypes[id][idx].type.name}</span>
                  </div>
                ))
              : null}
          </div>
        </div>
      );
    });
  
  useEffect(() => {
    getPokemonsTypes(pokemonArray, pokemonTypes, setPokemonTypes);
  }, [pokemonArray, setPokemonArray]);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`)
      .then((res) => res.json())
      .then((data) => {
        setPokemonArray(data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="App">
      <div className="App-title">
        <h1>Pokédex</h1>
      </div>
      <div className="App-cards-list">{displayPokemons}</div>
      <div className="button-load-more-container">
        <button className="button-load-more" onClick={displayMorePokemons}>
          Load more Pokemon
        </button>
      </div>
    </div>
  );
};

export default HomePage;
