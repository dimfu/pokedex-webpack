/* eslint-disable no-useless-concat */
/* eslint-disable no-plusplus */
class PokeApi {
  constructor(limit = 100) {
    this.baseUrl = 'https://pokeapi.co/api/v2/';
    this.pokemons = [];
    this.limit = limit;
  }

  async getPokemon(pokemonName) {
    const url = `${this.baseUrl}pokemon/${pokemonName}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Pokemon:', error);
      throw error;
    }
  }

  async loadDetails(item) {
    const pokemon = item;
    const { detailsUrl } = item;
    try {
      const response = await fetch(detailsUrl);
      const details = await response.json();

      pokemon.imageUrlFront = details.sprites.front_default;
      pokemon.imageUrlBack = details.sprites.back_default;
      pokemon.height = details.height;

      pokemon.types = [];
      for (let i = 0; i < details.types.length; i++) {
        pokemon.types.push(details.types[i].type.name);
      }

      pokemon.abilities = [];
      for (let i = 0; i < details.abilities.length; i++) {
        pokemon.abilities.push(details.abilities[i].ability.name);
      }

      pokemon.weight = details.weight;
      this.pokemons.push(pokemon);
    } catch (error) {
      console.error(error);
    }
    return pokemon;
  }

  async getAllPokemons() {
    const url = `${this.baseUrl}pokemon?limit=${this.limit}`;
    try {
      const response = await fetch(url);
      const { results } = await response.json();

      const pokemon = results.map((result) => ({
        name: result.name,
        detailsUrl: result.url,
      }));

      return pokemon;
    } catch (error) {
      console.error('Error fetching all Pokemon:', error);
      throw error;
    }
  }
}

export default PokeApi;
