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
  hp: '#DF2140',
  attack: '#FF994D',
  defense: '#eecd3d',
  'special-attack': '#85DDFF',
  'special-defense': '#96da83',
  speed: '#FB94A8',
};

const getStatName = (statName) => {
  switch (statName) {
    case 'hp':
      return 'HP';
    case 'attack':
      return 'ATK';
    case 'defense':
      return 'DEF';
    case 'special-attack':
      return 'SpA';
    case 'special-defense':
      return 'SpD';
    case 'speed':
      return 'SPD';
    default:
      return statName.toUpperCase();
  }
};

const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const PokemonInfo = ({ id }) => {
  const [pokemon, setPokemon] = useState(null);
  const [species, setSpecies] = useState(null);
  const [evolutionChain, setEvolutionChain] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemonInfo = async () => {
      try {
        const responsePokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!responsePokemon.ok) {
          throw new Error(`Network response was not ok: ${responsePokemon.statusText}`);
        }
        const dataPokemon = await responsePokemon.json();

        const responseSpecies = await fetch(dataPokemon.species.url);
        if (!responseSpecies.ok) {
          throw new Error(`Network response was not ok: ${responseSpecies.statusText}`);
        }
        const dataSpecies = await responseSpecies.json();

        const responseEvolution = await fetch(dataSpecies.evolution_chain.url);
        if (!responseEvolution.ok) {
          throw new Error(`Network response was not ok: ${responseEvolution.statusText}`);
        }
        const dataEvolution = await responseEvolution.json();

        setPokemon(dataPokemon);
        setSpecies(dataSpecies);
        setEvolutionChain(dataEvolution);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchPokemonInfo();
  }, [id]);

  if (error) return <p>Error: {error}</p>;
  if (!pokemon || !species || !evolutionChain || !evolutionChain.chain || !evolutionChain.chain.evolves_to) return <p>Loading...</p>;

  return (
    <div className="pokemon-info">
      <div className="pokemon-image-container">
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
          alt={pokemon.name}
          className="pokemon-image"
        />
      </div>
      <span id="current-pokemon-id" className="font-size-12 bold row center">N° {pokemon.id}</span>
      <h2 id="current-pokemon-name">{capitalize(pokemon.name)}</h2>

      <div id="current-pokemon-types" className="type-container row center margin-right-2">
        {pokemon.types.map((type, index) => (
          <div key={index} className="type-container" style={{ backgroundColor: typeColors[type.type.name] }}>
            {capitalize(type.type.name)}
          </div>
        ))}
      </div>

      <h4>Pokedex Entry</h4>
      <span id="current-pokemon-description" className="row center">{species.flavor_text_entries.find(entry => entry.language.name === 'en').flavor_text.replace('', ' ')}</span>

      <div className="row center">
        <div className="width-100 column center margin-5">
          <h4>Height</h4>
          <div id="current-pokemon-height" className="pokemon-info-variable-container row center">{pokemon.height / 10}m</div>
        </div>
        <div className="width-100 column center margin-5">
          <h4>Weight</h4>
          <div id="current-pokemon-weight" className="pokemon-info-variable-container row center">{pokemon.weight / 10}kg</div>
        </div>
      </div>

      <div className="column">
        <h4>Abilities</h4>
        <div className="row">
          {pokemon.abilities.map((ability, index) => (
            <div key={index} id={`current-pokemon-ability-${index}`} className="pokemon-info-variable-container row center">
              {capitalize(ability.ability.name)}
            </div>
          ))}
        </div>
      </div>

      <h4>Stats</h4>
      <div className="row center">
        {pokemon.stats.map((stat, index) => (
          <div key={index} className="current-pokemon-stats-container column">
            <div className="current-pokemon-stats-name" style={{ backgroundColor: typeColors[stat.stat.name.toLowerCase()] }}>
              {getStatName(stat.stat.name)}
            </div>
            <h5 id={`current-pokemon-stats-${stat.stat.name.toLowerCase()}`} className="row center">{stat.base_stat}</h5>
          </div>
        ))}
        <div className="current-pokemon-stats-container column" style={{ backgroundColor: '#88AAEA' }}>
          <div className="current-pokemon-stats-name" style={{ backgroundColor: '#7195DC' }}>
            TOT
          </div>
          <h5 id="current-pokemon-stats-total" className="row center">{pokemon.stats.reduce((total, stat) => total + stat.base_stat, 0)}</h5>
        </div>
      </div>

      <div id="current-pokemon-evolution-chain-container">
        <h4>Evolution</h4>
        <div className="row center">
          {/* Menampilkan gambar dan level untuk tahap pertama */}
          {evolutionChain.chain.species && (
            <img
              id={`current-pokemon-evolution-0`}
              className="current-pokemon-evolution-image"
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${filterIdFromSpeciesURL(evolutionChain.chain.species.url)}.png`}
              alt={evolutionChain.chain.species.name}
            />
          )}

          {/* Menampilkan gambar dan level untuk tahap kedua */}
          {evolutionChain.chain.evolves_to.map((evolution, index) => (
            <React.Fragment key={index}>
              <div
                id={`current-pokemon-evolution-level-${index}`}
                className="current-pokemon-evolution-level-container font-size-12 bold"
              >
                {evolution.evolution_details[0].min_level ? `Lv. ${evolution.evolution_details[0].min_level}` : 'Level up'}
              </div>
              <img
                id={`current-pokemon-evolution-${index}`}
                className="current-pokemon-evolution-image"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${filterIdFromSpeciesURL(evolution.species.url)}.png`}
                alt={evolution.species.name}
              />
            </React.Fragment>
          ))}

          {/* Menampilkan gambar dan level untuk tahap ketiga */}
          {evolutionChain.chain.evolves_to[0].evolves_to.map((evolution, index) => (
            <React.Fragment key={index}>
              <div
                id={`current-pokemon-evolution-level-${evolution.species.name}-${index + 1}`}
                className="current-pokemon-evolution-level-container font-size-12 bold"
              >
                {evolution.evolution_details[0].min_level ? `Lv. ${evolution.evolution_details[0].min_level}` : 'Level up'}
              </div>
              <img
                id={`current-pokemon-evolution-${evolution.species.name}-${index + 1}`}
                className="current-pokemon-evolution-image"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${filterIdFromSpeciesURL(evolution.species.url)}.png`}
                alt={evolution.species.name}
              />
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonInfo;

function filterIdFromSpeciesURL(url) {
  return url.replace('https://pokeapi.co/api/v2/pokemon-species/', '').replace('/', '');
}
