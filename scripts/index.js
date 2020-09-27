const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const popup = document.querySelector('.popup');
const popupForm = document.querySelector('.popup__form');
const inputName = document.querySelector('.popup__item_type_name');
const inputJob = document.querySelector('.popup__item_type_job');
const editButton = document.querySelector('.button_type_edit');
const popupSaveButton = document.querySelector('.button_type_save');
const popupCloseButton = document.querySelector('.button_type_close');
const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const cards = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card').content;
const popupCards = document.querySelector('.popup-cards');
const popupCardsForm = document.querySelector('.popup-cards__form');
const inputPlace = document.querySelector('.popup-cards__item_type_place');
const inputLink = document.querySelector('.popup-cards__item_type_link');
const addButton = document.querySelector('.button_type_add');
const popupCardsSaveButton = document.querySelector('.button_type_create');
const popupCardsCloseButton = document.querySelector('.button_type_close-cards');
const popupPics = document.querySelector('.popup-pics');
const popupPicsCloseButton = document.querySelector('.button_type_close-pics');

function popupToggle() {
  popup.classList.toggle('popup_opened');
  if (popup.classList.contains('popup_opened')) {
    inputName.value = profileName.textContent;
    inputJob.value = profileJob.textContent;
  } else {
    inputName.value = '';
    inputJob.value = '';
  }
}

function popupCloseByClickOnOverlay() {
  if (event.target !== event.currentTarget) {
    return
  }
  popupToggle();
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  popupToggle();
}

function popupCardsToggle() {
  popupCards.classList.toggle('popup-cards_opened');
}

function popupCardsCloseByClickOnOverlay() {
  if (event.target !== event.currentTarget) {
    return
  }
  popupCardsToggle();
}

function createCard(item) {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.card__image').src = item.link;
  cardElement.querySelector('.card__image').alt = item.name;
  cardElement.querySelector('.card__title').textContent = item.name;
  cardElement.querySelector('.card__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like_active');
  });
  cardElement.querySelector('.card__delete').addEventListener('click', function (evt) {
    evt.target.closest('.card').remove();
  });
  cardElement.querySelector('.card__image').addEventListener('click', function () {
    popupPics.classList.toggle('popup-pics_opened');
    popupPics.querySelector('.popup-pics__image').src = item.link;
    popupPics.querySelector('.popup-pics__image').alt.textContent = item.name;
    popupPics.querySelector('.popup-pics__caption').textContent = item.name;
  });
  return cardElement;
}

initialCards.reverse().forEach((item) => {
  const cardsElement = createCard(item);
  renderCard(cards, cardsElement);
});

function renderCard(cards, cardsElement) {
  cards.prepend(cardsElement);
}

function popupPicsToggle() {
  popupPics.classList.toggle('popup-pics_opened');
}

function popupPicsCloseByClickOnOverlay() {
  if (event.target !== event.currentTarget) {
    return
  }
  popupPicsToggle();
}

function cardsFormSubmitHandler (evt) {
  evt.preventDefault();
  const cardTitle = inputPlace.value;
  const cardImage = inputLink.value;
  const item = {
    name: cardTitle,
    link: cardImage,
  };
  const cardsElement = createCard(item);
  renderCard(cards, cardsElement);
  cards.prepend(cardsElement);
  inputPlace.value = '';
  inputLink.value = '';
  popupCardsToggle();
}

editButton.addEventListener('click', popupToggle);
popupCloseButton.addEventListener('click', popupToggle);
popup.addEventListener('click', popupCloseByClickOnOverlay);
popupForm.addEventListener('submit', formSubmitHandler);
addButton.addEventListener('click', popupCardsToggle);
popupCardsCloseButton.addEventListener('click', popupCardsToggle);
popupCards.addEventListener('click', popupCardsCloseByClickOnOverlay);
popupCardsForm.addEventListener('submit', cardsFormSubmitHandler);
popupPicsCloseButton.addEventListener('click', popupPicsToggle);
popupPics.addEventListener('click', popupPicsCloseByClickOnOverlay);
