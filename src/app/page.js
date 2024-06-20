"use client";

import React, { useState, useEffect } from 'react';
import PokemonList from '@/components/PokemonList';
import SearchBar from '@/components/SearchBar';
import Modal from '@/components/Modal';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [searchedPokemons, setSearchedPokemons] = useState([]);
  const [searchActive, setSearchActive] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=460');
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();

        const pokemonPromises = data.results.map((pokemon, index) =>
          fetch(pokemon.url)
            .then(response => {
              if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
              }
              return response.json();
            })
            .then(details => ({
              ...pokemon,
              id: index + 1,
              types: details.types,
            }))
        );

        const fullData = await Promise.all(pokemonPromises);
        setPokemons(fullData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const backToTopButton = document.getElementById('back-to-top-button');
      if (backToTopButton) {
        if (window.scrollY > 300) {
          backToTopButton.classList.add('show');
        } else {
          backToTopButton.classList.remove('show');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSearch = (searchTerm) => {
    if (searchTerm) {
      const searchResults = pokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchedPokemons(searchResults);
      setSearchActive(true);
    } else {
      setSearchedPokemons([]);
      setSearchActive(false);
    }
  };

  const handlePokemonClick = (id) => {
    setSelectedPokemon(id);
  };

  const closeModal = () => {
    setSelectedPokemon(null);
  };

  const backToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (loading) {
    return (
      <div id="loading-div">
        <img src="/pokeball-icon.png" className="loading-ball" alt="Loading" />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <div id="pokedex-list">
        <PokemonList 
          pokemons={searchActive ? searchedPokemons : pokemons}
          onPokemonClick={handlePokemonClick}
        />
      </div>
      {selectedPokemon && (
        <Modal selectedPokemon={selectedPokemon} closeModal={closeModal} />
      )}

      <div id="back-to-top-button" className="back-to-top" onClick={backToTop}>
        <img src="/arrow-up-icon.png" alt="Back to Top" />
      </div>
    </div>
  );
};

export default Home;
