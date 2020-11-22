const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const editButton = document.querySelector('.button_type_edit');
const addButton = document.querySelector('.button_type_add');
const popupProfile = document.querySelector('.popup_type_edit');
const popupCard = document.querySelector('.popup_type_add');
const popupImage = document.querySelector('.popup_type_image');
const closeProfileButton = document.querySelector('.popup__close_type_edit');
const closeCardButton = document.querySelector('.popup__close_type_add');
const closeImageButton = document.querySelector('.popup__close_type_image');
const popupEditForm = document.querySelector('.popup__form_type_edit');
const popupAddForm = document.querySelector('.popup__form_type_add');
const inputName = document.querySelector('.popup__input_type_name');
const inputJob = document.querySelector('.popup__input_type_job');
const inputPlace = document.querySelector('.popup__input_type_place');
const inputLink = document.querySelector('.popup__input_type_link');
const popupEditButton = document.querySelector('.popup__button_type_edit');
const popupAddButton = document.querySelector('.popup__button_type_add');
const cards = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card').content;
const image = document.querySelector('.popup__image');
const caption = document.querySelector('.popup__caption');

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscape);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscape);
}

function closePopupByClickOnOverlay() {
  if (event.target !== event.currentTarget) {
    return
  }
  const openedPopup = document.querySelector('.popup_opened');
  closePopup(openedPopup);
}

function fillEditFormInputs () {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
}

function activatePopupEditButton () {
  popupEditButton.classList.remove('popup__button_disabled');
  popupEditButton.removeAttribute('disabled', true);
}

function clearAddFormInputs () {
  inputPlace.value = '';
  inputLink.value = '';
}

function inactivatePopupAddButton () {
  popupAddButton.classList.add('popup__button_disabled');
  popupAddButton.setAttribute('disabled', true);
}

function createCard(item) {
  const cardElement = cardTemplate.cloneNode(true);
  const imageElement = cardElement.querySelector('.card__image');
  imageElement.src = item.link;
  imageElement.alt = item.name;
  cardElement.querySelector('.card__title').textContent = item.name;
  cardElement.querySelector('.card__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like_active');
  });
  cardElement.querySelector('.card__delete').addEventListener('click', function (evt) {
    evt.target.closest('.card').remove();
  });
  imageElement.addEventListener('click', function (evt) {
    image.src = evt.target.src;
    image.alt = evt.target.alt;
    caption.textContent = evt.target.alt;
    openPopup(popupImage);
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

function handleEditFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(popupProfile);
}

function handleEscape (evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function handleAddFormSubmit (evt) {
  evt.preventDefault();
  const cardTitle = inputPlace.value;
  const cardImage = inputLink.value;
  const item = {
    name: cardTitle,
    link: cardImage,
  };
  const cardsElement = createCard(item);
  renderCard(cards, cardsElement);
  closePopup(popupCard);
}

editButton.addEventListener('click', function () {
  fillEditFormInputs();
  activatePopupEditButton();
  removeErrorComponents(config);
  openPopup(popupProfile);
});
addButton.addEventListener('click', function () {
  clearAddFormInputs();
  inactivatePopupAddButton();
  removeErrorComponents(config);
  openPopup(popupCard);
});
closeProfileButton.addEventListener('click', () => closePopup(popupProfile));
closeCardButton.addEventListener('click', () => closePopup(popupCard));
closeImageButton.addEventListener('click', () => closePopup(popupImage));
popupProfile.addEventListener('mousedown', closePopupByClickOnOverlay);
popupCard.addEventListener('mousedown', closePopupByClickOnOverlay);
popupImage.addEventListener('mousedown', closePopupByClickOnOverlay);
popupEditForm.addEventListener('submit', handleEditFormSubmit);
popupAddForm.addEventListener('submit', handleAddFormSubmit);
