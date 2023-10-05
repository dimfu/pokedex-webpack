/* eslint-disable no-plusplus */
import $ from 'jquery';
import PokeApi from '../data/poke-api';
import { loadPokemonCard } from '../view/pokemon';

class Navbar extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: 'open' });
    this.PokeApi = new PokeApi();
    this.shadowDOM.addEventListener('submit', this.handleSearch.bind(this));
    this.displayPokemonResult = this.displayPokemonResult.bind(this);
  }

  connectedCallback() {
    this.render();
  }

  async handleSearch(event) {
    const row = $('#row');
    row.empty();

    const skeletons = Array.from({ length: 6 });

    for (let i = 0; i < skeletons.length; i++) {
      const card = $('<div class="card col-sm-12 col-md-6 col-lg-4 d-flex align-items-center justify-content-center" style="padding: 0; height: 400px;"></div>');
      const skeletonImage = $('<div class="skeleton" style="padding:14px; width: 90%; height: 90%; border-radius: 14px;"></div>');
      const cardBody = $('<div class="" style="margin: 0 auto;"></div>');
      const titleSkeleton = $('<div class=\'skeleton card-title skeleton-text\'></div>');
      row.append(card);
      card.append(skeletonImage);
      card.append(cardBody);
      cardBody.append(titleSkeleton);
    }
    event.preventDefault();

    const searchInput = this.shadowDOM.querySelector('#search');
    const searchTerm = searchInput.value.trim();

    if (searchTerm) {
      try {
        const pokemon = await this.PokeApi.getPokemon(searchTerm.toLowerCase());
        this.displayPokemonResult(pokemon);
      } catch {
        this.displayPokemonResult(null);
      }
    }

    this.dispatchEvent(new CustomEvent('search', { detail: searchTerm }));
  }

  displayPokemonResult(item) {
    const row = $('#row');
    row.empty();

    if (!item || !item.types || !item.abilities) {
      row.append($(`
        <div id="alert-empty" style="max-width:1400px; margin: 0 auto;">
          <div style="margin:8px;" class="alert alert-warning" role="alert">No pokemon found <a class="load-random">Load random pokemons?</a></div>
        </div>`));

      $('.load-random').on('click', async (event) => {
        event.preventDefault();
        try {
          const allPokemons = await this.PokeApi.getAllPokemons();

          allPokemons.forEach(async (pokemon) => {
            const cardData = await this.PokeApi.loadDetails(pokemon).then((res) => {
              $('#alert-empty').remove();
              return res;
            });
            loadPokemonCard(cardData);
          });
        } catch (err) {
          console.error(err);
        }
      });
      return;
    }

    const pokemon = item;
    for (let i = 0; i < pokemon.types.length; i++) {
      pokemon.types[i] = pokemon.types[i].type.name;
    }

    for (let i = 0; i < pokemon.abilities.length; i++) {
      pokemon.abilities[i] = pokemon.abilities[i].ability.name;
    }

    loadPokemonCard(pokemon);
  }

  render() {
    this.shadowDOM.innerHTML = `
    <style>
      nav {
        background-color: #3e3f3a;
        border-color: #3e3f3a;
        padding: 1.4rem;
        align-items: center;
      }

      nav .navbar-container {
        display: flex;
        max-width: 1400px;
        align-items: center;
        margin: 0 auto;
        justify-content: space-between;
      }

      nav .navbar-brand {
        color: white;
        font-size: 2rem;
        text-decoration: none;
        width: content-fit;
      }

      .container-brand {
        display: flex;
        align-items: center;
      }

      nav ul {
        display: flex;
        margin: 0;
        gap: 16px;
        list-style-type: none;
        color: white;
      }

      nav ul > li {
        font-size: 1.2rem;
      }

      nav ul > .search-container {
        width: 30px;
        height: 10px;
        background: white;
        border-radius: 10px
      }

      .search-container > input, button {
        height: 2rem;
        border: 0;
      }

      input[type="search"] {
        outline: 0;
        width: 100%;
        background: white;
        position: relative;
        border-radius: 5px;
        padding: 8px;
      }

    </style>
      <nav class="navbar">
        <div class="navbar-container">
          <div class="container-brand">
            <image src="image/pokeball.png" />
            <a class="navbar-brand">Pokedex</a>
          </div>
          <form class="search-container">
            <input id="search" type="search" placeholder="Search..." autofocus required />
          </form>
        </div>
      </nav>`;
  }
}

customElements.define('nav-bar', Navbar);
