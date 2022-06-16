import React, { FC, useState, useEffect } from 'react';
import getPokemonsTypes from '../utils/getPokemonsTypes';

interface Props {
  pokemon: any;
  id: number;
  pokemonArray: any[];
  setPokemonArray: any;
}

const PokemonCard: FC<Props> = (props: Props) => {
  const [pokemonTypes, setPokemonTypes] = useState<any[]>([]);
  const { pokemon, id, pokemonArray, setPokemonArray } = props;
  
  useEffect(() => {
    getPokemonsTypes(pokemonArray, pokemonTypes, setPokemonTypes);
  }, [pokemonArray, setPokemonArray]);

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
                <span data-status={pokemonTypes[id][idx].type.name}>
                  {pokemonTypes[id][idx].type.name}
                </span>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default PokemonCard;
