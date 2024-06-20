import React, { useEffect, useState } from 'react';

const typeColors = {
  normal: '#BCBCAC',
  fighting: '#BC5442',
  flying: '#669AFF',
  poison: '#AB549A',
  ground: '#DEBC54',
  rock: '#BCAC66',
  bug: '#ABBC1C',
  ghost: '#6666BC',
  steel: '#ABACBC',
  fire: '#FF421C',
  water: '#2F9AFF',
  grass: '#78CD54',
  electric: '#FFCD30',
  psychic: '#FF549A',
  ice: '#78DEFF',
  dragon: '#7866EF',
  dark: '#785442',
  fairy: '#FFACFF',
  shadow: '#0E2E4C',
};

const dressUpPayloadValue = (string) => {
  let splitStr = string.toLowerCase().split('-');
  for (let i = 0; i < splitStr.length; i++) {
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(' ');
};

const PokemonList = ({ pokemons, onPokemonClick }) => {
  return (
    <div id="pokedex-list-render-container">
      {pokemons.map((pokemon, index) => (
        <div 
          key={index} 
          className="pokemon-render-result-container container center column"
          onClick={() => onPokemonClick(pokemon.id)}
        >
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
            className="search-pokemon-image"
            alt={pokemon.name}
          />
          <span className="bold font-size-12">N° {pokemon.id}</span>
          <h3>{dressUpPayloadValue(pokemon.name)}</h3>
          <div className="row">
            {pokemon.types.map((type, i) => (
              <div
                key={i}
                className="type-container"
                style={{ background: typeColors[type.type.name] }}
              >
                {dressUpPayloadValue(type.type.name)}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PokemonList;
