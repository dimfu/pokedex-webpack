/* eslint-disable no-useless-concat */
import $ from 'jquery';

function loadPokemonCard(pokemon) {
  const row = $('#row');
  const { name, imageUrlFront, sprites } = pokemon;
  const card = $('<div class="card col-sm-12 col-md-6 col-lg-4" style="padding: 0;"></div>');
  const image = $(
    '<img style="width: 50%; margin: 0 auto;" alt="Card image">',
  );
  image.attr('src', imageUrlFront || sprites.front_default);
  const cardBody = $('<div class="card-body" style="margin: 0 auto;"></div>');
  const cardTitle = $(`<h4 class='card-title'>${name}</h4>`);
  const seeProfile = $(
    '<button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#pokeModal">See Profile</button>',
  );

  row.append(card);
  card.append(image);
  card.append(cardBody);
  cardBody.append(cardTitle);
  cardBody.append(seeProfile);

  seeProfile.on('click', () => {
    showModal(pokemon);
  });
}

function showModal(item) {
  const modalBody = $('.modal-body');
  const modalTitle = $('.modal-title');
  modalTitle.empty();
  modalBody.empty();

  const {
    imageUrlFront, imageUrlBack,
    sprites: {
      front_default: frontDefault, back_default: backDefault,
    } = {},
  } = item;

  // creates the different elements in modal content
  const nameElement = $(`<h1>${item.name}</h1>`);
  const imageElementFront = $('<img class="modal-img" style="width:50%">');
  imageElementFront.attr('src', imageUrlFront || frontDefault);
  const imageElementBack = $('<img class="modal-img" style="width:50%">');
  imageElementBack.attr('src', imageUrlBack || backDefault);
  const heightElement = $(`${'<p>' + 'height : '}${item.height}</p>`);
  const weightElement = $(`${'<p>' + 'weight : '}${item.weight}</p>`);
  const typesElement = $(`${'<p>' + 'types : '}${item.types}</p>`);
  const abilitiesElement = $(`${'<p>' + 'abilities : '}${item.abilities}</p>`);

  // appends the different elements in modal content
  modalTitle.append(nameElement);
  modalBody.append(imageElementFront);
  modalBody.append(imageElementBack);
  modalBody.append(heightElement);
  modalBody.append(weightElement);
  modalBody.append(typesElement);
  modalBody.append(abilitiesElement);
}

export { showModal, loadPokemonCard };
