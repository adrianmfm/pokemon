import { useState, useEffect } from "react";

import React from 'react'

const Api = () => {
    const [pokemon, setPokemon]= useState([]);

    useEffect (() => {
        const getPokemon = async () => {
            const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100&offset=0");
            const pokemonList = await response.json();

            setPokemon(pokemonList.results)
            console.log('hola', pokemonList.results);

        }
        getPokemon();


    },[])


  return (
    <div>
     {pokemon.map((poke) => (
    <h2>{poke.name}</h2>
  ))}
      
    </div>
  )
}

export default Api
