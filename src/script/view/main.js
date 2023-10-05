import PokeApi from '../data/poke-api.js';
import { loadPokemonCard } from './pokemon.js';

const main = async () => {
  const Pokemons = new PokeApi(100);

  try {
    const allPokemons = await Pokemons.getAllPokemons();

    allPokemons.forEach(async (pokemon) => {
      const cardData = await Pokemons.loadDetails(pokemon);
      loadPokemonCard(cardData);
    });
  } catch (error) {
    console.error('Error fetching Pokemon:', error);
  }
};
export default main;
