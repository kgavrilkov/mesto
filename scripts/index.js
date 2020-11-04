const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const popup = document.querySelector('.popup');
const popupForm = document.querySelector('.popup__form');
const inputName = document.querySelector('.popup__input_type_name');
const inputJob = document.querySelector('.popup__input_type_job');
const editButton = document.querySelector('.button_type_edit');
const popupSaveButton = document.querySelector('.popup__button-save');
const popupCloseButton = document.querySelector('.button_type_close');
const cards = document.querySelector('.cards');
const popupCards = document.querySelector('.popup-cards');
const popupCardsForm = document.querySelector('.popup-cards__form');
const inputPlace = document.querySelector('.popup-cards__input_type_place');
const inputLink = document.querySelector('.popup-cards__input_type_link');
const addButton = document.querySelector('.button_type_add');
const popupCardsSaveButton = document.querySelector('.popup-cards__button-create');
const popupCardsCloseButton = document.querySelector('.button_type_close-cards');
const popupPics = document.querySelector('.popup-pics');
const popupPicsCloseButton = document.querySelector('.button_type_close-pics');

function openPopup() {
  popup.classList.add('popup_opened');
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  const inputErrorName = document.getElementById('name-input-error');
  const inputErrorJob = document.getElementById('job-input-error');
  inputErrorName.textContent = '';
  inputErrorJob.textContent = '';
  inputName.classList.remove('popup__input_type_error');
  inputJob.classList.remove('popup__input_type_error');
  popupSaveButton.classList.remove('popup__button-save_disabled');
  document.addEventListener('keydown', handleEsc);
}

function closePopup() {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEsc);
}

function closePopupByClickOnOverlay() {
  if (event.target !== event.currentTarget) {
    return
  }
  closePopup();
}

function openPopupCards() {
  popupCards.classList.add('popup-cards_opened');
  inputPlace.value = '';
  inputLink.value = '';
  const inputErrorName = document.getElementById('title-input-error');
  const inputErrorJob = document.getElementById('link-input-error');
  inputErrorName.textContent = '';
  inputErrorJob.textContent = '';
  inputPlace.classList.remove('popup-cards__input_type_error');
  inputLink.classList.remove('popup-cards__input_type_error');
  document.addEventListener('keydown', handleEscDown);
}

function closePopupCards() {
  popupCards.classList.remove('popup-cards_opened');
  document.removeEventListener('keydown', handleEscDown);
}

function closePopupCardsByClickOnOverlay() {
  if (event.target !== event.currentTarget) {
    return
  }
  closePopupCards();
}

function closePopupPics() {
  popupPics.classList.remove('popup-pics_opened');
  document.removeEventListener('keydown', handleEscape);
}

function closePopupPicsByClickOnOverlay() {
  if (event.target !== event.currentTarget) {
    return
  }
  closePopupPics();
}

function createCard(item) {
  const cardTemplate = document.querySelector('#card').content;
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
    popupPics.classList.add('popup-pics_opened');
    popupPics.querySelector('.popup-pics__image').src = item.link;
    popupPics.querySelector('.popup-pics__image').alt.textContent = item.name;
    popupPics.querySelector('.popup-pics__caption').textContent = item.name;
    document.addEventListener('keydown', handleEscape);
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

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup();
}

function handleEsc (evt) {
  if (evt.key === 'Escape') {
    closePopup();
  }
}

function handleEscDown (evt) {
  if (evt.key === 'Escape') {
    closePopupCards();
  }
}

function handleEscape (evt) {
  if (evt.key === 'Escape') {
    closePopupPics();
  }
}

function handleCardsFormSubmit (evt) {
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
  popupCardsSaveButton.classList.add('popup-cards__button-create_disabled');
  closePopupCards();
}

editButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
popup.addEventListener('click', closePopupByClickOnOverlay);
popupForm.addEventListener('submit', handleFormSubmit);
addButton.addEventListener('click', openPopupCards);
popupCardsCloseButton.addEventListener('click', closePopupCards);
popupCards.addEventListener('click', closePopupCardsByClickOnOverlay);
popupCardsForm.addEventListener('submit', handleCardsFormSubmit);
popupPicsCloseButton.addEventListener('click', closePopupPics);
popupPics.addEventListener('click', closePopupPicsByClickOnOverlay);
